-- Table: public.tbl_pm_task_tag_master

DROP TABLE IF EXISTS public.tbl_pm_task_tag_master;

CREATE TABLE IF NOT EXISTS public.tbl_pm_task_tag_master
(
    n_task_tag_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    n_project_id integer,
    s_task_tag_name character varying(45) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_pm_task_tag_master OWNER to postgres;
