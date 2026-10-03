# Brightside AI site

Static site (HTML, CSS, JS). No build step. Hosted on GitHub Pages.

## Contact form (Web3Forms)

The Contact section posts to [Web3Forms](https://web3forms.com) with `fetch`. There is no backend, and no email address appears on the page.

- **Access key:** one constant at the top of `script.js`:

  ```js
  const WEB3FORMS_ACCESS_KEY = "your-access-key";
  ```

  Web3Forms access keys are public by design, so it is fine for the key to be in the page source.
- **Where messages go:** the destination inbox is set in your Web3Forms account, not in this repo. To change the inbox, create a new access key for the new address at web3forms.com and paste it into the constant above (or change the address for the existing key in the Web3Forms dashboard).
- **Subject line:** the hidden `subject` field in `index.html` ("New inquiry from Brightside AI website").
- **Spam protection:** a hidden `botcheck` checkbox (honeypot) is included in the form.
- **Fields:** name, email and message are required. The form shows "Sending..." while in flight, then a confirmation or a calm error message (typed text is kept on error).
