
import types from 'prop-types';
import React, { useContext } from "react";

import TabContext from "../contexts/TabContext";

import styles from "./defaults.module.scss";


function TabContainer({ children, to, tabs }) {
  const { tabsName } = useContext(TabContext);

  const activeTab = tabs[tabsName] && tabs[tabsName]['activeTab'];
  const isShow = (activeTab === to);

  return isShow && (
    <div className={styles['container']}>
      { children }
    </div>
  );
}

TabContainer.propTypes = {
  to: types.string.isRequired,
  tabs: types.object.isRequired,
};

TabContainer.defaultProps = {
  to: '',
  tabs: {},
};

export default TabContainer;
