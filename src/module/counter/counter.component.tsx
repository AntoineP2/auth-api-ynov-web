'use client';
import { decrementCounter, incrementCounter } from '~/lib/redux/_slices/counter/counter.slice';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { counterSelector } from '~/lib/redux/_slices/counter/counter.selectors';
import { Button, Col, Row, Layout, Menu, Space } from 'antd';
import dayjs from 'dayjs';

const { Header, Content, Footer } = Layout;

const items = new Array(15).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));
export const Counter = () => {
    const dispatch = useAppDispatch();
    const { currentCount } = useAppSelector(counterSelector);

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                    height: '600px',
                }}
            >
                <Row gutter={[16, 16]} justify="center" style={{ marginTop: 40 }}>
                    <Col span="24">
                        <Space>
                            <Button type="primary" onClick={() => dispatch(incrementCounter())}>
                                Add count
                            </Button>
                            <Button onClick={() => dispatch(decrementCounter())}>Remove count</Button>
                        </Space>
                    </Col>
                    <Col span="24">
                        <p>
                            Result <strong>{currentCount}</strong>
                        </p>
                    </Col>
                </Row>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Idealys ©{dayjs().format('YYYY')}
            </Footer>
        </Layout>
    );
};

export default Counter;
