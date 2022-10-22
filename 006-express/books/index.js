const express = require('express');
const { v4: uuid } = require('uuid');

const PORT = process.env.PORT || 3000;

class Book {
    constructor(data) {
        this.id = data.id || uuid();
        this.title = data.title || '';
        this.description = data.description || '';
        this.authors = data.authors || '';
        this.favorite = data.favorite || '';
        this.fileCover = data.fileCover || '';
        this.fileName = data.fileName || '';
    }
}

const store = {
    testUser: { id: 1, mail: "test@mail.ru" },
    bookStorage: [
        new Book({
            id: '1',
            title: 'The Adventures of Tom Sawyer',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quibusdam.',
            authors: 'Mark Twain',
            favorite: 'unknown',
            fileCover: 'the-adventures-of-tom-sawyer.jpg',
            fileName: 'the-adventures-of-tom-sawyer.pdf',
        }),
        new Book({
            id: '2',
            title: 'The Green Mile',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quibusdam.',
            authors: 'Stephen King',
            favorite: 'unknown',
            fileCover: 'the-green-mile.jpg',
            fileName: 'the-green-mile.pdf',
        })
    ],
};

const app = express();
app.use(express.json());

app.post('/user/login', (req, res) => {
    res.status(201);
    res.json(store.testUser);
});

app.get('/api/books', (req, res) => {
    const { bookStorage } = store;
    res.json(bookStorage);
});

app.get('/api/books/:id', (req, res) => {
    const { bookStorage } = store;
    const {id} = req.params;
    const index = bookStorage.findIndex(el => el.id === id);

    if ( index !== -1) {
        res.json(bookStorage[index]);
    } else {
        res.status(404);
        res.json('404 | page not found');
    }
});

app.post('/api/books/', (req, res) => {
    const { bookStorage } = store;
    const { id, title, description, authors, favorite, fileCover, fileName } = req.body;

    const newBook = new Book({ id, title, description, authors, favorite, fileCover, fileName });
    bookStorage.push(newBook)

    res.status(201)
    res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
    const { bookStorage } = store;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const index = bookStorage.findIndex(el => el.id === id);

    if (index !== -1){
        bookStorage[index] = {
            ...bookStorage[index],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        };

        res.json(bookStorage[index]);
    } else {
        res.status(404);
        res.json('404 | page not found');
    }
});

app.delete('/api/books/:id', (req, res) => {
    const { bookStorage } = store;
    const { id } = req.params;
    const index = bookStorage.findIndex(el => el.id === id);
     
    if(index !== -1) {
        bookStorage.splice(index, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json('404 | page not found');
    }
});

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});
