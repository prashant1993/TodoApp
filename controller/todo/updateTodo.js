var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../../model/Tododb.js');

/* PUT /todos/:id */
router.post('/:id', function(req, res) {
  console.log(req.body);
  var title=req.body.title;
  var description=req.body.description;
  var reminder=req.body.reminder;
  title=title.replace(/\n/g,"<br>");
  description=description.replace(/\n/g,"<br>");
  var Json={"title":title,"description":description,"reminder":reminder};
  console.log(Json);
    todo.findByIdAndUpdate(req.params.id, Json, function(err, todos) {
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
