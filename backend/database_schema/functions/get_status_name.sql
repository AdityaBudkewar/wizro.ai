-- FUNCTION: public.get_status_name(integer)

DROP FUNCTION IF EXISTS public."get_status_name"(integer);

CREATE OR REPLACE FUNCTION public."get_status_name"(status_id integer)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    status_name VARCHAR(50);
BEGIN
    SELECT s_status_name INTO status_name
    FROM tbl_pm_status_master
    WHERE n_status_id = status_id;
    RETURN status_name;
END;
$BODY$;

ALTER FUNCTION public."get_status_name"(integer) OWNER TO postgres;
