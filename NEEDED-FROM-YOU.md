# What I need from you before this goes live

The website is built and works. What it does not have is anything I could not
verify — no invented phone numbers, no made-up qualifications, no
"established 2009", no "from £X". Every one of those is left as a visibly
marked placeholder instead, because a placeholder you can see is better than a
plausible-looking lie that goes live and stays there.

Work down this list. Items in **Section 1 stop the site going live**;
everything after that can follow on.

**A lot of this you can now do yourself.** There is an admin panel at
`/admin` — reviews to approve, photos, before/after sliders, and the on/off
switches for Bark, MyBuilder and the rest. It needs two switches flicking in
the Netlify dashboard first, which takes about five minutes and only has to be
done once. `ADMIN.md` walks through it.

---

## 1. Blockers — the site should not launch without these

### 1.1 The two phone numbers — DONE

Both numbers are live everywhere on the site — header, footer, contact page,
thank-you page and the sticky mobile call bar — and both are now named:

- **Gerry** — 07443 356 651
- **Patrick** — 07411 648 265

The names appear beside each number wherever it is printed, and the mobile call
bar reads "Gerry" and "Patrick" rather than "Call us" and "Second line", so
somebody ringing knows who they are getting. Screen readers announce "Call
Gerry" and "Call Patrick" rather than reading the digits out. Every one is a
working `tel:` link and both are in the business data search engines read — tap
them on a phone to check they dial.

To change either number or name later:

```bash
node tools/setup.mjs \
  --phone1 "07443 356 651" --label1 "Gerry" \
  --phone2 "07411 648 265" --label2 "Patrick" \
  --email  "pggardening1@gmail.com" \
  --domain "https://www.pggardening.com"
```

The `--label1` and `--label2` values are what appear beside each number.

### 1.2 Email address — DONE

**pggardening1@gmail.com** is now live everywhere on the site: the contact
page, the footer of all 32 pages, the About page and the business data search
engines read. Every one is a working `mailto:` link.

**One thing still to switch on, and it takes four clicks.** Form submissions
save into Netlify's own inbox automatically and are never lost, but Netlify
does not email you about them until you ask it to:

> app.netlify.com → your site → **Forms** → **Form notifications** →
> **Add notification** → **Email notification** → send to
> pggardening1@gmail.com → leave the form dropdown on *any form* so all three
> are covered → Save.

Without that step an enquiry sits in a dashboard you have no reason to open.
`ADMIN.md` has the same instructions.

### 1.3 Domain name — DONE

**https://www.pggardening.com** is set everywhere: the address in the sitemap,
the canonical tags, the social-sharing previews and the business data search
engines read. No placeholder remains anywhere on the site.

**Two things left on the domain itself**, and they are jobs for wherever you
bought it rather than for the code:

1. Point the domain at Netlify (Netlify → Domain management → Add a domain,
   then follow its DNS instructions).
2. Decide whether you want **www.pggardening.com** or **pggardening.com** as
   the main address. The site is currently set up for the www version, which is
   the safer default. Netlify will redirect the other one to it automatically.
   Say if you would rather have it the other way round and I will switch it.

### 1.4 Business details for the privacy policy — PART DONE

The site now says **sole trader** rather than limited company. That removes the
Companies House requirement entirely: **no company number, no registered office
needed.** Those only ever applied to limited companies.

It does not remove the disclosure requirement altogether, though, and this one
catches most people. Because you trade as "PG Gardening & Tree Surgeon" rather
than under your own surname, the trading disclosure rules ask for two things on
the website:

1. **The name of the person trading** — the actual human behind the business
   name. Gerry? Patrick? Whoever is the sole trader.
2. **A UK address where post can be sent.** Not necessarily where you live —
   an accountant's address or a service address is fine, and either keeps your
   front door off the internet.

That is the last visible placeholder on the site. Send me a name and an address
and it closes.

- Name of the sole trader: ............................
- Address for post: ............................

**One thing this fixed by itself.** The insurance certificate is in the name
"PG Gardening & Tree Surgeon" with no "Ltd", which I had flagged as a mismatch
against the site saying limited company. As a sole trader it is exactly right,
so that concern is gone.

## 2. Trust — the things customers actually check

Publishing a qualification you do not hold is fraud and publishing an insurance
figure you do not carry is worse, so nothing here goes up until you confirm it.
Two of them now have: the insurance and the chainsaw certification are live.

