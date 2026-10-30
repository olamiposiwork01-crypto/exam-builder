export interface User {
  id: string
  email: string
  full_name: string
  auth_method: 'email' | 'google'
  created_at: string
}

export interface Database {
  id: string
  name: string
  user_id: string
  exam_count: number
  created_at: string
  updated_at: string
}

export interface Exam {
  id: string
  database_id: string
  title: string
  description?: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export interface ExamResponse {
  id: string
  exam_id: string
  user_id: string
  answers: Record<string, any>
  score?: number
  submitted_at: string
}
