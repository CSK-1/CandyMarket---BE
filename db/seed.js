import db from "./client.js";

import { createOrder } from "./queries/orders.js";
import { createUser } from "./queries/users.js";
import { createReview } from "./queries/reviews.js";
import { createProduct } from "./queries/products.js";

async function seed() {
  try {
    await db.connect();

    const user1 = await createUser({ username: "testuser", password: "password"});

    await Promise.all([
      createOrder({ date: "2025-01-01", note: "2 Banana Laffy Taffy, 1 Chocolate Bar", user_id: user1.id })
    ]);

    const product1 = await createProduct({ title: "Banana Laffy Taffy", description: "It doesn't really taste like banana.", price: 2});
    const product2 = await createProduct({ title: "Strawberry Laffy Taffy", description: "Enjoy getting this out of your molars.", price: 2});
    const product3 = await createProduct({ title: "Chocolate Bar", description: "It could be Hershey's, but we will never tell.", price: 2});
    const product4 = await createProduct({ title: "Snickers", description: "Peanut, Caramel, Chocolate? Yes please.", price: 2});
    const product5 = await createProduct({ title: "Kinder Bueno", description: "Chocolate and smooth, creamy hazelnut - its the best.", price: 2});
    const product6 = await createProduct({ title: "Lollipop", description: "Simple. A classic.", price: 2});
    const product7 = await createProduct({ title: "Tootsie Roll", description: "Like our parents used to eat.", price: 2});
    const product8 = await createProduct({ title: "Bubble Yum", description: "Tastes really good, for 30 seconds.", price: 2});
    const product9 = await createProduct({ title: "Blowpop", description: "Tasty lollipop and a mediocre gum!", price: 2});
    const product10 = await createProduct({ title: "Ring Pop", description: "Pretend you have a fancy ring, then eat it!", price: 2});
    

    await Promise.all([
      createReview({ rating: 3, comment: "It really doesn't taste like bananas, but the description says that so I shouldn't be surprised.", product_id: product1.id }),
      createReview({ rating: 8, comment: "It is tasty, for the whole time it was stuck in my molars.", product_id: product2.id }),
      createReview({ rating: 6, comment: "Decent. I bet its Herhsey's.", product_id: product3.id })
    ]);

    console.log("🌱 Database seeded.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await db.end();
  }
}

await seed();
await db.end();