module.exports = reqFilter =(req,res,next)=>{
    if(!req.query.age){
        res.send('Please Provid Age')
    }else if(req.query.age <18){
        res.send('bache ho tum')
            
        
    }
    else {
        next()
    }

}