const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Label = mongoose.model("Label", labelSchema);

// Create the label collection
Label.createCollection().then(() => {
  console.log("💾[DB]🏷 Label collection created !");
});

// Clear all labels
Label.deleteMany({}).then(() => {
  console.log("💾[DB]🏷 Labels cleared !");

  // Store some labels
  Label.insertMany([
    {
      name: "Fair Trade",
      image_url: "fair-trade.png",
      description:
        "Ensures that products are manufactured in a way that is fair to producers and workers.",
    },
    {
      name: "FSC",
      image_url: "fsc.png",
      description:
        "Guarantees that the wood or paper used in the product comes from responsibly managed forests.",
    },
    {
      name: "Organic",
      image_url: "organic.png",
      description:
        "Certifies that the product is made from organic materials, without the use of harmful chemicals.",
    },
    {
      name: "Recycled",
      image_url: "recycled.png",
      description:
        "Made from recycled materials, reducing waste and environmental impact.",
    },
    {
      name: "Vegan",
      image_url: "vegan.jpg",
      description: "Contains no animal products or by-products.",
    },
  ]).then(() => console.log("💾[DB]🏷 Items stored !"));
});

module.exports = Label;
