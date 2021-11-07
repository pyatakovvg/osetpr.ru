
export default () => async (ctx) => {
  const data = ctx['request']['body'];



  ctx.body = {
    success: true,
    data: null,
  };
};
