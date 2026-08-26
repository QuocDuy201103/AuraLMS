-- Schema creation for AuraLMS in Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Students Table
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('struggling', 'average', 'excellent')),
    progress INT DEFAULT 0,
    avatar TEXT NOT NULL,
    skills JSONB NOT NULL DEFAULT '{"knowledge": 50, "logic": 50, "presentation": 50, "consistency": 50}'::jsonb,
    weekly_study_time INT[] DEFAULT ARRAY[0,0,0,0,0,0,0],
    weekly_scores FLOAT[] DEFAULT ARRAY[0,0,0,0,0,0,0],
    completed_lessons TEXT[] DEFAULT ARRAY[]::TEXT[],
    unlocked_lessons TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tier_type TEXT NOT NULL CHECK (tier_type IN ('core', 'refresher', 'advanced', 'boost')),
    difficulty TEXT NOT NULL,
    time_estimate TEXT NOT NULL,
    parent_lesson_id TEXT,
    order_index FLOAT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
    id TEXT PRIMARY KEY,
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT DEFAULT 'essay',
    description TEXT NOT NULL,
    question_text TEXT NOT NULL,
    max_score INT DEFAULT 10,
    rubric JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Submissions Table (Add columns if table pre-existed)
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id TEXT,
    student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
    student_name TEXT,
    student_avatar TEXT,
    tier TEXT,
    assignment_title TEXT,
    submitted_date TEXT,
    student_answer TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'graded')),
    grade FLOAT,
    rubric_grading JSONB,
    teacher_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure missing columns are added and submitted_date is TEXT
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS student_name TEXT;
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS student_avatar TEXT;
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS tier TEXT;
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS assignment_title TEXT;
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS submitted_date TEXT;
ALTER TABLE public.submissions ALTER COLUMN submitted_date TYPE TEXT USING submitted_date::text;

-- 5. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    earned_date DATE DEFAULT CURRENT_DATE
);

-- 6. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INT DEFAULT 0
);

-- 7. Users / Accounts Table for Auth & Role Management
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    avatar TEXT NOT NULL,
    student_id TEXT REFERENCES public.students(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DISABLE ROW LEVEL SECURITY (RLS) FOR FULL CLIENT ACCESS
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
