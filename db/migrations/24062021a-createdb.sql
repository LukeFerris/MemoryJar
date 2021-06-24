CREATE SCHEMA IF NOT EXISTS memoryjar;

CREATE  TABLE memoryjar.memory ( 
	memory_id            uuid  NOT NULL ,
	created_time_stamp   timestamp(12) DEFAULT current_timestamp  ,
	CONSTRAINT pk_memory_memory_id PRIMARY KEY ( memory_id )
 );

CREATE  TABLE memoryjar.audio_clip ( 
	audio_clip_id        uuid  NOT NULL ,
	created_time_stamp   timestamp DEFAULT current_timestamp  ,
	memory_id            uuid  NOT NULL ,
	CONSTRAINT pk_audio_clip_audio_clip_id PRIMARY KEY ( audio_clip_id ),
	CONSTRAINT fk_memory FOREIGN KEY ( memory_id ) REFERENCES memoryjar.memory( memory_id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );
