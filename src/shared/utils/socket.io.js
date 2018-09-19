/**
 * @file Holds socket.io factory function
 * @since 0.2.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
import io from "socket.io-client";
import lib from "@/utils/lib";
import store from "@/store";

class Socket {
  /* Construct socket.io object with given API's url */
  constructor(API_URL) {
    this.socket = io(API_URL, { autoConnect: false });
  }

  /**
   * Creates socket connection
   * @param {array} queue Callbacks array
   */
  @lib.log("Connected")
  async open(queue) {
    /* Opens socket connection */
    this.socket.open();

    /* If user already logged performs relogin with same session */
    if (lib.currentUserSession()) {
      this.emit("relogin", {
        session: lib.currentUserSession()
      });

      /* Performs async setTimeout */
      await lib.delay(1000);
    }

    /* Forward callback queue to processor */
    this.on(queue);
  }

  /**
   * Socket.io 'on' processor
   * @param {array} queue Callbacks queue to process
   */
  on(queue) {
    queue.forEach(callback =>
      this.socket.on(callback, payload => this.emitHandler(payload, callback))
    );
  }

  /**
   * Socket.io 'emit' processor
   * @param {strint} action From store to perform
   * @param {*} params For passing to request
   */
  emit(action, params) {
    this.socket.emit(action, params);
  }

  /**
   * Parses data from API and sends to related hanlder
   * @param {*} payload
   * @param {*} callback
   */
  emitHandler(payload, callback) {
    const { code, res } = JSON.parse(payload);
    const notification = JSON.parse(payload);

    /* Error */
    if (code && code !== 200) return this.errorHandler(res.info);

    /* Callback defined */
    if (res && callback) this.storeHandler(res, callback);

    /* Notification */
    if (!code && !res) this.storeHandler(notification, callback);
  }

  /**
   * Performs store action based on callback
   * @param {object} payload Data recieved from API
   * @param {string} callback Callback name
   */
  storeHandler(payload, callback) {
    store.dispatch(callback, payload);
  }

  /**
   * Performs error handling
   * @param {string} info
   */
  errorHandler(info) {
    /* TODO: Create error handler */
    console.log(info);
  }
}

/* Creates new class instance end export it */
export default new Socket(process.env.VUE_APP_API_BASE_URL);
