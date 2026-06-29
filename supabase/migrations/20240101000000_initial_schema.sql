-- users table is handled by auth.users in Supabase
-- We create a public.profiles table to extend auth.users.
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT CHECK (role IN ('educator', 'parent')) NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- students
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  dob DATE,
  diagnosis_tags TEXT[] DEFAULT '{}',
  school TEXT,
  guardian_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- student_parent_links
CREATE TABLE student_parent_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, parent_id)
);
ALTER TABLE student_parent_links ENABLE ROW LEVEL SECURITY;

-- student_educator_assignments
CREATE TABLE student_educator_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  educator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE student_educator_assignments ENABLE ROW LEVEL SECURITY;

-- goals
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  educator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'achieved')) DEFAULT 'not_started',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  educator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('assessment', 'iep', 'lesson_plan', 'session_note', 'progress_report')) NOT NULL,
  form_data JSONB DEFAULT '{}',
  generated_content TEXT,
  is_draft BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Setup RLS Policies
-- Profiles: Users can read their own profile.
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
-- Educators can read profiles of parents linked to their students
CREATE POLICY "Educators can read linked parent profiles" ON profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM student_educator_assignments sea
    JOIN student_parent_links spl ON sea.student_id = spl.student_id
    WHERE sea.educator_id = auth.uid() AND sea.end_date IS NULL AND spl.parent_id = profiles.id
  )
);
-- Parents can read profiles of educators linked to their children
CREATE POLICY "Parents can read linked educator profiles" ON profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM student_parent_links spl
    JOIN student_educator_assignments sea ON spl.student_id = sea.student_id
    WHERE spl.parent_id = auth.uid() AND sea.end_date IS NULL AND sea.educator_id = profiles.id
  )
);

-- Students:
-- Educators can read/write students assigned to them.
CREATE POLICY "Educators can view assigned students" ON students FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM student_educator_assignments sea 
    WHERE sea.student_id = students.id AND sea.educator_id = auth.uid()
  )
);
-- Parents can read their linked children.
CREATE POLICY "Parents can view their children" ON students FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM student_parent_links spl 
    WHERE spl.student_id = students.id AND spl.parent_id = auth.uid()
  )
);

-- For creation, an educator can insert a student. The insert policy needs to be true, and then assignment handled.
CREATE POLICY "Educators can insert students" ON students FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'educator')
);
CREATE POLICY "Educators can update assigned students" ON students FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM student_educator_assignments sea 
    WHERE sea.student_id = students.id AND sea.educator_id = auth.uid() AND sea.end_date IS NULL
  )
);

-- Student Educator Assignments:
CREATE POLICY "Educators can read their assignments" ON student_educator_assignments FOR SELECT USING (educator_id = auth.uid());
CREATE POLICY "Parents can read educator assignments for their kids" ON student_educator_assignments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM student_parent_links spl 
    WHERE spl.student_id = student_educator_assignments.student_id AND spl.parent_id = auth.uid()
  )
);
CREATE POLICY "Educators can insert assignments" ON student_educator_assignments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'educator')
);
CREATE POLICY "Educators can update assignments" ON student_educator_assignments FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'educator')
);

-- Student Parent Links:
CREATE POLICY "Parents can view their links" ON student_parent_links FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Educators can view parent links for their students" ON student_parent_links FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM student_educator_assignments sea 
    WHERE sea.student_id = student_parent_links.student_id AND sea.educator_id = auth.uid()
  )
);
CREATE POLICY "Educators can insert parent links" ON student_parent_links FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM student_educator_assignments sea 
    WHERE sea.student_id = student_parent_links.student_id AND sea.educator_id = auth.uid() AND sea.end_date IS NULL
  )
);

-- Goals:
CREATE POLICY "Educators manage goals for their students" ON goals FOR ALL USING (
  EXISTS (
    SELECT 1 FROM student_educator_assignments sea 
    WHERE sea.student_id = goals.student_id AND sea.educator_id = auth.uid() AND sea.end_date IS NULL
  )
);
CREATE POLICY "Parents can view goals for their children" ON goals FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM student_parent_links spl 
    WHERE spl.student_id = goals.student_id AND spl.parent_id = auth.uid()
  )
);

-- Documents:
CREATE POLICY "Educators manage documents for their students" ON documents FOR ALL USING (
  EXISTS (
    SELECT 1 FROM student_educator_assignments sea 
    WHERE sea.student_id = documents.student_id AND sea.educator_id = auth.uid() AND sea.end_date IS NULL
  )
);
CREATE POLICY "Parents can view final documents for their children" ON documents FOR SELECT USING (
  is_draft = false AND
  EXISTS (
    SELECT 1 FROM student_parent_links spl 
    WHERE spl.student_id = documents.student_id AND spl.parent_id = auth.uid()
  )
);
