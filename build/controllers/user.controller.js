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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.changeUsername = exports.loginUser = void 0;
var mongoose_1 = require("mongoose");
var user_model_1 = require("../models/user.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var role_1 = require("../enums/role");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./backend/config/.env.config" });
var loginUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userData = req.body.user;
                return [4 /*yield*/, user_model_1.UserModel.findOne({ email: userData.email })
                        .exec()
                        .then(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                        var user, token;
                        return __generator(this, function (_a) {
                            if (!resolve) {
                                return [2 /*return*/, res.status(401).json({
                                        status: 1,
                                        data: "Authentication Failed"
                                    })];
                            }
                            user = resolve.toObject();
                            token = jsonwebtoken_1.default.sign(user, process.env.JWT_KEY, { expiresIn: '1h' });
                            console.log("User with email: " + user.email + " logged in");
                            return [2 /*return*/, res.status(200).json({
                                    status: 0,
                                    data: { token: token }
                                })];
                        });
                    }); })
                        .catch(function () {
                        return res.status(401).json({
                            status: 1,
                            data: "Authentication Failed"
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
// Changes user username give a request body container user: { newUsername: string }
// Just for testing
var changeUsername = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUsername;
    return __generator(this, function (_a) {
        user = req.body.user;
        newUsername = req.body.newUsername;
        user_model_1.UserModel.updateOne({ _id: user._id }, { "$set": { "username": newUsername } })
            .exec()
            .then(function (resolve) {
            console.log(resolve);
            return res.status(200)
                .send("Username Successfully Updated");
        })
            .catch(function () {
            return res.status(401).json({
                status: 1,
                data: "Failed to Change Username"
            });
        });
        return [2 /*return*/];
    });
}); };
exports.changeUsername = changeUsername;
// Creats a new user given a request body containing user: { email: string, username: string, name: string }
// Just for testing
var createUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userInfo = req.body.user;
                newUser = new user_model_1.UserModel({
                    _id: new mongoose_1.Types.ObjectId(),
                    name: userInfo.name,
                    email: userInfo.email,
                    username: userInfo.username,
                    ROLE: role_1.ROLE.ADMIN
                });
                return [4 /*yield*/, newUser.save()
                        .then(function (resolve) {
                        console.log(resolve);
                        res.status(200).send("User was successfully created");
                    })
                        .catch(function (resolve) {
                        console.log(resolve);
                        res.status(401).json({
                            status: 1,
                            data: "Authentication Failed"
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
