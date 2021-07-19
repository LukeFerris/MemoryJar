CREATE  TABLE theme ( 
	theme_id            uuid  NOT NULL ,
    theme_name VARCHAR(200),
	created_time_stamp   timestamp(12) DEFAULT current_timestamp  ,
	CONSTRAINT pk_theme_theme_id PRIMARY KEY ( theme_id )
 );

 CREATE  TABLE prompt ( 
	prompt_id            uuid  NOT NULL ,
    theme_id    uuid NOT NULL,
    prompt_question VARCHAR(200),
	created_time_stamp   timestamp(12) DEFAULT current_timestamp  ,
	CONSTRAINT pk_prompt_prompt_id PRIMARY KEY ( prompt_id ),
    CONSTRAINT fk_theme FOREIGN KEY ( theme_id ) REFERENCES theme( theme_id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );