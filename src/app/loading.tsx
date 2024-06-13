import { Spin } from 'antd';

export default function loading() {
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <Spin size="large" />
        </div>
    );
}
