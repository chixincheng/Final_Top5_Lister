const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail:{ type: String, required: true },
        comments: { type: [[String,String]], required: false },
        Author:{ type: String, required: true },
        like: {type: Number, required: true},
        dislike: {type: Number, required: true},
        view: {type: Number, required: true},
        publish: {type: Boolean, required: true},
        createdate: {type: Date, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
