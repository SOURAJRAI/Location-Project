const express=require('express')
const router=express.Router();

const{getGroup,addGroup} =require('../Controllers/groupController');



router.get("/group",getGroup)
router.post("/group",addGroup)

module.exports=router;