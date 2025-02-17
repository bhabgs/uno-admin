import { useState } from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

const menus = [
  {
    title: '首页',
  },
  {
    title: '文章',
  },
  {
    title: '项目',
  },
  {
    title: '关于',
  },
];

const TabItem = (props: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={props.onClick}
      className={classnames(styles.tab, {
        [styles.active]: props.isActive,
      })}
    >
      {props.title}
      <span className={styles.closeButton}></span>
    </div>
  );
};

const Tab = () => {
  const [active, setActive] = useState(0);
  return (
    <nav className={styles.tabs}>
      {menus.map((item, key) => {
        return (
          <TabItem
            key={key}
            title={item.title}
            isActive={active === key}
            onClick={() => {
              setActive(key);
            }}
          />
        );
      })}
    </nav>
  );
};
export default Tab;
