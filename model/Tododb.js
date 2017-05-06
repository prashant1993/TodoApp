var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//schema for todo
var TodoSchema = new Schema({
    user_id: {
        ref: "user",
        type: ObjectId
    },
    title: String,
    description: String,
    completed: Boolean,
    updated_at: {
        type: Date,
        default: Date.now
    },
    reminder: Date
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

//create virtual id
TodoSchema.set('toJSON', {
    transform: function(doc, ret) {
        ret.t_id = ret._id;
        delete ret._id;
        return ret;
    }
});

var todo = mongoose.model('Todo', TodoSchema);
module.exports = todo;
