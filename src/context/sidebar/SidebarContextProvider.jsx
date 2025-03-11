import { useState } from 'react';
import { SidebarContext } from './SidebarContext';
import PropTypes from 'prop-types';

const SidebarContextProvider = ({ children }) => {
  const [sidebarState, setSidebarState] = useState(false);

  const toggleSidebarState = () => {
    setSidebarState(!sidebarState);
  };

  const changeSidebarState = (state) => {
    setSidebarState(state);
  };

  return (
    <SidebarContext.Provider
      value={{ sidebarState, toggleSidebarState, changeSidebarState }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

SidebarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarContextProvider;
