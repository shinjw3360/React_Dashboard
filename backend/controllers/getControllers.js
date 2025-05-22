const database = require('../database/database');

exports.getSalesMap = async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM sales_map');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Error Occured while getting sales map data' + error.message,
    });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM visitors');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Error Occured while getting visitors data' + error.message,
    });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM customers');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Error Occured while getting customers data' + error.message,
    });
  }
};

exports.getTargetReality = async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM target_reality');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message:
        'Error Occured while getting target reality data' + error.message,
    });
  }
};

exports.getVolumeServices = async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM volume_services');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message:
        'Error Occured while getting volume services data' + error.message,
    });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM top_products');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Error Occured while getting top products data' + error.message,
    });
  }
};

exports.getRevenue = async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM revenue');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Error Occured while getting revenue data' + error.message,
    });
  }
};
