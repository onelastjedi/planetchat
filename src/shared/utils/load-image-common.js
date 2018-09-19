/**
 * @file Holds utilities to work with EXIF
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
import loadImage from "blueimp-load-image";

/* Async/await version of parseMetadata method */
export const readBlobExifRotation = blobOrFile => {
  return new Promise(resolve => {
    loadImage.parseMetaData(blobOrFile, data => {
      if (data.exif) resolve(data.exif.get("Orientation"));
      else resolve(0);
    });
  });
};

/* Async/await version of toDataURL method */
export const returnRotatedImage = (blobOrFile, orientation) => {
  return new Promise(resolve => {
    loadImage(
      blobOrFile,
      canvas => {
        const base64data = canvas.toDataURL("image/jpeg");
        resolve(base64data);
      },
      {
        canvas: true,
        orientation: orientation
      }
    );
  });
};
