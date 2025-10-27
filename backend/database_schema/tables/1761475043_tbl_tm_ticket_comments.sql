-- Table: public.tbl_tm_ticket_comments

DROP TABLE IF EXISTS public.tbl_tm_ticket_comments;

CREATE TABLE IF NOT EXISTS public.tbl_tm_ticket_comments
(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id integer NOT NULL,
    user_id integer NOT NULL,
    comment text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tbl_tm_ticket_comments_ticket_id_fkey FOREIGN KEY (ticket_id)
        REFERENCES public.tbl_tm_tickets (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT tbl_tm_ticket_comments_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.tbl_users (n_user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tbl_tm_ticket_comments OWNER to postgres;
