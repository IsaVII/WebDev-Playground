-- Relational schema translated from the class / ER model above
CREATE TABLE book (
    id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn  VARCHAR(20) UNIQUE
);

CREATE TABLE author (
    id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(120) NOT NULL
);

-- composition: a copy cannot exist without its book -> ON DELETE CASCADE
CREATE TABLE book_copy (
    id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    barcode VARCHAR(40) NOT NULL UNIQUE,
    shelf   VARCHAR(20),
    book_id BIGINT NOT NULL REFERENCES book(id) ON DELETE CASCADE
);

-- many-to-many: identity is the pair of foreign keys, no surrogate id
CREATE TABLE book_author (
    book_id   BIGINT NOT NULL REFERENCES book(id)   ON DELETE CASCADE,
    author_id BIGINT NOT NULL REFERENCES author(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE member (
    id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name  VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Loan: the association-with-attributes becomes its own table
CREATE TABLE loan (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    borrowed_on  DATE NOT NULL,
    due_on       DATE NOT NULL,
    returned_on  DATE,
    member_id    BIGINT NOT NULL REFERENCES member(id),
    book_copy_id BIGINT NOT NULL REFERENCES book_copy(id)
);
