/**
 * @file Performs User authentification
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
import HTTP from "./http-common";
import { readBlobExifRotation, returnRotatedImage } from "./load-image-common";

/**
 * Sets session storage
 * @param {string} user_id Returned from backend
 * @param {string} session Returned from backend
 */
export const setUser = ({ session, user_id }) => {
  sessionStorage.clear();
  sessionStorage.setItem("planet:chat:user_id", user_id);
  sessionStorage.setItem("planet:chat:session", session);
  location.reload();
};

/**
 * Gets session from backend and saves to session storage
 * @param {string} email User's email to get session
 * @param {string} password User's password to get session
 * @returns {string} Path for route to
 */
export const login = async ({ account, password }) => {
  try {
    const res = await HTTP.post("user/login", {
      account,
      password
    });
    setUser(res.data);
    return "/";
  } catch ({
    response: {
      data: { info }
    }
  }) {
    throw new Error(info);
  }
};

/**
 * Creates new user
 * @param {object} params Params of new user
 * @returns {string} path to redirect
 */
export const signup = async params => {
  try {
    await HTTP.post("user", params);
    return "/login";
  } catch ({
    response: {
      data: { info }
    }
  }) {
    throw new Error(info);
  }
};

/**
 * Asks server to send reset password email
 * @param {string} email
 * @returns {string} Path to redirect
 */
export const forgotPassword = async ({ email }) => {
  try {
    await HTTP.put("/user/password/reset", {
      email
    });
    return "/reset";
  } catch ({
    response: {
      data: { info }
    }
  }) {
    throw new Error(info);
  }
};

/**
 * Asks server to reset password
 * @param {string} email
 * @param {token} token
 * @param {string} new_password
 * @returns {string} Parh to redirect
 */
export const resetPassword = async ({ email, token, new_password }) => {
  try {
    await HTTP.put("/user/password/token", {
      email,
      token,
      new_password
    });
    return "/login";
  } catch ({
    response: {
      data: { info }
    }
  }) {
    throw new Error(info);
  }
};

/**
 * Clears session storage
 */
export const logout = () => {
  sessionStorage.clear();
  location.reload();
};

/**
 * Returns login status
 * @returns {boolean}
 */
export const isLoggedIn = () =>
  sessionStorage.getItem("planet:chat:session") || null;

/**
 * Returns current user's uid from session storage
 * @returns {number}
 */
export const currentUserUID = () =>
  +sessionStorage.getItem("planet:chat:user_id") || null;

/**
 * Returns current session from session storage
 * @returns {string}
 */
export const currentUserSession = () =>
  sessionStorage.getItem("planet:chat:session") || null;

/**
 * Creates authorized link to photo
 * @param {number} pid Photo ID on server
 * @returns {string} Authorized to fetch image from server
 */
export const photoUrl = pid =>
  `${localStorage.getItem(
    "planetchat:rest"
  )}/photo/${pid}?session=${currentUserSession()}&version=360thumb`;

/**
 * Downloads image as blob, read EXIF and returns as base64String
 * @param {string} url Authorized to fetch image from server
 * @returns {string} That contains image as Base64 encoded string
 */
export const getRotatedPhotoAsBase64String = async pid => {
  /* Get authorized url from pid */
  const url = photoUrl(pid);

  /* Downloads from url as blob */
  const { data } = await HTTP.get(url, {
    responseType: "blob"
  });

  /* Reads rotation from EXIF */
  const orientation = await readBlobExifRotation(data);

  /* Fix image rotation and return as Base64 */
  const rotatedImage = await returnRotatedImage(data, orientation);

  return rotatedImage;
};

export const getLocalRotatedPhotoAsBase64String = async fileOrBlob => {
  /* Reads rotation from EXIF */
  const orientation = await readBlobExifRotation(fileOrBlob);

  /* Fix image rotation and return as Base64 */
  const rotatedImage = await returnRotatedImage(fileOrBlob, orientation);

  return rotatedImage;
};

/* Configurings API endpoints */
export const getAppConfig = async () => {
  try {
    const {
      data: { restAddress, restPort, socketAddress, socketPort }
    } = await HTTP.get(process.env.VUE_APP_API_CONFIG_URL);

    localStorage.setItem("planetchat:rest", `${restAddress}:${restPort}`);
    localStorage.setItem("planetchat:ws", `${socketAddress}:${socketPort}`);
  } catch (error) {
    console.log(error);
  }
};
