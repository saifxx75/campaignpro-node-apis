const {Schema, model} = require('mongoose');

const expenseSchema = new Schema({
    expenseName: {
        type: String
    },
    expenseAmount: {
        type: Number
    },
    expenseCategory: {
        type: String
    },
    expenseDate: {
        type: Date,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "User Id is required"]
    }
},
{
    timestamps: true
});

module.exports = model("expenses", expenseSchema);