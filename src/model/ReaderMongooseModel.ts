import * as mongoose from "mongoose";

const readerMongoSchema = new mongoose.Schema({
        _id:{type:Number, length: 9, required: true},
        userName: {type:String, required: true},
        email: {type:String, required:true},
        birthdate: {type:String, required:true},
        passHash: {type:String, required:true},
        roles:{type:Array,required:true}
});

export const ReaderModel = mongoose.model("Reader", readerMongoSchema, 'reader_collection');