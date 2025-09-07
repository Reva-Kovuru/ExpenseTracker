import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token }  = req.cookies;

    if(!token){
        return res.status(401).json({"message":"Please Login and try again for access"});
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecoded.id){
            req.user = { id: tokenDecoded.id };
            next();
        } else{
            return res.status(401).json({"message":"Please Login and try again for access"});
        }



    } catch (error) {
        console.log(">>>>>>>>>>>>>--------ERROR IN USER_AUTH---------<<<<<<<<<<<<<", error);
        return res.status(500).json({"message":"ERROR IN USER_AUTH"});
    }
}

export default userAuth;