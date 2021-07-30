ALTER TABLE "mediaItem"
ADD COLUMN "relatedMediaItemId" UUID;

ALTER TABLE "mediaItem"
ADD CONSTRAINT fk_relatedItem FOREIGN KEY ( "relatedMediaItemId" ) REFERENCES "mediaItem"( "mediaItemId" );