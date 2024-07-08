const mongoose = require('mongoose');

const Mongoconnect = async () => {   
     await mongoose.connect("mongodb+srv://ayushshadi12:Ayush7057@cluster0.pbc0yaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
     .then((res)=>console.log(" Database Connected"))
     .catch((err)=>console.log(err))
}

module.exports = Mongoconnect;