### 2.1 Chainsaw qualifications — DONE

Four certificates are now on the About page, printed in full so a customer can
read them rather than take "fully qualified" on trust:

| Certificate | Body | Date | Covers |
|---|---|---|---|
| Chainsaw and Related Operations, Level 2 | NPTC | 1 June 2004 | CS30.1 maintenance, CS30.2 on-site preparation and basic crosscutting, CS31 felling and processing small trees 200–380 mm |
| Climb Trees and Perform Aerial Rescue, Level 2 | NPTC | 7 June 2004 | Climb a tree, conduct aerial rescue. Was CS38 before accreditation. |
| CS39 — Use of a Chainsaw from a Rope and Harness | NPTC | 28 September 2004 | Cutting while roped into the tree |
| Risk Assessment for Commercial Arboriculture | Lantra Awards | 19 August 2004 | One-day course — **attendance**, not a competence test |

Between them that is the whole job on a tree: getting up it, cutting from a
rope once you are there, getting somebody down if it goes wrong, and processing
what comes off. The only thing the set does not cover is felling trees above
380 mm (CS32), and the page says so rather than leaving a customer to assume.

The Lantra one is labelled as attendance rather than competence, because that
is what it says on it, and a customer who checks will find that out anyway.

**One note — the page no longer says "current".** A 2004 certificate is not
evidence of that. NPTC certificates of competence carry no expiry date, but the
industry standard, and what most insurers and commercial clients expect, is
refresher training every five years. **If there are refreshers, send them and
they go up alongside these.** It would be the strongest thing on the page.

One smaller decision: the scans show the certificate numbers and the candidate
number. That is what makes them checkable, and also what somebody would need to
impersonate the holder. Most trades publish them. Say the word and I will blur
the candidate number and leave everything else.

- Arboriculture qualification (Level 2/3, ND Arb, etc.), if held: ....................
- Refresher or reassessment certificates, if any: ....................

### 2.1a The certificates video — DONE, one thing to know

Your 56-second video is on the About page, at the top of the paperwork
section, with a play button and a still frame — it does not start on its own.

**The subtitles are clipped at both edges.** They are burned into the picture
rather than a separate track, so this came in with the file and cannot be fixed
here: "GOOD AFTERNOON, P / G O. HOLICS", "ABILITY INSURANCE UP / O 2 MILLION",
"HIS IS EVERY / ERTIFICATE YOU WOULD". Every line loses a letter or two off
each end. It is readable, but it looks like a mistake rather than a choice.

Whatever you edited it in exported the captions wider than the frame. If you
still have the project, re-export with the captions inside the safe area and
send it again — I will swap the file and nothing else needs touching. If not,
it is fine as it is.

Two other things I checked so you do not have to:

- **Your address is never legible.** The insurance certificate is on screen
  around 33–35 seconds, but greyscale, motion-blurred and small — only the
  Hiscox logo and the title read. Nothing to redact.
- **The auto-captions have mis-heard a few words** ("P G O. HOLICS"), which is
  normal for automatic subtitles and not worth re-recording over.

### 2.2 Insurance — DONE, and now evidenced

The Hiscox certificate is on the About page, alongside the tickets, in the
redacted version you sent — address and postcode stamped PRIVATE.

- **Insurer:** Hiscox Insurance Company Limited
- **Limit of indemnity:** £2,000,000 each and every claim or loss
- **In force:** 7 March 2026 to 6 March 2027
- **Insured name:** PG Gardening & Tree Surgeon

Because the certificate carries an end date, the About page can now say the
cover is *in force to 6 March 2027* rather than just asserting it exists. That
is worth more than the figure on its own.

**Diary note: renew before 6 March 2027.** When you do, send the new
certificate and I will swap it — an expired certificate on a website is worse
than none at all.

**The policy number is still visible** on the published certificate. You
redacted the address but not that, so I have left it as you sent it. Say the
word if you want it covered too.

### 2.3 Waste carrier registration — REMOVED at your request

Every mention has come off the website: the About page section, the green-waste
bullet on the home page, the line on the services hub, the garden work page and
three FAQ answers (each of which also had a duplicate inside the structured
data search engines read).

Two of those were claiming you *are* Environment Agency registered — on the
services hub and the garden work page — which was never something you had
confirmed, so they should not have been there whatever you decided.

What is left is the plain promise, which needs no registration to make and is
what a customer actually cares about: everything we cut leaves with us, nothing
is bagged up and left at the side of the house.

