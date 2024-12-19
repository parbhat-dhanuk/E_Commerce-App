
const authorizeRole=(...Roles)=>{
return (req,res,next)=>{
    if(!Roles.includes(req.user.role)){
        return res.status(403).json({message:"Access-denied"})
    }
    next()
}
}

export default authorizeRole