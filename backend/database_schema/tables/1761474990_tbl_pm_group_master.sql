-- Table: public.tbl_pm_group_master

DROP TABLE IF EXISTS public.tbl_pm_group_master;

CREATE TABLE IF NOT EXISTS public.tbl_pm_group_master
(
    n_group_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    s_group_name character varying(45) COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_pm_group_master OWNER to postgres;
