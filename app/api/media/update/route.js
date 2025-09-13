import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import MediaModel from "@/models/media.model";
import { isValidObjectId } from "mongoose";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }
    await connectDB();

    const payload = await request.json();
    // const { _id, alt, title } = payload;

    const schema = zSchema.pick({
      _id: true,
      alt: true,
      title: true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing field.", validate.error);
    }

    const { _id, alt, title } = validate.data;

    if (!isValidObjectId(_id)) {
      return response(false, 400, "Invalid object id");
    }

    const getMedia = await MediaModel.findById(_id);
    if (!getMedia) {
      return response(false, 404, "Media not found");
    }

    getMedia.alt = alt;
    getMedia.title = title;

    await getMedia.save();

    return response(true, 200, "Media updataed successfully!");
  } catch (error) {
    return catchError(error);
  }
}
