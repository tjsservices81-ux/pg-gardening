# The admin panel

Everything on the website that changes — reviews, photos, before/after
sliders, and the links to Bark, MyBuilder and the rest — is edited from one
page:

```
https://your-domain.co.uk/admin/
```

There is also an **Owner login** link at the very bottom of every page on the
site, so you can always get to it from your phone.

You do not need a computer. It works on a phone, and photos can be uploaded
straight from the camera roll.

---

## Turning it on — once, and never again

The panel signs you in through Netlify. Two switches have to be flicked in the
Netlify dashboard before it will let anybody in. This is a five-minute job and
only ever has to be done once.

1. Log in at **app.netlify.com** and open the site.
2. **Site configuration → Identity → Enable Identity.**
3. Still under Identity, **Registration → Invite only.**
   This matters. Leave it open and anybody on the internet can sign themselves
   up and edit the website.
4. **Identity → Services → Git Gateway → Enable Git Gateway.**
   This is what lets the panel save changes.
5. **Identity → Invite users** → put your own email address in. You will get an
   email with a link. Open it on the device you want to use, set a password,
   and you are in.

If the panel ever shows a "could not start" message instead of loading, it is
almost always one of steps 2 and 4 having been switched off.

### One thing to change when the site goes live

The panel currently saves to the branch this work was built on. The line is at
the top of `admin/config.yml`:

```yaml
backend:
  name: git-gateway
  branch: claude/photo-uploads-reviews-pages-rcfpjb
```

Once this is merged and Netlify is deploying from `main`, that has to say
`main` instead, or the panel will keep saving somewhere the live site never
reads. Tell me when you merge and I will change it. Same value goes in the
`GITHUB_BRANCH` environment variable if you set up the optional bit at the
bottom of this page.

### Getting the enquiries emailed to you

**Do this one, or you will not know an enquiry has arrived.**

Every form on the site — the quote form on the contact page, the short one on
the home page and the review form — saves into Netlify's own inbox
automatically. Nothing is ever lost. But Netlify does not email you about it
until you tell it to, and nobody wants to log into a dashboard to find out
whether anybody wanted a hedge cutting.

Four clicks, once:

1. **app.netlify.com** → your site → **Forms**
2. **Form notifications** → **Add notification** → **Email notification**
3. Send to **pggardening1@gmail.com**
4. Leave the form dropdown on **any form**, so all three are covered, and save

From then on every enquiry lands in that inbox within a minute or two.

Two things worth knowing. The email includes the customer's own address from
the form, so you can reply straight to them. And because Netlify keeps a copy
in the dashboard regardless, an enquiry is never lost even if the notification
fails or a message gets caught by Gmail's spam filter — worth checking the
Forms tab now and then for the first fortnight.

### Adding somebody else later

Same place: **Identity → Invite users.** Anybody you invite can edit
everything, so only invite people you would trust with the business's
Facebook password.

---

## What is in the panel

Down the left-hand side there are four things.

### Reviews

This is the approval queue. **Nothing a customer writes appears on the website
until you switch it on yourself.**

When somebody fills in the review form on the site, it arrives here with
**Show this review on the website** set to off, and the list shows it as
`waiting`. Use the **Waiting for approval** filter at the top to see just those.

To publish one:

1. Open it.
2. Read it.
3. Switch **Show this review on the website** on.
4. Press **Publish**.

A minute or two later it is on the site. To take one down again, switch the
same box off and publish — it comes off the site but the file stays, so you
can put it back.

You can also type a review in yourself, for somebody who told you in person or
sent it by text. Two things to be careful about, because they are the law and
not a suggestion:

- **Publish it as they wrote it.** Do not tidy up their words.
- **Do not write reviews yourself, and do not have friends or family write
  them.** Fake reviews on a trading website are a criminal matter in the UK
  under the Digital Markets, Competition and Consumers Act 2024, and the fines
  are a percentage of turnover.

The **Customer gave permission to publish** box is separate from approval. If
it is off, the review is never shown no matter what — that is there so a review
somebody later asks you to remove can be withheld without being deleted.

**Private notes** is exactly that. It is never printed on the website.

**Taking a review down.** You can remove any review from the site at any time,
from this panel, without asking anybody. Open it, switch **Show this review on
the website** off, press Publish. It comes off within a minute or two. The file
stays where it is, so you can put the same review back later by switching it
on again — nothing is destroyed.

The 200 reviews collected off the website — in person, by text and on Facebook
— live together in one file, `content/reviews-collected.json`. Setting
`"enabled": false` there takes all of them off in one go.

One thing to be careful of, because it is the law rather than advice: taking
down reviews **because they are critical** is a banned practice under the
Digital Markets, Competition and Consumers Act 2024. Removing one because the
customer asked you to, or because it is abusive or plainly not about you, is
perfectly fine. Removing the one-star ones to make the average look better is
not.

### Before & after pairs

The drag-across sliders. Pick the service, give it a short title, upload the
**BEFORE** photo and the **AFTER** photo, press Publish.

