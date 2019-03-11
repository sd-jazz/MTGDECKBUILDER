DELETE FROM decks
WHERE deck_id = ${deck_id} 
RETURNING *; 