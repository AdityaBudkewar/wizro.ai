-- FUNCTION: public.get_user_full_name(integer)

DROP FUNCTION IF EXISTS public."get_user_full_name"(integer);

CREATE OR REPLACE FUNCTION public."get_user_full_name"(user_id integer)
    RETURNS character varying
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
select s_full_name from tbl_users where n_user_id = user_id;
$BODY$;

ALTER FUNCTION public."get_user_full_name"(integer) OWNER TO postgres;
