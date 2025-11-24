# clevelandrocs.net – Site-specific notes

The following customizations are active for this site on top of the upstream al-folio theme:

- Future-dated posts are intentionally published:
  - Local: both `_config.yml` and `_config.dev.yml` set `future: true` so `jekyll build`/`serve` include future posts by default.
  - CI/Production: deploy builds run with `--future` so future posts appear live and in the sitemap.
  - To preview locally without future posts, unset `future: true` in your local config override or run with a config that does not include it.
- Profiles list authored articles: profile pages render an “Articles by [Name]” section by matching the profile title slug to each post’s `author` or items in `authors`.
- Profiles index TOC: the `/profiles/` index is excluded from profile-only widgets to avoid duplicate TOC/content blocks.
- Navigation: “food” and “events” are hidden from the global header, but their pages remain reachable directly via URL.
- Homepage: the hero is a semi-transparent background image with a dark-mode swap; see `_layouts/about.liquid` for the hero block.

Notes for authors:

- When adding posts, set `author: "Full Name"` or `authors: ["Full Name", ...]` where “Full Name” matches the profile page title for proper linkage.
- Keep permalinks consistent with the current articles structure (`/articles/YYYY/MM/DD/Slug/`).
