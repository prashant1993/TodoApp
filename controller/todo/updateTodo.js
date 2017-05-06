/**
 * updateTodo controller
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../../model/Tododb.js');


/* POST call for update todo with given todo id */
router.post('/:id', function(req, res) {
  console.log(req.body);
    todo.findByIdAndUpdate(req.params.id, req.body, function(err, todos) {
        try {
            if (err) throw err;
            res.send(todos);
        } catch (e) {
            console.log(e);
            res.send({
                status: false,
                message: "mongoose issue"
            });
        }
    });
});

module.exports = router;
