const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const relic_question_schema=new Schema({

question_number:{
    type:Number,
    required:true,

},
question:{
    type:String,

},
answer:{
    type:Array,
    required:true,
},
hint:{
    type:String,
},
image_url:{
    type:Array,
},

points:{
    type:Number,
},   
accesstime:{
    type:Date,
}

});



const relic_question=mongoose.model('relic_question',relic_question_schema);    
module.exports=relic_question;