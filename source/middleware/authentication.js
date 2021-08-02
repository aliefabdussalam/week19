const midauth = (req, res, next) => {
  const { headers } = req;
  if (headers.token === '456') {
    next();
  } else {
    res.json('wrong token');
  }
};
module.exports = midauth;
