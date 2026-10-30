'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Share2, Link as LinkIcon, Eye, Edit3, Trash2, Copy, Check, UserPlus, X, ToggleLeft, ToggleRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface ShareLink {
  id: string
  permission: 'read' | 'edit'
  link: string
  created_at: string
  is_active: boolean
}

interface SharedUser {
  id: string
  email: string
  permission: 'read' | 'edit'
  accepted: boolean
  created_at: string
}

export default function SharingPage() {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any>(null)
  const [permission, setPermission] = useState<'read' | 'edit'>('read')
  const [shareLink, setShareLink] = useState<ShareLink | null>(null)
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([])
  const [newUserEmail, setNewUserEmail] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUser()
    loadSharingData()
  }, [])

  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const loadSharingData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load shared users
      const { data: shares, error } = await supabase
        .from('workspace_shares')
        .select('*')
        .eq('shared_by', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setSharedUsers(shares || [])
    } catch (error: any) {
      console.error('Error loading sharing data:', error)
    }
  }

  const handleGenerateLink = async () => {
    setLoading(true)
    try {
      const linkId = crypto.randomUUID()
      const link = `${window.location.origin}/shared/workspace/${linkId}`

      const newLink: ShareLink = {
        id: linkId,
        permission,
        link,
        created_at: new Date().toISOString(),
        is_active: true,
      }

      // Save to localStorage for demo (in production, save to database)
      localStorage.setItem('workspaceShareLink', JSON.stringify(newLink))
      
      setShareLink(newLink)
      toast.success('Share link generated successfully')
    } catch (error: any) {
      toast.error('Failed to generate link')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleLink = () => {
    if (shareLink) {
      const updatedLink = { ...shareLink, is_active: !shareLink.is_active }
      localStorage.setItem('workspaceShareLink', JSON.stringify(updatedLink))
      setShareLink(updatedLink)
      toast.success(updatedLink.is_active ? 'Link activated' : 'Link deactivated')
    }
  }

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink.link)
      setCopied(true)
      toast.success('Link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShareWithUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserEmail.trim()) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('workspace_shares')
        .insert([
          {
            shared_by: user.id,
            shared_with_email: newUserEmail,
            permission,
            database_id: null, // null means workspace-wide
          }
        ])
        .select()

      if (error) throw error

      toast.success(`Workspace shared with ${newUserEmail}`)
      setNewUserEmail('')
      loadSharingData()
    } catch (error: any) {
      toast.error(error.message || 'Failed to share workspace')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveUser = async (shareId: string) => {
    try {
      const { error } = await supabase
        .from('workspace_shares')
        .delete()
        .eq('id', shareId)

      if (error) throw error

      toast.success('User access removed')
      loadSharingData()
    } catch (error: any) {
      toast.error('Failed to remove user')
    }
  }

  // Load existing link on mount
  useEffect(() => {
    const savedLink = localStorage.getItem('workspaceShareLink')
    if (savedLink) {
      setShareLink(JSON.parse(savedLink))
    }
  }, [])

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sharing Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Share your workspace with friends and control their access permissions
        </p>

        {/* Share Workspace Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Share Workspace
              </h2>
            </div>

            {/* Access Permission Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Access Permission
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setPermission('read')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    permission === 'read'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Readable Only
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Can view databases, exams, and responses but cannot edit or create
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPermission('edit')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    permission === 'edit'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Edit3 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Editable
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Can create, edit, download databases and exams, full access
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Share Link */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Share Link
                </label>
                {shareLink && (
                  <button
                    onClick={handleToggleLink}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {shareLink.is_active ? (
                      <>
                        <ToggleRight className="w-5 h-5" />
                        Active
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-5 h-5" />
                        Inactive
                      </>
                    )}
                  </button>
                )}
              </div>

              {shareLink ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareLink.link}
                    readOnly
                    className={`flex-1 px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm ${
                      shareLink.is_active
                        ? 'border-gray-300 dark:border-gray-600'
                        : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                    }`}
                  />
                  <button
                    onClick={handleCopyLink}
                    disabled={!shareLink.is_active}
                    className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={handleGenerateLink}
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGenerateLink}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <LinkIcon className="w-5 h-5" />
                  {loading ? 'Generating...' : 'Generate Link'}
                </button>
              )}
            </div>

            {/* Share with Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Share with Email
              </label>
              <form onSubmit={handleShareWithUser} className="flex gap-2">
                <div className="relative flex-1">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="colleague@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Share
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Shared Users */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Shared Users
              </h2>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                {sharedUsers.length} users
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {sharedUsers.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No shared users yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Generate a link and share it to collaborate!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {sharedUsers.map((sharedUser) => (
                  <motion.div
                    key={sharedUser.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {sharedUser.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {sharedUser.email}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          {sharedUser.permission === 'read' ? (
                            <>
                              <Eye className="w-4 h-4" />
                              <span>Read only</span>
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-4 h-4" />
                              <span>Can edit</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveUser(sharedUser.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
