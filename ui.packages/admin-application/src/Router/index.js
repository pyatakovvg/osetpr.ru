
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Error from '../Error';

import ApplicationContext from "../Context";


function checkNotFound(routes) {
  return routes.some((route) => route['path'] === '*');
}

function Router() {
  const { routes, wrappers } = useContext(ApplicationContext);

  const hasNotFound = checkNotFound(routes);

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
      { ! hasNotFound && <Route path="*" element={<Error />} />}
    </Routes>
  );
}

export default Router;
