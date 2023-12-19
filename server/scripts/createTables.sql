-- drop tables 
DROP TABLE IF EXISTS scrumBoard.user;
DROP TABLE IF EXISTS scrumBoard.board;
DROP TABLE IF EXISTS scrumBoard.junctionUserBoard;
DROP TABLE IF EXISTS scrumBoard.item;
DROP TABLE IF EXISTS scrumBoard.category;


-- create tables
create table scrumBoard.user (
	id SERIAL PRIMARY KEY
	,username VARCHAR(255) NOT NULL
	,email VARCHAR(255) UNIQUE NOT NULL
	,createdOn TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create table scrumBoard.board (
	id SERIAL PRIMARY KEY
	,boardName VARCHAR(255) UNIQUE NOT NULL
	,createdOn TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create table scrumBoard.junctionUserBoard (
	teamId int not null references scrumBoard.team (id) -- FK
	,userId int not null references scrumBoard.user (id) -- FK
	,createdOn TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
	,primary key (teamId, userId) -- set primary key to be the combination of 2 fields
);

create table scrumBoard.category (
	id SERIAL PRIMARY KEY
	,categoryName VARCHAR(255) NOT NULL
	,categoryOrder int not null
	,teamId int not null references scrumBoard.team (id) -- FK
	,createdOn TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create table scrumBoard.item (
	id SERIAL PRIMARY KEY
	,itemName VARCHAR(255) NOT NULL
	,userId int not null references scrumBoard.user (id) -- FK
	,categoryId int not null references scrumBoard.category (id) -- FK
	,createdOn TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- indexes
drop index if exists category_teamId;

create index category_teamId on scrumBoard.category
(
	teamId
);