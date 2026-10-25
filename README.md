# FoodMates

FoodMates is my React project for the SoftUni ReactJS Regular Exam 2026.

The project is a cooking blog where home cooks share their favorite recipes. Visitors can browse recipes by name or category and read the ingredients, instructions and comments. Registered users can share their own recipes, comment on recipes and save the ones they like to their profile.

## Live Demo

https://foodmates.nshishkovaa.workers.dev/

## GitHub Repository

https://github.com/nshishkova/softuni-react-cooking-blog

## Technologies

- React 19
- JavaScript
- React Router
- Vite
- Supabase (REST API)
- PostgreSQL
- Supabase Authentication
- Supabase Storage
- React Toastify
- CSS
- ESLint
- Cloudflare Workers (hosting)

## Project Structure

The project is separated into components, API services, contexts, hooks, utilities and CSS files.

```text
src/
├── api/            Requests to Supabase (auth, recipes, comments, saved recipes)
├── components/     Pages and UI components
├── contexts/       AuthContext and CommentContext
├── hooks/          Custom hooks (useAuth, usePersistedState)
├── utils/          Base request function and form validation
├── App.jsx         Routes
└── main.jsx        Entry point

public/
├── styles/         External CSS files
└── icons/          Logo and icons
```

The components contain the UI and page logic.

The API files contain the Supabase requests for authentication, recipes, comments, saved recipes and images.

Authentication state is shared through `AuthContext`.

