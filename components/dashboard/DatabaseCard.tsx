'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Database, MoreVertical, Edit2, Share2, Trash2, FolderOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database as DatabaseType } from '@/types'
import EditDatabaseModal from './EditDatabaseModal'
import ShareDatabaseModal from './ShareDatabaseModal'
import DeleteConfirmModal from './DeleteConfirmModal'

interface Props {
  database: DatabaseType
  index: number
  onUpdate: () => void
}

export default function DatabaseCard({ database, index, onUpdate }: Props) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  const [showMenu, setShowMenu] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleOpen = () => {
    router.push(`/dashboard/databases/${database.id}`)
  }

  const handleEdit = async (newName: string) => {
    try {
      const { error } = await supabase
        .from('user_databases')
        .update({ name: newName })
        .eq('id', database.id)

      if (error) throw error

      toast.success('Database renamed successfully')
      onUpdate()
      setShowEditModal(false)
    } catch (error: any) {
      toast.error(error.message || 'Failed to rename database')
    }
  }

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('user_databases')
        .delete()
        .eq('id', database.id)

      if (error) throw error

      toast.success('Database deleted successfully')
      onUpdate()
      setShowDeleteModal(false)
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete database')
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 cursor-pointer relative"
        onClick={handleOpen}
      >
        {/* Menu Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(false)
                  handleOpen()
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FolderOpen className="w-4 h-4" />
                Open
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(false)
                  setShowEditModal(true)
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(false)
                  setShowShareModal(true)
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(false)
                  setShowDeleteModal(true)
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </motion.div>
          )}
        </div>

        {/* Database Icon */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
          <Database className="w-7 h-7 text-white" />
        </div>

        {/* Database Name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 pr-8">
          {database.name}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{database.exam_count || 0}</span>
            <span>exams</span>
          </div>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Created {format(new Date(database.created_at), 'MMM d, yyyy')}
        </p>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>

      {/* Modals */}
      {showEditModal && (
        <EditDatabaseModal
          currentName={database.name}
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
        />
      )}

      {showShareModal && (
        <ShareDatabaseModal
          database={database}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          title="Delete Database"
          message={`Are you sure you want to delete "${database.name}"? This action cannot be undone and will delete all exams in this database.`}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  )
}
