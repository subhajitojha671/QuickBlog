import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comments.js";
import { generateWithGemini } from "../configs/gemini.js";

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

    const response = await imagekit.upload({
      file: imageFile.buffer.toString("base64"),
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
    const { id } = req.body;

    if (!id) {
      return res.json({ success: false, message: "Blog ID is required" });
    }

    await Blog.findByIdAndDelete(id);
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

/* =========================
   GENERATE BLOG CONTENT (FINAL)
========================= */
export const generateBlogContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({
        success: false,
        message: "Prompt is required",
      });
    }

    const structuredPrompt = `
You are a professional blog content writer and HTML formatter.

Generate a complete, well-structured blog based on this topic:

"${prompt}"

Return ONLY valid HTML. Do not use Markdown. Do not wrap the response in \`\`\`html or \`\`\`.

Use semantic HTML to structure the blog:

- Use <h1> for the main title.
- Use <h2> for major sections.
- Use <h3> for subsections.
- Use <p> for normal paragraphs.
- Use <strong> for important words or sentences that should be bold.
- Use <em> for emphasis.
- Use <ul><li> for unordered lists.
- Use <ol><li> for ordered lists.
- Use <blockquote> for important quotes or key statements.
- Use <a href="URL"> for relevant links when appropriate.
- Use tables with <table>, <thead>, <tbody>, <tr>, <th>, and <td> when a comparison or structured data would benefit from a table.
- Use <code> for technical terms or code snippets when appropriate.
- Use <pre><code> for multi-line code examples.
- Use <span style="color: #2563eb;">...</span> for important highlighted text.
- Use <span style="color: #16a34a;">...</span> for positive/key points.
- Use <span style="color: #dc2626;">...</span> for warnings or important cautions.
- Use <hr> to separate major sections when appropriate.

Formatting rules:
1. Make the content easy to read.
2. Use headings instead of making section titles bold.
3. Bold important keywords naturally.
4. Use colors sparingly and only when they improve readability.
5. Do not color entire paragraphs.
6. Do not use excessive formatting.
7. Keep the HTML clean and semantic.
8. Do not include <html>, <head>, or <body> tags.
9. Do not include CSS outside inline styles.
10. Return only the blog HTML.

The final output should be ready to insert directly into a rich-text blog editor.
`;

    const content = await generateWithGemini(structuredPrompt);

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.error("Generate Blog Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate blog content",
    });
  }
};
