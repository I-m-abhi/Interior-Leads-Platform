import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [25, "Name cannot exceed 25 characters"],
      minLength: [3, "Name must be at least 3 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a Valid Email"],
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      required: [true, "Please Enter Mobile Number"],
      unique: true,
      index: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message: "Please enter a valid 10-digit mobile number",
      },
    },

    companyDetails: {
      companyName: {
        type: String,
        required: [true, "Please Enter Your Company Name"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "Please Enter City"],
        trim: true,
      },
      address: {
        type: String,
        required: [true, "Please Enter Your Complete Address"],
        trim: true,
      },
    },
    
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },

   role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    leadCredits: {
      type: Number,
      default: 0,
    },

    membership: {
      type: String,
      enum: ["Not a member", "Silver", "Gold", "Diamond"],
      default: "Not a member",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

//Hashing password before saving to the database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcryptjs.hash(this.password, 10);
});

//Method to generate JWT token
userSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

//Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

//Method to generate reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // 5 minutes

  return resetToken;
}

const User = mongoose.model("User", userSchema);

export default User;