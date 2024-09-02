const express = require('express');
const Resume = require('../models/Resume');

const router = express.Router();

router.post('/create', async (req, res) => {
    const resume = new Resume(req.body);
    await resume.save();
    res.json(resume);
});

router.get('/', async (req, res) => {
    const resumes = await Resume.find();
    res.json(resumes);
});

router.get('/:id', async (req, res) => {
    const resume = await Resume.findById(req.params.id);
    res.json(resume);
});

router.put('/:id', async (req, res) => {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(resume);
});

router.delete('/:id', async (req, res) => {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume deleted' });
});

module.exports = router;