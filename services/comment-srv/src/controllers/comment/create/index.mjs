
export default () => async (ctx) => {

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: null,
  };
};
