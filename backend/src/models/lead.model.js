import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadTitle: {
      type: String,
      required: [true, "Please enter project title"],
      trim: true,
    },

    clientDetails: {
      name: {
        type: String,
        required: [true, "Please Enter Client Name"],
        maxLength: [25, "Name cannot exceed 25 characters"],
        minLength: [3, "Name must be at least 3 characters"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Please Enter Mobile Number"],
        validate: {
          validator: function (v) {
            return /^[6-9]\d{9}$/.test(v);
          },
          message: "Please enter a valid 10-digit mobile number",
        },
      },
    },

    size: {
      type: String,
      required: [true, "Please enter project size"],
    },

    budget: {
      type: String,
      required: [true, "Please enter budget"],
    },

    city: {
      type: String,
      required: [true, "Please enter city"],
    },

    description: {
      requirements: {
        type: String,
        enum: ["Design", "Execution", "Design & Execution"],
      },
      readyToMeet: {
        type: String,
      },
      timeToStart: {
        type: String,
        enum: ["Immediately", "Within 1 month", "Within 3 months"],
      },
      meetingDetails: {
        type: String
      },
      streetAddress: {
        type: String
      }
    },

    // Lead Status
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },

    //Which user create the lead
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },

    // Who bought the lead
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Optional: multiple buyers (if needed later)
    buyers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        purchasedAt: {
          type: Date,
          default: Date.now,
        }
      }
    ],

    maxBuyers: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;