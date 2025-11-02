# Y-Ultimate Management Platform - Setup Guide

A web platform for managing Ultimate Frisbee tournaments and coaching programs for underprivileged youth.

## Prerequisites

Before you begin, make sure you have installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- A code editor like **VS Code** - [Download here](https://code.visualstudio.com/)

## Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd yultimate-platform
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:

- React + Vite
- Supabase
- Tailwind CSS
- shadcn/ui components
- React Router

## Step 3: Set Up Supabase

### 3.1 Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
   - Choose a project name (e.g., "y-ultimate")
   - Set a database password (save this!)
   - Select a region close to you

### 3.2 Get Your Supabase Credentials

1. In your Supabase dashboard, click **Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy these two values:
   - **Project URL** (starts with `https://`)
   - **anon public key** (long string starting with `eyJ...`)

### 3.3 Set Up Database Tables

1. In Supabase dashboard, click **SQL Editor**
2. Click **New Query**
3. Copy the SQL schema from `database-schema.sql` (ask the project owner for this file)
4. Paste it into the SQL editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

## Step 4: Configure Environment Variables

1. Create a file named `.env.local` in the root folder (same level as `package.json`)

2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**

```env
VITE_SUPABASE_URL=https://abcdefghijklm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG0iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzE2MzIwMCwiZXhwIjoxOTM4NzM5MjAwfQ.XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

⚠️ **Important:** Never commit `.env.local` to Git! It's already in `.gitignore`.

## Step 5: Add Logo Image

1. Save the Y-Ultimate logo as `logo.png`
2. Place it in the `public` folder:
   ```
   yultimate-platform/
   ├── public/
   │   └── logo.png  ← Put logo here
   ```

## Step 6: Run the Development Server

```bash
npm run dev
```

The app will open at: **http://localhost:5173**

## Step 7: Create Your First Account

1. Go to `http://localhost:5173/signup`
2. Fill in the form:
   - Full Name
   - Email
   - Role (Coach/Admin/Manager/Volunteer)
   - Password (minimum 6 characters)
3. Click **Sign Up**
4. Check your email for verification (if enabled)
5. Login at `http://localhost:5173/login`

## Troubleshooting

### "Invalid supabaseUrl" Error

- Make sure `.env.local` exists in the root folder
- Check that `VITE_SUPABASE_URL` starts with `https://`
- Restart the dev server after creating `.env.local`

### Blank White Page

- Open browser console (F12) to check for errors
- Verify Supabase credentials are correct
- Make sure you ran the SQL schema in Supabase

### "Cannot find module" Errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### PostCSS/Tailwind Errors

```bash
# Reinstall Tailwind dependencies
npm install -D tailwindcss@3.4.1 postcss autoprefixer tailwindcss-animate
```

### Port Already in Use

If port 5173 is taken:

```bash
npm run dev -- --port 3000
```

## Project Structure

```
yultimate-platform/
├── public/              # Static files (logo, images)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # shadcn components
│   │   ├── auth/       # Auth-related components
│   │   ├── tournament/ # Tournament components
│   │   └── coaching/   # Coaching components
│   ├── context/        # React context (Auth)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities (Supabase client)
│   ├── pages/          # Page components
│   │   └── auth/       # Login, Signup pages
│   ├── App.jsx         # Main app with routing
│   └── main.jsx        # Entry point
├── .env.local          # Environment variables (DO NOT COMMIT!)
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **Frontend:** React 18, Vite
- **UI:** Tailwind CSS, shadcn/ui
- **Backend:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Routing:** React Router v6

## Need Help?

- Check the [Issues](link-to-issues) page on GitHub
- Contact the project maintainer
- Review Supabase docs: https://supabase.com/docs

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

Built for Y-Ultimate • Open Source • Tech4Good Community
