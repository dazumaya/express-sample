var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'test'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var id = req.param('id');
  var base = 'select * from test ';
  if (id !== undefined) {
    base += 'where line_id = ?';
  }
  //console.log(id);
  pool.query({
    sql: base,
    timeout: 40000,
  },
  [id],
  function (error, results, fields) {
    if (error) return next(error);
    // console.log(results);
    res.render('list', { title: 'Express Sample', list: results });
  });
});

module.exports = router;
