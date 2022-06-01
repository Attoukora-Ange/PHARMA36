const mongoose = require('mongoose');
mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology:true}, (err)=>{
    if(err) return console.log('ERREUR DE CONNEXION A LA BASE DE DONNEE MONGODB')
    console.log('CONNEXION A LA BASE DE DONNEE')
});
module.exports = mongoose;