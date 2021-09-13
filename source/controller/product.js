const _ = require('lodash');
const redis = require('redis');
const productmodel = require('../model/product.model');
const { success, failed } = require('../helper/respon');

const client = redis.createClient({
  host: '127.0.0.1', // localhost
  port: 6379,
});
client.on('error', (err) => {
  console.log(err);
});
const product = {

  getlist: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 12 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      client.get('product', (errRedis, resultRedis) => {
        if (errRedis) {
          failed(res, 404);
        } else if (!resultRedis) {
          productmodel.getlist(search, field, typeSort, limit, offset).then(async (result) => {
            const alldata = await productmodel.getAllData();
            const output = {
              data: result,
              totalpage: Math.ceil(alldata.length / limit),
              limit,
              page: req.query.page,
            };
            client.set('product', JSON.stringify(result));
            success(res, output, 'success');
          }).catch((err) => {
            res.json(err);
          });
        } else {
          const response = JSON.parse(resultRedis);
          const dataFilter = _.filter(response, (e) => e.product.includes(search));
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
      const { query } = req;
      const limit = query.limit === undefined ? 12 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      productmodel.getdetail(id, limit, offset).then((result) => {
        const response = {
          data: result,
          limit,
          page: req.query.page,
        };
        success(res, response, 'success');
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
      const idproduct = req.params.id;
      const { productName } = body;
      const { price } = body;
      const { description } = body;
      const { category } = body;
      const { stock } = body;
      const image = req.file.filename;
      productmodel.insert(idproduct, productName, price, description, category, stock, image)
        .then((result) => {
          success(res, result, 'success');
        }).catch((err) => {
          failed(res, 404, err);
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      failed(res, 401, err);
    }
  },
  destroy: (req, res) => {
    try {
      const { id } = req.params;
      productmodel.destroy(id).then((result) => {
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
      const idproduct = req.params.id;
      const { productName } = body;
      const { price } = body;
      const { description } = body;
      const { category } = body;
      const { stock } = body;
      const { image } = body;
      productmodel.update(idproduct, productName, price, description, category, stock, image)
        .then((result) => {
          success(res, result, 'success');
        }).catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  transaction: (req, res) => {
    try {
      const {
        idUser, address, details,
        payment, subtotal, tax, shipping,
      } = req.body;
      const idtransaction = req.params.id;
      productmodel.transaction(idtransaction, idUser, address,
        details, payment, subtotal, tax, shipping)
        .then((result) => {
          success(res, result, 'success');
        }).catch((err) => {
          failed(res, 404, err);
          console.log(err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  transactiondtl: (req, res) => {
    try {
      const { body } = req;
      const idtransactiondtl = req.params.id;
      const { productId, qty, price } = body;
      const { idtransaction } = body;
      productmodel.transactiondtl(idtransactiondtl, productId, qty, price, idtransaction)
        .then((result) => {
          success(res, result, 'success');
        }).catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  getdataTransaction: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 5 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      productmodel.getdataTransaction(search, field, typeSort, limit, offset)
        .then(async (result) => {
          const alldata = await productmodel.getAllDatatrans();
          const response = {
            data: result,
            totalpage: Math.ceil(alldata.length / limit),
            limit,
            page: req.query.page,
          };
          //    res.json(result)
          success(res, response, 'success');
        }).catch((err) => {
          failed(res, 404, err);
        });
    } catch (error) {
      // res.json(error)
      failed(res, 401, error);
    }
  },
};
module.exports = product;
