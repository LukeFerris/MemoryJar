DELETE FROM audio_clip;

ALTER TABLE audio_clip
ADD COLUMN user_id UUID NOT NULL;