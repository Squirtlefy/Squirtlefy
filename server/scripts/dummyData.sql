-- ***** USERS ******
-- insert into scrumBoard.user (username, email) VALUES
-- 	('john','john@gmail.com'),
-- 	('austin','austin@gmail.com'),
-- 	('keidy','keidy@gmail.com'),
-- 	('sean','sean@gmail.com'),
-- 	('jerry','jerry@gmail.com');
	
-- select * from scrumBoard.user

-- ******* BOARDS *******
-- insert into scrumBoard.board (boardName) VALUES
-- 	('first board'),
-- 	('test'),
-- 	('Squirtle'),
-- 	('Charzard');
	
-- select * from scrumBoard.board;
	
	
--  ********* JUNCTION USER BOARD (hard-coding random values)  **********
-- insert into scrumBoard.junctionUserBoard (boardId, userId) VALUES
-- 	(1,1),
-- 	(1,2),
-- 	(2,1),
-- 	(3,1),
-- 	(3,5),
-- 	(4,4)

-- select *
-- from scrumBoard.user u
-- 	join scrumBoard.junctionUserBoard jub on u.id = jub.userId
-- 	join scrumBoard.board b on b.id = jub.boardId
	
	
-- ******* List ******
-- insert into scrumBoard.list (listName, listOrder, boardId) 
-- SELECT 'first list'
-- 	,1
-- 	,b.id
-- FROM scrumBoard.board b
-- where b.id = 1;

-- insert into scrumBoard.list (listName, listOrder, boardId) 
-- SELECT 'second list'
-- 	,2
-- 	,b.id
-- FROM scrumBoard.board b
-- where b.id = 1;

-- insert into scrumBoard.list (listName, listOrder, boardId) 
-- SELECT 'third list'
-- 	,3
-- 	,b.id
-- FROM scrumBoard.board b
-- where b.id = 1;

-- select * from scrumBoard.list;

-- ******* Card *******
-- insert into scrumBoard.card (cardName, cardOrder, listId) VALUES
-- 	('test1', 1, 1),
-- 	('test2', 2, 1),
-- 	('test3', 3, 1);

-- select * from scrumBoard.card;
-- ******** junctionCardsAssignedUsers ******
-- insert into scrumBoard.junctionCardsAssignedUsers (cardId, userId) VALUES
-- 	(1,1),
-- 	(1,2),
-- 	(1,3),
-- 	(2,2),
-- 	(2,3);
	

-- select *
-- from scrumBoard."user" u
-- 	join scrumboard.junctioncardsassignedusers jca on u.id = jca.userid
-- 	join scrumboard.card c on c.id = jca.cardId;
	
	
