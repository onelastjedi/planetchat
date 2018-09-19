import {
  currentUserSession,
  currentUserUID,
  getRotatedPhotoAsBase64String,
  login,
  signup,
  forgotPassword,
  resetPassword,
  photoUrl
} from "@/utils/auth";
import { delay, log, isUpperCase, asyncForEach } from "@/utils/helpers-common";

export default {
  /* Auth */
  currentUserSession,
  currentUserUID,
  getRotatedPhotoAsBase64String,
  signup,
  login,
  forgotPassword,
  resetPassword,
  photoUrl,

  /* Helpers */
  delay,
  log,
  isUpperCase,
  asyncForEach
};
