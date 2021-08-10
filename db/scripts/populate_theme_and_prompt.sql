DELETE FROM prompt;
DELETE FROM theme;

-- themes
INSERT INTO theme ("themeId", "themeName") VALUES ('144f22dd-d01e-4ad1-aa15-7628b9297daa', 'Parenthood');
INSERT INTO theme ("themeId", "themeName") VALUES ('144f22dd-d01e-4ad1-aa15-7628b9297dab', 'Love & Romance');
INSERT INTO theme ("themeId", "themeName") VALUES ('144f22dd-d01e-4ad1-aa15-7628b9297dac', 'Young Adulthood');
INSERT INTO theme ("themeId", "themeName") VALUES ('144f22dd-d01e-4ad1-aa15-7628b9297dad', 'Childhood');
INSERT INTO theme ("themeId", "themeName") VALUES ('51a39d89-5d86-477a-93f4-7a9fddb52975', 'General');

-- prompts
-- General
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297daa', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What is the best piece of advice you were ever given?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297dab', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What is your idea of a perfect day? Where, with who, what?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297dac', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'Do you have a favourite poem? What is it? Why do you like it so much?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297dad', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What is your favourite song or piece of music? What does it remind you of?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297dae', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'If you could have dinner with anyone in the world living or dead, who would it be and why?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297daf', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What do you consider one of your greatest achievements in life?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297dbf', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What are your top 3 favourite places on earth?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297dcf', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What have been some of your favourite restaurants through the years? What is your current favourite restaurant?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297ddf', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'Who is the wisest person you''ve ever known? What have you learned from them?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297def', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What simple pleasures of life do you truly enjoy?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297dff', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'Who have been your closest friends throughout the years? How did you meet them?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297aff', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What qualities do you most value in your friends?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297bff', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What do you admire most about your father?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297cff', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What do you admire most about your mother?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9298dff', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'Do you have any notable ancestors?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297eff', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What''s a small decision that you made that ended up having a big impact on your life?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9297fff', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'The smells that bring back vivid memories for me are...');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9298fff', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What is a fear you would like to conquer?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('244f22dd-d01e-4ad1-aa15-7628b9299fff', '51a39d89-5d86-477a-93f4-7a9fddb52975', 'What is the thing you are most proud of?');

-- Childhood
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b9297daa', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'What was your Mother like when you were a child? What is your fondest memory of her?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b9297dab', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'What was your Father like when you were a child? What is your fondest memory of him?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b9297dac', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'How do you remember your childhood home? How do you remember your bedroom?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b9297dad', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'Where did you go on holiday as a child? What do you remember about it?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b9297dae', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'What were your favourite toys as a child?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b9297daf', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'What was the naughtiest thing you ever did? Did you get found out?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b0297daa', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'What song reminds you of your childhood? (Perhaps a nursery rhyme or lullabye). Can you sing it?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b0297dab', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'How did your parents choose your name?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b0297dac', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'What were your weekend traditions when you were a kid?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b0297dad', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'Who was your favourite teacher at primary school? What do you remember about him/ her?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b0297dae', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'What did you want to be when you grew up? Why?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b0297daf', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'Did you have any pets? How would you describe them? Do you remember any adventures with them?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b1297daa', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'Who had the most positive influence on you as a child?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b1297dab', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'What is your earliest memory?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b1297dac', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'How do you remember primary school?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('344f22dd-d01e-4ad1-aa15-7628b1297dad', '144f22dd-d01e-4ad1-aa15-7628b9297dad', 'What were your siblings like as children (if you had them)?');

-- Young Adulthood
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7628b9297daa', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'What was your signature look as a teenager?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7628b9297dab', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'Who was your first teenage crush?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7628b9297dac', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'What were your favourite songs?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7628b9297dad', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'Tell me about a song that brings back an interesting memory from your teenage years?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7628b9297dae', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'What was secondary school like?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7628b9297daf', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'Who was you favourite teacher and why?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7638b9297daa', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'Who was you worst teacher and why?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7638b9297dab', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'Who was your best friend as a teenager?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7638b9297dac', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'What work/career options did you think about before leaving school?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7638b9297dad', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'Did you ever get into trouble at school? What happened?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7638b9297dae', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'What advice would you give to teenagers today?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7638b9297daf', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'Whats the stupidest thing you did as a teenager?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('444f22dd-d01e-4ad1-aa15-7648b9297daa', '144f22dd-d01e-4ad1-aa15-7628b9297dac', 'What advice do you wish you had taken from your parents?');

-- Love & Romance
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9297daa', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'How did you meet your partner? What were your first impressions of them?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9297dab', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What was your first date with your partner like? Where did you go?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9297dac', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'How do you remember your partner when you first met?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9297dad', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'When did you fall in love with your partner? How did you know?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9297dae', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What was one of the most romantic moments in your life?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9297daf', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What do you think are the secrets to a happy relationship?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9397daa', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What was your proposal story?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9397dab', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What was your wedding like?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9397dac', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What did you and your partner wear on your wedding day?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9397dad', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What advice might you give to newly-weds?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9397dae', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What do you love most about your partner?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9397daf', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What is the best present your partner has ever given you?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('544f22dd-d01e-4ad1-aa15-7628b9497daa', '144f22dd-d01e-4ad1-aa15-7628b9297dab', 'What advice would you give on how to choose a partner for life?');

-- Parenthood
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa15-7628b9297daa', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'When you first found out you were going to become a parent, how did you feel?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa15-7628b9297dab', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'What went through your mind when you saw your child for the first time?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa15-7628b9297dac', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'How do you remember leaving the hospital?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa15-7628b9297dad', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'How did you choose your children''s names?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa15-7628b9297dae', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'How would you describe your children as kids? What funny habits did they have?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa15-7628b9297daf', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'Did you have plans for what kind of parent you wanted to be? Did things turn out that way?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa25-7628b9297daa', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'In what ways did your life change most after becoming a parent?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa25-7628b9297dab', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'Were there any made-up stories you told your children? Can you tell one now?');
INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa25-7628b9297dac', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'What were your children''s favourite toys? What games would they play?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa25-7628b9297dad', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'Do you remember a song you used to sing to your children? How does it go?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa25-7628b9297dae', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'What books did you use to read to your children? What were they about?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa25-7628b9297daf', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'What about your children makes you most proud?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa35-7628b9297daa', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'What were some of your proudest parenting moments?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa35-7628b9297dab', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'What is one of your favourite memories of your parent(s)?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa35-7628b9297dac', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'How did the way your parents raised you influence your own parenting philosophy?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa35-7628b9297dad', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'How did your parenting style differ from that of your parents?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa35-7628b9297dae', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'What is your best advice when it comes to raising children?');
-- INSERT INTO prompt ("promptId", "themeId", "promptQuestion") VALUES ('644f22dd-d01e-4ad1-aa35-7628b9297daf', '144f22dd-d01e-4ad1-aa15-7628b9297daa', 'What did you enjoy most about parenting?');







