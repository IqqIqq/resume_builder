import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { message } from 'antd';
import Layout from '../components/Layout';
import ResumeForm from '../components/ResumeForm';

export default function CreateResume() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.post('/api/resumes', values);
            message.success('Resume created successfully');
            router.push('/');
        } catch (error) {
            console.error('Error creating resume:', error);
            message.error('Failed to create resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <h1>Create New Resume</h1>
            <ResumeForm onFinish={onFinish} loading={loading} />
        </Layout>
    );
}