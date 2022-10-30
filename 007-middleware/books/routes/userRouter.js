const express = require('express');
const { store } = require('../store');
const router = express.Router();

router.post('/user/login', (req, res) => {
    res.status(201);
    res.json(store.testUser);
});

module.exports = router;