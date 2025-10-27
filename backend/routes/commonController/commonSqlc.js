export default {
  getStatus: () => {
    const queryString =
      'select * from tbl_pm_status_master where n_active = 1;';

    return queryString;
  },
};
