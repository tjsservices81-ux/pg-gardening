# Your website panel — pggardening.com/manage

One password. No Netlify login, no "Identity", no invite emails. Works on a
phone.

---

## Turning it on (once, about five minutes)

You need to put five settings into Netlify. Do this on a laptop if you can —
you are copying and pasting a long token.

### 1. Make a GitHub token

This is what lets the panel save to the website.

1. Go to **github.com** → your picture, top right → **Settings**
2. Right down the bottom of the left-hand list: **Developer settings**
3. **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
4. Fill it in:
   - **Token name:** `pg-gardening panel`
   - **Expiration:** 1 year (put a note in your phone to redo it — the panel
     will start saying "GitHub refused the save" when it runs out)
   - **Repository access:** *Only select repositories* → pick **pg-gardening**
   - **Permissions** → *Repository permissions* → find **Contents** → change it
     from "No access" to **Read and write**. That is the only one you change.
5. **Generate token**, then copy the long `github_pat_…` string. GitHub shows it
   once and never again.

### 2. Put the five settings into Netlify

Netlify → your site → **Site configuration** → **Environment variables** →
**Add a variable** → *Add a single variable*, five times:

| Key | Value |
|---|---|
| `ADMIN_PASSWORD` | the password you want to type to get in. Make it a proper one — anyone with it can change the website. |
| `ADMIN_SECRET` | any long jumble of letters and numbers, 40+ characters. You never type this. It is what keeps someone from forging a login. |
| `GITHUB_TOKEN` | the `github_pat_…` string from step 1 |
| `GITHUB_REPO` | `tjsservices81-ux/pg-gardening` |
| `GITHUB_BRANCH` | `main` |

### 3. Redeploy

Netlify → **Deploys** → **Trigger deploy** → *Deploy site*. Environment
variables only reach the site on the next build.

Then go to **pggardening.com/manage** and put your password in.

---

## Using it

Five buttons:

- **Add a photo of a job** — pick it from your camera roll, say which kind of
  job it was, add a line about it. It appears in the gallery.
- **Add a before & after** — same, but two photos. These are the ones that win
  work.
- **Reviews** — new ones from the website form wait here until you switch them
  on. Nothing a customer writes appears until you say so.
- **Links & switches** — your Google review link, Facebook pages, trade
  directories. Anything switched off is simply not on the website; there are
  never dead links.
- **See the website** — opens the live site.

Every save commits to GitHub, which starts a Netlify deploy. **Give it one to
two minutes** before you check the live site. The panel tells you this.

Photos are shrunk on your phone before they are sent, so it works on a weak
signal and does not fill the repository with 8 MB camera files.

You stay logged in for 12 hours, then it asks again.

---

## About reviews — the part that is law, not preference

The Digital Markets, Competition and Consumers Act 2024 makes it illegal to
publish a fake review, to publish one you wrote yourself, or to publish only
the good ones while hiding the bad ones. That last one catches people out: it
is called review gating and it is banned.

So the panel does two things deliberately:

- It **never** edits the words. What the customer typed is what goes up.
- Switching a review on is publishing it. Switching it off is fine if it is
  spam or abuse or clearly not a real customer. It is **not** fine to switch
  one off because it is three stars.

If a review is unfair, reply to it. Do not hide it.

---

## When something goes wrong

**"The panel is not set up yet. Missing in Netlify: …"**
One of the five variables is not there, or the site has not been redeployed
since you added it. Add it, then trigger a deploy.

**"That password is not right."**
`ADMIN_PASSWORD` in Netlify is not what you typed. Note there is a deliberate
one-second pause on a wrong password — that is there so nobody can sit and
guess.

**"GitHub refused the save (401)"** — the token has expired or been revoked.
Make a new one, paste it into `GITHUB_TOKEN`, redeploy.

**"GitHub refused the save (403 / 404)"** — the token does not have *Contents:
Read and write*, or it was not granted access to the `pg-gardening`
repository, or `GITHUB_REPO` is spelt wrong.

**Saved, but the website has not changed** — check Netlify → Deploys. If a
deploy is running, wait for it. If a deploy **failed**, open it and read the
red line at the bottom.

---

## What it can and cannot touch

The panel can only write to these places, and the server enforces it — not the
browser, so it holds even if someone got hold of your password:

```
content/reviews/      content/pairs/      content/photos/
content/settings.json assets/img/uploads/
```

It cannot change the pages themselves, the prices, the phone numbers, or
anything else. Those are code changes.

The GitHub token never reaches the browser. Your phone sends the password once,
gets back a signed pass that expires, and the server does the talking to GitHub.

---

## The old panel

`/admin` (Decap CMS + Netlify Identity + Git Gateway) is still there and still
works if Git Gateway is on. It needs three separate things configured and gave
you an editor built for developers. Once you are happy with `/manage`, the old
one can be deleted — say the word and it goes.
