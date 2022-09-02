"use strict";
const validator = require('validator');
const uuid = require('uuid');
const cloudinary = require('../middlewares/cloudinary');
const fs = require('fs');

const controller = {
  test: (request, response) => {
    return response.status(200).send({
      message: 'This is a message about testing my aplication'
    })
  },
  getAll: (request, response) => {
    request.getConnection((err, connection) => {
      if (err) return response.status(400).send({status: 'error', message: err})

      connection.query('SELECT * FROM repertoire ORDER BY -created_at', (err, rows) => {
        if (err) return response.status(400).send({status: 'error', message: err})
        return response.status(200).send({
          status: 'ok',
          rows
        });
      });
    });
  },
  editOne: (request, response) => {
    request.getConnection((err, connection) => {
      if (err) return response.status(400).send({status: 'error', message: err})

      const body = request.body;
      const name_validator = !validator.isEmpty(body.name);
      const author_validator = !validator.isEmpty(body.author);
      const url_validator = validator.isURL(body.url);
      //const file = request.file;
      if (name_validator, author_validator, url_validator) {
        const updated_song = {
          name: body.name ? body.name : null,
          author: body.author ? body.author : null,
          url: body.url ? body.url : null,
          status: body.status ? body.status : null,
        };
        // console.log(updated_song)
        // const uploadImage = async () => {
        //   const uploader = async (path) => await cloudinary.uploads(path, 'mypianohobby');
        //     const {path} = file;
        //     const new_path = await uploader(path);
        //     fs.unlinkSync(path);
        //     return new_path;
        // }
        // if (file) {
        //   uploadImage().then((response) => {
        //     const upd = {partiture: response.url};
        //     connection.query('UPDATE repertoire SET ? WHERE uuid = ?', [upd, new_song.uuid], () => {});
        //   });
        // }
        connection.query(`UPDATE repertoire SET ? WHERE uuid = ?;`, [updated_song, body.uuid], (err, rows) => {
          if (err) return response.status(400).send({status: 'error', message: err});
          return response.status(200).send({
            status: 'ok',
            updated_song,
            message: 'The song has been updated successfully'
          });
        });
      } else {
        return response.status(400).send({status: 'error', message: 'Data is incorrect'});
      }
    });
  },
  addOne: (request, response) => {
    request.getConnection((err, connection) => {
      if (err) return response.status(400).send({status: 'error', message: err})

      const body = request.body;
      const name_validator = !validator.isEmpty(body.name);
      const author_validator = !validator.isEmpty(body.author);
      const url_validator = validator.isURL(body.url);
      const file = request.file;
      if (name_validator, author_validator, url_validator) {
        const new_song = {
          uuid: uuid.v4(),
          name: body.name,
          author: body.author,
          url: body.url,
          created_at: new Date(),
          status: 'stand_by',
        };
        const uploadImage = async () => {
          const uploader = async (path) => await cloudinary.uploads(path, 'mypianohobby');
            const {path} = file;
            const new_path = await uploader(path);
            fs.unlinkSync(path);
            return new_path;
        }
        if (file) {
          uploadImage().then((response) => {
            const upd = {partiture: response.url};
            connection.query('UPDATE repertoire SET ? WHERE uuid = ?', [upd, new_song.uuid], () => {});
          });
        }
        connection.query(`INSERT INTO repertoire SET ? ;`, [new_song], (err, rows) => {
          if (err) return response.status(400).send({status: 'error', message: err});
          return response.status(200).send({
            status: 'ok',
            new_song,
            message: 'The song has been saved successfully'
          });
        });
      } else {
        return response.status(400).send({status: 'error', message: 'Data is incorrect'});
      }
    });
  },
  deleteOne: (request, response) => {
    request.getConnection((err, connection) => {
      if (err) return response.status(400).send({status: 'error', message: err});
      connection.query('SELECT partiture FROM repertoire WHERE uuid = ?', [request.params.uuid], (err, result) => {
        if (result[0].partiture !== null) {
          const deleter = async (path) => await cloudinary.delete(path);
          deleter(`mypianohobby/${result[0].partiture.split('/')[8].split('.')[0]}`);
        }
      })
      connection.query('DELETE FROM repertoire WHERE uuid = ?', [request.params.uuid], (err, result) => {
        if (err) return response.status(400).send({status: 'error', message: err});
        return response.status(200).send({status: 'ok', message: 'The song has been deleted successfully', query: result})
      })
    });
  },
};

module.exports = controller;