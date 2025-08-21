import * as mongoose from "mongoose";

const readerMongooseSchema = new mongoose.Schema(
    {
        _id: Number,
        userName: String,
        email: String,
        birthdate: String,
        passHash: String,
    }
)

export const ReaderModel = mongoose.model("Reader", readerMongooseSchema, 'reader_collection');