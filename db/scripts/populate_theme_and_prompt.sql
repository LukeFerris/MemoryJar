DELETE FROM prompt;
DELETE FROM theme;

-- themes
INSERT INTO theme (theme_id, theme_name) VALUES ('51a39d89-5d86-477a-93f4-7a9fddb52975', 'School Years');

-- prompts
INSERT INTO prompt (prompt_id, theme_id, prompt_question) VALUES ('c0b8aead-637a-46fa-9603-fa728ed37ecf', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What was your first school like?');
INSERT INTO prompt (prompt_id, theme_id, prompt_question) VALUES ('6005de42-ee70-45a5-8434-89a997d9a497', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'Can you remember your first day?');
INSERT INTO prompt (prompt_id, theme_id, prompt_question) VALUES ('a1377c10-7be2-484d-ad0b-af7dd274acef', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'Did anyone bully you?');
INSERT INTO prompt (prompt_id, theme_id, prompt_question) VALUES ('d7b5a477-a477-4be3-91df-6581ba5495bb', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What were the teachers like?');


