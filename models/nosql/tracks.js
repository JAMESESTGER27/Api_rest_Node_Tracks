const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const TracksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Implementar metodo propio con relacion a storage

TracksSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages",
        localFiedl: "mediaId",
        foreignFiled: "_id",
        as: "audio",
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

TracksSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $math: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "storages",
        localFiedl: "mediaId",
        foreignFiled: "_id",
        as: "audio",
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

TracksSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
});
module.exports = mongoose.model("tracks", TracksSchema);
