// Deterministic seed — a store large enough that reading it synchronously on
// every request (the "before" store's fatal habit) is measurable under load.
const fs = require("fs");
const path = require("path");

const CATS = ["apparel", "home", "beauty", "electronics", "outdoor", "pets", "grocery", "toys"];
const ADJ = ["Classic", "Pro", "Eco", "Premium", "Everyday", "Compact", "Deluxe", "Essential"];
const NOUN = ["Hoodie", "Lamp", "Serum", "Earbuds", "Tent", "Leash", "Blend", "Blocks"];

function build() {
  const products = [];
  for (let i = 1; i <= 4000; i++) {
    const cat = CATS[i % CATS.length];
    products.push({
      id: i,
      sku: `SKU-${String(i).padStart(5, "0")}`,
      name: `${ADJ[i % ADJ.length]} ${NOUN[i % NOUN.length]} ${i}`,
      category: cat,
      price: 5 + ((i * 37) % 300),
      stock: (i * 13) % 200,
      description: `A ${cat} product, item ${i}. Built for the demo store load test.`,
    });
  }
  // "Private" data that must never be exposed without auth.
  const orders = [];
  for (let i = 1; i <= 300; i++) {
    orders.push({
      id: i,
      email: `customer${i}@example.com`,
      card_last4: String(1000 + ((i * 7) % 9000)).slice(-4),
      total: 20 + ((i * 53) % 800),
      items: 1 + (i % 5),
    });
  }
  const users = [{ id: 1, username: "admin", role: "admin", token: "admin-2024" }];
  return { products, orders, users };
}

const out = path.join(__dirname, "store.json");
fs.writeFileSync(out, JSON.stringify(build()));
const kb = Math.round(fs.statSync(out).size / 1024);
console.log(`seeded ${out} — 4000 products, 300 orders (${kb} KB)`);
