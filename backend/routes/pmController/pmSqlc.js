export default {
  addGroupProjectName: (data) => {
    const obj = {};

    obj.queryString =
      'INSERT INTO tbl_pm_group_master(s_group_name) VALUES($1);';
    obj.arr = [data.groupProjectName];

    return obj;
  },
  addProject: (data) => {
    const obj = {};

    obj.queryString =
      'INSERT INTO tbl_pm_projects(s_project_name, n_group_name, n_project_status, n_project_manager, j_project_teams, d_project_start, d_project_end, d_created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8);';
    obj.arr = [
      data.projectName,
      parseInt(data.projectGroupName, 10),
      parseInt(data.projectStatus, 10),
      parseInt(data.projectManager, 10),
      JSON.stringify(data.projectTeam),
      data.projectFrom,
      data.projectTo,
      data.created_by,
    ];

    return obj;
  },
  getGroupProjectName: () => {
    const queryString = 'select * from tbl_pm_group_master;';

    return queryString;
  },
  getManager: () => {
    const queryString =
      'SELECT n_user_id, s_full_name, s_email FROM tbl_users WHERE n_role = 2 AND n_status = 1;';

    return queryString;
  },
  getProjectName: () => {
    const queryString =
      'SELECT n_project_id, s_project_name FROM tbl_pm_projects;';

    return queryString;
  },
  getProjects: () => {
    const queryString =
      'SELECT n_project_id, s_project_name, get_status_name(n_project_status) AS project_status, get_group_name(n_group_name) AS group_name, j_project_teams AS project_team, 50 as progress FROM tbl_pm_projects;';

    return queryString;
  },
  getTaskStatus: (data) => {
    const obj = {};

    obj.queryString =
      'SELECT * FROM tbl_pm_task_status_master WHERE n_project_id IN (0, $1);';
    obj.arr = [parseInt(data.value, 10)];

    return obj;
  },
  getTaskTag: (data) => {
    const obj = {};

    obj.queryString =
      'SELECT n_task_tag_id AS `id`, s_task_tag_name AS `label` FROM tbl_pm_task_tag_master WHERE n_project_id IN (0, $1);';
    obj.arr = [parseInt(data.value, 10)];

    return obj;
  },
  getTeamMembers: () => {
    const queryString =
      'SELECT s_full_name AS label, n_user_id AS value, get_initial_team_name(s_full_name) as initial_name FROM tbl_users WHERE n_role = 3;';

    return queryString;
  },
};
