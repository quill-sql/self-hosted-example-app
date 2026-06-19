# Example GitHub Action: Quill Promote

This folder contains an example workflow that installs the [`@quillsql/cli`](https://www.npmjs.com/package/@quillsql/cli) package globally and runs:

```bash
quill promote --force-sync-to-parent-environment --confirm
```

## Setup

1. Copy `.github/workflows/quill-promote.yml` into your repository's `.github/workflows/` directory (at the repo root).
2. Add these [repository secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions):

| Secret | Description |
|--------|-------------|
| `QUILL_CLIENT_ID` | Environment client ID |
| `QUILL_API_TOKEN` | API authentication token |

3. Run the workflow manually from the **Actions** tab (`workflow_dispatch`).

## Configuration

The workflow writes `.quill/config.json` in the working directory before running promote:

```json
{
  "token": "<QUILL_API_TOKEN>",
  "clientId": "<QUILL_CLIENT_ID>",
  "enableAdminCommands": true
}
```

`enableAdminCommands` must be `true` for the `promote` command to be available.
