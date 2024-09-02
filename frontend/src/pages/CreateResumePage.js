import React, { useState } from 'react';
import axios from 'axios';

function CreateResumePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: '',
        summary: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/resumes/create', formData).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <div>
            <h1>Create Resume</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                <textarea name="education" placeholder="Education" onChange={handleChange}></textarea>
                <textarea name="experience" placeholder="Experience" onChange={handleChange}></textarea>
                <textarea name="skills" placeholder="Skills" onChange={handleChange}></textarea>
                <textarea name="summary" placeholder="Summary" onChange={handleChange}></textarea>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateResumePage;