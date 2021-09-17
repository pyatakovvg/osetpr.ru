
export default () => async (ctx) => {

  ctx.cookies.set(process.env['COOKIE_NAME'], null);

  ctx.body = {
    success: true,
    data: null,
  };
};
