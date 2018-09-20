const router=require('express').Router();

const authCeck=(req,res,next)=>{
    if(!req.user){
        res.redirect('autgh/login');
    }else{
        next();
    }
}

router.get('/',authCeck,(req,res)=>{
    res.send('you are loged in profile page  - '+ req.user);
});

module.exports = router;
