# 🎓 Exam Builder

A modern, professional online exam platform built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔐 Authentication
- **Dual Authentication**: Email/Password and Google OAuth
- **Secure Sign Up/Sign In**: Separate flows with proper validation
- **Auth Method Tracking**: Users maintain their sign-up method
- **Terms & Privacy**: Working legal pages with links

### 🎨 Theming
- **3 Theme Modes**: Light, Dark, and System (follows device)
- **5 Color Schemes**: Blue, Purple, Green, Orange, Pink
- **Persistent Preferences**: Saved across sessions
- **Smooth Transitions**: Beautiful theme switching animations

### 👤 Profile Management
- **Editable Profile**: Update name (for email users)
- **Account Information**: View email, join date, account type
- **Password Management**: Change password (email users only)
- **Help & Support**: Integrated support contact

### 🗄️ Database Management
- **Create Databases**: Organize exams by subject/category
- **Edit Names**: Rename databases anytime
- **Share Databases**: Collaborate with team members
- **Delete Databases**: Remove with confirmation dialog
- **Real-time Stats**: Track databases, exams, and responses

### 🤝 Sharing System
- **Workspace Sharing**: Share entire workspace at once
- **Permission Levels**:
  - **Read Only**: View databases, exams, responses
  - **Editable**: Full access to create, edit, delete
- **Share Methods**:
  - **Link Sharing**: Generate shareable links
  - **Email Invites**: Invite users directly
- **Link Management**: Toggle links active/inactive
- **User Management**: View and remove shared users

### 📱 Mobile Responsive
- **Touch-Optimized**: 44px minimum touch targets
- **Responsive Layouts**: Optimized for phones, tablets, desktops
- **Mobile Menu**: Collapsible sidebar with smooth animations
- **Safe Areas**: Support for notched/edge-to-edge displays

### 🎯 User Experience
- **Beautiful UI**: Gradient backgrounds and modern design
- **Smooth Animations**: Framer Motion powered transitions
- **Toast Notifications**: Real-time feedback for actions
- **Loading States**: Clear indicators for async operations
- **Error Handling**: User-friendly error messages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
```bash
cd exam-builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up database**
- Go to Supabase Dashboard > SQL Editor
- Run the migration from `supabase/migrations/001_create_tables.sql`

5. **Run development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

## 📖 Documentation

- **[Setup Instructions](SETUP-INSTRUCTIONS.md)** - Detailed local setup guide
- **[Deployment Guide](DEPLOYMENT-GUIDE.md)** - Complete production deployment steps

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **[React Hot Toast](https://react-hot-toast.com/)** - Toast notifications

### Backend
- **[Supabase](https://supabase.com/)** - Backend as a Service
  - PostgreSQL database
  - Authentication (Email + OAuth)
  - Row Level Security
  - Real-time subscriptions
  - Storage

### Deployment
- **[Vercel](https://vercel.com/)** - Hosting and CI/CD
- **[GitHub](https://github.com/)** - Version control

## 📁 Project Structure

```
exam-builder/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages group
│   │   ├── signin/              # Sign in page
│   │   └── signup/              # Sign up page
│   ├── dashboard/               # Dashboard pages
│   │   ├── profile/            # User profile
│   │   └── settings/           # Settings pages
│   │       ├── theme/          # Theme settings
│   │       ├── password/       # Password change
│   │       └── sharing/        # Sharing settings
│   ├── api/                    # API routes
│   │   └── auth/              # Auth callbacks
│   ├── terms/                  # Terms of Service
│   ├── privacy/                # Privacy Policy
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page (redirects)
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── auth/                   # Auth components
│   ├── dashboard/              # Dashboard components
│   │   ├── DatabaseCard.tsx   # Database card
│   │   ├── CreateDatabaseModal.tsx
│   │   ├── EditDatabaseModal.tsx
│   │   ├── DeleteConfirmModal.tsx
│   │   ├── ShareDatabaseModal.tsx
│   │   └── NotificationPanel.tsx
│   ├── ui/                     # UI components
│   └── ThemeProvider.tsx       # Theme context
├── lib/                        # Utility functions
│   └── supabase.ts            # Supabase client
├── types/                      # TypeScript types
│   └── index.ts               # Type definitions
├── supabase/                   # Supabase files
│   └── migrations/            # Database migrations
├── public/                     # Static assets
├── .env.local                  # Environment variables (create this)
├── .env.example               # Environment template
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
├── SETUP-INSTRUCTIONS.md      # Setup guide
├── DEPLOYMENT-GUIDE.md        # Deployment guide
└── README.md                  # This file
```

## 🎨 Color Schemes

The app includes 5 beautiful color schemes:

| Scheme | Primary | Best For |
|--------|---------|----------|
| Ocean Blue | #3B82F6 | Professional, trustworthy |
| Royal Purple | #A855F7 | Creative, innovative |
| Forest Green | #22C55E | Fresh, energetic |
| Sunset Orange | #F97316 | Warm, inviting |
| Cherry Pink | #EC4899 | Bold, playful |

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Auth Method Tracking**: Prevents cross-method authentication
- **Password Requirements**: 8+ characters with validation
- **Secure OAuth**: Google OAuth 2.0 implementation
- **Environment Variables**: Sensitive data kept secure
- **HTTPS Only**: Production enforces secure connections

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { ... }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }
```

## 🧪 Testing Checklist

- [ ] Sign up with email
- [ ] Sign up with Google
- [ ] Sign in with email
- [ ] Sign in with Google
- [ ] Edit profile name
- [ ] Change theme mode
- [ ] Change color scheme
- [ ] Change password (email users)
- [ ] Create database
- [ ] Edit database name
- [ ] Share database
- [ ] Delete database
- [ ] Generate workspace share link
- [ ] Toggle link active/inactive
- [ ] Share with email
- [ ] Remove shared user
- [ ] Test on mobile device
- [ ] Test dark mode
- [ ] Test notifications

## 🚀 Deployment

See **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** for complete deployment instructions to Vercel with Supabase.

### Quick Deploy
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## 📊 Database Schema

### Tables
- `user_profiles` - User account information
- `user_databases` - Exam database containers
- `user_exams` - Individual exams
- `exam_responses` - Student submissions
- `workspace_shares` - Sharing permissions

### Relationships
```
user_profiles (1) ──→ (many) user_databases
user_databases (1) ──→ (many) user_exams
user_exams (1) ──→ (many) exam_responses
user_profiles (1) ──→ (many) workspace_shares
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Supabase](https://supabase.com/) for backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

- 📧 Email: support@exambuilder.com
- 📚 Documentation: See SETUP-INSTRUCTIONS.md and DEPLOYMENT-GUIDE.md
- 🐛 Issues: Create an issue on GitHub

---

Made with ❤️ for educators and students worldwide
