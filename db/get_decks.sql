-- SELECT * FROM decks
-- join decks on(users_mtg.user_id = decks.user_id)
-- where users_mtg.user_id = $1; 

SELECT * FROM decks
ORDER BY deck_id DESC;

