var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');

// user schema



var placeSchema = new Schema({
      loc:[Number],
      name: String,
      category : String
   });

placeSchema.index( { loc : "2d",category:1 } )
module.exports = mongoose.model('Place', placeSchema);
