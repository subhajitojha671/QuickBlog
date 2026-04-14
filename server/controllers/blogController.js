import fs from "fs/promises";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comments.js";
import { create } from "domain";

/* =========================
   ADD BLOG
========================= */
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = await fs.readFile(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer.toString("base64"),
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished: true,
    });

    await fs.unlink(imageFile.path);

    res.json({ success: true, message: "Blog added successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/* =========================
   GET ALL BLOGS
========================= */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   GET SINGLE BLOG
========================= */
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, blog });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   DELETE BLOG
========================= */
export const deleteBlogById = async (req, res) => {
  try {
    const { Id } = req.body; 
    await Blog.findByIdAndDelete(Id);

    //delete all comments associated with the blog
    await Comment.deleteMany({blog : id});


    res.json({success: true, message: "Blog deleted successfully"});


  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   TOGGLE PUBLISH
========================= */
export const togglePublish = async (req, res) => {
  try {

     console.log("BODY:", req.body);
    const { id } = req.body;
   

    console.log("ID:", id);  

    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;

    await blog.save();

    res.json({
      success: true,
      message: "Blog publish status updated successfully",
      
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const addComment = async (req, res) => {
  try{
    const {blog, name, content} = req.body;
    
    await Comment.create({blog, name, content});

    res.json({success: true, message: "Comment added successfully"});

  }catch(error){
    res.json({success: false, message: error.message});
  }
}


export const getBlogComments = async (req, res) => {
  try{
    const {blogId} = req.body;
    const comments= await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
    res.json({success: true, comments});
  }catch(error){
    res.json({success: false, message: error.message});
  }
}