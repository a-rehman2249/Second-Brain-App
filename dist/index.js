"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
(0, db_1.connectdb)();
const app = (0, express_1.default)();
app.use(express_1.default.json()); //automatically convert incoming data to javascript object
app.use((0, cors_1.default)()); // by defaut allowed all origins
const signupschema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6)
});
app.post("/api/v1/signup", async (req, res) => {
    console.log("🔥 Signup route hit");
    console.log("BODY:", req.body);
    const result = signupschema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Input"
        });
    }
    const { username, password } = result.data;
    try {
        const existingUser = await db_1.userModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exist"
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10); //uses blowfish cipher algo and 10 means how much time salting is done
        const newuser = new db_1.userModel({
            username,
            password: hashedPassword
        });
        await newuser.save();
        return res.status(201).json({
            message: "User created successfully"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "serer error"
        });
    }
});
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
//# sourceMappingURL=index.js.map