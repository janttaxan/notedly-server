"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = require("mongoose");
const user_1 = require("./user");
const schema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        ref: user_1.User,
        required: true,
    },
    favoriteCount: {
        type: Number,
        default: 0,
    },
    favoritedBy: [
        {
            type: String,
            ref: user_1.User,
        },
    ],
}, { timestamps: true });
exports.Note = (0, mongoose_1.model)('Note', schema);