If you are registered and ever want the number published, say so and it goes
back on.

### 2.4 The guarantee — SET, but read it

You asked me to put something concrete on rather than leave a blank, so I have.
The seal on the home page, all four service pages and the About page now reads:

> If you are not happy with any part of the work, tell us before we leave — or
> ring within **14 days** — and we will come back and put it right at no charge.
> That covers the work we carried out. It does not cover new growth, storm
> damage after we have left, or plants that fail to take. This is on top of your
> legal rights, not instead of them.

**This is my wording, not yours.** It is a promise your business has to keep, so
read it and tell me if any of it is wrong. Three choices are in there:

1. **14 days.** Long enough to be worth something, short enough that a hedge is
   not back to where it was. Say the word for 7, 28, or "before we leave" only.
2. **What it excludes.** New growth, weather after the visit, and plants that
   fail to take. Those are the three things a customer might reasonably come
   back on that are not your workmanship. Add or remove any.
3. **"On top of your legal rights, not instead of them."** This one stays. A
   guarantee that looks like it replaces a customer's statutory rights is a
   banned practice under the Consumer Protection from Unfair Trading
   Regulations, whatever it actually says in the small print.

Tell me the wording you want and it goes on exactly as you say it.

### 2.5 Memberships and trade directory listings

Only if genuinely held and current — Arboricultural Association, Checkatrade,
TrustMark, Which? Trusted Traders, etc.: ............................

You do not need to tell me these. They are yours to switch on and off yourself
in the admin panel, under **Settings → Links & listings**. Thirteen of the
usual UK ones are already listed there — Bark, MyBuilder, Checkatrade,
TrustATrader, Rated People, Which? Trusted Traders, TrustMark, Trustpilot,
Yell, FreeIndex, Nextdoor, Local Heroes and the Arboricultural Association —
each switched off with an empty link. Paste your profile link in, switch it on,
publish, and it appears on the site. Anything switched off is not rendered at
all, so there are never any dead links. See `ADMIN.md`.

### 2.6 Payment methods — DONE

Cash, bank transfer and card, confirmed by you. The contact page FAQ now says
so plainly instead of "ask when we quote".

---

## 3. Facebook, Google and reviews

### 3.1 Facebook — DONE, with two notes

Both pages are live in the footer, on the contact page and on the reviews page:

- `https://www.facebook.com/share/1E5XWc1L7V/`
- `https://www.facebook.com/share/1b42MzoTax/`

They are also in the site's structured data, which is how Google connects the
website and the Facebook pages to the same business.

**Two things worth doing when you get a minute:**

1. **These are share links, not page addresses.** They work — Facebook
   redirects them — but a share link is a redirect that Facebook controls and
   could change. The proper address looks like
   `facebook.com/YourPageName`. Open each page on a desktop browser, copy the
   address bar, and send me both; I will swap them in.
2. **Tell me which is which.** They currently read "PG Gardening on Facebook"
   and "Our second Facebook page", because I do not know what the second one
   is for. If one is the tree surgery side and one is gardening, or one is
   personal and one is the business, say so and the buttons will say it too.

I could not check either link from here — Facebook is blocked on this machine's
network — so please click both and confirm they land where you expect.

**My recommendation: links, not embedded feeds.** An embedded Facebook feed
adds roughly 300–500 KB and several third-party trackers to every page it sits
on, it needs cookie consent before it can legally load, and — the real problem —
if posting goes quiet for two months the website advertises that fact on the
front page. A button that says "See our recent jobs on Facebook" never looks
out of date. If you post several times a week and want the feed, say so and I
will add it behind the cookie banner.

### 3.2 Your existing reviews — DONE

You confirmed these are real customers, not sample data, so the site now treats
them that way throughout. The file is `content/reviews-collected.json`, the
word "sample" is gone from the code, the docs and the build, and the launch
guard that would have blocked a deploy has been removed with it.

They are described in the source as reviews collected away from the website —
in person, by text and on Facebook — because that is where they came from.
Reviews left through the form on this site print "Left on this website"
underneath; these do not, because that would be a claim about their origin
that is not true of them.

**Two things worth knowing, both quick:**

1. **You can take any of them down at any time** from the admin panel. Open the
   review, switch it off, publish. See `ADMIN.md`.
