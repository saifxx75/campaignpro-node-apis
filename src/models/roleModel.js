const {Schema, model} = require('mongoose');


const roleSchema = new Schema(
{
    roleId: {
     type: Number,
     required: true
    },
    
    roleName: {
        type: String,
        required: [true, 'roleName is required']
    }
},
{
    timestamps: true
}

);

module.exports = model("roles", roleSchema);