import {
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

export default {
  /* Auth */
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
  asyncForEach
};
