# Luqman-final-version

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-jsdlyzy4)

## Backend-ready content wiring

The project now reads content through `src/lib/content-service.ts` with automatic fallback to local mock data.

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_API_BASE_URL`.
   - Keep `NEXT_PUBLIC_USE_FALLBACK_DATA=false` for backend-only mode.
3. Update optional endpoint paths if needed:
   - `NEXT_PUBLIC_PROPERTIES_ENDPOINT`
   - `NEXT_PUBLIC_PROJECTS_ENDPOINT`
   - `NEXT_PUBLIC_BLOG_ENDPOINT`
   - `NEXT_PUBLIC_SETTINGS_CITIES_ENDPOINT`
   - `NEXT_PUBLIC_SETTINGS_FEATURES_ENDPOINT`
   - `NEXT_PUBLIC_CONTACT_ENDPOINT`
   - `NEXT_PUBLIC_CONTACT_PROPERTY_ENDPOINT`
   - `NEXT_PUBLIC_CONTACT_PROJECT_ENDPOINT`

Expected response shapes for each endpoint:
- Raw array: `[{...}]`
- Wrapped array: `{ data: [{...}] }`
- Wrapped array: `{ items: [{...}] }`
- Wrapped array: `{ results: [{...}] }`

Notes:
- Property/project detail pages support both `slug` and `id` route values.
- Cities filters now prefer `settings/cities` endpoint and fallback to extracted cities from content.
- Contact form auto-routes submissions to:
  - general contact endpoint
  - property contact endpoint (when opened from property details)
  - project contact endpoint (when opened from project details)
- Static fallback data is disabled by default. Enable only if needed with `NEXT_PUBLIC_USE_FALLBACK_DATA=true`.
