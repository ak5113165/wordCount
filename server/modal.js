import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    wordcount: { type: Number, required: true },
    isFavorite: { type: Boolean, default: false },
  }
   
);

const User = mongoose.model("User", UserSchema);
export default User;
