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
exports.mutation = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const dotenv_1 = require("dotenv");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const gravatar_1 = require("gravatar");
(0, dotenv_1.config)();
exports.mutation = {
    newNote: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user) {
            throw new apollo_server_express_1.AuthenticationError('You must be signed in to create a note');
        }
        const note = {
            content: args.noteContent,
            author: context.user.id,
        };
        return yield context.models.Note.create(note);
    }),
    updateNote: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user) {
            throw new apollo_server_express_1.AuthenticationError('You must be signed in to update a note');
        }
        const note = yield context.models.Note.findById(args.noteId);
        if (!note) {
            throw new Error('Note not find');
        }
        if (note.author !== context.user.id) {
            throw new apollo_server_express_1.ForbiddenError('You don`t have permissions to update the note');
        }
        return context.models.Note.findByIdAndUpdate(args.noteId, { $set: { content: args.noteContent } }, { new: true });
    }),
    deleteNote: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user) {
            throw new apollo_server_express_1.AuthenticationError('You must be signed in to delete a note');
        }
        const note = yield context.models.Note.findById(args.noteId);
        if (note && note.author !== context.user.id) {
            throw new apollo_server_express_1.ForbiddenError('You don`t have permissions to delete the note');
        }
        try {
            if (note) {
                yield note.remove();
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }),
    toggleFavorite: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user) {
            throw new apollo_server_express_1.AuthenticationError('You must be signed in to add to favorites');
        }
        const noteCheck = yield context.models.Note.findById(args.noteId);
        if (!noteCheck) {
            throw new Error('Note not find');
        }
        const hasUser = noteCheck.favoritedBy.indexOf(context.user.id);
        if (hasUser >= 0) {
            return context.models.Note.findByIdAndUpdate(args.noteId, {
                $pull: {
                    favoritedBy: context.user.id,
                },
                $inc: {
                    favoriteCount: -1,
                },
            }, { new: true });
        }
        else {
            return context.models.Note.findByIdAndUpdate(args.noteId, {
                $push: {
                    favoritedBy: context.user.id,
                },
                $inc: {
                    favoriteCount: 1,
                },
            }, { new: true });
        }
    }),
    signUp: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // normalize email
        const email = args.email.trim().toLowerCase();
        // hashed password
        const hashed = yield (0, bcrypt_1.hash)(args.password, 10);
        // get url for avatar
        const avatar = (0, gravatar_1.url)(email);
        try {
            const user = yield context.models.User.create({
                username: args.username,
                email,
                password: hashed,
                avatar,
            });
            // create and return json web token
            return (0, jsonwebtoken_1.sign)({ id: user._id }, process.env.JWT_SECRET || '');
        }
        catch (err) {
            console.log(err);
            throw new Error('Error creating account');
        }
    }),
    signIn: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // try find user by username or email
        const user = yield context.models.User.findOne({
            $or: [{ email: (_a = args.email) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase() }, { username: args.username }],
        });
        if (!user) {
            throw new apollo_server_express_1.AuthenticationError('Error signing in');
        }
        // password verification
        const valid = yield (0, bcrypt_1.compare)(args.password, user.password);
        if (!valid) {
            throw new apollo_server_express_1.AuthenticationError('Error signing in');
        }
        // create and return json web token
        return (0, jsonwebtoken_1.sign)({ id: user._id }, process.env.JWT_SECRET || '');
    }),
};
