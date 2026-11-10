# Dawn Estate

Dawn Estate is a luxury real-estate website focused on properties in Marrakech. The project is split into a Next.js frontend and an Express/MongoDB API. It includes property listings and detail pages, a blog, and authenticated management features for properties and blog posts.

## Project structure

```text
DawnEstate/
├── BackEnd/
│   └── dawn/                  # Express API and MongoDB models
└── FrontEnd/                  # Next.js App Router application
    └── src/
        ├── app/               # Pages and routes
        ├── components/        # UI and management components
        ├── i18n/              # Language context and translations
        ├── redux/             # Application state
        └── services/          # API client functions
```

## Features

- Property browsing, property detail pages, and property submissions.
- Blog listing and detail pages, with authenticated blog management.
- User registration and login, plus password recovery by email OTP.
- Protected management actions using JWT bearer tokens.
- Image uploads stored with Cloudinary.
- English, French, and Arabic translations, including RTL support for Arabic.
- Light and dark themes.
- SEO metadata and sitemap-related routes/configuration.

## Technology

- **Frontend:** Next.js 16, React 19, Redux Toolkit, Axios, Tailwind CSS.
- **Backend:** Node.js, Express 4, Mongoose, MongoDB, JWT, Multer, Cloudinary.
- **Optional AI blog generation:** Gemini API.

## Requirements

- Node.js 24 (the backend declares `24.x`; use the same version for both apps).
- npm.
- A MongoDB database for the backend.
- Cloudinary credentials for image uploads.
- A JWT signing secret for protected API routes.
- A Gemini API key if using AI blog generation.

## Run locally

Install and start each application in a separate terminal.

### Backend

```powershell
Set-Location BackEnd\dawn
npm install
npm run dev
```

The API listens on port `5000`. The available backend scripts are `npm run dev` (nodemon) and `npm start`.

### Frontend

```powershell
Set-Location FrontEnd
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The frontend API client currently uses the deployed API URL (`https://backend-dawn.vercel.app`). To use the local API instead, change the `baseURL` in [`FrontEnd/src/utils/axiosInstance.js`](./FrontEnd/src/utils/axiosInstance.js) to `http://localhost:5000`. The backend CORS allowlist includes `http://localhost:3000` and `https://dawn-estate.vercel.app`; other frontend origins must be added to that allowlist.

## Backend configuration

The backend loads a `.env` file from its current working directory. When running the commands above, create it at `BackEnd/dawn/.env` and set the variables used by the application:

```dotenv
JWT_SECRTKEY=replace-with-a-long-random-secret
MONGODB_URI=mongodb://localhost:27017/dawnestate
COULDINARY_CLOUD_NAME=your-cloudinary-cloud-name
COULDINARY_API_KEY=your-cloudinary-api-key
COULDINARY_API_SECRET=your-cloudinary-api-secret
GEMINI_API_KEY=your-gemini-api-key
BREVO_SMTP_USER=your-brevo-smtp-username
BREVO_SMTP_PASS=your-brevo-smtp-password
```

The `COULDINARY_` and `JWT_SECRTKEY` spellings above match the names currently read by the backend. Gemini is only needed for AI blog creation. SMTP credentials are needed for email-based password recovery.

Copy `BackEnd/dawn/.env.example` to `BackEnd/dawn/.env` and replace the example values. The MongoDB connection string is read from `MONGODB_URI`.

**Before deploying:** do not commit credentials. Credentials previously present in source control should be rotated, even though the current source now reads them from environment variables.

## Main frontend routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/properties` | Property listings |
| `/properties/[id]` | Property details |
| `/add-property` | Property submission |
| `/blog` | Blog listing |
| `/blog/[id]` | Blog article |
| `/dashboard` | Management dashboard |
| `/login` | Sign-in |
| `/contact` | Contact page |
| `/help` | Help page |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |

## API overview

All API routes are mounted on the backend at `http://localhost:5000`.

### Users — `/api/user`

| Method | Path | Access |
| --- | --- | --- |
| `POST` | `/register` | Public |
| `POST` | `/login` | Public |
| `POST` | `/forgot-password` | Public; requests a password-reset OTP |
| `POST` | `/change-email` | Public; requests an email-change OTP |
| `POST` | `/forgot-password/:userId/:OTP` | Public; changes a password after OTP verification |

### Properties — `/api/properties`

| Method | Path | Access |
| --- | --- | --- |
| `GET` | `/` | Public; property slugs for sitemap use |
| `GET` | `/getlastproperties` | Public; latest properties |
| `GET` | `/getproperties` | Public; management property list |
| `GET` | `/getallproperties` | Public; accepted properties |
| `GET` | `/:slug` | Public; property details |
| `POST` | `/add` | JWT required; creates a property with images |
| `POST` | `/delete` | JWT required; rejects a property |
| `POST` | `/acceptproperty` | JWT required; accepts a property |

### Blog — `/api/blog`

| Method | Path | Access |
| --- | --- | --- |
| `GET` | `/` | Public; blog slugs for sitemap use |
| `GET` | `/getlastBlogs` | Public; latest blogs |
| `GET` | `/getblogs` | Public; management blog list |
| `GET` | `/getallblogs` | Public; published blogs |
| `GET` | `/:slug` | Public; blog details |
| `POST` | `/AddBlog` | JWT required; creates a blog post with images |
| `POST` | `/createaiblog` | JWT required; creates an AI-generated blog post |
| `PUT` | `/updateblog/:id` | JWT required; updates a blog post |
| `POST` | `/delete` | JWT required; rejects a blog post |
| `POST` | `/accepctblog` | JWT required; accepts a blog post |

Protected endpoints require an `Authorization` header containing the JWT bearer token returned by login. Image uploads are handled by Multer and uploaded to Cloudinary.

## Checks

From `FrontEnd`, run:

```powershell
npm run lint
npm run build
```

The backend package does not currently define test or lint scripts.

## Deployment notes

The frontend includes an OpenNext Cloudflare configuration, while the backend is a separate Node.js service. Configure the frontend API base URL, backend CORS origins, database connection, and secrets for the target environments before deploying.
