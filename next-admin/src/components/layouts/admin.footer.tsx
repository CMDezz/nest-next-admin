'use client';
import { Layout } from 'antd';
const { Footer } = Layout;

const AdminFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};
export default AdminFooter;