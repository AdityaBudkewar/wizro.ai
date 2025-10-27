-- Table: public.tbl_tm_tickets

DROP TABLE IF EXISTS public.tbl_tm_tickets;

CREATE TABLE IF NOT EXISTS public.tbl_tm_tickets
(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    ticket_type character varying(25) COLLATE pg_catalog."default" NOT NULL,
    priority character varying(25) COLLATE pg_catalog."default" NOT NULL,
    status character varying(25) COLLATE pg_catalog."default" DEFAULT 'Open'::character varying,
    created_by integer NOT NULL,
    assigned_to integer,
    resolved_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_tm_tickets OWNER to postgres;
