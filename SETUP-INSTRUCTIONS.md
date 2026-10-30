# Quick Setup Instructions

Follow these simple steps to get your Exam Builder up and running!

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
Open terminal in the `exam-builder` folder and run:
```bash
npm install
```

### 2. Configure Environment Variables
1. Rename `.env.local.example` to `.env.local` (or create it)
2. Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

---

## 📋 What You Need

### Accounts to Create:
1. **Supabase Account** (Database & Auth)
   - Go to https://supabase.com
   - Sign up for free
   - Create a new project

2. **Vercel Account** (Hosting - for production)
   - Go to https://vercel.com
   - Sign up with GitHub (free)

3. **Google Cloud Account** (Optional - for Google OAuth)
   - Go to https://console.cloud.google.com
   - Create project
   - Set up OAuth credentials

---

## 🔧 Development Setup

### Folder Structure
```
exam-builder/
├── app/                    # Next.js pages
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   ├── dashboard/         # Main dashboard
│   └── dashboard/settings/ # Settings pages
├── components/            # Reusable components
├── lib/                   # Utility functions
├── types/                 # TypeScript types
└── public/               # Static files
```

### Key Features Implemented:
✅ Separate Sign In / Sign Up pages with beautiful gradients
✅ Google OAuth & Email authentication
✅ Dark/Light/System theme modes
✅ 5 color scheme options (Blue, Purple, Green, Orange, Pink)
✅ Password change (email users only)
✅ Workspace-wide sharing with Read/Edit permissions
✅ Database management (Create, Edit, Share, Delete)
✅ Fully mobile responsive
✅ Working notifications
✅ Terms & Privacy pages

---

## 🎨 Theme Customization

The app supports 3 theme modes and 5 color schemes:

### Theme Modes:
- **Light Mode** - Bright, clean interface
- **Dark Mode** - Easy on the eyes
- **System** - Follows device preference

### Color Schemes:
- **Ocean Blue** - Professional (default)
- **Royal Purple** - Creative
- **Forest Green** - Fresh
- **Sunset Orange** - Warm
- **Cherry Pink** - Playful

Users can customize both in Settings > Theme

---

## 📱 Mobile Support

The app is fully responsive and optimized for:
- **Phones** (320px - 767px)
- **Tablets** (768px - 1023px)
- **Desktops** (1024px+)

Features:
- Touch-friendly buttons (44px minimum)
- Collapsible sidebar on mobile
- Responsive grids and layouts
- Safe area support for notched devices

---

## 🔐 Authentication Flow

### Sign Up:
1. **With Email**: Full name, email, password, confirm password
2. **With Google**: One-click OAuth

Important: Users who sign up with Google can ONLY sign in with Google. Users who sign up with email can ONLY sign in with email/password.

### Sign In:
1. **With Email**: Email and password
2. **With Google**: One-click OAuth

The system tracks auth method and prevents cross-method login.

---

## 📊 Database Structure

Tables created by migration:
- `user_profiles` - User information
- `user_databases` - Exam databases
- `user_exams` - Individual exams
- `exam_responses` - Exam submissions
- `workspace_shares` - Sharing permissions

All tables have Row Level Security (RLS) enabled for security.

---

## 🔗 Sharing System

### Features:
1. **Workspace-wide sharing** - Share entire workspace with all databases
2. **Permission levels**:
   - **Read Only**: View databases, exams, responses (no editing)
   - **Editable**: Full access to create, edit, delete

3. **Sharing methods**:
   - **Share Link**: Generate a link, toggle active/inactive
   - **Email Invite**: Invite specific users by email

4. **Management**:
   - View all shared users
   - Remove user access anytime
   - Deactivate share links without deleting

---

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📝 Environment Variables Explained

### Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)
- `NEXT_PUBLIC_APP_URL` - Your app URL (localhost for dev, production URL for prod)

### Optional:
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

---

## 🐛 Common Issues & Solutions

### Issue: "Invalid API key"
**Solution**: Check your `.env.local` file has correct Supabase credentials

### Issue: Google OAuth not working
**Solution**: Make sure redirect URLs are configured in Google Console

### Issue: Database errors
**Solution**: Run the SQL migration in Supabase SQL Editor

### Issue: Can't change password
**Solution**: Password change only works for email signup users (not Google)

### Issue: Theme not changing
**Solution**: Clear browser cache and reload

---

## 📚 Next Steps

1. ✅ Set up local development
2. ✅ Test all features locally
3. 📖 Read `DEPLOYMENT-GUIDE.md` for production deployment
4. 🚀 Deploy to Vercel
5. 🎉 Share with users!

---

## 💡 Tips

- Test both email and Google authentication
- Try all theme modes and color schemes
- Test on different devices and screen sizes
- Create sample databases to test sharing
- Check that RLS policies work correctly

---

## 📞 Need Help?

- Check `DEPLOYMENT-GUIDE.md` for detailed deployment steps
- Review Supabase documentation: https://supabase.com/docs
- Review Next.js documentation: https://nextjs.org/docs
- Check Vercel documentation: https://vercel.com/docs

---

Happy Building! 🎉
