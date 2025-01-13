import { Layout, theme } from 'antd';

const { Content } = Layout;

const ContentComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        padding: 12,
        margin: 0,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        overflow: 'hidden',
        overflowY: 'auto',
        display: 'flex',
      }}
    ></Content>
  );
};

export default ContentComponent;
