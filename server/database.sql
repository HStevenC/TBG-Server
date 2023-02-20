CREATE DATABASE perntodo;

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL UNIQUE,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE chathistory(
    messageID SERIAL,
    user_id UUID,
    message TEXT,
    PRIMARY KEY (messageID),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

insert into users (user_name, user_email, user_password) values ('henry', 'asdasd@gmail.com', '1234');

insert into chathistory(user_id, message) values ('4e62a1fd-99b4-4582-8c65-d72c24c91598', 'hello thset');