const categorymodel = require('../model/category.model');
const { success, failed } = require('../helper/respon');

const category = {

  getlist: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 5 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      categorymodel.getlist(search, field, typeSort, limit, offset).then(async (result) => {
        const alldata = await categorymodel.getAllData();
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
  getdetail: (req, res) => {
    const { id } = req.params;
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 5 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      categorymodel.getdetail(id, search, field, typeSort, offset, limit).then(async (result) => {
        const alldata = await categorymodel.getAllData();
        const response = {
          data: result,
          totalpage: Math.ceil(alldata.length / limit),
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
      const { idcategory } = body.id;
      const { Category } = body.category;

      categorymodel.insert(idcategory, Category).then((result) => {
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
      categorymodel.destroy(id).then((result) => {
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
      const idcategory = req.params.id;
      const { Category } = body;

      categorymodel.update(idcategory, Category).then((result) => {
        success(res, result, 'success');
      }).catch((err) => {
        failed(res, 404, err);
      });
    } catch (err) {
      failed(res, 401, err);
    }
  },
};
module.exports = category;
