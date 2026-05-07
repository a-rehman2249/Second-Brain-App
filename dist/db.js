"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = exports.connectdb = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const connectdb = async () => {
    try {
        await mongoose_1.default.connect("mongodb://localhost:27017/second_brain_clone");
        console.log("Database connected successfully");
    }
    catch (err) {
        if (err instanceof Error) { //check if thing was created from error class
            console.error("Database connection error:", err.message);
        }
        else {
            console.error("Unknown error:", err);
        }
        process.exit(1); //npm install --save-dev @types/node  downloaded this
        //actually it provides a declaration file file like for process, fs , require etc.
        //app will not be longer running after this
    }
};
exports.connectdb = connectdb;
//Now Given below will look a bit confusing as I am using type script and still not specifying types as mongoose and typescript works magically here specifying the type but still on runtime if some give password 123 an int the typescript may notbe able to caught it so or that it's a better approch to make an interface for user specyfying types
//  const userSchema = new Schema<IUser>({
//      username: { type: String, required: true, unique: true },
//      password: { type: String, required: true }
//  });
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.userModel = (0, mongoose_1.model)("User", userSchema);
const contentSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    link: String,
    type: String,
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Tag" }]
});
exports.contentModel = (0, mongoose_1.model)("Content", contentSchema);
const tagSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }
});
exports.tagModel = (0, mongoose_1.model)("Tag", tagSchema);
const linkSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }
});
exports.linkModel = (0, mongoose_1.model)("Link", linkSchema);
//# sourceMappingURL=db.js.map