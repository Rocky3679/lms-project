CREATE TABLE IF NOT EXISTS submissions (

    id SERIAL PRIMARY KEY,

    assignment_id INTEGER NOT NULL
        REFERENCES assignments(id)
        ON DELETE CASCADE,

    student_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    submission_text TEXT,

    file_url TEXT,

    marks INTEGER,

    feedback TEXT,

    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (assignment_id, student_id)

);