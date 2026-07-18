CREATE TABLE IF NOT EXISTS quizzes (

    id SERIAL PRIMARY KEY,

    course_id INTEGER NOT NULL
        REFERENCES courses(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    total_marks INTEGER DEFAULT 100,

    time_limit INTEGER DEFAULT 30,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);