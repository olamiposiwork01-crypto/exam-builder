'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'
export const revalidate = 0
import { User, Mail, Calendar, Shield, Edit2, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function ProfilePage() {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      setFullName(user.user_metadata?.full_name || '')
    }
  }

  const handleUpdateProfile = async () => {
    if (!fullName.trim()) {
      toast.error('Name cannot be empty')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      })

      if (error) throw error

      toast.success('Profile updated successfully')
      setEditing(false)
      loadUser()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Manage your account information and preferences
        </p>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30">
                {user.user_metadata?.full_name?.[0] || user.email[0].toUpperCase()}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user.user_metadata?.full_name || 'User'}
                </h2>
                <p className="text-white/90">{user.email}</p>
                <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                  <Shield className="w-4 h-4 text-white/80" />
                  <span className="text-sm text-white/80">
                    {user.user_metadata?.auth_method === 'google' ? 'Google Account' : 'Email Account'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="col-span-full">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {editing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleUpdateProfile}
                      disabled={loading}
                      className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false)
                        setFullName(user.user_metadata?.full_name || '')
                      }}
                      className="px-4 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {user.user_metadata?.full_name || 'Not set'}
                    </span>
                    <button
                      onClick={() => setEditing(true)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-white">{user.email}</span>
                </div>
              </div>

              {/* Member Since */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Calendar className="w-4 h-4" />
                  Member Since
                </label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-white">
                    {format(new Date(user.created_at), 'MMMM d, yyyy')}
                  </span>
                </div>
              </div>

              {/* Account Type */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Shield className="w-4 h-4" />
                  Account Type
                </label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-white">
                    {user.user_metadata?.auth_method === 'google' ? 'Google Account' : 'Email Account'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Help & Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Need assistance? Contact our support team
              </p>
              <a
                href="mailto:support@exambuilder.com"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                support@exambuilder.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
