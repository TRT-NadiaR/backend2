const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const username = '';


  router.get('/users/logging-in', function (req, res, next) {
    console.log('in back end get requesttttttttttttttttttttttttttttttttt')
    console.log(req.query, 'query')
    
    db.query(
      'SELECT adult_first_name,adult_last_name, child_first_name,child_last_name, phoneMobile, phoneHome  FROM users WHERE username=? ',
      [req.query.username,  10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error, 'error');
          res.status(500).json({status: 'error'});
        } else {
          console.log('results are: ',results)
          res.status(200).json({status: results[0]});
        }
      }
    );
  });




  router.post('/users', (req, res, next) => {
    console.log(req.body)
    db.query(
      'INSERT INTO users (username, email, password, adult_first_name, adult_last_name, child_first_name, child_last_name, phoneHome, phoneMobile ) VALUES (?,?,?,?,?,?,?,?,?)',
      [req.body.username, req.body.email, req.body.password, req.body.name, req.body.parentLastName, req.body.childName, req.body.childLastName, req.body.phoneHome, req.body.phoneMob],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;