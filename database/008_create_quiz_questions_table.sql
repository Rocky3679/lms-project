CREATE TABLE IF NOT EXISTS quiz_questions (

    id SERIAL PRIMARY KEY,

    quiz_id INTEGER NOT NULL
        REFERENCES quizzes(id)
        ON DELETE CASCADE,

    question TEXT NOT NULL,

    option_a VARCHAR(255) NOT NULL,

    option_b VARCHAR(255) NOT NULL,

    option_c VARCHAR(255) NOT NULL,

    option_d VARCHAR(255) NOT NULL,

    correct_option CHAR(1) NOT NULL
        CHECK (correct_option IN ('A','B','C','D')),

    marks INTEGER DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);