"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true },
    },
    email: {
        type: String,
        required: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
}, { timestamps: true });
// timestamps: присваивает поля createdAt и updatedAt к типу данных
exports.User = (0, mongoose_1.model)('User', schema);
