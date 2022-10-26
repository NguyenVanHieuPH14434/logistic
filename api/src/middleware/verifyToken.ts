import jwt, {JwtPayload} from 'jsonwebtoken';

export const verifyToken = async(req:any, res:any, next:any) =>{
    const authHeader = req.header('Authorization');
    const toke  = authHeader && authHeader.split(' ')[1];
    if(!toke) {
        return res.status(401).json({ success: false, message: "Access token notfound" })
    }

    try {
        const decoded = jwt.verify(toke, typeof process.env.ACCESS_TOKEN) as JwtPayload
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Incorrect token" });
    }
}