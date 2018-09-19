/**
 * @file Setups HTTP client
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
import axios from "axios";
/**
 * Adds defaults to axios instance
 */
const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});
/**
 * Export axios instance
 */
export default HTTP;
