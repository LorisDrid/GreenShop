const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const authorSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  picture: { type: String, required: true },
  description: { type: String, required: true },
});

const postSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  published_date: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: null },
  author: { type: Schema.Types.ObjectId, ref: "Author" },
  teaser: { type: String, required: true },
  categories: [
    {
      title: { type: String, required: true },
    },
  ],
});

const Author = mongoose.model("Author", authorSchema);
const Post = mongoose.model("Post", postSchema);

// Create the author collection
Author.createCollection().then(() => {
  console.log("💾[DB]✍️ Author collection created !");
});

// Create the post collection
Post.createCollection().then(() => {
  console.log("💾[DB]📝 Post collection created !");
});

// Clean up the author collection
Author.deleteMany({}, () => {
  console.log("💾[DB]✍️ Author collection cleaned up !");

  // Store some authors
  Author.insertMany([
    {
      slug: "emma-loewe",
      title: "Emma Loewe",
      picture: "emma-loewe.jpeg",
      description:
        "Emma Loewe is the former Sustainability and Health Director at mindbodygreen. She is the author of Return to Nature: The New Science of How Natural Landscapes Restore Us and the co-author of The Spirit Almanac: A Modern Guide To Ancient Self Care.\n\nEmma received her B.A. in Environmental Science & Policy with a specialty in environmental communications from Duke University. In addition to penning over 1,500 mbg articles on topics from the water crisis in California to the rise of urban beekeeping, her work has appeared on Grist, Bloomberg News, Bustle, and Forbes.",
    },
    {
      slug: "devon-barrow",
      title: "Devon Barrow",
      picture: "devon-barrow.jpeg",
      description:
        "Devon Barrow is a Branded Content Editor at mindbodygreen. She received her degree from the University of Colorado. When she's away from her desk, Devon is teaching yoga, writing poetry, meditating, and traveling the world. She's based in Boulder, Colorado.\n" +
        "\n" +
        "Devon's first book, Earth Women, is coming soon. To learn more, join the mailing list, and receive updates, head to www.devonbarrowwriting.com.",
    },
  ]).then(() => {
    console.log("💾[DB]✍️ Authors stored !");

    // Clean up the post collection
    Post.deleteMany({}, async () => {
      console.log("💾[DB]📝 Post collection cleaned up !");

      const emmaId = (await Author.findOne({ slug: "emma-loewe" }).exec())._id;
      const devonId = (await Author.findOne({ slug: "devon-barrow" }).exec())
        ._id;

      // Store some posts
      Post.insertMany([
        {
          slug: "reduce-plastic-waste",
          title:
            "Reduce Your Plastic Waste With These 7 Sustainable & Refillable Soaps",
          published_date: "2021-01-01",
          content: "Detailed article about green living...",
          image: "reduce-plastic-waste.jpeg",
          teaser: "Explore the ways to live green.",
          categories: [{ title: "Environment" }, { title: "Lifestyle" }],
          author: emmaId,
        },
        {
          slug: "looking-for-ways-to-support-your-community",
          title:
            "Looking For Ways To Support Your Community? Get Inspired With These 4 Empowering Stories ",
          published_date: "2021-02-01",
          content: "Everything you need to know about sustainable fashion...",
          image: "looking-for-ways-to-support-your-community.jpeg",
          teaser: "Why choose sustainable fashion?",
          categories: [{ title: "Fashion" }],
          author: devonId,
        },
      ]).then(() => {
        console.log("💾[DB]📝 Posts stored !");
      });
    });
  });
});

module.exports = { Author, Post };
