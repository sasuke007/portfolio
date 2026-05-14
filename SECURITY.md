# Security Policy

## Reporting a vulnerability

If you discover a security issue in this repository — whether in the application code, the build pipeline, the API route handlers, or how secrets are handled — **please do not open a public GitHub issue.** Public disclosure before a fix is in place puts users at risk.

Instead, email **pandit.rohit0007@gmail.com** with:

- A clear description of the issue
- Steps to reproduce, or a minimal proof-of-concept
- The version / commit SHA where you observed it
- Your assessment of the impact (data exposure, RCE, XSS, leaked credential, etc.)
- Optionally, a suggested fix

You'll get an acknowledgement within **3 working days**. From there:

| Step | Target |
| ---- | ------ |
| Triage and confirm | within 5 working days |
| Fix in private branch | within 14 days for high-severity issues |
| Public disclosure + credit | after the fix is deployed |

If you'd prefer end-to-end encrypted communication, mention that in your first email and I'll share a PGP key.

## Scope

In-scope:

- Application code in this repository (`app/`, `src/`, `public/`)
- API route handlers (`app/api/*`)
- Configuration that affects security posture (Next config, build pipeline, env handling)
- Dependencies pinned by `pnpm-lock.yaml` *only* when the issue is reachable through this codebase

Out of scope:

- Issues affecting only third-party services (report to Spotify / X / GitHub directly)
- Social engineering, physical access, or attacks requiring privileged access to the maintainer's accounts
- Best-practice suggestions without a concrete vulnerability (open a regular issue instead)

## Safe-harbor commitment

Good-faith security research conducted within the scope above will not be met with legal action. If you stay within these limits and report responsibly, you're welcome here.

## Credits

Reporters who responsibly disclose valid vulnerabilities will be credited in the relevant commit message and release notes (unless they prefer to stay anonymous).
