var mongo = require('mongodb');
var rpio = require('rpio');

let db;

const dbUrl = 'mongodb://localhost:27017/regisDB';


module.exports = {

  switchL : function(id) {
    
    var id_svetla;
    var pin;

    switch(id) {
      case 1:
        id_svetla = 'MainLightPracovna';
        pin = 36;
        break;
      case 2: 
        id_svetla = 'SecondLightPracovna';
        pin = 40;
    }

    // Čtení stavu
    rpio.open(pin, rpio.OUTPUT);
    var stav = rpio.read(pin);
    console.log(stav);

    // Změna stavu
    if(stav == 0){
      rpio.write(pin,rpio.HIGH);
    }
    if(stav == 1){
      rpio.write(pin,rpio.LOW);
    }

    // Zápis do MongoDB - změna stavu a zalogování změny stavu
    mongo.connect(dbUrl, (err, database) => {
        if(err){
          return console.log(err);
        }
        db = database;
        console.log('works');

        var updOne = {name: id_svetla}
        var stateChange = {name: id_svetla,state: stav,lastUpdated : new Date()}
        db.collection("states").updateOne(updOne, stateChange, function(err,res){
          if (err) throw err;
          console.log("State updated");
        db.close();
        })

        db.collection("logger").insertOne(stateChange, function(err,res){
          if (err) throw err;
          console.log("State logged");
        db.close();
        })


    });
    
    
  return stav;
  }

}


