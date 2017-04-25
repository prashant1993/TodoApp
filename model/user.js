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
        },
        profile: String,
    },
    fb: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        profile: String
    },
    google: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        profile: String
    }
}, {
    collection: "users"
});

userSchema.virtual('u_id').get(function() {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret, options) {
        ret.u_id = ret._id;
        // if(ret.fb||ret.google||ret.local)
        // if (ret.fb.profile) {
        //     ret.fb.profile = JSON.parse(ret.fb.profile);
        // }
        // else if (ret.google.profile) {
        //     ret.google.profile = JSON.parse(ret.google.profile);
        // }
        // else if (ret.local.profile) {
        //     ret.local.profile = JSON.parse(ret.local.profile);
        // }
        delete ret._id;
        return ret;
    }
});

// to create a model using it
var user = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
//to export the module
module.exports = user;
