DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    duration VARCHAR(50),
    price DECIMAL(10,2) DEFAULT 0,
    thumbnail TEXT,
    status VARCHAR(20) DEFAULT 'draft',
    instructor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);