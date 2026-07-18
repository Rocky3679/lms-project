CREATE TABLE IF NOT EXISTS assignments (

    id SERIAL PRIMARY KEY,

    course_id INTEGER NOT NULL
        REFERENCES courses(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    due_date TIMESTAMP,

    max_marks INTEGER DEFAULT 100,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);