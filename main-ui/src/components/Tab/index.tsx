import classnames from 'classnames';
import styles from './index.module.less';
import { observer } from 'mobx-react-lite';
import MenuStore from '@/store/Menu';

const TabItem = observer(
  (props: {
    title: string;
    isActive: boolean;
    onClick: () => void;
    onClose: () => void;
  }) => {
    return (
      <div
        onClick={props.onClick}
        className={classnames(styles.tab, {
          [styles.active]: props.isActive,
        })}
      >
        {props.title}
        <span
          className={styles.closeButton}
          onClick={(e) => {
            e.stopPropagation();
            props.onClose();
          }}
        ></span>
      </div>
    );
  },
);

const Tab = observer(() => {
  return (
    <nav className={styles.tabs}>
      {MenuStore.openMenus.map((item, key) => {
        return (
          <TabItem
            key={key}
            title={item.name}
            isActive={MenuStore.activeMenu === item.path}
            onClick={() => {
              MenuStore.setActiceMenu(item);
            }}
            onClose={() => {
              MenuStore.closeMenu(item);
            }}
          />
        );
      })}
    </nav>
  );
});
export default Tab;
