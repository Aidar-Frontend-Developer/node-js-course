use ahabibullin;

db.customers.createIndex(
    {
        nickname: 1,
        email: 1,
    },
    {
        unique: true,
    },
);
