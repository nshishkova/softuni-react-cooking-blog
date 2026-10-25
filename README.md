# FoodMates

FoodMates is my project for the SoftUni ReactJS Regular Exam 2026.

It's a cooking blog where people share their favorite recipes. You can browse and search recipes without an account. If you sign up, you can post your own recipes, leave comments and save the recipes you like.

**Live demo:** https://foodmates.nshishkovaa.workers.dev/

**GitHub:** https://github.com/nshishkova/softuni-react-cooking-blog

## Try It Out

You can log in with this demo account:

| Email | Password |
|---|---|
| `demo@foodmates.com` | `demo123456` |

Or register your own account. To check that only the author can edit or delete a recipe, open a recipe from the demo account while logged in as a different user.

### Sample recipe

Copy these values into **Share a Recipe** to test creating a recipe. Uncheck "Upload image as file?" to paste the image link.

| Field | Value |
|---|---|
| Recipe title | `Creamy Tomato Pasta` |
| Short description | `A quick weeknight pasta with a rich tomato and cream sauce.` |
| Category | `Dinner` |
| Prep + cook time | `25` |
| Servings | `4` |
| Image URL | `https://www.saltandlavender.com/wp-content/uploads/2020/10/creamy-tomato-pasta-1.jpg` |

**Ingredients** (one per line):

```text
300 g pasta
2 tbsp olive oil
2 cloves garlic
400 g canned tomatoes
100 ml cream
Salt and pepper
Fresh basil
```

**Instructions** (one step per line):

```text
Cook the pasta in salted water until al dente.
Warm the olive oil in a pan and fry the garlic for 1 minute.
Add the tomatoes and simmer for 10 minutes.
Stir in the cream and season with salt and pepper.
Mix the sauce with the pasta and top with fresh basil.
```

## Built With

- React 19 and React Router
- Vite
- Supabase (database, login and image storage)
- React Toastify (pop-up messages)
- Plain CSS
- Cloudflare Workers (hosting)

---

# How to Run It

1. Clone the project and open the folder:

   ```bash
   git clone https://github.com/nshishkova/softuni-react-cooking-blog.git
   cd softuni-react-cooking-blog
   ```

2. Install the packages:

   ```bash
   npm install
   ```

3. Add the Supabase key. The repository has a `.env` file with a placeholder. Create a `.env.local` file next to it with the real key:

   ```env
   VITE_API_KEY=your_supabase_anon_key
   ```

   Vite reads `.env.local` after `.env`, so the real key replaces the placeholder. `.env.local` is never committed to Git.

4. Start the app:

   ```bash
   npm run dev
   ```

   Then open http://localhost:5173

Other useful commands:

| Command | What it does |
|---|---|
| `npm run lint` | Checks the code with ESLint |
| `npm run build` | Makes a production build |
| `npm run preview` | Builds and runs the production version locally |
| `npm run deploy` | Builds and publishes the site to Cloudflare |

---

# Functional Guide

## 1. Project Overview

**Application Name:** FoodMates

**Category / Topic:** Blog System – cooking recipes

**Main Purpose:**
FoodMates is a place where home cooks can find simple recipes and share their own. Each recipe has a photo, a list of ingredients and step-by-step instructions. Anyone can read the recipes, and people with an account can post recipes, comment and keep a list of favorites.

---

## 2. User Access & Permissions

### Guest (Not Authenticated)

- **Pages:** Home, Recipes, Recipe Details, About, Login and Register
- **What they can see:** all recipes with their details and comments. They can also use the search.

### Authenticated User

- **Pages:** everything a guest sees, plus **Share a Recipe** and **My Profile**. The profile shows the recipes you posted and the recipes you saved.
- **Details page:** logged-in users can save the recipe and write a comment. If you're the author, you also see **Edit** and **Delete**.
- **Create / Edit / Delete:** anyone logged in can post a recipe, but only the author can edit or delete it. The same goes for comments: you can only delete your own.

---

## 3. Authentication & Session Handling

### Authentication Flow

- **When the app loads:** it checks `localStorage` for a saved login. If there is one, you're logged in straight away.
- **How the app knows you're logged in:** the login data lives in `AuthContext`. Any component can ask "is someone logged in?" through the `useAuth` hook. The header uses it to show the right buttons, and the route guards use it to allow or block pages.
- **After login or register:** Supabase sends back a token and the user's data. The app saves them and takes you to the Home page. When you register, your display name is saved too, and it's shown as the author on your recipes and comments.
- **On logout:** the app tells Supabase to end the session, deletes the saved login and takes you back to Home.

