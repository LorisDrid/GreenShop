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
        '<div class="text-gray-800 space-y-4">' +
        '    <p><strong class="text-black">Emma Loewe</strong> is the former Sustainability and Health Director at <span class="font-semibold text-green-600">mindbodygreen</span>. She is the author of <em>Return to Nature: The New Science of How Natural Landscapes Restore Us</em> and the co-author of <em>The Spirit Almanac: A Modern Guide To Ancient Self Care</em>.</p>' +
        '    <p>Emma received her B.A. in Environmental Science & Policy with a specialty in environmental communications from Duke University. In addition to penning over 1,500 mbg articles on topics from the water crisis in California to the rise of urban beekeeping, her work has appeared on <span class="font-bold text-blue-500">Grist</span>, <span class="font-bold text-blue-500">Bloomberg News</span>, <span class="font-bold text-blue-500">Bustle</span>, and <span class="font-bold text-blue-500">Forbes</span>.</p>' +
        "</div>",
    },
    {
      slug: "devon-barrow",
      title: "Devon Barrow",
      picture: "devon-barrow.jpeg",
      description:
        '<div class="text-gray-800 space-y-4">' +
        '    <p><strong class="text-black">Devon Barrow</strong> is a Branded Content Editor at <span class="font-semibold text-green-600">mindbodygreen</span>. She received her degree from the <span class="font-semibold">University of Colorado</span>. When she\'s away from her desk, Devon is teaching yoga, writing poetry, meditating, and traveling the world. She\'s based in Boulder, Colorado.</p>' +
        '    <p>Devon\'s first book, <em>Earth Women</em>, is coming soon. To learn more, join the mailing list, and receive updates, head to <a href="http://www.devonbarrowwriting.com" class="text-blue-500 underline">www.devonbarrowwriting.com</a>.</p>' +
        "</div>",
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
          content:
            "<em>We carefully vet all products and services featured on mindbodygreen using our commerce guidelines. Our selections are never influenced by the commissions earned from our links.</em><br/><br/> In an effort to make products that are easier to ship and gentler on the earth, many household companies are now experimenting with refill options.<br/><br/> These allow you to buy one reusable bottle for your soap and refill it as needed—saving on plastic packaging waste. Here are a few refillable hand soap, dish soap, and cleaning products that will leave your home (and conscience) squeaky clean. <br/><br/>",
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
          content:
            "The decision to make wellness a priority is something we can only do on our own. But after that (as any spin class or dinner party will prove), health and fitness are best when shared. Community has a way of making our personal goals and journeys more fun but also more effective. As the famous Helen Keller quote goes, \"If you want to go fast, go alone. If you want to go far, go together.\"<br/><br/>It's easy to get stuck in the tunnel vision of our next goal or milestone, but tapping into the power of community is the ticket to true transformation. And nothing proves that like nutritional brand Quest's mission to champion inspirational individuals who are on a personal quest to make an impact in their local communities. Quest recently awarded grants to four lucky recipients who are making a difference in their local communities. These four individuals and their organizations serve as a much-needed reminder for all of us to get engaged with our local communities… There's so much we can do to make a difference in the world just beyond our doorstep, and we're about to prove it to you. <br/><br/><h4>Ready to make a difference? Consider these four stories your inspiration.</h4><br/>These days, nothing hits like stories and headlines of people doing good in the world. And with the four recipients of the Quest grant, there's no shortage of good feels. Each supported by a $20,000 grant from Quest to further their personal quests and make a positive impact in their community, these changemakers demonstrate that our personal passions are often our avenue of greatest impact in the world. We all want to make the world a better place, but it can be tricky to know where to begin. Consider these inspiring stories your starting point!",
          image: "looking-for-ways-to-support-your-community.jpeg",
          teaser: "Why choose sustainable fashion?",
          categories: [{ title: "Environment" }, { title: "Community" }],
          author: devonId,
        },
      ]).then(() => {
        console.log("💾[DB]📝 Posts stored !");
      });
    });
  });
});

module.exports = { Author, Post };
