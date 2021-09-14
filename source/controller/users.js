const _ = require('lodash');
const redis = require('redis');
const usermodel = require('../model/users.model');
const { success, failed } = require('../helper/respon');

// const redisAction = require('../helper/redis');
const client = redis.createClient({
  host: '127.0.0.1', // localhost
  port: 6379,
});
client.on('error', (err) => {
  console.log(err);
});
const user = {
  getAllData: (req, res) => {
    try {
      usermodel.getAllData().then((result) => {
        success(res, result, 'success');
      }).catch((err) => {
        failed(res, 404, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getlist: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 5 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      client.get('users', (errRedis, resultRedis) => {
        if (errRedis) {
          failed(res, 404);
        } else if (!resultRedis) {
          usermodel.getlist(search, field, typeSort, limit, offset).then(async (result) => {
            const alldata = await usermodel.getAllData();
            const output = {
              data: result,
              totalpage: Math.ceil(alldata.length / limit),
              limit,
              page: req.query.page,
            };
            success(res, output, 'success');
          }).catch((err) => {
            res.json(err);
          });
        } else {
          const response = JSON.parse(resultRedis);
          const dataFilter = _.filter(response, (e) => e.display_name.includes(search));
          const paginated = _.slice(dataFilter, offset, offset + limit);
          const output = {
            data: paginated,
            totalpage: Math.ceil(response.length / limit),
          };
          success(res, output, 'berhasil');
        }
      });
    } catch (error) {
      // res.json(error)
      failed(res, 404);
      console.log(error);
    }
  },
  getdetail: (req, res) => {
    const { id } = req.params;
    try {
      usermodel.getdetail(id).then((result) => {
        if (result.length <= 0) {
          failed(res, 404);
        } else {
          success(res, result, 'success');
        }
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
