"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDbConnection = exports.connectToDb = void 0;
const mongoose_1 = require("mongoose");
function connectToDb(mongoURI) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('MongoDB connection...');
        try {
            yield (0, mongoose_1.connect)(mongoURI);
            console.log('Connected to MongoDB successfully!');
        }
        catch (err) {
            console.error(err);
            console.log('MongoDB connection error. Please make sure MongoDB is running');
            process.exit();
        }
    });
}
exports.connectToDb = connectToDb;
function closeDbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.connection.close();
    });
}
exports.closeDbConnection = closeDbConnection;
