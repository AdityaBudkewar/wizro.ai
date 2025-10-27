-- FUNCTION: public.get_group_name(integer)

DROP FUNCTION IF EXISTS public."get_group_name"(integer);

CREATE OR REPLACE FUNCTION public."get_group_name"(group_id integer)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    group_name VARCHAR(50);
BEGIN
    SELECT s_group_name INTO group_name
    FROM tbl_pm_group_master
    WHERE n_group_id = group_id;
    RETURN group_name;
END;
$BODY$;

ALTER FUNCTION public."get_group_name"(integer) OWNER TO postgres;
