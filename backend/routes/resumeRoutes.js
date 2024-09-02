const express = require('express');
const Resume = require('../models/Resume');
const { pipeline } = require('stream');
const { pipeline: hfPipeline } = require('transformers');

const router = express.Router();

const generator = hfPipeline('text2text-generation', 'google/flan-t5-small');

router.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    const response = await generator(prompt, { max_length: 400 });
    res.json({ text: response[0].generated_text });
});

router.post('/create', async (req, res) => {
    const resume = new Resume(req.body);
    await resume.save();
    res.json(resume);
});

router.get('/', async (req, res) => {
    const resumes = await Resume.find();
    res.json(resumes);
});

module.exports = router;