2. **Removing reviews because they are critical is illegal** under the DMCC Act
   2024 — as is publishing any that are not genuine. Taking one down because
   the customer asked, or because it is abusive, is fine.

If any of them were left somewhere with its own terms — Google in
particular — it should not be republished here. Google's terms forbid it. See
3.3.

### 3.3 Google reviews — read this bit

You asked for Google reviews on the site. Here is the honest position.

**Google reviews cannot be copied onto the website.** Scraping review content
from a Business Profile and republishing it breaks Google's terms of service.
Beyond that, copied reviews are frozen at the moment they were pasted, so a
"5 stars" wall stays up even after it stops being true — and customers know
that a business controls every word on its own site, so hand-typed reviews
carry very little weight.

There is a second, sharper trap. **Do not put review or star-rating schema
markup on your own pages for reviews collected on Google.** Google's own
guidelines forbid marking up reviews that were not collected on your own site,
and the penalty is manual action against the whole domain. Plenty of cheap
"SEO packages" do exactly this and it is why some sites lose their rich
results overnight. This site deliberately carries no rating markup.

**What is built instead:**

- **"Read our reviews on Google"** — a button straight to your profile, where
  reviews are dated, attributed and outside your control. Most credible option
  and it costs nothing.
- **"Leave us a review"** — a one-click link to the Google review box. This is
  the one that actually grows the business; a link in a follow-up text after
  every job is worth more than anything on the website.
- **A reviews page** that explains, in plain English, why the reviews live on
  Google. Being straight about it reads better than a wall of anonymous
  five-star quotes.
- **A review form on our own site**, for reviews left directly with you. Those
  are yours, they may legitimately be published here, and they are the only
  ones that could ever carry schema markup later.

To switch it on I need:

- **Google Business Profile URL or Place ID:** ............................
- **The "write a review" short link.** Get it from your Business Profile
  dashboard → "Ask for reviews": ............................
- **Google Maps listing URL:** ............................

**If you want live Google reviews on the page later,** that is the Places API:
a Google Cloud account with billing enabled and an API key. It costs pennies
at your traffic levels but it does require a card on file. The reviews section
is already built to take it — nothing gets rebuilt, we just point it at the
API. My advice is to start with the buttons and only pay for the API if you
find people are not clicking through.

### 3.4 Connecting the site to your Google account

Three separate things — see `GOOGLE-SETUP.md` for the step-by-step.

- **Google account email:** ............................
- **Is the Business Profile already claimed and verified?** yes / no / not sure

---

## 4. Photos

**This one is done.** 101 of your photos are on the site, sorted into the four
services, with 25 before-and-after sliders. Every pair was checked to be the
same place before and after, in the right order, with a visible difference.
There is not one stock photo of somebody else's garden anywhere on this site,
and there never should be.

To add more, either use the admin panel (**Photos**, or **Before & after
pairs**), or drop files into `assets/img/gallery/<service>/` — `PHOTOS.md`
covers the naming. Both routes end up in the same place.

One thing worth knowing when you take new ones: a pair only publishes when
both halves exist, so take the "before" shot from a spot you can stand in
again afterwards.

---

## 5. Things worth deciding

**Hours.** The footer currently says "Mon–Sat, daytime, emergency tree
call-outs outside these hours". Correct? ............................

**Do you want a "check my area" postcode box?** Simple to add, useful for
cutting out enquiries from Manchester.

**reCAPTCHA on the forms.** The enquiry and review forms use Google reCAPTCHA
for spam protection, which means those three pages contact Google whether or
not the visitor accepts cookies. That is disclosed plainly in the cookie
policy. It is a defensible position — the form is unusable without it — but if
you would rather avoid Google entirely on those pages, say so and I will swap
it for Netlify's own spam filtering with the honeypot alone. Slightly more
spam, no Google.

---

## 6. What is deliberately not on the site

So you know it is a decision, not an oversight:

- No years in business, no "established" date
- No count of jobs done or customers served
- No star rating or review count
- No awards, accreditations or memberships
- No insurance figures or policy numbers
- No qualification numbers
- No prices or "from £X"
- No address
- No "Blackburn's number one", "Lancashire's best" or "cheapest guaranteed"

The reviews on the reviews page are the ones you collected away from the
website. They are published on your confirmation that they are genuine
customers, and you can take any of them down from the admin panel at any
time.

Every one of those is either unverified or the sort of claim that quietly
undermines the honest content sitting next to it. Send me the real figures and
they go straight on.
