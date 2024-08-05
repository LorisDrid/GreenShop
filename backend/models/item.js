const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Label = require("./label");

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  previousPrice: {
    type: Number,
    min: 0,
    default: 0,
  },
  supplier: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "default.jpg",
    required: true,
  },
  rate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  rateCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  labels: [
    {
      type: Schema.Types.ObjectId,
      ref: "Label",
    },
  ],
  greenScore: {
    type: String,
    enum: ["A", "B", "C", "D", "E"],
    default: "A",
  },
  weight_value: {
    type: Number,
    required: true,
    min: 0,
  },
  weight_unit: {
    type: String,
    required: true,
    enum: ["g", "lb", "kg", "mt"],
  },
  distance_value: {
    type: Number,
    required: true,
    min: 0,
  },
  distance_unit: {
    type: String,
    required: true,
    enum: ["mi", "km"],
  },
  transport_method: {
    type: String,
    required: true,
    enum: ["ship", "train", "truck", "plane"],
  },
});

const Item = mongoose.model("Item", itemSchema);

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
      category: "System of certification",
      description:
        "Ensures that products are manufactured in a way that is fair to producers and workers. Is the most recognised and trusted sustainability label in the world",
    },
    {
      name: "FSC",
      image_url: "fsc.png",
      category: "Multi-stakeholder organization",
      description:
        "Guarantees that the wood or paper used in the product comes from responsibly managed forests.",
    },
    {
      name: "Organic",
      image_url: "organic.png",
      category: "Sustainability label",
      description:
        "Certifies that the product is made from organic materials, without the use of harmful chemicals.",
    },
    {
      name: "Recycled",
      image_url: "recycled.png",
      category: "Sustainability label",
      description:
        "Made from recycled materials, reducing waste and environmental impact.",
    },
    {
      name: "Vegan",
      image_url: "vegan.png",
      category: "Sustainability label",
      description: "Contains no animal products or by-products.",
    },
  ]).then((labels) => {
    console.log("💾[DB]🏷 Items stored !");

    // Create the item collection
    Item.createCollection().then(() => {
      console.log("💾[DB]🪴 Item collection created !");
    });

    // Clear all items
    Item.deleteMany({}).then(() => {
      console.log("💾[DB]🪴 Items cleared !");

      // Store some items
      Item.insertMany([
        {
          name: "Natural Bamboo Toothbrush",
          description: "Natural bamboo toothbrush with charcoal bristles",
          price: 8.49,
          previousPrice: 9.99,
          supplier: "Bamboo Inc.",
          image: "bamboo-toothbrush.jpg",
          rate: 5,
          rateCount: 300,
          labels: [labels[0], labels[2], labels[4]],
          greenScore: "A",
          weight_value: 30,
          weight_unit: "g",
          distance_value: 500,
          distance_unit: "km",
          transport_method: "truck",
        },
        {
          name: "Zero Waste Kitchen Pack",
          description: "Complete zero waste kitchen pack",
          price: 15.49,
          supplier: "Kitchen Inc.",
          image: "zero-waste-kit.jpg",
          rate: 5,
          rateCount: 134,
          greenScore: "B",
          weight_value: 200,
          weight_unit: "g",
          distance_value: 10000,
          distance_unit: "km",
          transport_method: "ship",
        },
        {
          name: "Reusable Bamboo Bottle",
          description: "Reusable glass bottle with bamboo cap",
          price: 12.99,
          supplier: "Bamboo Inc.",
          image: "bamboo-water-bottle.jpg",
          rate: 4.5,
          rateCount: 150,
          labels: [labels[0], labels[3]],
          greenScore: "C",
          weight_value: 400,
          weight_unit: "g",
          distance_value: 2500,
          distance_unit: "km",
          transport_method: "train",
        },
        {
          name: "Kitchen Smooth Sponge",
          description: "Reusable kitchen sponge made of natural materials",
          price: 2.99,
          previousPrice: 3.49,
          supplier: "Kitchen Inc.",
          image: "kitchen-smooth-sponge.jpg",
          rate: 4.5,
          rateCount: 1250,
          labels: [labels[0], labels[3], labels[4]],
          weight_value: 50,
          weight_unit: "g",
          distance_value: 20,
          distance_unit: "km",
          transport_method: "truck",
        },
        {
          name: "Organic Cotton Tote Bag",
          description: "Organic cotton tote bag with bamboo handles",
          price: 7.99,
          supplier: "Bamboo Inc.",
          image: "cotton-tote-bag.jpg",
          rate: 3.5,
          rateCount: 200,
          labels: [labels[0], labels[2]],
          weight_value: 100,
          weight_unit: "g",
          distance_value: 300,
          distance_unit: "km",
          transport_method: "truck",
        },
        {
          name: "Organic Bamboo Cutlery Set",
          description: "Organic bamboo cutlery set with cotton pouch",
          price: 9.99,
          supplier: "Bamboo Inc.",
          image: "bamboo-cutlery-set.jpg",
          rate: 4,
          rateCount: 100,
          weight_value: 150,
          weight_unit: "g",
          distance_value: 400,
          distance_unit: "km",
          transport_method: "truck",
        },
        {
          name: "Organic Skincare Products",
          description: "Complete natural skincare products set",
          price: 6.99,
          supplier: "Bamboo Inc.",
          image: "organic-skincare-products.jpg",
          rate: 4,
          rateCount: 250,
          createdAt: new Date("2050-01-01"),
          weight_value: 300,
          weight_unit: "g",
          distance_value: 1800,
          distance_unit: "km",
          transport_method: "train",
        },
        {
          name: "Bamboo Cutlery Set",
          description: "Bamboo cutlery set with cotton pouch",
          price: 15.99,
          supplier: "Bamboo Inc.",
          image: "bamboo-cutlery-set.jpg",
          rate: 3.5,
          rateCount: 150,
          createdAt: new Date("2050-01-01"),
          labels: [labels[0], labels[2]],
          greenScore: "B",
          weight_value: 180,
          weight_unit: "g",
          distance_value: 5900,
          distance_unit: "km",
          transport_method: "plane",
        },
        {
          name: "Biodegradable Plant Pot",
          description: "Biodegradable plant pot made of natural materials",
          price: 4.99,
          supplier: "Bamboo Inc.",
          image: "biodegradable-plant-pots.jpg",
          rate: 4,
          rateCount: 200,
          labels: [labels[3]],
          greenScore: "E",
          createdAt: new Date("2050-01-01"),
          weight_value: 250,
          weight_unit: "g",
          distance_value: 1200,
          distance_unit: "km",
          transport_method: "truck",
        },
        {
          name: "Kitchen Degreaser Cleaning",
          description: "Organic bamboo utensil set with cotton pouch",
          price: 8.99,
          supplier: "Bamboo Inc.",
          image: "kitchen-degreaser-cleaning.jpg",
          rate: 2.5,
          rateCount: 100,
          createdAt: new Date("2050-01-01"),
          weight_value: 350,
          weight_unit: "g",
          distance_value: 1100,
          distance_unit: "km",
          transport_method: "train",
        },
      ]).then(() => console.log("💾[DB]🪴 Items stored !"));
    });
  });
});

module.exports = Item;
