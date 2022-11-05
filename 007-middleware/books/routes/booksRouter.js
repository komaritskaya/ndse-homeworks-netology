const express = require('express');
const { Book } = require('../model');
const { store } = require('../store');
const fileMulter = require('../middleware/file');
const router = express.Router();

router.get('/api/books', (req, res) => {
    const { bookStorage } = store;
    res.json(bookStorage);
});

router.get('/api/books/:id', (req, res) => {
    const { bookStorage } = store;
    const {id} = req.params;
    const index = bookStorage.findIndex(el => el.id === id);

    if ( index !== -1) {
        res.json(bookStorage[index]);
    } else {
        res.status(404);
        res.json({ code: 404, message: '404 | page not found' });
    }
});

router.post('/api/books/', (req, res) => {
    const { bookStorage } = store;
    const { id, title, description, authors, favorite, fileCover, fileName } = req.body;

    const newBook = new Book({ id, title, description, authors, favorite, fileCover, fileName });
    bookStorage.push(newBook)

    res.status(201)
    res.json(newBook)
})

router.put('/api/books/:id', (req, res) => {
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
        res.json({ code: 404, message: '404 | page not found' });
    }
});

router.delete('/api/books/:id', (req, res) => {
    const { bookStorage } = store;
    const { id } = req.params;
    const index = bookStorage.findIndex(el => el.id === id);
     
    if(index !== -1) {
        bookStorage.splice(index, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json({ code: 404, message: '404 | page not found' });
    }
});

router.get("/:id/download", (req, res) => {
    const { bookStorage } = store;
    const { id } = req.params;
    const index = bookStorage.findIndex(el => el.id === id);
    if (index !== -1 && bookStorage[index].fileBook) {
        res.download(bookStorage[index].fileBook, bookStorage[index].fileName);
    } else {
        res.status(404);
        res.json({ code: 404, message: '404 | page not found' });
    }
});

router.post('/:id/upload', fileMulter.single('file'), (req, res) => {
    const { bookStorage } = store;
    const { id } = req.params;

    if (!req.file) {
        res.json(null);
        return;
    }

    const { path } = req.file;
    const index = bookStorage.findIndex((el) => el.id === id);

    if (index !== -1) {
        bookStorage[index] = {
            ...bookStorage[index],
            fileBook: path
        }
    } else {
        res.status(404);
        res.json({ code: 404, message: '404 | page not found' });
    }
});

module.exports = router;