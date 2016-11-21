var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId,
uniqueValidator = require('mongoose-unique-validator');    

var campusSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

var classSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
     campus_id: {
        type: ObjectId,
        ref: 'Campus',
        required: true         
     },

});

var alumnSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    image: String,
    class_id: {
        type: ObjectId,
        ref: 'Class',
        required: true            
    },
    mac: {
        type: String,
        required: true,
        unique: true
    }
});

var userSchema = new Schema({  
  username:    { type: String },
  password:   { type: String },
});

campusSchema.plugin(uniqueValidator);
classSchema.plugin(uniqueValidator);
alumnSchema.plugin(uniqueValidator);

module.exports.User = mongoose.model('User', userSchema);
module.exports.Campus = mongoose.model('Campus', campusSchema);
module.exports.Class = mongoose.model('Class', classSchema);
module.exports.Alumn = mongoose.model('Alumn', alumnSchema);  