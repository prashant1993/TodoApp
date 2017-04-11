var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TodoSchema = new Schema({
    user_id:{
      ref:"user",
      type:ObjectId
  },
    title: String,
    description:String,
    completed:Boolean,
    updated_at :{type: Date, default: Date.now },
    reminder:Date
},{ toObject: { virtuals: true },
    toJSON: { virtuals: true }
  });
  TodoSchema.set('toJSON', {
    transform: function(doc, ret, options) {
      ret.t_id = ret._id;
        delete ret._id;
        return ret;
    }
});
//   TodoSchema.virtual('t_id').get(function(){
//     console.log("this");
//     return this._id;
// });

var todo = mongoose.model( 'Todo', TodoSchema );
module.exports = todo ;
