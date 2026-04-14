import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish } from "../controllers/blogController.js";

const blogRoute = express.Router();

blogRoute.post("/add", upload.single("image"), auth, addBlog);
blogRoute.get("/all", getAllBlogs);
blogRoute.get("/:blogId", getBlogById);
blogRoute.post("/delete", auth, deleteBlogById);
blogRoute.post("/toggle-publish", auth, togglePublish);

blogRoute.post("/add-comment", addComment);
blogRoute.post("/comment", getBlogComments);

export default blogRoute;