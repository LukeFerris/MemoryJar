DROP TABLE IF EXISTS audio_clip;
DROP TABLE IF EXISTS mediaitem;
DROP TABLE IF EXISTS "mediaItem";
DROP TABLE IF EXISTS memory;
DROP TABLE IF EXISTS prompt;
DROP TABLE IF EXISTS theme;

CREATE  TABLE theme ( 
	"themeId"            uuid  NOT NULL ,
    "themeName" VARCHAR(200),
	"createdTimeStamp"   timestamp(12) DEFAULT current_timestamp  ,
	CONSTRAINT pk_theme_themeId PRIMARY KEY ( "themeId" )
 );

 CREATE  TABLE prompt ( 
	"promptId"            uuid  NOT NULL ,
    "themeId"    uuid NOT NULL,
    "promptQuestion" VARCHAR(200),
	"createdTimeStamp"   timestamp(12) DEFAULT current_timestamp  ,
	CONSTRAINT pk_prompt_promptId PRIMARY KEY ( "promptId" ),
    CONSTRAINT fk_theme FOREIGN KEY ( "themeId" ) REFERENCES theme( "themeId" ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE memory ( 
	"memoryId"            uuid  NOT NULL ,
	"createdTimeStamp"   timestamp(12) DEFAULT current_timestamp  ,
	"userId" UUID NOT NULL,
	"themeId" UUID NOT NULL,
	CONSTRAINT pk_memory_memoryId PRIMARY KEY ( "memoryId" ),
	CONSTRAINT fk_theme FOREIGN KEY ( "themeId" ) REFERENCES theme( "themeId" )
 );

CREATE  TABLE "mediaItem" ( 
	"mediaItemId"        uuid  NOT NULL ,
	"createdTimeStamp"   timestamp DEFAULT current_timestamp  ,
	"memoryId"            uuid  NOT NULL ,
	"promptId" UUID NOT NULL,
	"mediaType"	smallint NOT NULL,
	"userId" UUID NOT NULL,
	CONSTRAINT pk_mediaItem_mediaItemId PRIMARY KEY ( "mediaItemId" ),
	CONSTRAINT fk_memory FOREIGN KEY ( "memoryId" ) REFERENCES memory( "memoryId" ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_prompt FOREIGN KEY ( "promptId" ) REFERENCES prompt( "promptId" )
 );
