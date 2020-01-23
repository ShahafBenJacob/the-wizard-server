var express = require("express");
var router = express.Router();
const connection = require("../bin/db/config");

// function getNumber(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }


router.get("/", function(req, res, next) {
  return new Promise((resolve, reject) => {
    try {
      const query = "SELECT * from games_history";
      connection.query(query, (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    } catch (e) {
      console.log(e);
    }
  })
    .then(values => res.status(200).json(values))
    .catch(error => res.status(500).json({ error: error.message }));
});

// router.post("/number", function(req, res, next) {
//   const {min, max} = req.body;
//   const number = getNumber(min, max);
//   res.json(number);
// });

router.post("/", function(req, res, next) {
  new Promise((resolve, reject) => {
    try {
      const { name, range } = req.body;
      query = "INSERT INTO games_history (`name`, `range`) VALUES (?,?)";
      params = [name, range];
      connection.query(query, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (e) {
      console.log(e);
    }
  })
    .then(values => res.status(200).json(values.insertId))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.put("/win", function(req, res, next) {
  new Promise((resolve, reject) => {
      const { user_number, id } = req.body;
      query = `UPDATE games_history SET user_number = ?, number_of_guesses = number_of_guesses + 1 WHERE id = ?`;
      connection.query(query, [user_number, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  })
    .then(values => res.status(200).json(values))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.put("/guess", function(req, res, next) {
  new Promise((resolve, reject) => {    
      const {computer_guesses, id } = req.body;
      query = `UPDATE games_history SET computer_guesses = ?, number_of_guesses = number_of_guesses + 1 WHERE id = ?`;
      connection.query(query,[computer_guesses, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  })
  .then(values => res.status(200).json(values))
  .catch(error => res.status(500).json({ error: error.message }));
});


module.exports = router;
