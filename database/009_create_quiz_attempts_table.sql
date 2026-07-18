CREATE TABLE IF NOT EXISTS quiz_attempts (

    id SERIAL PRIMARY KEY,

    quiz_id INTEGER NOT NULL
        REFERENCES quizzes(id)
        ON DELETE CASCADE,

    student_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    score INTEGER DEFAULT 0,

    total_marks INTEGER DEFAULT 0,

    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);