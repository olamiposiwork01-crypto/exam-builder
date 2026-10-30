# Exam Builder Deployment Guide

Complete guide to deploy your Exam Builder application to production using Supabase and Vercel.

## Prerequisites

- GitHub account
- Vercel account
- Supabase account
- Google Cloud Console account (for OAuth)

---

## Part 1: Create Supabase Project

### Step 1: Sign Up/Login to Supabase
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign In"
3. Sign in with GitHub (recommended)

### Step 2: Create New Project
1. Click "New Project"
2. Fill in the details:
   - **Name**: `exam-builder` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Start with Free tier
3. Click "Create new project"
4. Wait 2-3 minutes for project setup

### Step 3: Get Supabase Credentials
1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the sidebar
3. Copy these values (you'll need them later):
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGc...
   service_role key: eyJhbGc... (keep this secret!)
   ```

### Step 4: Set Up Database Tables
1. Go to **SQL Editor** in the sidebar
2. Click **New Query**
3. Copy the entire content from `supabase/migrations/001_create_tables.sql`
4. Paste it into the SQL editor
5. Click **Run** (bottom right)
6. You should see "Success. No rows returned"

### Step 5: Configure Authentication
1. Go to **Authentication** > **Providers** in sidebar
2. Enable **Email** provider:
   - Toggle "Enable Email provider" ON
   - Toggle "Confirm email" ON (recommended)
   - Save changes

3. Enable **Google** provider:
   - Toggle "Enable Google provider" ON
   - Leave it for now (we'll add credentials after setting up Google Console)
   - Save changes

---

## Part 2: Set Up Google OAuth

### Step 1: Create Google Cloud Project
1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Click "Select a project" at the top
3. Click "New Project"
4. Enter project name: `exam-builder`
5. Click "Create"
6. Wait for project creation, then select it

### Step 2: Configure OAuth Consent Screen
1. In left sidebar, go to **APIs & Services** > **OAuth consent screen**
2. Select **External** user type
3. Click "Create"
4. Fill in required fields:
   - **App name**: Exam Builder
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click "Save and Continue"
6. Skip Scopes (click "Save and Continue")
7. Add test users (your email for testing)
8. Click "Save and Continue"
9. Review and click "Back to Dashboard"

### Step 3: Create OAuth Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Select **Web application**
4. Fill in:
   - **Name**: Exam Builder Web
   - **Authorized JavaScript origins**: 
     ```
     https://xxxxxxxxxxxxx.supabase.co
     ```
   - **Authorized redirect URIs**:
     ```
     https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
     ```
     (Replace xxxxxxxxxxxxx with your Supabase project ID)
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

### Step 4: Add Google Credentials to Supabase
1. Go back to Supabase Dashboard
2. **Authentication** > **Providers**
3. Find **Google** provider
4. Paste your **Client ID** and **Client Secret**
5. Copy the **Callback URL** (you'll need it)
6. Click "Save"

### Step 5: Update Google Console with Callback URL
1. Go back to Google Cloud Console
2. **APIs & Services** > **Credentials**
3. Click your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, add:
   ```
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```
5. Click "Save"

---

## Part 3: Deploy to Vercel

### Step 1: Push Code to GitHub
1. Open terminal in your project folder
2. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Create a new repository on GitHub
4. Link and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/exam-builder.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login" with GitHub
3. Click "Add New..." > "Project"
4. Import your `exam-builder` repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `exam-builder` (if in subfolder) or leave as `.`
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave default

### Step 3: Add Environment Variables
Click **Environment Variables** and add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

Replace with your actual values from Supabase.

6. Click "Deploy"
7. Wait 2-3 minutes for deployment

### Step 4: Get Vercel URL
1. After deployment, you'll get a URL like: `https://exam-builder-xxx.vercel.app`
2. Copy this URL

### Step 5: Update Google OAuth with Vercel URL
1. Go to Google Cloud Console
2. **APIs & Services** > **Credentials**
3. Click your OAuth client
4. Add to **Authorized JavaScript origins**:
   ```
   https://exam-builder-xxx.vercel.app
   ```
5. Add to **Authorized redirect URIs**:
   ```
   https://exam-builder-xxx.vercel.app/api/auth/callback
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```
6. Click "Save"

### Step 6: Update Supabase Site URL
1. Go to Supabase Dashboard
2. **Authentication** > **URL Configuration**
3. Set **Site URL**: `https://exam-builder-xxx.vercel.app`
4. Add to **Redirect URLs**:
   ```
   https://exam-builder-xxx.vercel.app/api/auth/callback
   https://exam-builder-xxx.vercel.app/dashboard
   ```
5. Click "Save"

---

## Part 4: Testing Your Deployment

### Test Sign Up
1. Visit your Vercel URL
2. Click "Sign Up"
3. Try creating account with email
4. Check your email for verification
5. Try signing up with Google

### Test Sign In
1. Try signing in with email/password
2. Try signing in with Google
3. Verify you reach the dashboard

### Test Database
1. Create a new database
2. Edit the database name
3. Share a database
4. Delete a database

### Test Settings
1. Update your profile name
2. Change theme (Light/Dark/System)
3. Try different color schemes
4. Change password (for email users)
5. Test workspace sharing

---

## Part 5: Custom Domain (Optional)

### Add Custom Domain to Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Click **Settings** > **Domains**
4. Enter your domain (e.g., `exambuilder.com`)
5. Follow DNS configuration instructions
6. Wait for DNS propagation (5 minutes - 48 hours)

### Update OAuth URLs
After adding custom domain:

1. **Google Cloud Console**:
   - Add `https://yourdomain.com` to authorized origins
   - Add `https://yourdomain.com/api/auth/callback` to redirect URIs

2. **Supabase**:
   - Update Site URL to `https://yourdomain.com`
   - Add `https://yourdomain.com/api/auth/callback` to redirect URLs

3. **Vercel Environment Variables**:
   - Update `NEXT_PUBLIC_APP_URL=https://yourdomain.com`
   - Redeploy

---

## Troubleshooting

### Google OAuth Not Working
- Verify redirect URIs match exactly in Google Console
- Check that Google credentials are saved in Supabase
- Clear browser cache and cookies
- Make sure OAuth consent screen is configured

### Database Errors
- Check that SQL migration ran successfully in Supabase
- Verify RLS policies are enabled
- Check Supabase project is not paused (free tier)

### Deployment Errors
- Check all environment variables are set in Vercel
- Verify no typos in environment variable values
- Check build logs in Vercel for specific errors
- Make sure all dependencies are in package.json

### Email Verification Not Working
- Check Supabase SMTP settings
- Verify email template is enabled
- Check spam folder
- Use custom SMTP for production (Supabase Settings > Auth > Email Templates)

---

## Environment Variables Reference

### Required Variables
```env
# Supabase (Get from Supabase Dashboard > Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# App URL (Your Vercel deployment URL)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Optional Variables
```env
# Google OAuth (if using)
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
```

---

## Production Checklist

- [ ] Supabase project created
- [ ] Database tables created via SQL migration
- [ ] Email authentication enabled
- [ ] Google OAuth configured (if using)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created and linked
- [ ] Environment variables added to Vercel
- [ ] First deployment successful
- [ ] Google OAuth redirect URLs updated with Vercel URL
- [ ] Supabase Site URL and Redirect URLs updated
- [ ] Test sign up with email
- [ ] Test sign up with Google
- [ ] Test sign in with both methods
- [ ] Test all dashboard features
- [ ] Test database CRUD operations
- [ ] Test settings pages
- [ ] Test theme changes
- [ ] Test password change (email users)
- [ ] Test sharing functionality

---

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are correct
4. Check Supabase logs in Dashboard
5. Ensure all OAuth URLs match exactly

---

## Maintenance

### Updating Your App
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your change description"
   git push
   ```
3. Vercel will automatically redeploy

### Database Backups
- Supabase automatically backs up your database
- You can restore from Dashboard > Database > Backups
- Download manual backups regularly for safety

### Monitoring
- Check Vercel Analytics for usage stats
- Monitor Supabase Dashboard for database performance
- Set up alerts in Vercel for deployment failures

---

Congratulations! Your Exam Builder app is now live! 🎉
