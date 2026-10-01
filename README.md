# Brightside AI site

Static site (HTML, CSS, JS). No build step. Hosted on GitHub Pages.

## Set the contact email

Edit **one line** in `script.js`:

```js
const CONTACT_EMAIL = "you@yourdomain.com";
```

While it is still the placeholder value, the page shows "Email details coming soon" and hides the email links and the inquiry form. Once you set a real address, the email links, footer link and inquiry form appear automatically (the form opens the visitor's email app via `mailto:`). You do not need to edit `index.html`.

## Other settings (in `script.js`)

- `BOOKING_LINK`: where the "Book a free 20-minute discovery call" buttons go (currently `#contact`). Replace with a scheduling URL when you have one.
- `BUSINESS_NAME`: used in the inquiry email subject.
