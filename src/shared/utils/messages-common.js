/**
 * @file Provides common messages utilities
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export const base64 = {
  /* Encodes message to base64 encoded ASCII string */
  encode: message => btoa(unescape(encodeURIComponent(message))),
  /* Decodes message from base64 encoded ASCII string */
  decode: message => decodeURIComponent(escape(atob(message)))
};

/* Creates sent_datetime as seconds since epoch in UTC */
export const datetime = () => Math.round(Date.now() / 1000);

/**
 * Parse system message
 * @param {object} text System message to parse from
 * @return {string} Parsed system message
 */
export const parseSystemMessage = text => {
  const object = JSON.parse(text);

  switch (object.ac) {
    case "user_deleted":
      if (object.byu.un === object.tou.un)
        return `${object.byu.fn} ${
          object.byu.ln
        } removed themselves from this group`;
      else
        return `${object.byu.fn} ${object.byu.ln} removed ${object.tou.fn} ${
          object.tou.ln
        } from this group`;

    case "user_added":
      if (object.byu.un === object.tou.un)
        return `${object.byu.fn} ${
          object.byu.ln
        } added themselves to this group`;
      else
        return `${object.byu.fn} ${object.byu.ln} added ${object.tou.fn} ${
          object.tou.ln
        } to this group`;

    case "group_deleted":
      return "group_deleted";

    case "group_changed":
      if (object.change.function === "nam")
        return `${object.byu.fn} ${object.byu.ln} changed the group name from ${
          object.change.old
        } to ${object.change.new}`;

      if (object.change.function === "dsc")
        return `${object.byu.fn} ${
          object.byu.ln
        } changed the group description from ${object.change.old} to ${
          object.change.new
        }`;
  }
};
