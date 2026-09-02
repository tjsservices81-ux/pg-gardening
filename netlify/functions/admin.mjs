/**
 * admin.mjs — the whole back end for the panel at /manage.
 *
 * Why this exists
 * ---------------
 * The panel used to be Decap CMS signed in through Netlify Identity, saving
 * through Git Gateway. Three moving parts, two of which the owner could not get
 * working, and an editor built for developers rather than for a tree surgeon on
 * a phone. This replaces all three with one password box and one function.
 *
 * How it works
 * ------------
 * The browser never sees the GitHub token. It sends a password once, gets back
 * a signed ticket that lasts twelve hours, and every later request carries that
 * ticket. This function checks the ticket, then talks to GitHub on its behalf.
 *
 * The ticket is an HMAC of its own expiry time, signed with a secret only the
 * server knows. Nothing is stored anywhere: a ticket is valid because the
 * signature proves this function issued it, and expired ones simply stop
 * verifying. No database, no session table, nothing to clean up.
 *
 * Settings it needs (Netlify → Site configuration → Environment variables)
 * ----------------------------------------------------------------------
 *   ADMIN_PASSWORD   what you type to get in
 *   ADMIN_SECRET     any long random string; signs the tickets
 *   GITHUB_TOKEN     fine-grained token, Contents: write, this repo only
 *   GITHUB_REPO      owner/repository
 *   GITHUB_BRANCH    the branch the live site builds from
 */

import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

const REPO = process.env.GITHUB_REPO || '';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN = process.env.GITHUB_TOKEN || '';
const PASSWORD = process.env.ADMIN_PASSWORD || '';
const SECRET = process.env.ADMIN_SECRET || '';

const TICKET_HOURS = 12;

/* Anything written has to sit under one of these. Without it, a stolen ticket
   could rewrite the site itself rather than just its contents. */
const WRITABLE = [
  'content/reviews/',
  'content/pairs/',
  'content/photos/',
  'content/settings.json',
  'assets/img/uploads/',
];

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

/* ------------------------------------------------------------------ tickets */

function sign(payload) {
  return createHmac('sha256', SECRET).update(payload).digest('hex');
}

function issueTicket() {
  const expires = Date.now() + TICKET_HOURS * 3600 * 1000;
  const nonce = randomBytes(8).toString('hex');
  const payload = `${expires}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

function ticketValid(ticket) {
  if (typeof ticket !== 'string') return false;
  const parts = ticket.split('.');
  if (parts.length !== 3) return false;
  const [expires, nonce, given] = parts;
  const expected = sign(`${expires}.${nonce}`);
  // Compare in constant time so the check cannot be picked apart a byte at a
  // time by measuring how long it takes to fail.
  if (given.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(given), Buffer.from(expected))) return false;
  return Number(expires) > Date.now();
}

/** Same idea for the password: no early exit on the first wrong character. */
function passwordMatches(given) {
  if (typeof given !== 'string' || !PASSWORD) return false;
  const a = createHmac('sha256', SECRET).update(given).digest();
  const b = createHmac('sha256', SECRET).update(PASSWORD).digest();
  return timingSafeEqual(a, b);
}

/* ------------------------------------------------------------------- github */

async function gh(path, options = {}) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'pg-gardening-admin',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  return res;
}

const b64encode = (text) => Buffer.from(text, 'utf8').toString('base64');
const b64decode = (text) => Buffer.from(text, 'base64').toString('utf8');

/** Everything in a folder, newest name last. Missing folder is not an error. */
async function listFolder(folder) {
  const res = await gh(`contents/${folder}?ref=${encodeURIComponent(BRANCH)}`);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub said ${res.status} listing ${folder}`);
  const items = await res.json();
  return (Array.isArray(items) ? items : [])
    .filter((i) => i.type === 'file' && i.name.endsWith('.json'))
    .map((i) => ({ name: i.name, path: i.path, sha: i.sha }));
}

async function readFile(path) {
  const res = await gh(`contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${encodeURIComponent(BRANCH)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub said ${res.status} reading ${path}`);
  const data = await res.json();
  return { sha: data.sha, text: b64decode(data.content.replace(/\n/g, '')) };
}

/** Write a file. Pass the sha to replace one, omit it to create. */
async function writeFile(path, base64, message, sha) {
  const body = { message, content: base64, branch: BRANCH };
  if (sha) body.sha = sha;
  const res = await gh(`contents/${encodeURIComponent(path).replace(/%2F/g, '/')}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub refused the save (${res.status}): ${detail.slice(0, 200)}`);
  }
  return res.json();
}

const allowed = (path) =>
  typeof path === 'string' &&
  !path.includes('..') &&
  WRITABLE.some((prefix) => (prefix.endsWith('/') ? path.startsWith(prefix) : path === prefix));

/* ------------------------------------------------------------------ handler */

