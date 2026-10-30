-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  auth_method TEXT NOT NULL CHECK (auth_method IN ('email', 'google')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- User Databases Table
CREATE TABLE IF NOT EXISTS user_databases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  exam_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Exams Table
CREATE TABLE IF NOT EXISTS user_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  database_id UUID REFERENCES user_databases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exam Responses Table
CREATE TABLE IF NOT EXISTS exam_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID REFERENCES user_exams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  respondent_name TEXT,
  respondent_email TEXT,
  answers JSONB NOT NULL,
  score DECIMAL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workspace Shares Table
CREATE TABLE IF NOT EXISTS workspace_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  database_id UUID REFERENCES user_databases(id) ON DELETE CASCADE,
  shared_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  shared_with_email TEXT NOT NULL,
  permission TEXT NOT NULL DEFAULT 'view' CHECK (permission IN ('view', 'edit')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_databases_user_id ON user_databases(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exams_database_id ON user_exams(database_id);
CREATE INDEX IF NOT EXISTS idx_user_exams_user_id ON user_exams(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_responses_exam_id ON exam_responses(exam_id);
CREATE INDEX IF NOT EXISTS idx_workspace_shares_database_id ON workspace_shares(database_id);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_databases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_shares ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_databases
CREATE POLICY "Users can view own databases" ON user_databases
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can create own databases" ON user_databases
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update own databases" ON user_databases
  FOR UPDATE USING (auth.uid() = user_id);
  
CREATE POLICY "Users can delete own databases" ON user_databases
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_exams
CREATE POLICY "Users can view own exams" ON user_exams
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can create own exams" ON user_exams
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update own exams" ON user_exams
  FOR UPDATE USING (auth.uid() = user_id);
  
CREATE POLICY "Users can delete own exams" ON user_exams
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for exam_responses
CREATE POLICY "Users can view responses to their exams" ON exam_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_exams
      WHERE user_exams.id = exam_responses.exam_id
      AND user_exams.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can submit exam responses" ON exam_responses
  FOR INSERT WITH CHECK (true);

-- RLS Policies for workspace_shares
CREATE POLICY "Users can view shares they created" ON workspace_shares
  FOR SELECT USING (auth.uid() = shared_by);
  
CREATE POLICY "Users can create shares" ON workspace_shares
  FOR INSERT WITH CHECK (auth.uid() = shared_by);
  
CREATE POLICY "Users can delete shares they created" ON workspace_shares
  FOR DELETE USING (auth.uid() = shared_by);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_databases_updated_at BEFORE UPDATE ON user_databases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_exams_updated_at BEFORE UPDATE ON user_exams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
