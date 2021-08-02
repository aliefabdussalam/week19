const express = require('express');
const bodyParser = require('body-parser');
const routerUser = require('./source/router/users.router');
const routerProduct = require('./source/router/product.router');
const routerCategory = require('./source/router/category.router');
const routerregister = require('./source/router/register.router');

const app = express();
app.use(bodyParser.json());
app.use(routerUser);
app.use(routerProduct);
app.use(routerCategory);
app.use(routerregister);
app.listen(8800, () => {
  console.log('connect to 8800');
});
