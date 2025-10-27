-- Table: public.tbl_pm_status_master

DROP TABLE IF EXISTS public.tbl_pm_status_master;

CREATE TABLE IF NOT EXISTS public.tbl_pm_status_master
(
    n_status_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    s_status_name character varying(45) COLLATE pg_catalog."default" NOT NULL,
    n_active integer DEFAULT 1
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_pm_status_master OWNER to postgres;

INSERT INTO tbl_pm_status_master(s_status_name) VALUES ('todo'), ('in-progress'), ('completed');