### Session Persistence

- **Where the session is stored:** in `localStorage`, using my own hook `usePersistedState`. It works like `useState`, but it also saves the value in the browser.
- **After a page refresh:** the hook reads the saved login when the app starts, so you stay logged in.

> **Note:** The Supabase token is valid for about one hour. If something stops working after a long session, just log out and log in again.

---

## 4. Routing Structure

### Route Guards Logic

I use two small guard components:

- **`AuthGuard`** protects the pages that need an account: Share a Recipe, Edit Recipe, My Profile and Logout. If a guest opens one of them, they're sent to Login with a short message like *"Please log in to share a recipe."*
- **`GuestGuard`** protects Login and Register. If you're already logged in, you're sent to Home.

On top of that, the Edit page checks that you're the author of the recipe.

### Main Routes

There are 11 routes in total:

| Route | Page | Who can open it |
|---|---|---|
| `/` | Home | Everyone |
| `/recipes` | Recipes (catalog) | Everyone |
| `/recipes/:recipeId` | Recipe Details | Everyone |
| `/about` | About | Everyone |
| `/recipes/create` | Share a Recipe | Logged-in users |
| `/recipes/:recipeId/edit` | Edit Recipe | The author |
| `/profile` | My Profile | Logged-in users |
| `/logout` | Logout | Logged-in users |
| `/login` | Login | Guests |
| `/register` | Register | Guests |
| `*` | 404 page | Everyone |

### Nested & Parameterized Routes

- **Nested routing:** yes. The two guards are layout routes, and the protected pages are their child routes. The guard shows the page with `<Outlet />` or redirects.
- **Routes with URL parameters:** `/recipes/:recipeId` and `/recipes/:recipeId/edit`

---

## 5. List → Details Flow

### Catalog / List Page

- **What's shown:** all recipes, newest first. Each card has the photo, category, cooking time, title, a short description and the author's name.
- **How you interact with it:** there's a search box. As you type, the list is filtered by recipe name or category.

### Details Page

- **How you get there:** you click a recipe card, which is a `<Link>` to `/recipes/:recipeId`. After some actions the app moves you with `useNavigate`; for example, after posting a recipe it opens the new recipe.
- **What comes from the URL:** the recipe id. The page reads it with `useParams` and uses it to load the recipe and its comments.

---

## 6. Data Source & Backend

### Backend Type

I use **Supabase**, a hosted backend. The app talks to it through its REST API with `fetch`.

- **Database:** three tables: `recipes`, `comments` and `saved_recipes`
- **Login:** Supabase Auth with email and password
- **Images:** stored in a Supabase Storage bucket called `images`
- **Security:** Row Level Security is turned on for all three tables, so the database itself checks who is allowed to change what

Because Supabase is already online, there's no separate server to deploy, and the data stays there between visits.

---

## 7. Data Operations (CRUD)

The main collection is **recipes**. Only the author can edit or delete a recipe. The app hides the buttons from everyone else, and Supabase blocks the request anyway if someone tries.

### Create (POST)

- **How:** on **Share a Recipe** you fill in the title, description, category, cooking time, servings, ingredients, instructions and a photo. The photo can be uploaded or pasted as a link, and you see a preview before posting. After you publish, the app opens your new recipe.

### Read (GET)

- **Where:** the catalog shows all recipes, the details page shows one recipe with its comments, and My Profile shows your own and your saved recipes.

### Update (PUT/PATCH)

- **How:** the author clicks **Edit** on the recipe. The form opens already filled in, so you only change what you need. You can keep the old photo or choose a new one.
- **What you see afterwards:** a "Recipe updated" message, and you're taken back to the recipe with the new details.

### Delete

- **How:** the author clicks **Delete** and confirms in a pop-up window.
- **What you see afterwards:** a "Recipe deleted" message, and you're taken to the catalog, where the recipe is gone.

Besides recipes, logged-in users can **comment** (and delete their own comments) and **save** recipes to their profile. New comments show up right away, without reloading the page.

---

## 8. Forms & Validation

### Forms Used

- Register
- Login
- Share a Recipe
- Edit Recipe
- Add Comment
- Search

### Validation Rules

- **Display name:** required, 2 to 30 characters
- **Password:** at least 6 characters, and both password fields must match
- **Recipe title:** required, 3 to 60 characters
- **Cooking time:** a whole number from 1 to 1440 minutes
- **Recipe photo** (several rules): an uploaded file must be an image and no bigger than 5 MB; a link must start with `http://` or `https://`
- **Comment:** can't be empty, maximum 1000 characters

