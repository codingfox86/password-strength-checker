# Password Strength Checker (JS)

A minimal dark-themed password strength checker built with HTML, CSS and JavaScript.

_Feel free to use the cat avatar too :D_

## Features

- Live strength evaluation
- Strength meter (progress bar)
- Rule checklist (length, lowercase, uppercase, number, symbol)
- Show / Hide password toggle

## How it works

- On every `input` event, the password is evaluated.
- Regex checks determine which rules are satisfied.
- A simple score is calculated.
- The UI updates dynamically (meter, label, checklist).

## Run locally

```bash
python3 -m http.server 8000

http://localhost:8000
