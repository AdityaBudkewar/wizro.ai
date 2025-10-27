-- Table: public.tbl_tm_ticket_attachments

DROP TABLE IF EXISTS public.tbl_tm_ticket_attachments;

CREATE TABLE IF NOT EXISTS public.tbl_tm_ticket_attachments
(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id integer NOT NULL,
    uploaded_by integer NOT NULL,
    og_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    new_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    file_path character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tbl_tm_ticket_attachments_ticket_id_fkey FOREIGN KEY (ticket_id)
        REFERENCES public.tbl_tm_tickets (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT tbl_tm_ticket_attachments_uploaded_by_fkey FOREIGN KEY (uploaded_by)
        REFERENCES public.tbl_users (n_user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_tm_ticket_attachments OWNER to postgres;
