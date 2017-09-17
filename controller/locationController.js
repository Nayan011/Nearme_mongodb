var Place = require('../model/place');
var MongoClient=require('mongodb').MongoClient;
const RX=require('@reactivex/rxjs');
module.exports={
 addLocation:function(req,res){

 
  //let arr=[req.body.lon,req.body.lat];
  var coord = new Array(Number(req.body.lon),Number(req.body.lat));
  
  var place=new Place({
      loc :coord,
      name: req.body.name,
      category : req.body.category
   }); 
  place.save(function(err,data){

    console.log(data);
    res.redirect('/locations');
  });

 },//ends addLocation
getLocations:function(req,res){
  RX.Observable.from(Place.find({})).subscribe(function(data){

  res.render('./locations.ejs',{locations:data});
 });

},//ends getLocations

searchLocation:function(req,res){

       
 Place.findOne({category:req.body.category},function(err,data){
    console.log(data);
    var latitude = data.loc[1];
    var longitude=data.loc[0];
    var query ={'$and':[ {loc:{'$near':coord}},{category:req.body.category}]};
        var projection = {_id:0,'name':1,'category':1,'loc':1};
        var coord = new Array(Number(longitude),Number(latitude));
    RX.Observable.from(Place.find({loc:{$near:coord}}).limit(3)).subscribe(function(da){

  res.render('./locations.ejs',{locations:da});
 });
  });//ends Location.findone


},//ends searchLocation
updateLocation:function(req,res){
  Place.findOne({_id:req.params.id},function(err,data){

    let operators={$set:{"name":req.body.name,"category":req.body.category}};
    Place.update({_id:req.params.id},operators,function(err,da){
    console.log("update data:"+da);
      res.redirect('/locations');
    });
  });//ends findone

},//ends update

deleteLocation:function(req,res){
 Place.remove({_id:req.params.id},function(err,data){
  res.redirect('/locations');
 });//ends deleteLocation

},//ends delete
getSingleDLoc:function(req,res){
   Place.findOne({_id:req.params.id},function(err,loca){
      console.log(loca);

      res.render('./singlePage.ejs',{loca:loca});
    });

}




}//ends module.exports
