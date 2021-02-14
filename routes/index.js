const path = require('path')

const express = require('express');

const router = express.Router();

router.post('/post-weather', (req, res, next) => {
    // console.log('Weather Body:',req.body);
    projectData = req.body
    res.send(projectData)
})

router.get('/get-weather', (req, res, next) => {
    res.send(projectData);
})

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
})



module.exports = router;