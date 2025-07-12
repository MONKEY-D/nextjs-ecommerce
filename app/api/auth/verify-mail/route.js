import { connectDB } from "@/lib/databaseConnection";
import { catchError } from "@/lib/helperFunctions";
import UserModel from "@/models/user.model";
import { jwtVerify } from "jose";

export async function POST(request) {
  try {
    await connectDB()
    const { token } = await request.json()
    if (!token) {
      return response(false, 400, 'Missing token')
    }
    const secret = new TextEncoder().encode(process.env.SECRET_KEY)
    const decode = await jwtVerify(token, secret)
    const userId = decode.payload.userId

    const user = await UserModel.findById(userId)
    if (!user) {
      return response(false, 404, "User not found.")
    }

    user.isEmailVerified = true
    await user.save()

    return response(true, 200, 'Email verification success.')
  } catch (error) {
    return catchError(error)
  }
}