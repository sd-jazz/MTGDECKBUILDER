DROP TABLE IF EXISTS decks; 

DROP TABLE IF EXISTS users_mtg; 

CREATE TABLE users_mtg (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  password VARCHAR
);

CREATE TABLE decks (
  deck_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users_mtg(user_id),
  username TEXT, 
  deck TEXT[],
  deck_name TEXT
  -- image_uris TEXT
);
