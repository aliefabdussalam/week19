const connection = require('../config/db');

const authorization = {
  isAdmin: (req, res, next) => {
    const id = req.userId;
    connection.query(`SELECT * FROM users WHERE id ='${id}'`, (err, result) => {
      if (err) {
        res.json(err);
      } else if (result[0].level === 0) {
        next();
      } else {
        res.status(401).json({
          msg: 'you must be admin',
        });
      }
    });
  },
};

module.exports = authorization;
