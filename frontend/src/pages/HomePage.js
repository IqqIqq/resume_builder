import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        axios.get('/api/resumes').then((response) => {
            setResumes(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Resume List</h1>
            <Link to="/create">Create New Resume</Link>
            <ul>
                {resumes.map((resume) => (
                    <li key={resume._id}>
                        <Link to={`/edit/${resume._id}`}>{resume.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
