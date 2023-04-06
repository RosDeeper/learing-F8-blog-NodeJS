const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongoosedelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, require: true},
    image: {type: String},
    slug: {type: String, slug: 'name', unique: true},
    videoID: {type: String, require: true},
}, { 
    timestamps: true
});

//Add plugin    
mongoose.plugin(slug);
Course.plugin(mongoosedelete, {
    deletedAt : true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
