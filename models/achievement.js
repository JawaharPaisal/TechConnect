// const mongoose = require("mongoose");

// const achievementSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "Achievement title is required"],
//   },
//   description: {
//     type: String,
//     required: [true, "Achievement description is required"],
//   },
//   date:{
//     type:Date,
//     required:[true,"Achievement done date is required"],
//   },
//   type:{
//     type:String,
//     required:[true,"Achievement type is required"],
//   },
//   image: {
//     type: String,  // Storing image URL or path
//     required: [true, "Achievement image is required"],
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,  // Reference to User
//     ref: "User",
//     required: [true, "User is required"],
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: ["Requested", "Approved", "Rejected"],
//     default: "Requested",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Achievement", achievementSchema);

const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Achievement title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Achievement description is required"],
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  date: {
    type: Date,
    required: [true, "Achievement date is required"],
    validate: {
      validator: function (value) {
        return value <= new Date(); // Ensures the date is not in the future
      },
      message: "Date cannot be in the future",
    },
  },
  type: {
    type: String,
    required: [true, "Achievement type is required"],
    enum: ["academic", "nonacademic"], // Restricting to specific values
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  level: {
    type: String,
    required: [true, "Level is required"],
  },
  reward: {
    type: String,
    required: [true, "Reward details are required"],
    maxlength: [100, "Reward details cannot exceed 100 characters"],
  },
  isGroupAchievement: {
    type: Boolean,
    default: false,
  },
  groupMembers: {
    type: [
      {
        name: {
          type: String,
          required: [true, "Group member name is required"],
        },
        rollNo: {
          type: String,
          required: [true, "Group member roll number is required"],
        },
        _id: false, // Disable the automatic creation of _id for group members
      },
    ],
    validate: {
      validator: function (value) {
        return this.isGroupAchievement ? value.length > 0 : true;
      },
      message: "Group members must be added for a group achievement",
    },
  },
  image: {
    type: String, // Stores image URL or path
    required: [true, "Achievement image is required"],
  },
    user: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to User
    ref: "User",
    required: [true, "User is required"],
  },
  status: {
    type: String,
    enum: ["Requested", "Approved", "Rejected"],
    default: "Requested",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Achievement || mongoose.model("Achievement", achievementSchema);