-- FUNCTION: public.get_initial_team_name(character varying)

-- DROP FUNCTION IF EXISTS public."get_initial_team_name"(character varying);

CREATE OR REPLACE FUNCTION public."get_initial_team_name"(full_name character varying)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    initials VARCHAR(10) := '';
BEGIN
    initials := UPPER(LEFT(full_name, 1));
    IF POSITION(' ' IN full_name) > 0 THEN
        initials := initials || UPPER(SUBSTRING(SPLIT_PART(full_name, ' ', 2), 1, 1));
    END IF;
    RETURN initials;
END;
$BODY$;

ALTER FUNCTION public."get_initial_team_name"(character varying) OWNER TO postgres;
