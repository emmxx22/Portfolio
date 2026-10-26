# Emmanuel Odairi — Portfolio Website

A responsive portfolio built with plain HTML, CSS, and JavaScript.

## Files
- `index.html` — page structure and content
- `styles.css` — visual design, responsive layouts, animations
- `script.js` — navigation, scroll reveals, pointer effects, and demo form validation
- `assets/emmanuel-portrait.png` — generated portrait crop used in the design

## Run locally
Open `index.html` in a browser. For a more consistent local experience, run a static server from this folder, for example:
`python -m http.server 8000`
Then visit `http://localhost:8000`.

## Contact form security note
The form is deliberately **demo-only**. It validates fields in the browser but does not send or store messages, authenticate users, or provide server-side protection. Do not treat browser-side validation as security. Before publishing a working form, connect a backend or reputable form service with server-side validation, HTTPS, rate limiting, spam/bot protection, and secrets kept off the client.

## Before publishing
1. Replace the portrait if you want a closer likeness of yourself.
2. Add a public email address and verified project URLs.
3. Review project descriptions and dates for accuracy.
4. Add a CV file if you want the Download CV button (currently omitted in this starter version).
5. Deploy to your chosen hosting and then use the live URL for the reconnaissance assignment.
