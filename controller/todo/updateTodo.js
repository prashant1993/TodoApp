var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../../model/Tododb.js');

/* PUT /todos/:id */
router.post('/:id', function(req, res) {
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
