export default {
  addComment: (data) => {
    const obj = {};

    obj.queryString =
      'INSERT INTO tbl_tm_ticket_comments(ticket_id, user_id, comment) values($1, $2, $3);';
    obj.arr = [
      parseInt(data.ticketId, 10),
      parseInt(data.userId, 10),
      data.newComment,
    ];

    return obj;
  },

  createTicket: (data) => {
    const obj = {};

    obj.queryString =
      'INSERT INTO tbl_tm_tickets(title, description, ticket_type, priority, created_by, assigned_to) VALUES ($1, $2, $3, $4, $5, $6);';
    obj.arr = [
      data.title,
      data.description,
      data.ticketType,
      data.priority,
      parseInt(data.createdBy, 10),
      data.assign ? parseInt(data.assign, 10) : null,
    ];

    return obj;
  },

  getAllDeveloperName: () => {
    const queryString = 'select id, full_name from users;';

    return queryString;
  },

  getAllTicket: () => {
    const queryString =
      'SELECT t.id, t.title, t.ticket_type, t.priority, t.status, u.full_name AS created_by, a.full_name AS assigned_to, t.created_at FROM tbl_tm_tickets t LEFT JOIN users u ON t.created_by = u.id LEFT JOIN users a ON t.assigned_to = a.id;';

    return queryString;
  },
  getAllUsers: () => {
    const queryString =
      "select id, username, email, full_name, role, status, created_at from users where role != 'admin';";

    return queryString;
  },
  getAttachments: (data) => {
    const obj = {};

    obj.queryString =
      'SELECT id, og_name, new_name, file_path, created_at FROM tbl_tm_ticket_attachments where ticket_id = $1;';
    obj.arr = [data.id];

    return obj;
  },
  getComments: (data) => {
    const obj = {};

    obj.queryString =
      'SELECT t.id, u.full_name, t.created_at, t.comment FROM tbl_tm_ticket_comments t JOIN users u ON t.user_id = u.id WHERE t.ticket_id = $1 ORDER BY t.created_at DESC;';
    obj.arr = [data.id];

    return obj;
  },
  getDashboardStats: () => {
    const queryString = 'SELECT * FROM vw_tm_dashboard;';

    return queryString;
  },
  getDashboardUserStats: () => {
    const queryString = 'SELECT * FROM vw_tm_user_ticket_summary;';

    return queryString;
  },

  getMyTickets: (data) => {
    const obj = {};

    obj.queryString =
      'SELECT t.id, t.title, t.ticket_type, t.priority, t.status, u.full_name AS created_by, a.full_name AS assigned_to, t.created_at FROM tbl_tm_tickets t LEFT JOIN users u ON t.created_by = u.id LEFT JOIN users a ON t.assigned_to = a.id where t.assigned_to = $1;';
    obj.arr = [parseInt(data.id, 10)];

    return obj;
  },
  getTicketDetailById: (data) => {
    const obj = {};

    obj.queryString =
      'SELECT t.id, t.title, t.description, t.ticket_type, t.priority, t.status, t.assigned_to, t.created_by, u.full_name AS created_name, a.full_name AS assigned_name, t.created_at, t.updated_at FROM tbl_tm_tickets t LEFT JOIN users u ON t.created_by = u.id LEFT JOIN users a ON t.assigned_to = a.id where t.id = $1;';
    obj.arr = [parseInt(data.id, 10)];

    return obj;
  },
  updateStatusAndAssign: (data) => {
    const obj = {};

    obj.queryString = 'UPDATE tbl_tm_tickets SET ';
    obj.arr = [];

    if (data.status !== '') {
      obj.queryString += 'status = $1 WHERE id = $2;';
      obj.arr.push(data.status, parseInt(data.ticketId, 10));
    } else if (data.assignedTo !== '') {
      obj.queryString += 'assigned_to = $1 WHERE id = $2;';
      obj.arr.push(parseInt(data.assignedTo, 10), parseInt(data.ticketId, 10));
    }

    return obj;
  },
};
