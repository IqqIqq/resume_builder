import { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import Layout from '../components/Layout';

export default function DiagnoseResume() {
    const [diagnosis, setDiagnosis] = useState('');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/diagnose', values);
            setDiagnosis(response.data.diagnosis);
        } catch (error) {
            console.error('Error diagnosing resume:', error);
            message.error('Failed to diagnose resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <h1>Resume Diagnosis</h1>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="resume"
                    rules={[{ required: true, message: 'Please input your resume content' }]}
                >
                    <Input.TextArea rows={10} placeholder="Paste your resume content here" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Diagnose
                    </Button>
                </Form.Item>
            </Form>
            {diagnosis && (
                <div>
                    <h2>Diagnosis Result:</h2>
                    <p>{diagnosis}</p>
                </div>
            )}
        </Layout>
    );
}