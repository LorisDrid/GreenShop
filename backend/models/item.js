const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

const Item = mongoose.model("Item", itemSchema);

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
    },
    {
      name: "Zero Waste Kitchen Pack",
      description: "Complete zero waste kitchen pack",
      price: 15.49,
      supplier: "Kitchen Inc.",
      image: "zero-waste-kit.jpg",
      rate: 5,
      rateCount: 134,
    },
    {
      name: "Reusable Bamboo Bottle",
      description: "Reusable glass bottle with bamboo cap",
      price: 12.99,
      supplier: "Bamboo Inc.",
      image: "bamboo-water-bottle.jpg",
      rate: 4.5,
      rateCount: 150,
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
    },
    {
      name: "Organic Cotton Tote Bag",
      description: "Organic cotton tote bag with bamboo handles",
      price: 7.99,
      supplier: "Bamboo Inc.",
      image: "cotton-tote-bag.jpg",
      rate: 3.5,
      rateCount: 200,
    },
    {
      name: "Organic Bamboo Cutlery Set",
      description: "Organic bamboo cutlery set with cotton pouch",
      price: 9.99,
      supplier: "Bamboo Inc.",
      image: "bamboo-cutlery-set.jpg",
      rate: 4,
      rateCount: 100,
    },
    {
      name: "Natural Bamboo Hairbrush",
      description: "Natural bamboo hairbrush with wooden bristles",
      price: 6.99,
      supplier: "Bamboo Inc.",
      image: "bamboo-hairbrush.jpg",
      rate: 4,
      rateCount: 250,
    },
    {
      name: "Organic Bamboo Face Mask",
      description: "Organic bamboo face mask with adjustable straps",
      price: 5.99,
      supplier: "Bamboo Inc.",
      image: "bamboo-face-mask.jpg",
      rate: 3.5,
      rateCount: 150,
    },
    {
      name: "Reusable Bamboo Straws",
      description: "Reusable bamboo straws with cleaning brush",
      price: 4.99,
      supplier: "Bamboo Inc.",
      image: "bamboo-straws.jpg",
      rate: 4,
      rateCount: 200,
    },
    {
      name: "Organic Bamboo Utensil Set",
      description: "Organic bamboo utensil set with cotton pouch",
      price: 8.99,
      supplier: "Bamboo Inc.",
      image: "bamboo-utensil-set.jpg",
      rate: 2.5,
      rateCount: 100,
    },
  ]).then(() => console.log("💾[DB]🪴 Items stored !"));
});

module.exports = Item;
