DELETE FROM memory;

ALTER TABLE memory
ADD COLUMN user_id UUID NOT NULL;