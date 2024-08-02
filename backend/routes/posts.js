const express = require("express");
const { Post, Author } = require("../models/post");
const router = express.Router();

// Récupérer tous les posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Récupérer un post par slug
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await Post.findOne({ slug }).populate("author");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Récupérer les posts liés (par exemple, même auteur ou même catégorie)
router.get("/:slug/related", async (req, res) => {
  const { slug } = req.params;

  try {
    let post = await Post.find({ slug }).populate("author");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post = Array.isArray(post) ? post[0] : post;

    const authorSlug = post.author?.slug;
    const categoryTitles = post.categories?.map((c) => c.title) || [];

    const relatedPosts = await Post.find({
      $or: [
        { "author.slug": authorSlug },
        { "categories.title": { $in: categoryTitles } },
      ],
      _id: { $ne: post._id },
    })
      .limit(5)
      .populate("author");

    res.json(relatedPosts);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Récupérer un auteur par slug
router.get("/author/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const author = await Author.findOne({ slug });
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Récupérer les posts d'un auteur par slug
router.get("/author/:slug/posts", async (req, res) => {
  const { slug } = req.params;
  try {
    const author = await Author.findOne({ slug: slug }).exec();

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const posts = await Post.find({ author: author._id }).populate("author");

    res.json(posts);
  } catch (error) {
    console.error("Error fetching author posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
