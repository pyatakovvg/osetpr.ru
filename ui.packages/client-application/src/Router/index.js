
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ApplicationContext from "../Context";


function Router() {
  const { routes, wrappers } = useContext(ApplicationContext);

  return (
    <Routes>
      {routes.map((route, index) => {
        const Wrapper = wrappers[route['wrapper']] || null;
        const Module = route['Module'];

        return (
          <Route key={index} path={route['path']} element={(
            <Wrapper>
              <Module />
            </Wrapper>
          )} />
        );
      })}
      <Route path="*" element={<Navigate replace to={'/not-found'} />} />
    </Routes>
  );
}

export default Router;
