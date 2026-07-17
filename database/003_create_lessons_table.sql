CREATE TABLE IF NOT EXISTS lessons (

    id SERIAL PRIMARY KEY,

    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    video_url TEXT,

    lesson_order INTEGER NOT NULL,

    duration VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);