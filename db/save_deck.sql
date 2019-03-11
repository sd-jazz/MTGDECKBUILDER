INSERT INTO decks (user_id, deck, deck_name, username)
values ($1, $2, $3, $4)
RETURNING *; 

-- INSERT INTO decks (user_id, deck, deck_name, image_uris)
-- values ($1, $2, $3, $4)
-- RETURNING *; 
