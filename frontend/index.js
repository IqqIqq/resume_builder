import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Button, List, Typography, Space } from 'antd';
import { FileAddOutlined, SearchOutlined, ToolOutlined, LoginOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function Home() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        axios.get('/api/resumes').then((response) => {
            setResumes(response.data);
        });
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <Title level={2}>智能简历助手</Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Space wrap>
                    <Button type="primary" icon={<FileAddOutlined />}>
                        <Link href="/create">创建简历</Link>
                    </Button>
                    <Button icon={<SearchOutlined />}>
                        <Link href="/diagnose">简历诊断</Link>
                    </Button>
                    <Button icon={<ToolOutlined />}>
                        <Link href="/optimize">简历优化</Link>
                    </Button>
                    <Button icon={<LoginOutlined />}>
                        <Link href="/login">登录</Link>
                    </Button>
                </Space>
                
                <List
                    header={<Title level={4}>我的简历</Title>}
                    bordered
                    dataSource={resumes}
                    renderItem={(resume) => (
                        <List.Item>
                            <Link href={`/edit/${resume._id}`}>{resume.name}</Link>
                        </List.Item>
                    )}
                />
            </Space>
        </div>
    );
}