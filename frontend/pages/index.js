import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Button, List, Typography, Space } from 'antd';
import { FileAddOutlined, SearchOutlined, ToolOutlined, LoginOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';

const { Title } = Typography;

export default function Home() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        axios.get('/api/resumes').then((response) => {
            setResumes(response.data);
        });
    }, []);

    return (
        <Layout>
            <Title level={2}>Intelligent Resume Assistant</Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Space wrap>
                    <Button type="primary" icon={<FileAddOutlined />}>
                        <Link href="/create">Create Resume</Link>
                    </Button>
                    <Button icon={<SearchOutlined />}>
                        <Link href="/diagnose">Resume Diagnosis</Link>
                    </Button>
                    <Button icon={<ToolOutlined />}>
                        <Link href="/optimize">Resume Optimization</Link>
                    </Button>
                    <Button icon={<LoginOutlined />}>
                        <Link href="/login">Login</Link>
                    </Button>
                </Space>
                
                <List
                    header={<Title level={4}>My Resumes</Title>}
                    bordered
                    dataSource={resumes}
                    renderItem={(resume) => (
                        <List.Item>
                            <Link href={`/edit/${resume._id}`}>{resume.name}</Link>
                        </List.Item>
                    )}
                />
            </Space>
        </Layout>
    );
}