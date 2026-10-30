# 🚀 Quick Reference Card

Your go-to guide for common tasks and commands.

---

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

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

## 🔑 Environment Variables

Copy to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📍 Important URLs

### Development
- App: http://localhost:3000
- Sign In: http://localhost:3000/signin
- Sign Up: http://localhost:3000/signup
- Dashboard: http://localhost:3000/dashboard

### Production Setup
- Supabase: https://supabase.com/dashboard
- Vercel: https://vercel.com/dashboard
- Google Console: https://console.cloud.google.com

---

## 🗂️ File Structure

```
exam-builder/
├── app/
│   ├── signin/           → Sign in page
│   ├── signup/           → Sign up page
│   ├── dashboard/        → Main app
│   │   ├── page.tsx      → Dashboard home
│   │   ├── profile/      → User profile
│   │   └── settings/     → Settings pages
│   ├── terms/            → Terms page
│   └── privacy/          → Privacy page
├── components/           → React components
├── lib/                  → Utilities
├── types/                → TypeScript types
└── supabase/migrations/  → Database schema
```

---

## 🎨 Theme Options

### Theme Modes
- **Light** - Bright interface
- **Dark** - Easy on eyes
- **System** - Follows device

### Color Schemes
- **Blue** (default) - Professional
- **Purple** - Creative
- **Green** - Fresh
- **Orange** - Warm
- **Pink** - Playful

---

## 🔐 Authentication

### Sign Up Methods
1. **Email**: Full name, email, password
2. **Google**: One-click OAuth

### Sign In Methods
1. **Email**: Email + password
2. **Google**: One-click OAuth

### Important Rules
- Google users → Can only use Google
- Email users → Can only use email/password
- Auth method is tracked per user

---

## 📊 Database Tables

```
user_profiles        → User information
user_databases       → Exam databases
user_exams          → Individual exams
exam_responses      → Exam submissions
workspace_shares    → Sharing permissions
```

---

## 🤝 Sharing Permissions

### Read Only
- ✅ View databases
- ✅ View exams
- ✅ View responses
- ❌ Cannot create
- ❌ Cannot edit
- ❌ Cannot delete

### Editable
- ✅ View all
- ✅ Create new
- ✅ Edit existing
- ✅ Delete items
- ✅ Full access

---

## 🛠️ Common Tasks

### Create New Database
1. Click "Create Database" button
2. Enter name
3. Click "Create"

### Edit Database Name
1. Click database card
2. Click three-dot menu
3. Select "Edit"
4. Change name
5. Click "Save"

### Share Database
1. Click database card
2. Click three-dot menu
3. Select "Share"
4. Choose permission level
5. Generate link or invite by email

### Change Theme
1. Go to Settings → Theme
2. Select mode (Light/Dark/System)
3. Select color scheme
4. Changes apply instantly

### Change Password
1. Go to Settings → Password
2. Enter current password
3. Enter new password
4. Confirm new password
5. Click "Update Password"

### Share Workspace
1. Go to Settings → Sharing
2. Select permission (Read/Edit)
3. Generate link or invite email
4. Toggle link active/inactive
5. Manage shared users

---

## 🐛 Quick Fixes

### "Invalid API key"
→ Check `.env.local` has correct Supabase keys

### Google OAuth not working
→ Verify redirect URLs in Google Console

### Database errors
→ Run SQL migration in Supabase

### Can't change password
→ Only works for email signup users

### Theme not changing
→ Clear browser cache and reload

### Mobile menu not opening
→ Check if JavaScript is enabled

---

## 📱 Testing Checklist

### Authentication
- [ ] Sign up with email
- [ ] Sign up with Google
- [ ] Sign in with email
- [ ] Sign in with Google
- [ ] Sign out

### Dashboard
- [ ] Create database
- [ ] Edit database name
- [ ] Share database
- [ ] Delete database
- [ ] View stats

### Profile
- [ ] Edit name
- [ ] View account info
- [ ] Changes reflect on sidebar

### Settings - Theme
- [ ] Switch to light mode
- [ ] Switch to dark mode
- [ ] Switch to system mode
- [ ] Change color scheme
- [ ] Verify persistence

### Settings - Password
- [ ] Change password (email users)
- [ ] Verify Google users see message
- [ ] Test password strength meter

### Settings - Sharing
- [ ] Generate share link
- [ ] Toggle link active/inactive
- [ ] Share via email
- [ ] View shared users
- [ ] Remove user access

### Mobile
- [ ] Test on phone
- [ ] Test on tablet
- [ ] Open mobile menu
- [ ] All features work

---

## 🚀 Deployment Steps (Quick)

### 1. Supabase
```
1. Create project
2. Copy API keys
3. Run SQL migration
4. Enable email auth
5. Configure Google OAuth (optional)
```

### 2. Google OAuth (Optional)
```
1. Create project
2. Configure consent screen
3. Create OAuth credentials
4. Copy Client ID & Secret
5. Add to Supabase
```

### 3. Vercel
```
1. Push code to GitHub
2. Import repository
3. Add environment variables
4. Deploy
5. Update OAuth URLs
```

---

## 💾 Backup & Restore

### Backup Database
1. Supabase Dashboard
2. Database → Backups
3. Download backup

### Restore Database
1. Supabase Dashboard
2. Database → Backups
3. Select backup
4. Click "Restore"

---

## 📞 Support Resources

### Documentation
- Setup: `SETUP-INSTRUCTIONS.md`
- Deploy: `DEPLOYMENT-GUIDE.md`
- Summary: `PROJECT-SUMMARY.md`

### External Docs
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Tailwind: https://tailwindcss.com/docs

### Community
- Next.js Discord: https://nextjs.org/discord
- Supabase Discord: https://discord.supabase.com

---

## 🎯 Success Indicators

### Development ✅
- [x] App runs on localhost:3000
- [x] No console errors
- [x] All pages load correctly
- [x] Authentication works
- [x] Database operations work

### Production ✅
- [x] App deployed to Vercel
- [x] Custom domain (optional)
- [x] HTTPS enabled
- [x] OAuth configured
- [x] Database connected

---

## 💡 Pro Tips

1. **Test both auth methods** - Email and Google have different flows
2. **Use system theme** - Respects user's OS preference
3. **Generate share links** - Easier than email invites
4. **Toggle links off** - Instead of deleting them
5. **Regular backups** - Download database backups monthly
6. **Monitor usage** - Check Supabase dashboard for limits
7. **Update dependencies** - Run `npm update` monthly
8. **Clear cache** - If styles look weird

---

## ⌨️ Keyboard Shortcuts

None implemented yet, but you could add:
- `Cmd/Ctrl + K` - Search
- `Cmd/Ctrl + N` - New database
- `Cmd/Ctrl + ,` - Settings
- `Esc` - Close modals

---

## 🎨 Brand Colors

```css
/* Primary Blues */
--blue-500: #3B82F6;
--blue-600: #2563EB;
--blue-700: #1D4ED8;

/* Purples */
--purple-500: #A855F7;
--purple-600: #9333EA;

/* Greens */
--green-500: #22C55E;
--green-600: #16A34A;

/* Oranges */
--orange-500: #F97316;
--orange-600: #EA580C;

/* Pinks */
--pink-500: #EC4899;
--pink-600: #DB2777;
```

---

Keep this card handy for quick reference! 📌
