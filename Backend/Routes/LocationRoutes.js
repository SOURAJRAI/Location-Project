const express=require('express')
const router=express.Router();

const{getLocation,addLocation,deleteLocation} =require('../Controllers/locationController');


router.get("/location",getLocation)
router.post("/location",addLocation)
router.delete("/location/:id",deleteLocation)

module.exports=router;