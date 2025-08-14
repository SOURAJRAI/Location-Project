const mongoose=require('mongoose')

const locationSchema = new mongoose.Schema({
  type: { type: String, default: "location" },
  assetname: { type: String, required: true },
  assettype: { type: String, required: true },
  country:String,
  address: String,

}, { timestamps: true });

const location= mongoose.model("Location", locationSchema);

module.exports=location;