-- SELECT u.user_id, username 
-- FROM users_mtg u
-- JOIN decks d
-- ON u.user_id = d.user_id;


SELECT d.user_id, deck_name, deck, deck_id
FROM decks d
JOIN users_mtg u
ON d.user_id = u.user_id
WHERE d.user_id=$1
ORDER BY deck_id DESC; 