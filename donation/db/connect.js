const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://tanya:tanya3110@cluster0.nh4td.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(() => {
    console.log("connection successful");
}).catch((e) => {
    console.log("connection unsuccessful");
})


// mongodb+srv://tanya:<password>@cluster0.nh4td.mongodb.net/?retryWrites=true&w=majority