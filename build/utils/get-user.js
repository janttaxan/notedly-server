"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const getUser = (token) => {
    if (token) {
        try {
            const user = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || '');
            if (user) {
                return user;
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw new Error('Session invalid');
        }
    }
    return null;
};
exports.getUser = getUser;
