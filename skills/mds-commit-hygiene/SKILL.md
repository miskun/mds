---
name: mds-commit-hygiene
description: Prepare clean MDS commits with concise messages that state what changed without rationale, planning notes, or unrelated references.
---

# MDS Commit Hygiene

Use this skill before creating a git commit in the MDS repository.

## Commit Review

Before committing:

- Check the working tree with `git status --short`.
- Review staged and unstaged changes with `git diff --stat` and targeted `git diff` reads.
- Confirm generated build output is intentional before staging it.
- Run a source hygiene sweep when comments or docs changed.
- Run the relevant verification command for the changed surface.
- Run `npm run build:lib` for commit-ready component or style changes that a sibling consumer may use through the MDS package entry.

## Message Style

Commit messages should be short and literal.

Use an imperative subject:

```text
Add target-aware table components
```

Good subjects:

- `Add token documentation stories`
- `Split MDS stylesheet sources`
- `Fix target toolbar alignment`
- `Add commit hygiene skills`

Avoid:

- long rationale
- planning history
- references to unrelated design systems or projects
- AI/tool mentions
- AI attribution footers such as `Generated with ...`
- AI co-author footers
- explanations of why the approach was chosen
- multi-paragraph commit bodies unless the change truly needs migration notes

## Final Check

Prefer a one-line commit for normal MDS work. Add a body only for breaking API changes, migrations, or operational instructions a future maintainer must see in `git log`.

Do not add attribution trailers unless the user explicitly asks for them.
