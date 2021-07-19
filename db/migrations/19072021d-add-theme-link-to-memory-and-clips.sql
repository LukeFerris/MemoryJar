DELETE FROM memory;

ALTER TABLE memory
ADD COLUMN theme_id UUID NOT NULL;

ALTER TABLE memory
ADD CONSTRAINT fk_theme FOREIGN KEY ( theme_id ) REFERENCES theme( theme_id );

DELETE FROM audio_clip;

ALTER TABLE audio_clip
ADD COLUMN prompt_id UUID NOT NULL;

ALTER TABLE audio_clip
ADD CONSTRAINT fk_prompt FOREIGN KEY ( prompt_id ) REFERENCES prompt( prompt_id );