import { Router } from "express";
import * as authService from "./auth.service.js";
import * as authValidation from "./auth.validation.js";
import { authentication, upload, validation } from "../../middlewares/index.js";
import { asyncHandler } from "../../utils/index.js";

const authRouter = Router({ strict: true });

authRouter.post("/register", validation(authValidation.signUpValidation), asyncHandler(authService.signUp));
authRouter.post("/confirmEmail", validation(authValidation.confirmEmailValidation), asyncHandler(authService.confirmEmail));

authRouter.post("/login", validation(authValidation.loginValidation), asyncHandler(authService.login));
authRouter.post("/logout", validation(authValidation.logoutValidation), asyncHandler(authService.logout));

authRouter.post("/forgetPassword", validation(authValidation.forgetPasswordValidation), asyncHandler(authService.forgetPassword));
authRouter.post("/resetPassword", validation(authValidation.resetPasswordValidation), asyncHandler(authService.resetPassword));

authRouter.post("/refreshToken", asyncHandler(authService.refreshToken));
authRouter.post("/refreshToken", asyncHandler(authService.refreshToken));

authRouter.patch("/uplaod-profile-pic", authentication, upload.single("file"), asyncHandler(authService.uploadProfilePic));
export default authRouter;