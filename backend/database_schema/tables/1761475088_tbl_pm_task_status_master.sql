-- Table: public.tbl_pm_task_status_master

DROP TABLE IF EXISTS public.tbl_pm_task_status_master;

CREATE TABLE IF NOT EXISTS public.tbl_pm_task_status_master
(
    n_task_status_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    n_project_id integer,
    s_task_status_name character varying(55) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_pm_task_status_master OWNER to postgres;
