/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const workouts_module_1 = __webpack_require__(7);
const posts_module_1 = __webpack_require__(10);
const comments_module_1 = __webpack_require__(13);
const upload_module_1 = __webpack_require__(16);
const users_module_1 = __webpack_require__(19);
const auth_module_1 = __webpack_require__(30);
const mongoose_1 = __webpack_require__(20);
const config_1 = __webpack_require__(33);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            workouts_module_1.WorkoutsModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            upload_module_1.UploadModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI)
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(6);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const workouts_controller_1 = __webpack_require__(8);
const workouts_service_1 = __webpack_require__(9);
let WorkoutsModule = class WorkoutsModule {
};
exports.WorkoutsModule = WorkoutsModule;
exports.WorkoutsModule = WorkoutsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [workouts_controller_1.WorkoutsController],
        providers: [workouts_service_1.WorkoutsService]
    })
], WorkoutsModule);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let WorkoutsController = class WorkoutsController {
};
exports.WorkoutsController = WorkoutsController;
exports.WorkoutsController = WorkoutsController = tslib_1.__decorate([
    (0, common_1.Controller)('workouts')
], WorkoutsController);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let WorkoutsService = class WorkoutsService {
};
exports.WorkoutsService = WorkoutsService;
exports.WorkoutsService = WorkoutsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], WorkoutsService);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const posts_controller_1 = __webpack_require__(11);
const posts_service_1 = __webpack_require__(12);
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService]
    })
], PostsModule);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let PostsController = class PostsController {
};
exports.PostsController = PostsController;
exports.PostsController = PostsController = tslib_1.__decorate([
    (0, common_1.Controller)('posts')
], PostsController);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let PostsService = class PostsService {
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PostsService);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const comments_controller_1 = __webpack_require__(14);
const comments_service_1 = __webpack_require__(15);
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [comments_controller_1.CommentsController],
        providers: [comments_service_1.CommentsService]
    })
], CommentsModule);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let CommentsController = class CommentsController {
};
exports.CommentsController = CommentsController;
exports.CommentsController = CommentsController = tslib_1.__decorate([
    (0, common_1.Controller)('comments')
], CommentsController);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let CommentsService = class CommentsService {
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CommentsService);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const upload_controller_1 = __webpack_require__(17);
const upload_service_1 = __webpack_require__(18);
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [upload_controller_1.UploadController],
        providers: [upload_service_1.UploadService]
    })
], UploadModule);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let UploadController = class UploadController {
};
exports.UploadController = UploadController;
exports.UploadController = UploadController = tslib_1.__decorate([
    (0, common_1.Controller)('upload')
], UploadController);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let UploadService = class UploadService {
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UploadService);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(20);
const user_schema_1 = __webpack_require__(21);
const users_service_1 = __webpack_require__(22);
const users_controller_1 = __webpack_require__(26);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(20);
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "bio", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
exports.User = User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(20);
const mongoose_2 = __webpack_require__(23);
const user_schema_1 = __webpack_require__(21);
const bcrypt = tslib_1.__importStar(__webpack_require__(24));
const validator = tslib_1.__importStar(__webpack_require__(25));
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async signup(email, password, username, firstName, lastName) {
        if (!email || !password || !username || !firstName || !lastName) {
            throw new common_1.BadRequestException('All fields must be filled');
        }
        if (!validator.isEmail(email)) {
            throw new common_1.BadRequestException('Email is not valid');
        }
        if (!validator.isStrongPassword(password)) {
            throw new common_1.BadRequestException('Password not strong enough');
        }
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            username,
            firstName,
            lastName,
        });
        return await newUser.save();
    }
    async login(email, password) {
        if (!email || !password) {
            throw new common_1.BadRequestException('All fields must be filled');
        }
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid login credentials');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new common_1.UnauthorizedException('Incorrect password');
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("validator");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const users_service_1 = __webpack_require__(22);
const signup_dto_1 = __webpack_require__(27);
const login_dto_1 = __webpack_require__(29);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signup(body) {
        const { email, password, username, firstName, lastName } = body;
        return this.usersService.signup(email, password, username, firstName, lastName);
    }
    async login(body) {
        const { email, password } = body;
        return this.usersService.login(email, password);
    }
};
exports.UsersController = UsersController;
tslib_1.__decorate([
    (0, common_1.Post)('signup'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof signup_dto_1.SignupDto !== "undefined" && signup_dto_1.SignupDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
exports.UsersController = UsersController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignupDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(28);
class SignupDto {
}
exports.SignupDto = SignupDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)(),
    tslib_1.__metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], SignupDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], SignupDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], SignupDto.prototype, "lastName", void 0);


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(28);
class LoginDto {
}
exports.LoginDto = LoginDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_controller_1 = __webpack_require__(31);
const auth_service_1 = __webpack_require__(32);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService]
    })
], AuthModule);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AuthController = class AuthController {
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth')
], AuthController);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AuthService = class AuthService {
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AuthService);


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const common_2 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT;
    await app.listen(port);
    common_2.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map