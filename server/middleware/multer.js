// import multer from "multer";
// import fs from "fs";

// // ensure uploads folder exists
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });



// const upload = multer({ storage });

// export default upload;

import multer from "multer";

// Vercel's serverless functions run on a read-only filesystem (except /tmp),
// so we can't write uploaded files to disk. Keep them in memory instead and
// upload the buffer straight to ImageKit (see blogController.js).
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;