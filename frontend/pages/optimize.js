import { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import Layout from '../components/Layout';

export default function OptimizeResume() {
    const [optimizedResume, setOptimizedResume] = useState('');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/optimize', values);
            setOptimizedResume(response.data.optimized_resume);
        } catch (error) {
            message.error('Failed to optimize resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <h1>Resume Optimization</h1>
            <Form onFinish={onFinish}>
                <Form.Item name="resume" rules={[{ required: true, message: 'Please input your resume content' }]}>
                    <Input.TextArea rows={10} placeholder="Paste your resume content here" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Optimize
                    </Button>
                </Form.Item>
            </Form>
            {optimizedResume && (
                <div>
                    <h2>Optimized Resume:</h2>
                    <pre>{optimizedResume}</pre>
                </div>
            )}
        </Layout>
    );
}
