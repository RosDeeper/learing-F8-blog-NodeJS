//turn to array to acess properties from view
//handlebar default error

module.exports = {
    mutipleToObject : function(mongooses)
    {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    singleToObject : function(mongoose)
    {
        return mongoose ? mongoose.toObject() : mongoose;
    }
}