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
exports.query = void 0;
exports.query = {
    notes: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.models.Note.find({}).limit(100);
    }),
    note: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.models.Note.findById(args.noteId);
    }),
    users: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.models.User.find({}).limit(100);
    }),
    user: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.models.User.findOne({ username: args.username });
    }),
    noteFeed: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // получаем ленту с пагинацией при помощи курсора
        const limit = args.limit ? args.limit : 10;
        let hasNextPage = false;
        let cursorQuery = {};
        if (args.cursor) {
            cursorQuery = { _id: { $lt: args.cursor } };
        }
        let notes = yield context.models.Note.find(cursorQuery)
            .sort({ _id: -1 })
            .limit(limit + 1);
        if (notes.length > limit) {
            hasNextPage = true;
            notes = notes.slice(0, -1);
        }
        const newCursor = notes[notes.length - 1]._id;
        return {
            notes,
            cursor: newCursor,
            hasNextPage,
        };
    }),
    me: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return context.models.User.findById((_a = context.user) === null || _a === void 0 ? void 0 : _a.id);
    }),
};