More information about the project structure can be found in the [Architecture](#architecture) section below.

---

# Run the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/nshishkova/softuni-react-cooking-blog.git
```

## 2. Open the project folder

```bash
cd softuni-react-cooking-blog
```

## 3. Install the dependencies

```bash
npm install
```

## 4. Configure the environment variables

The repository contains a `.env` file with a placeholder for the required variable.

Create a `.env.local` file in the root folder and add your Supabase anon key:

```env
VITE_API_KEY=your_supabase_anon_key
```

Vite loads `.env.local` after `.env`, so the real key overrides the placeholder. `.env.local` is ignored by Git and is never committed.

## 5. Start the development server

```bash
npm run dev
```

The application runs on http://localhost:5173

## Other Commands

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Build and preview the production version locally with Wrangler:

```bash
npm run preview
```

Build and deploy to Cloudflare Workers:

```bash
npm run deploy
```

---

# Functional Guide

## 1. Project Overview

**Application Name:** FoodMates

**Application Category / Topic:** Blog System / Cooking Recipes

**Main Purpose:**

FoodMates is a recipe-sharing blog for everyday home cooks. It gives them one place to find simple recipes and to share their own dishes with photos, ingredients and step-by-step instructions. Visitors can browse and search recipes, and registered users can publish recipes, comment on them and save their favorites.

---

## 2. User Access & Permissions

### Guest (Not Authenticated)

- **Available pages / routes:** Home (`/`), Recipes Catalog (`/recipes`), Recipe Details (`/recipes/:recipeId`), About (`/about`), Login (`/login`), Register (`/register`)
- **Public data shown:** all recipes (image, title, category, preparation time, description, author, ingredients, instructions) and the comments on each recipe

### Authenticated User

- **Main sections / pages:** all public pages, plus Share a Recipe (`/recipes/create`) and My Profile (`/profile`) with the user's own and saved recipes
- **Details pages:** Recipe Details, where logged-in users can also save the recipe and add comments. The author of the recipe also sees Edit and Delete buttons.
- **Create / Edit / Delete actions:** create recipes; edit and delete only their own recipes; add comments and delete only their own comments

---

## 3. Authentication & Session Handling

### Authentication Flow

- **What happens when the app loads:** `AuthProvider` reads the saved session from `localStorage`. If one exists, the user is logged in immediately.
- **How authentication status is checked:** `AuthContext` provides `isAuthenticated` (true when a session exists). Components read it through the `useAuth` hook, for example the Header to show the right buttons and the route guards to allow or block pages.
- **What happens on successful login or registration:** the Supabase Auth API returns the session (access token and user data). It is saved in `localStorage` and in the context, and the user is redirected to the Home page. On registration, the display name is stored in the user's metadata and is later used as the author name.
- **What happens on logout:** the Supabase logout endpoint is called, the session is removed from `localStorage` and the context, and the user is redirected to the Home page.

### Session Persistence

- **How is the user session stored?** In `localStorage` (key `auth`), through the custom `usePersistedState` hook, and shared across the app with `AuthContext`. The access token is added automatically to every request to Supabase.
- **How is automatic login handled after a page refresh?** `usePersistedState` reads the saved session from `localStorage` when the app starts, so the user stays logged in after a refresh.

**Note:** The Supabase access token expires after about one hour. If requests start failing after a long session, log out and log in again.

---

## 4. Routing Structure

### Route Guards Logic

- **How is routing split between guest-only and private routes?**
  - `AuthGuard` protects `/recipes/create`, `/recipes/:recipeId/edit`, `/profile` and `/logout`. Guests are redirected to `/login` with a message such as "Please log in to share a recipe."
  - `GuestGuard` protects `/login` and `/register`. Logged-in users are redirected to `/`.
  - The Edit page also checks that the logged-in user is the author of the recipe.

### Main Routes

- **Number and type of top-level pages:** 11 routes

```text
Public        /                          Home
              /recipes                   Recipes Catalog
              /recipes/:recipeId         Recipe Details
              /about                     About

Private       /recipes/create            Create Recipe
              /recipes/:recipeId/edit    Edit Recipe
              /profile                   Profile
              /logout                    Logout

Guest-only    /login                     Login
              /register                  Register

Fallback      *                          Not Found (404)
```

### Nested & Parameterized Routes

- **Is there nested routing?** Yes. `AuthGuard` and `GuestGuard` are layout routes, and the private and guest-only pages are nested inside them as child routes, rendered with `<Outlet />`.
- **Which routes use URL parameters?** `/recipes/:recipeId` and `/recipes/:recipeId/edit`

---

## 5. List → Details Flow

### Catalog / List Page

- **What data is displayed?** All recipes from Supabase, newest first. Each card shows the image, category, preparation time, title, short description and author.
- **How does the user interact with the list?** A search box filters the recipes by name or category while the user types.

### Details Page

- **How is navigation triggered?** With `<Link>`: clicking the image or title of a recipe card opens `/recipes/:recipeId`. `useNavigate` is used after actions, for example to open the new recipe after creating it.
- **What data is received via route parameters?** The `recipeId`, read with `useParams` and used to load the recipe, its comments and its saved status from Supabase.

---

## 6. Data Source & Backend

### Backend Type

- **Real backend:** Supabase (Backend-as-a-Service), accessed through its REST API with `fetch`
  - **Database (PostgreSQL):** tables `recipes`, `comments` and `saved_recipes`
  - **Authentication:** email and password with Supabase Auth
  - **Storage:** public bucket `images` for recipe photos

Supabase is hosted, so no separate backend deployment is needed and the data persists between visits.

---

## 7. Data Operations (CRUD)

The CRUD collection is `recipes`.

### Create (POST)

- **How does the user create new data?** A logged-in user opens Share a Recipe and fills in title, description, category, preparation time, servings, image (file upload or URL, with preview), ingredients and instructions. Uploaded images go to Supabase Storage. The recipe is saved with the author's `user_id` and name, and the user is redirected to the new recipe.

### Read (GET)

- **Where is data fetched and displayed?** In the Catalog (all recipes), on Recipe Details (one recipe with its comments) and on the Profile page (the user's own and saved recipes).

### Update (PUT/PATCH)

- **How does the author edit an existing record?** The author clicks Edit on the details page. The form opens with the current data, and the author can change the text fields and keep the current image or choose a new one.
- **How is the UI updated after the change?** A success message appears and the user is redirected to the details page, which loads the updated recipe.

### Delete

- **How does the author delete an existing record?** The author clicks Delete on the details page and confirms in a modal window.
- **How is the UI updated after the change?** A success message appears and the user is redirected to the Catalog, which no longer shows the recipe.

Comments (create, delete own) and saved recipes (save, unsave) are also stored in Supabase. New and deleted comments appear immediately without reloading the page.

---

## 8. Forms & Validation

### Forms Used

- Register
- Login
- Create Recipe
- Edit Recipe
- Add Comment
- Catalog Search

### Validation Rules

- **Display name (Register):** required, between 2 and 30 characters
- **Password (Register):** at least 6 characters, and Confirm Password must match
- **Recipe title:** required, between 3 and 60 characters
- **Preparation time:** whole number between 1 and 1440 minutes
- **Recipe image** (multiple rules): an uploaded file must be an image and at most 5 MB; an image URL must start with `http://` or `https://`
- **Comment:** cannot be empty, maximum 1000 characters

Other validated fields: email format, description (at least 10 characters), category (must be selected), servings (1–50), ingredients and instructions (required).

Invalid data is never sent to the server. Errors are shown under the fields or as toast messages.

---

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

- **Which hooks are used, and where?**
  - `useState`: form values, loading and error states in all pages
  - `useEffect`: loading data in Catalog, Recipe Details, Profile and the comment list
  - `useContext`: reading `AuthContext` and `CommentContext`
  - `useReducer`: the comment list in `CommentProvider`
  - `useParams`: Recipe Details and Edit Recipe
  - `useNavigate`: redirects after login, create, edit and delete
  - `useLocation`: `AuthGuard`, to choose the login message
  - Custom hooks: `useAuth` (reads `AuthContext`) and `usePersistedState` (state saved in `localStorage`)
- **Example of mount / update / unmount behavior:** Recipe Details loads the recipe when it **mounts**, loads it again when `recipeId` in the URL **updates**, and ignores a late response if the page **unmounts** before it arrives:

```js
useEffect(() => {
  let isActive = true;

  recipeApi.getOne(recipeId)
    .then((result) => {
      if (isActive) {
        setRecipe(result);
      }
    });

  return () => {
    isActive = false;
  };
}, [recipeId]);
```

### Context API

- **What state/data is shared through Context, and which components consume it?**
  - `AuthContext` shares the current user, access token, `isAuthenticated`, and the `register`, `login` and `logout` functions. It is used by the Header, `AuthGuard`, `GuestGuard`, Login, Register, Logout, Create, Edit, Recipe Details, Profile and the comment components.
  - `CommentContext` shares the comments of the open recipe between the comment list and the comment form.

### Component Styling

- **How are components styled?** With external CSS files in `public/styles` (`style.css`, `navigation.css`, `details.css`, `comments.css`, `modal.css`, `not-found.css`), linked in `index.html`. Colors and fonts are defined once as CSS variables.

---

## 10. Typical User Flow

1. The user opens FoodMates, browses the catalog and searches for a recipe.
2. The user opens a recipe and reads the ingredients, instructions and comments.
3. The user registers or logs in.
4. The user shares a new recipe with a photo.
5. The user comments on another recipe and saves it.
6. The user opens My Profile to see their own and saved recipes, then logs out.

---

## 11. Error & Edge Case Handling

- **Authentication errors:** register and login data is validated before sending. Errors from Supabase, such as wrong email or password, are shown as toast messages. Guests are redirected away from private pages, and logged-in users away from Login and Register.
- **Network or data errors:** all requests go through one request function that turns Supabase errors into readable messages. Pages show loading states while data is requested, and failed requests show an error message instead of crashing. Submit buttons are disabled while a request is running.
- **Empty or missing data states:** messages are shown for an empty catalog, no search results, no comments, and no own or saved recipes on the Profile page. Unknown routes and invalid or missing recipes show the custom 404 page.

---

# Deployment

The frontend is deployed with Cloudflare Workers:

https://foodmates.nshishkovaa.workers.dev/

The backend is hosted by Supabase.

No separate custom backend server deployment is required because the project uses Supabase as a hosted Backend-as-a-Service.

---

# Architecture

## Overview

FoodMates is a Single Page Application built with React and Vite.

```text
Browser (React SPA)  ──fetch──▶  Supabase REST API
                                  ├── Auth      (users, sessions)
                                  ├── Database  (recipes, comments, saved_recipes)
                                  └── Storage   (images bucket)
```

- **Frontend:** React, React Router, deployed to Cloudflare Workers as static files
- **Backend:** Supabase (PostgreSQL database, authentication and file storage)
- **Communication:** REST requests with `fetch`

## Folder Structure

```text
src/
├── api/
│   ├── auth-api.js          Register, login, logout
│   ├── recipe-api.js        Recipes CRUD
│   ├── comment-api.js       Get, create and delete comments
│   ├── saved-api.js         Save, unsave and list saved recipes
│   └── index.js             Exports all API modules
├── components/
│   ├── about/               About page
│   ├── catalog/             Recipe list with search
│   ├── confirm-modal/       Reusable confirmation dialog
│   ├── create-comment/      Comment form
│   ├── footer/              Footer
│   ├── guards/              AuthGuard and GuestGuard
│   ├── header/              Navigation
│   ├── home/                Home page
│   ├── list-comment/        Comment list, comment item, comment reducer
│   ├── login/               Login page
│   ├── logout/              Logout route
│   ├── not-found/           404 page
│   ├── profile/             Own and saved recipes
│   ├── recipe-card/         Recipe card used in lists
│   ├── recipe-create/       Create recipe form
│   ├── recipe-details/      Recipe details page
│   ├── recipe-edit/         Edit recipe form
│   └── register/            Register page
├── contexts/
│   ├── auth-context.jsx     AuthContext and AuthProvider
│   └── comment-context.jsx  CommentContext and CommentProvider
├── hooks/
│   ├── useAuth.js           Reads AuthContext
│   └── usePersistedState.js useState saved in localStorage
├── utils/
│   ├── request.js           Base request function for Supabase
│   ├── recipe-form.js       Recipe validation and categories
│   └── auth-form.js         Register validation
├── App.jsx                  Route definitions
└── main.jsx                 Entry point with BrowserRouter
```

## Layers

### Components

Each component lives in its own folder. Page components (Catalog, RecipeDetails, RecipeCreate, ...) hold the page state and call the API layer. Smaller components (RecipeCard, ItemComment, ConfirmModal, NotFound) receive their data through props.

### API Layer

Components never call `fetch` directly. They use the functions in `src/api`, for example `recipeApi.getAll()` or `commentApi.create(data)`.

All API functions use the shared helpers in `src/utils/request.js`:

- `request` - database requests (`/rest/v1`)
- `authRequest` - authentication requests (`/auth/v1`)
- `storageRequest` - image uploads to the `images` bucket
- `getImageUrl` - public URL of an image in the bucket

The base request function adds the Supabase API key and the user's access token to every request, and turns Supabase errors into readable error messages.

### State Management

| State | Where | Shared with |
|---|---|---|
| Logged-in user and token | `AuthContext` + `usePersistedState` (localStorage) | Whole app |
| Comments of the open recipe | `CommentContext` + `useReducer` | Comment list and comment form |
| Page data, form values, loading and error states | `useState` inside each page | That page only |

### Validation

Form validation is kept in `src/utils` so it can be reused:

- `validateRecipe` is used by both Create and Edit
- `validateRegister` is used by Register

Invalid data is stopped before any request is sent.

## Data Model

```text
recipes
├── id            uuid
├── title         text
├── description   text
├── category      text
├── prepTime      number
├── servings      number
├── imageUrl      text
├── ingredients   text (one per line)
├── instructions  text (one step per line)
├── author        text (display name)
├── user_id       uuid  → author of the recipe
└── created_at    timestamp

comments
├── id, text, author, created_at
├── recipe_id     uuid  → recipes.id
└── user_id       uuid  → author of the comment

saved_recipes
├── id, created_at
├── recipe_id     uuid  → recipes.id
└── user_id       uuid  → user who saved it
```
