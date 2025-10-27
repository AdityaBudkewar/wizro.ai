-- Table: public.tbl_tm_ticket_history

DROP TABLE IF EXISTS public.tbl_tm_ticket_history;

CREATE TABLE IF NOT EXISTS public.tbl_tm_ticket_history
(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id integer NOT NULL,
    changed_by integer NOT NULL,
    field_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    old_value text COLLATE pg_catalog."default",
    new_value text COLLATE pg_catalog."default",
    change_type text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tbl_tm_ticket_history_changed_by_fkey FOREIGN KEY (changed_by)
        REFERENCES public.tbl_users (n_user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT tbl_tm_ticket_history_ticket_id_fkey FOREIGN KEY (ticket_id)
        REFERENCES public.tbl_tm_tickets (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT tbl_tm_ticket_history_change_type_check CHECK (change_type = ANY (ARRAY['created'::text, 'updated'::text, 'assigned'::text, 'reassigned'::text, 'status_changed'::text, 'forwarded'::text]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_tm_ticket_history OWNER to postgres;
