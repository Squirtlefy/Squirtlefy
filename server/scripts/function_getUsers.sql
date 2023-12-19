drop function if exists scrumBoard.getUsers;

CREATE FUNCTION scrumBoard.getUsers(countUsers INT)
RETURNS SETOF scrumBoard.user AS $$ --specify the return type: can be a type of a specific table, a primitive, arrays, setof, etc
BEGIN
  RETURN QUERY SELECT * FROM scrumBoard.user where id < countUsers;
END;
$$ LANGUAGE plpgsql;

-- SELECT scrumBoard.getUsers(3);