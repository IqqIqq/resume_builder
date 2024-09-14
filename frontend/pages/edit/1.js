import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { message } from 'antd';
import Layout from '../../components/Layout';
import ResumeForm from '../../components/ResumeForm';

export default function EditResume() {
    const router = useRouter();
    const { id } = router.query;
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            axios.get(`/api/resumes/${id}`).then((response) => {
                setResume(response.data);
            });
        }
    }, [id]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.put(`/api/resumes/${id}`, values);
            message.success('Resume updated successfully');
            router.push('/');
        } catch (error) {
            message.error('Failed to update resume');
        } finally {
            setLoading(false);
        }
    };

    if (!resume) return <div>Loading...</div>;

    return (
        <Layout>
            <h1>Edit Resume</h1>
            <ResumeForm initialValues={resume} onFinish={onFinish} loading={loading} />
        </Layout>
    );
}