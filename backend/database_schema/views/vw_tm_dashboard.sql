-- View: public.vw_tm_dashboard

-- DROP VIEW public.vw_tm_dashboard;

CREATE OR REPLACE VIEW public.vw_tm_dashboard
 AS
 SELECT count(*) AS total_ticket,
    count(
        CASE
            WHEN tbl_tm_tickets.status::text = 'Open'::text THEN 1
            ELSE NULL::integer
        END) AS open_tickets,
    count(
        CASE
            WHEN tbl_tm_tickets.status::text = 'In process'::text THEN 1
            ELSE NULL::integer
        END) AS pending_tickets,
    count(
        CASE
            WHEN tbl_tm_tickets.status::text = 'Complete'::text THEN 1
            ELSE NULL::integer
        END) AS complete_tickets,
    count(
        CASE
            WHEN tbl_tm_tickets.priority::text = 'Critical'::text THEN 1
            ELSE NULL::integer
        END) AS count_critical,
    count(
        CASE
            WHEN tbl_tm_tickets.priority::text = 'Major'::text THEN 1
            ELSE NULL::integer
        END) AS count_major,
    count(
        CASE
            WHEN tbl_tm_tickets.priority::text = 'Minor'::text THEN 1
            ELSE NULL::integer
        END) AS count_minor
   FROM tbl_tm_tickets;

ALTER TABLE public.vw_tm_dashboard OWNER TO postgres;
