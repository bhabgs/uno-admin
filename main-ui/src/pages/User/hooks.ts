import { getMenu } from '@/remote/Menu';
import { TableColumnType } from 'antd';
import { useEffect, useState } from 'react';
export const useUser = () => {
  const columns: TableColumnType[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path',
      width: 200,
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getMenu()
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTableChange = () => {};
  return {
    columns,
    data,
    loading,
    handleTableChange,
  };
};
