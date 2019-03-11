DELETE FROM decks
WHERE id = ${id} 
RETURNING *;