-- Table: public.tbl_role_master

DROP TABLE IF EXISTS public.tbl_role_master;

CREATE TABLE IF NOT EXISTS public.tbl_role_master
(
    n_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    s_role_name character varying(45) COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_role_master OWNER to postgres;

-- Data: public.tbl_role_master

INSERT INTO public.tbl_role_master (s_role_name) VALUES
('admin'),
('project manager'),
('emp');
