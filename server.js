'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const app = express();

app.use(express.static('public'));

app.post('/fileInfo', upload.single('archive'), (req, res) => {

    if (req.file) {
        const size  = req.file.size;
        fs.unlinkSync(req.file.path); // deletes the file after gets its size
        
        return res.json({ size: req.file.size });
    }

    throw new Error("Please, submit a file");

});

app.use((req, res, next) => {
    res.status(404).json({ error: '404 - Not Found' });
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Running at port ${listener.address().port}`);
});

module.exports = app;