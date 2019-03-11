UPDATE decks
SET deck_name = $1
WHERE deck_id = $2
SELECT *
ORDER BY deck_id DESC;
