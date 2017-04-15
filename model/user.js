var mongoose = require("mongoose");
//set variable reffernce to mongoose schema
var Schema = mongoose.Schema;
//create the schema
var userSchema = new Schema({
    local: {
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: false
        },
        mobileNo: {
            type: String,
            required: false
        }
    },
    fb: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String,
        profile: {
            data: Buffer,
            contentType: String
        }
    },
    google: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String,
        profile: {
            data: Buffer,
            contentType: String
        }
    }
}, {
    collection: "users"
});

userSchema.virtual('u_id').get(function() {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true
});

// to create a model using it
var user = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
//to export the module
module.exports = user;
