-- View: public.vw_tm_user_ticket_summary

-- DROP VIEW public.vw_tm_user_ticket_summary;

CREATE OR REPLACE VIEW public.vw_tm_user_ticket_summary
 AS
 SELECT u.n_user_id AS id,
    u.s_full_name AS user_name,
    count(*) AS total_assigned,
    count(
        CASE
            WHEN t.status::text = 'Complete'::text THEN 1
            ELSE NULL::integer
        END) AS completed_tickets,
    round(count(
        CASE
            WHEN t.status::text = 'Complete'::text THEN 1
            ELSE NULL::integer
        END)::numeric / count(*)::numeric * 100::numeric, 0) AS completion_percentage
   FROM tbl_tm_tickets t
     JOIN tbl_users u ON t.assigned_to = u.n_user_id
  GROUP BY u.n_user_id, u.s_full_name
  ORDER BY (count(*)) DESC;

ALTER TABLE public.vw_tm_user_ticket_summary OWNER TO postgres;