The one thing that matters: **both photos have to be of the same spot, taken
from roughly the same place.** The slider wipes one image across the other, so
if the camera moved a long way it just looks like two unrelated pictures. Same
distance, same angle, same direction.

Switch **Show on the website** off to hide a pair without deleting it.

### Photos

Single job photos, for the gallery and the service pages. Pick the service,
upload, add a caption if you want one. That is all.

Adding forty at once through the panel is tedious — if you have a whole job's
worth, `PHOTOS.md` explains how to drop the files into the folders in one go
instead.

### Settings → Links & listings

This is the directory section.

**Trade directories and review sites** is a list with thirteen entries already
in it — Bark, MyBuilder, Checkatrade, TrustATrader, Rated People, Which?
Trusted Traders, TrustMark, Trustpilot, Yell, FreeIndex, Nextdoor, Local
Heroes and the Arboricultural Association.

Each one has:

| Field | What it does |
|---|---|
| **Show on the website** | Off, and it does not appear anywhere on the site. Not greyed out — not rendered at all, so there is never a dead link. |
| **Name** | What the button says. |
| **Link to your profile** | Your page on that site. |
| **Note to self** | Never shown on the website. |

They all start switched **off** with no link. When you sign up to one, paste
your profile link in, switch it on, publish. It then appears under **Listed
elsewhere** on the reviews page and the contact page. Switch it off and it
vanishes again.

You can add sites that are not on the list with the **Add** button at the
bottom, and drag the entries to change the order they appear in.

Two rules worth keeping to:

- **Only switch on the ones you are genuinely listed on.** A link to a
  Checkatrade profile that does not exist is worse than no link.
- **The Arboricultural Association one is a membership**, not a directory
  listing. Only switch it on if you are actually a member.

The same page also holds:

- **Facebook pages** — the two pages, each with its own on/off switch.
- **Google** — the Business Profile links. See `GOOGLE-SETUP.md` for where to
  find each one. Anything left empty is not shown.
- **Google Analytics measurement ID** — leave it empty and no analytics script
  is loaded at all, which is one less thing to explain in the cookie banner.

---

## How it actually works

Worth knowing, because it explains why things behave the way they do.

There is no database. The panel is a front end onto files in this repository:

```
content/settings.json     the links, listings and switches
content/reviews/*.json    one file per review
content/pairs/*.json      one file per before/after pair
content/photos/*.json     one file per photo
assets/img/uploads/       the images you upload
```

Pressing **Publish** commits the file. Netlify sees the commit, runs
`node tools/build-content.mjs`, and that turns those files into the three
small data files the website reads:

```
assets/js/config.js          ← do not edit, it is overwritten every deploy
assets/js/reviews-data.js    ← same
assets/js/photo-manifest.js  ← same
```

Two useful consequences:

- **Nothing can be lost.** Every change is a commit. Anything can be undone
  from the repository's history, including a review you deleted by mistake.
- **A change takes a minute or two to appear**, because the site has to
  rebuild. It is not broken; give it a moment and refresh.

---

## Optional: reviews filing themselves

Out of the box, a review submitted on the site lands in the **Netlify Forms**
inbox and you copy it into the panel. That works, and it needs nothing setting
up.

If you would rather they appeared in the approval queue by themselves, there is
a function at `netlify/functions/submission-created.mjs` that does it. It needs
three environment variables, set in Netlify under
**Site configuration → Environment variables**:

| Name | Value |
|---|---|
| `GITHUB_TOKEN` | A fine-grained GitHub personal access token with **Contents: write** on this repository and nothing else |
| `GITHUB_REPO` | `owner/repository` |
| `GITHUB_BRANCH` | The branch Netlify deploys from |

Set them and reviews arrive in the panel already marked as waiting. Leave them
unset and nothing happens — the function checks, writes a line in the deploy
log, and stops. It never shows an error to the customer either way.

It never marks a review as approved. That is always yours to do.

---

## If something goes wrong

**I clicked the invite email and it just showed me the ordinary website.**
This is the one that catches everybody. Netlify sends its invite and
password-reset emails to the *site root*, not to `/admin`, with a long
`#invite_token=…` on the end of the address. The public pages had no reason to
watch for that, so the token was ignored and you landed on the home page as if
the link were broken.

The site now spots that token on any page and forwards you to `/admin` with it,
so clicking the link takes you where it should. If you hit this before the fix
went up, just open the email and click the link again.

**The panel shows "Opening the admin panel…" and stays there.**
Press the **Log in** button on that page first — it opens the login box
directly. If nothing happens, Identity or Git Gateway is off: steps 2 and 4 at
the top of this page. The line at the bottom of that page says which of the two
pieces failed to load.

**I published something and the site has not changed.**
Give it two minutes. If it still has not, look at **Deploys** in Netlify — a
failed deploy shows in red, and the log says why.

**A photo I uploaded is enormous / the page is slow.**
Photos come off a phone at several megabytes each. Resize before uploading if
you can; `PHOTOS.md` covers the sizes worth aiming for.

**I deleted something I needed.**
It is in the repository history. Nothing is ever really gone.
