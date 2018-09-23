import {
  getAppConfig,
  currentUserSession,
  currentUserUID,
  getRotatedPhotoAsBase64String,
  login,
  logout,
  signup,
  forgotPassword,
  resetPassword,
  photoUrl
} from "./auth";
import { delay, log, isUpperCase, asyncForEach } from "./helpers-common";
import { base64, parseSystemMessage, datetime } from "./messages-common";
import HTTP from "./http-common";

export default {
  /* Auth */
  getAppConfig,
  currentUserSession,
  currentUserUID,
  getRotatedPhotoAsBase64String,
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  photoUrl,

  /* Helpers */
  delay,
  log,
  isUpperCase,
  asyncForEach,

  /* Messages */
  base64,
  parseSystemMessage,
  datetime,

  /* HTTP */
  HTTP
};
