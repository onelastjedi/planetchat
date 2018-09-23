/**
 * @file Setups Router hooks
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
import { isLoggedIn } from "./auth";
/**
 * Redirects to login if unauthorized
 */
export const requireAuth = (to, from, next) => {
  if (!isLoggedIn()) {
    next({
      path: "/login"
    });
  } else {
    next();
  }
};
/**
 * Redirects to index if authorized
 */
export const rejectAuth = (to, from, next) => {
  if (isLoggedIn()) {
    next({
      path: "/"
    });
  } else {
    next();
  }
};
