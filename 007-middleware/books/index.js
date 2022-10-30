const express = require('express');
const booksRouter = require('./routes/booksRouter.js');
const userRouter = require('./routes/userRouter.js');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});
