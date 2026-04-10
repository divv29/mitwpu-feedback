-- MIT-WPU Teacher Feedback System
-- PostgreSQL Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teachers table
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    department VARCHAR(100) DEFAULT 'BCA Science',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects table
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20),
    teacher_id INT REFERENCES teachers(id) ON DELETE SET NULL,
    semester INT DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback table
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    set1_answers JSONB,
    set2_answers JSONB,
    set3_answers JSONB,
    set1_score NUMERIC(4,2),
    set2_score NUMERIC(4,2),
    set3_score NUMERIC(4,2),
    overall_score NUMERIC(4,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, subject_id)
);

-- Indexes
CREATE INDEX idx_feedback_teacher ON feedback(teacher_id);
CREATE INDEX idx_feedback_subject ON feedback(subject_id);
CREATE INDEX idx_feedback_student ON feedback(student_id);

-- Sample Data

-- Admin user (password: Admin@123)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@mitwpu.edu.in', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Sample student (password: Student@123)
INSERT INTO users (name, email, password, role) VALUES
('Arjun Sharma', 'arjun.sharma@mitwpu.edu.in', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Priya Patel', 'priya.patel@mitwpu.edu.in', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Rohan Kulkarni', 'rohan.kulkarni@mitwpu.edu.in', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student');

-- Teachers (ordered to match subject assignments below)
-- 1: Operating System → Shashikala Patil
-- 2: Computer Networks → Dr. Suvarna Sharma
-- 3: Python Programming → Shruti Godbole
-- 4: OOPs using C++ → Shruti Godbole
-- 5: Mini Project → Rajesh Kanzade
-- 6: Project Based Learning → Tanmay Bhosale
INSERT INTO teachers (name, department) VALUES
('Shashikala Patil', 'BCA Science'),
('Dr. Suvarna Sharma', 'BCA Science'),
('Shruti Godbole', 'BCA Science'),
('Deepali Sonawane', 'BCA Science'),
('Rajesh Kanzade', 'BCA Science'),
('Tanmay Bhosale', 'BCA Science');

-- Subjects (BCA Science 4th Semester)
INSERT INTO subjects (name, code, teacher_id, semester) VALUES
('Operating System', 'BCA401', 1, 4),
('Computer Networks', 'BCA402', 2, 4),
('Python Programming', 'BCA403', 3, 4),
('OOPs using C++', 'BCA404', 4, 4),
('Mini Project', 'BCA405', 5, 4),
('Project Based Learning', 'BCA406', 6, 4);
