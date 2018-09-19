/**
 * @file Holds utilities to work with FileReader
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */

/**
 * Converts FileReader.readAsDataURL to async/await ready function
 * @param {BinaryType} blob
 * @returns {string} DataURL
 */
export const readBlobAsDataUrl = blob => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input blob"));
    };

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(blob);
  });
};
