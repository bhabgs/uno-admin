import { Button, Form, Table } from 'antd';
import { useMenu } from './hooks';
import { useEffect } from 'react';

const Menu = () => {
  const { columns, data, loading, handleTableChange } = useMenu();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <Form>
        <Form.Item colon={false} label=" ">
          <Button>添加</Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={[]}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Menu;
