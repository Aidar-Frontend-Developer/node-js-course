use ahabibullin;

db.customers.drop();
db.orders.drop();

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

for (let i = 0; i < 3000; i++) {
  const customer = {
    name: {
      first: `customer ${i}`,
      last: `customer ${i}`,
    },
    balance: random(1000, 1500),
    created: new Date()
  };

  const {
    insertedId
  } = db.customers.insertOne(customer);

  for (let j = 0; j < random(1, 10); j++) {
    const order = {
      customerId: insertedId,
      count: random(1, 10),
      price: random(20, 100),
      discount: random(5, 30),
      title: `Title of product ${j}`,
      product: `Product ${j}`
    }

    db.orders.insertOne(order);
  }
}
