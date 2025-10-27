const executeSelect = async (query, pool) => {
  const client = await pool.connect();

  try {
    const result = await client.query(query);

    return result.rows;
  } finally {
    client.release();
  }
};

const executeSelectObj = async (obj, pool) => {
  const client = await pool.connect();

  try {
    const result = await client.query(obj.queryString, obj.arr);

    return result.rows;
  } finally {
    client.release();
  }
};

export default {
  executeSelect,
  executeSelectObj,
};
