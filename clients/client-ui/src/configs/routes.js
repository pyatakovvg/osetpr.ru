
const routes = [
  {
    path: '/',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "main" */
      '@modules/client-main'
    ),
  },
];

export default routes;
