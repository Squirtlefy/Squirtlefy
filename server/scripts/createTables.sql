drop procedure if exists scrumBoard.createUser;

create procedure scrumBoard.createUser (new_username varchar(255))
LANGUAGE plpgsql 
AS $$
BEGIN
	INSERT INTO scrumBoard.user (username) values (new_username);

	EXCEPTION
	  WHEN UNIQUE_VIOLATION THEN
		RAISE EXCEPTION 'Username is not unique: %', new_username;
	  WHEN OTHERS THEN
		RAISE;
END;
$$;

-- CALL scrumBoard.createUser('john');