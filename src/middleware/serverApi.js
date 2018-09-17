import axios from 'axios';

const API_DOMAIN = 'http://xly-wkop.xiaoniangao.cn';
const axiosFetch = axios.create({
  baseURL: API_DOMAIN,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

const callServerApi = apiParams => {
  const { endpoint, params } = apiParams;
  return new Promise((resolve, reject) => {
    axiosFetch({
      method: 'POST',
      url: endpoint,
      data: params
    })
      .then(res => {
        if (res.data.ret === 1) {
          resolve(res);
        } else {
          reject(res.data.errMsg);
        }
      })
      .catch(res => {
        reject(JSON.stringify(res));
      });
  });
};

const serverApi = store => next => action => {
  console.log(store);
  if (!action.Server_Api) { return next(action); }
  const { type, endpoint, params } = action.Server_Api;
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint.');
  }
  if (typeof type !== 'string') {
    throw new Error('Specify a string type.');
  }
  if (typeof params !== 'object') {
    throw new Error('Specify a object params.');
  }

  const { normailzerFun } = action.Server_Api;
  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction.Server_Api;
    return finalAction;
  }
  next(actionWith({
    type: `${type}_REQ`,
    __api: { endpoint, params }
  }));
  callServerApi({ endpoint, params })
    .then(res => {
      console.log(999, res);
      const response = typeof (normailzerFun) !== 'undefined' ? normailzerFun(res.data) : res.data;
      if (params.gettoken) {
        params.gettoken(res.data);
      }
      console.log('中间件', response);
      next(actionWith({
        type: `${type}_SUC`,
        __api: { endpoint, params },
        response
      }));
    })
    .catch(errMsg => {
      next(actionWith({
        type: `${type}_FAI`,
        __api: { endpoint, params },
        errMsg
      }));
    });
  return null;
};


export default serverApi;
