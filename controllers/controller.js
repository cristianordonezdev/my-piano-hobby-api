"use strict";
const validator = require('validator');
const uuid = require('uuid');

const controller = {
  test: (request, response) => {
    return response.status(200).send({
      message: 'This is a message about testing my aplication'
    })
  },
  getAll: (request, response) => {
    request.getConnection((err, connection) => {
      if (err) return response.status(400).send({status: 'error', message: err})

      connection.query('SELECT * FROM repertoire', (err, rows) => {
        if (err) return response.status(400).send({status: 'error', message: err})
        return response.status(200).send({
          status: 'ok',
          rows
        });
      });
    });
  },
  addOne: (request, response) => {
    request.getConnection((err, connection) => {
      if (err) return response.status(400).send({status: 'error', message: err})

      const body = request.body;
      const name_validator = !validator.isEmpty(body.name);
      const author_validator = !validator.isEmpty(body.author);
      const url_validator = validator.isURL(body.url);
      
      if (name_validator, author_validator, url_validator) {
        const new_song = {
          uuid: uuid.v4(),
          name: body.name,
          author: body.author,
          url: body.url,
          created_at: new Date(),
          status: 'stand_by',
        }
        connection.query(`INSERT INTO repertoire SET ? ;`, [new_song], (err, rows) => {
          if (err) return response.status(400).send({status: 'error', message: err});
        
          return response.status(200).send({
            status: 'ok',
            message: 'The song has been saved successfully'
          });
        });
      } else {
        return response.status(400).send({status: 'error', message: 'Data is incorrect'});

      }
    });
  }
};

module.exports = controller;