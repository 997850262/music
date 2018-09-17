const arr = [];
export default store => next => action => {
  console.log(store);
  const gettoken = res => {
    console.log('eeeeeeeee', res.data.token);
    arr.forEach(item => {
      const newitem = item;
      newitem.Server_Api.params.token = res.data.token;
      next(item);
    });
  };
  if (!action.Server_Api) {
    return next(action);
  }
  const {
    type,
    endpoint,
    params
  } = action.Server_Api;
  if (typeof type !== 'string') {
    throw new Error('type shoudle be a string');
  }
  if (typeof endpoint !== 'string') {
    throw new Error('url shoudle be a string');
  }
  if (typeof params !== 'object') {
    throw new Error('params shoudle be a object');
  }
  if (params.mid == undefined && params.token == undefined) {
    console.log(123456);
    console.log(action);
    arr.push(action);
    console.log(arr);
  } else {
    const newaction = action;
    newaction.Server_Api.params.gettoken = gettoken;
    console.log('qqqqqq', action.Server_Api.params);
    return next(action);
  }
  // if(action.Server_Api.params.token!=undefined){
  //   next(action)
  // }
  return null;
};

