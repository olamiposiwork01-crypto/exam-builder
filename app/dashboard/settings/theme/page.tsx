'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor, Palette, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useTheme } from '@/components/ThemeProvider'
import type { LucideIcon } from 'lucide-react'

type ThemeMode = 'light' | 'dark' | 'system'
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange' | 'pink'

export default function ThemePage() {
  const { theme, toggleTheme } = useTheme()
  const [themeMode, setThemeMode] = useState<ThemeMode>('system')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('blue')

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode || 'system'
    const savedColor = localStorage.getItem('colorScheme') as ColorScheme || 'blue'
    setThemeMode(savedMode)
    setColorScheme(savedColor)
    applyColorScheme(savedColor)
  }, [])

  const handleThemeModeChange = (mode: ThemeMode) => {
    setThemeMode(mode)
    localStorage.setItem('themeMode', mode)
    
    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      if ((theme === 'dark') !== (systemTheme === 'dark')) {
        toggleTheme()
      }
    } else {
      if ((theme === 'dark') !== (mode === 'dark')) {
        toggleTheme()
      }
    }
    
    toast.success(`Theme set to ${mode}`)
  }

  const handleColorSchemeChange = (color: ColorScheme) => {
    setColorScheme(color)
    localStorage.setItem('colorScheme', color)
    applyColorScheme(color)
    toast.success(`Color scheme changed to ${color}`)
  }

  const applyColorScheme = (color: ColorScheme) => {
    const root = document.documentElement
    root.setAttribute('data-color-scheme', color)
  }

  const themes: Array<{
    mode: ThemeMode
    name: string
    description: string
    icon: LucideIcon
    preview: string
    iconColor: string
  }> = [
    {
      mode: 'light' as ThemeMode,
      name: 'Light Mode',
      description: 'Clean and bright interface',
      icon: Sun,
      preview: 'bg-white',
      iconColor: 'text-yellow-500',
    },
    {
      mode: 'dark' as ThemeMode,
      name: 'Dark Mode',
      description: 'Easy on the eyes in low light',
      icon: Moon,
      preview: 'bg-gray-900',
      iconColor: 'text-blue-400',
    },
    {
      mode: 'system' as ThemeMode,
      name: 'System',
      description: 'Follows your device preference',
      icon: Monitor,
      preview: 'bg-gradient-to-br from-white to-gray-900',
      iconColor: 'text-purple-500',
    },
  ]

  const colors = [
    {
      name: 'blue' as ColorScheme,
      label: 'Ocean Blue',
      gradient: 'from-blue-500 to-blue-700',
      description: 'Professional and trustworthy',
    },
    {
      name: 'purple' as ColorScheme,
      label: 'Royal Purple',
      gradient: 'from-purple-500 to-purple-700',
      description: 'Creative and innovative',
    },
    {
      name: 'green' as ColorScheme,
      label: 'Forest Green',
      gradient: 'from-green-500 to-green-700',
      description: 'Fresh and energetic',
    },
    {
      name: 'orange' as ColorScheme,
      label: 'Sunset Orange',
      gradient: 'from-orange-500 to-orange-700',
      description: 'Warm and inviting',
    },
    {
      name: 'pink' as ColorScheme,
      label: 'Cherry Pink',
      gradient: 'from-pink-500 to-pink-700',
      description: 'Bold and playful',
    },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Theme Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Customize the appearance of your workspace
        </p>

        {/* Current Theme */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current Theme</h2>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {themes.find(t => t.mode === themeMode)?.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {themes.find(t => t.mode === themeMode)?.description}
              </p>
            </div>
            {(() => {
              const CurrentIcon = themes.find(t => t.mode === themeMode)?.icon || Sun
              return <CurrentIcon className={`w-8 h-8 ${themes.find(t => t.mode === themeMode)?.iconColor}`} />
            })()}
          </div>
        </div>

        {/* Choose Theme Mode */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Choose Theme Mode
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              const isActive = themeMode === themeOption.mode
              return (
                <motion.button
                  key={themeOption.mode}
                  onClick={() => handleThemeModeChange(themeOption.mode)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    isActive
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${themeOption.preview} border border-gray-200 dark:border-gray-700 flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${themeOption.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {themeOption.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {themeOption.description}
                  </p>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Choose Color Scheme */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Choose Color Scheme
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map((color) => {
              const isActive = colorScheme === color.name
              return (
                <motion.button
                  key={color.name}
                  onClick={() => handleColorSchemeChange(color.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    isActive
                      ? 'border-gray-400 dark:border-gray-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white dark:text-gray-900" />
                      </div>
                    </div>
                  )}
                  <div className={`w-full h-16 rounded-xl bg-gradient-to-r ${color.gradient} mb-4 shadow-lg`}></div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {color.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {color.description}
                  </p>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Theme Info */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Theme Information</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Your theme preference is saved automatically</li>
            <li>• System theme follows your device's appearance settings</li>
            <li>• Color schemes apply to buttons, links, and accents throughout the app</li>
            <li>• Changes take effect immediately across all pages</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
