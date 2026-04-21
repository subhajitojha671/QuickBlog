import fs from "fs/promises";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comments.js";
import main from "../configs/gemini.js";

/* =========================
   ADD BLOG
========================= */
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = req.body;
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
      isPublished: isPublished === "true",
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
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
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
    const { id } = req.body; // ✅ FIXED

    if (!id) {
      return res.json({ success: false, message: "Blog ID is required" });
    }

    await Blog.findByIdAndDelete(id);

    // delete all comments associated with the blog
    await Comment.deleteMany({ blog: id });

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });

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
    const { id } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

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

/* =========================
   ADD COMMENT
========================= */
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    await Comment.create({ blog, name, content });

    res.json({ success: true, message: "Comment added successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   GET BLOG COMMENTS
========================= */
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({ success: true, comments });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateBlogContent = async (req, res) => {
  try{
    const {prompt} = req.body;
    const content = await main(prompt + ' Generate a blog content for this topic in simple text format');
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}