I also check the email format, that the description has at least 10 characters, that a category is chosen, that servings are between 1 and 50, and that ingredients and instructions aren't empty.

If something is wrong, nothing is sent. The problem is shown under the field or in a pop-up message.

---

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

- **Hooks I use:**
  - `useState`: form values, loading and error states on every page
  - `useEffect`: loading data for the catalog, the details page, the profile and the comments
  - `useContext`: reading the login data and the comments
  - `useReducer`: managing the list of comments
  - `useParams`: reading the recipe id on the details and edit pages
  - `useNavigate`: moving the user after login, posting, editing and deleting
  - `useLocation`: choosing the right "please log in" message in the guard
  - My own hooks: `useAuth` (gets the login data) and `usePersistedState` (state that's saved in the browser)
- **Mount / update / unmount example:** the details page loads the recipe when it opens (mount), loads it again if the recipe id in the URL changes (update), and ignores the answer if you leave the page before it arrives (unmount):

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

- **`AuthContext`** shares who is logged in, plus the register, login and logout functions. It's used almost everywhere: the header, the guards, the forms, the details page, the profile and the comments.
- **`CommentContext`** shares the comments of the open recipe, so when you post a comment the list updates straight away.

### Component Styling

- I use regular CSS files in `public/styles` (`style.css`, `navigation.css`, `details.css`, `comments.css`, `modal.css`, `not-found.css`), linked in `index.html`. Colors and fonts are set once as CSS variables, so every page looks the same.

---

## 10. Typical User Flow

1. A visitor opens FoodMates, looks through the recipes and searches for something to cook.
2. They open a recipe and read the ingredients, steps and comments.
3. They sign up and share a recipe of their own with a photo.
4. They comment on someone else's recipe and save it.
5. They open My Profile to see their recipes and saved ones, then log out.

---

## 11. Error & Edge Case Handling

- **Login and register errors:** the forms are checked before anything is sent. If Supabase says no (for example, wrong password), the message is shown in a pop-up. Guests can't open private pages, and logged-in users can't open Login or Register.
- **Network or data errors:** while data is loading you see a loading message. If a request fails, you see a friendly error message instead of a broken page. The Publish, Save changes, Save recipe and Delete buttons are disabled while their request is running, so they can't be clicked twice.
- **Empty or missing data:** there are messages for "no recipes yet", "no search results", "no comments yet" and an empty profile. A wrong URL or a recipe that doesn't exist shows a custom 404 page.

---

# Deployment

- **Frontend:** Cloudflare Workers – https://foodmates.nshishkovaa.workers.dev/
- **Backend:** Supabase (already hosted, nothing extra to deploy)

---

# Architecture

## Overview

FoodMates is a single-page React app. Everything it needs comes from Supabase:

```text
React app  ──fetch──▶  Supabase
                        ├── Auth      (accounts and login)
                        ├── Database  (recipes, comments, saved_recipes)
                        └── Storage   (recipe photos)
```

## Folders

```text
src/
├── api/          Functions that talk to Supabase (auth, recipes, comments, saved recipes)
├── components/   One folder per page or component (catalog, recipe-details, header, guards, ...)
├── contexts/     AuthContext and CommentContext
├── hooks/        useAuth and usePersistedState
├── utils/        The shared request function and the form validation
├── App.jsx       All the routes
└── main.jsx      Starts the app

public/
├── styles/       CSS files
└── icons/        Logo and icons
```

## How the Parts Work Together

- **Components** show the pages. Page components load their own data; small components like the recipe card get their data through props.
- **The `api` folder** is the only place that talks to Supabase. Components call simple functions like `recipeApi.getAll()` instead of writing `fetch` themselves.
- **One shared request function** (`utils/request.js`) adds the API key and the login token to every request and turns Supabase errors into readable messages.
- **State:** the login lives in `AuthContext` (and in `localStorage`), the comments of the open recipe live in `CommentContext`, and everything else (form values, loading, errors) stays inside the page that uses it.
- **Validation** lives in `utils`, so the Share and Edit forms use exactly the same rules.

## Data Model

```text
recipes        id, title, description, category, prepTime, servings,
               imageUrl, ingredients, instructions, author, user_id, created_at

comments       id, text, author, recipe_id, user_id, created_at

saved_recipes  id, recipe_id, user_id, created_at
```

`user_id` links each row to the person who created it, and `recipe_id` links comments and saved recipes to their recipe.

---

# Credits

The design of the app (layout, colors and styles) was created with the help of Claude and ChatGPT.
