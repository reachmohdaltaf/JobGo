import jwt from "jsonwebtoken";

const ACCESS_SECRET=process.env.ACCESS_SECRET as string
const REFRESH_SECRET=process.env.REFRESH_SECRET as string
export const signAccessToken = (payload: object)=>{
  return jwt.sign(payload, ACCESS_SECRET, {expiresIn: "1d"});
}
export const signRefreshToken = (payload: object)=>{
  return jwt.sign(payload, REFRESH_SECRET, {expiresIn: "7d"})
}

export const verifyAccessToken = (token: string)=>{
  return jwt.verify(token, ACCESS_SECRET)
}


export const verifyRefreshToken = (token: string)=>{
  return jwt.verify(token, REFRESH_SECRET )
}