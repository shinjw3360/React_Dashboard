const router = require('express').Router();
const getRoutes = require('../controllers/getControllers');

const routes = [
  'sales_map',
  'visitors',
  'customers',
  'target_reality',
  'volume_services',
  'top_products',
  'revenue',
];

routes.forEach((route) => {
  router.get(
    `/${route}`,
    getRoutes[
      `get${route
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')}`
    ]
  );
});

module.exports = router;
