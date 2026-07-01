# Backend

This backend is the local CMS/API layer for the Bio Trend site and protected dashboard.

## Dashboard Access

Default admin account:

- Username: `admin`
- Password: `BioTrend@Admin2026`

Admin users can:

- log into the dashboard
- create staff accounts
- update usernames, passwords, and account status
- view per-user usage analytics
- view change history across staff and admin users

Staff users can:

- access the dashboard after login
- edit content, theme, media, analytics settings, and form views
- view submissions

Staff users cannot create or manage other staff accounts.

## API Endpoints

Public:

- `GET /api/health`
- `POST /api/forms/contact`
- `POST /api/forms/project`
- `POST /api/forms/newsletter`
- `GET /dashboard`

Protected:

- `POST /api/auth/login`
- `GET /api/auth/session`
- `POST /api/auth/logout`
- `GET /api/content`
- `GET /api/content/defaults`
- `PUT /api/content`
- `GET /api/settings`
- `GET /api/settings/defaults`
- `PUT /api/settings`
- `GET /api/analytics`
- `POST /api/analytics/event`
- `GET /api/forms/submissions`
- `GET /api/dashboard/schema`

Admin only:

- `GET /api/team/overview`
- `POST /api/team/users`
- `PUT /api/team/users/:id`

## Run

```powershell
npm run backend
```
