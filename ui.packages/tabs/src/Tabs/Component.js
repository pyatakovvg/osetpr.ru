
import types from 'prop-types';
import React, { useEffect } from 'react';

import TabContext from "../contexts/TabContext";

import styles from './defaults.module.scss';


function Tabs({ name, defaultTab, children, createTabs, removeTabs, setActiveTab, onChange }) {
  function handleChangeTab(name) {
    onChange && onChange(name);
  }

  useEffect(() => {
    createTabs(name, defaultTab);
    return () => {
      removeTabs(name);
    };
  }, []);

  useEffect(() => {
    setActiveTab(name, defaultTab);
  }, [ defaultTab ]);

  return (
    <TabContext.Provider value={{
      tabsName: name,
      onChange: (name) => handleChangeTab(name),
    }}>
      <div className={styles['wrapper']}>
        { children }
      </div>
    </TabContext.Provider>
  );
}

Tabs.propTypes = {
  name: types.string,
  defaultTab: types.string,

  createTabs: types.func,
  removeTabs: types.func,
  setActiveTab: types.func,
  onChange: types.func,
};

Tabs.defaultProps = {
  name: 'default',
  defaultTab: '',

  createTabs: null,
  removeTabs: null,
  setActiveTab: null,
  onChange: null,
};

export default Tabs;
