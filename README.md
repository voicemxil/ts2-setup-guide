# The Sims 2 Setup Guide

Source for the Sims 2 Setup Guide by osab — modern setup instructions for The Sims 2 Ultimate Collection and Legacy Collection.

Successor to the original Google Docs guide.

## Disclaimer

This project is an **unofficial, fan-made setup guide**. It is **not affiliated with, endorsed by, or sponsored by Electronic Arts Inc. (EA)** or Maxis. "The Sims" and all associated marks are trademarks of Electronic Arts Inc.

**This repository does not contain, distribute, or link to game files or any means of obtaining The Sims 2.** It provides setup instructions, configuration files, and references to community-made fixes and tools for copies of the game that users already own. To play The Sims 2, purchase The Sims 2 Legacy Collection from an official storefront, or use a copy already in your game library.

Requests to add game download sources — in issues, pull requests, or otherwise — will be declined.

## Structure

- `content/*.md` — guide text (Markdown with frontmatter; edit these to change the guide)
- `site/template.html`, `site/style.css` — hand-rolled page shell and design
- `static/` — images and other assets
- `build.mjs` — tiny static site builder (Markdown → HTML)

Custom Markdown blocks:

```
::: track UC          ::: track Legacy       ::: note | tip | warn
content...            content...             content...
:::                   :::                    :::
```

## Building locally

```
npm install
npm run build     # outputs to dist/
npm run serve     # build + local preview server
```

Pushes to `main` deploy automatically to GitHub Pages via `.github/workflows/deploy.yml`.

## Contributing

PRs that fix errors or improve clarity are welcome. Keep the tone simple and skimmable; steps that differ between game versions go in `::: track` blocks.
