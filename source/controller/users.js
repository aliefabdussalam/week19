const usermodel = require('../model/users.model');
const { success, failed } = require('../helper/respon');

const user = {

  getlist: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 5 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      usermodel.getlist(search, field, typeSort, limit, offset).then(async (result) => {
        const alldata = await usermodel.getAllData();
        const response = {
          data: result,
          totalpage: Math.ceil(alldata.length / limit),
          limit,
          page: req.query.page,
        };
        //    res.json(result)
        success(res, response, 'success');
      }).catch((err) => {
        res.json(err);
      });
    } catch (error) {
      // res.json(error)
      failed(res, 404);
    }
  },
  getdetail: (req, res) => {
    const { id } = req.params;
    try {
      usermodel.getdetail(id).then((result) => {
        success(res, result, 'success');
      }).catch((err) => {
        failed(res, 404, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      const { id } = body;
      const { displayName } = body;
      const { firstName } = body;
      const { lastName } = body;
      const { birthDay } = body;
      const { gender } = body;
      const { emailAddress } = body;
      const { password } = body;
      const { deliveryAddress } = body;
      const { numberPhone } = body;
      usermodel.insert(id, displayName, firstName, lastName,
        birthDay, gender, emailAddress, deliveryAddress, numberPhone, password)
        .then((result) => {
          success(res, result, 'success');
        }).catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  destroy: (req, res) => {
    try {
      const { id } = req.params;
      usermodel.destroy(id).then((result) => {
        success(res, result, 'success');
      }).catch((err) => {
        failed(res, 404, err);
      });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  update: (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const { displayName } = body;
      const { firstName } = body;
      const { lastName } = body;
      const { birthDay } = body;
      const { gender } = body;
      const { emailAddress } = body;
      const { deliveryAddress } = body;
      const { numberPhone } = body;
      const { password } = body;
      usermodel.update(id, displayName, firstName, lastName,
        birthDay, gender, emailAddress, deliveryAddress, numberPhone, password)
        .then((result) => {
          success(res, result, 'success');
        }).catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
};
module.exports = user;
