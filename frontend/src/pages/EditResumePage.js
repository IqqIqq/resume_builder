import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditResumePage() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: '',
        summary: '',
    });

    useEffect(() => {
        axios.get(`/api/resumes/${id}`).then((response) => {
            setFormData(response.data);
        });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/resumes/${id}`, formData).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <div>
            <h1>Edit Resume</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                <textarea name="education" value={formData.education} onChange={handleChange}></textarea>
                <textarea name="experience" value={formData.experience} onChange={handleChange}></textarea>
                <textarea name="skills" value={formData.skills} onChange={handleChange}></textarea>
                <textarea name="summary" value={formData.summary} onChange={handleChange}></textarea>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditResumePage;
