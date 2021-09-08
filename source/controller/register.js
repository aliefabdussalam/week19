const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registermodel = require('../model/register.model');
const { success, failed } = require('../helper/respon');

const register = {
  insert: (req, res) => {
    try {
      const { body } = req;
      bcrypt.hash(body.password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const data = {
            displayName: body.displayName,
            firstName: body.firstName,
            lastName: body.lastName,
            birthDay: body.birthDay,
            gender: body.gender,
            emailAddress: body.emailAddress,
            deliveryAddress: body.deliveryAddress,
            numberPhone: body.numberPhone,
            level: body.level,
            password: hash,
          };

          registermodel.insert(data).then((result) => {
            success(res, result, 'success');
          }).catch((error) => {
            failed(res, 404, error);
          });
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  login: (req, res) => {
    try {
      const { body } = req;
      registermodel.login(body).then((result) => {
        if (result.length <= 0) {
          res.json('email not found');
        } else {
          const hash = result[0].password;
          bcrypt.compare(body.password, hash, (error, checkpass) => {
            if (error) {
              res.json(error);
            } else if (checkpass === true) {
              const user = result[0];
              const payload = {
                id: user.id,
              };
              const token = jwt.sign(payload, 'secret');
              success(res, token, 'Login successfull');
            } else {
              res.json('password incorrect');
            }
          });
        }
      }).catch((error) => {
        failed(res, 404, error);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};
module.exports = register;