export default async function handler(request) {
  if (request.method !== 'POST') return reply(405, { error: 'Use POST.' });

  const missing = [
    !PASSWORD && 'ADMIN_PASSWORD',
    !SECRET && 'ADMIN_SECRET',
    !TOKEN && 'GITHUB_TOKEN',
    !REPO && 'GITHUB_REPO',
  ].filter(Boolean);
  if (missing.length) {
    return reply(503, {
      error: 'setup',
      message: `The panel is not set up yet. Missing in Netlify: ${missing.join(', ')}.`,
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return reply(400, { error: 'That request made no sense.' });
  }

  const { action } = body || {};

  /* ---- the only door that does not need a ticket ---- */
  if (action === 'login') {
    if (!passwordMatches(body.password)) {
      // A pause on failure, so guessing is slow and boring.
      await new Promise((r) => setTimeout(r, 900));
      return reply(401, { error: 'That password is not right.' });
    }
    return reply(200, { ticket: issueTicket(), hours: TICKET_HOURS });
  }

  const auth = request.headers.get('authorization') || '';
  if (!ticketValid(auth.replace(/^Bearer\s+/i, ''))) {
    return reply(401, { error: 'signedout', message: 'Please log in again.' });
  }

  try {
    switch (action) {
      /* Everything the panel needs to draw itself, in one round trip. */
      case 'load': {
        const [reviews, pairs, photos, settingsFile] = await Promise.all([
          listFolder('content/reviews'),
          listFolder('content/pairs'),
          listFolder('content/photos'),
          readFile('content/settings.json'),
        ]);
        const fetchAll = (list) =>
          Promise.all(
            list.map(async (item) => {
              const file = await readFile(item.path);
              let data = {};
              try { data = JSON.parse(file.text); } catch { /* leave it empty */ }
              return { path: item.path, sha: file.sha, data };
            })
          );
        const [reviewData, pairData, photoData] = await Promise.all([
          fetchAll(reviews), fetchAll(pairs), fetchAll(photos),
        ]);
        return reply(200, {
          reviews: reviewData,
          pairs: pairData,
          photos: photoData,
          settings: settingsFile
            ? { path: 'content/settings.json', sha: settingsFile.sha, data: JSON.parse(settingsFile.text) }
            : null,
          branch: BRANCH,
        });
      }

      /* Save a JSON record. */
      case 'save': {
        const { path, data, message, sha } = body;
        if (!allowed(path)) return reply(400, { error: 'That is not somewhere the panel may write.' });
        const text = JSON.stringify(data, null, 2) + '\n';
        const result = await writeFile(path, b64encode(text), message || `Panel: update ${path}`, sha);
        return reply(200, { ok: true, sha: result.content.sha, commit: result.commit.sha });
      }

      /* Save an image. The browser has already shrunk it. */
      case 'upload': {
        const { path, base64, message } = body;
        if (!allowed(path)) return reply(400, { error: 'That is not somewhere the panel may write.' });
        if (typeof base64 !== 'string' || base64.length > 8_000_000) {
          return reply(413, { error: 'That photo is too big even after shrinking. Try another.' });
        }
        const result = await writeFile(path, base64, message || `Panel: upload ${path}`);
        return reply(200, { ok: true, sha: result.content.sha, commit: result.commit.sha });
      }

      /* Delete a record. Images are left alone: they cost nothing and a photo
         removed by mistake is worse than a file nobody references. */
      case 'remove': {
        const { path, sha, message } = body;
        if (!allowed(path)) return reply(400, { error: 'That is not somewhere the panel may write.' });
        if (!sha) return reply(400, { error: 'Nothing to delete.' });
        const res = await gh(`contents/${encodeURIComponent(path).replace(/%2F/g, '/')}`, {
          method: 'DELETE',
          body: JSON.stringify({ message: message || `Panel: delete ${path}`, sha, branch: BRANCH }),
        });
        if (!res.ok) throw new Error(`GitHub refused the delete (${res.status})`);
        return reply(200, { ok: true });
      }

      /* Proves the token works, without changing anything. */
      case 'check': {
        const res = await gh(`branches/${encodeURIComponent(BRANCH)}`);
        if (!res.ok) {
          return reply(200, {
            ok: false,
            message: `GitHub answered ${res.status} for branch "${BRANCH}". Check GITHUB_REPO, GITHUB_BRANCH and that the token has Contents: write.`,
          });
        }
        const data = await res.json();
        return reply(200, { ok: true, branch: BRANCH, lastCommit: data.commit?.commit?.message?.split('\n')[0] || '' });
      }

      default:
        return reply(400, { error: `No such action: ${action}` });
    }
  } catch (error) {
    return reply(502, { error: 'github', message: String(error.message || error).slice(0, 300) });
  }
}

export const config = { path: '/api/admin' };
