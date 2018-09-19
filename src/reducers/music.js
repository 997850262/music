import { combineReducers } from 'redux';
import ActionTypes from '../const/ActionTypes';

/* eslint-disable */
function music(state = {
  data: { token: 1, nick: '刘凯' }, // 个人数据
  entities: {
    data: {
      1: {
        e: 1,
        list: [1,2,3]
      }
    },
    list:
      {
        1: {
          id: 1,
          bmt: 0,
          emt: 0,
          fmt: 'mp3',
          name: '我只在乎你.mp3',
          m_url: 'http://xphoto.xiaoniangao.cn/236998?e=1538323205&token=jy6xdQVmeu6SMLhryyCIi1sRTNvJJpDNP8xAScCT:2EWpXvFGE38MIjChGLFi0NL9qVA=',
          med: 1,
          qid: 1,
          singerL: '我只在乎你.mp3',
          t: 1
        },
        2: {
          id: 2,
          bmt: 0,
          emt: 0,
          fmt: 'mp3',
          plp:'1',
          name: '女人花.mp3',
          m_url: "http://xphoto.xiaoniangao.cn/318111?e=1538323205&token=jy6xdQVmeu6SMLhryyCIi1sRTNvJJpDNP8xAScCT:qURx7EPrTfD1WNQwuWTtZvjgZlQ=",
          med: 1,
          qid: 1,
          singerL: '女人花.mp3',
          t: 1
        },
        3: {
          id: 3,
          bmt: 0,
          emt: 0,
          fmt: 'mp3',
          name: '老古董.mp3',
          m_url: "http://cdn-xphoto2.xiaoniangao.cn/1113370587?OSSAccessKeyId=LTAIajMJyFuun0yZ&Expires=1538323205&Signature=e4tieoi%2F1zp9igeC0rONHNT3bjU%3D",
          med: 1,
          qid: 1,
          singerL: '老古董.mp3',
          t: 1
        }
      }

  }, // 我的音乐
  result: [1],
  recommendentities: {
    11: {
      id: 1,
      bmt: 0,
      emt: 0,
      fmt: 'mp3',
      name: '因为爱情.mp3',
      m_url: "http://xphoto.xiaoniangao.cn/276442?e=1538323205&token=jy6xdQVmeu6SMLhryyCIi1sRTNvJJpDNP8xAScCT:vUy3wu2fOJg7QR4ZLsiIK9J6VHU=",
      med: 1,
      qid: 1,
      singerL: '因为爱情.mp3',
      t: 1
    },
    12: {
      id: 1,
      bmt: 0,
      emt: 0,
      fmt: 'mp3',
      name: '童话(纯音乐).mp3',
      m_url: "http://xphoto.xiaoniangao.cn/5583520?e=1538323205&token=jy6xdQVmeu6SMLhryyCIi1sRTNvJJpDNP8xAScCT:elFsobgvBT4JioOqSXmi67Q0TZc=",
      med: 1,
      qid: 1,
      singerL: '童话(纯音乐).mp3',
      t: 1
    }
  }, // 推荐音乐
  recommendresult: [11, 12],
  selectid: 0, // 存单选id
  selectmoreid: []// 存多选id
}, action) {
  switch (action.type) {
    case `${ActionTypes.Login}_SUC`:
    {
      console.log(action);

      return {
        ...state,
        data: action.response.data
      };
    }
    case `${ActionTypes.Fetchmymusic}_SUC`:
    {
      console.log(action);
      return {
        ...state,
        entities: action.response.entities,
        result: action.response.result
      };
    }
    case `${ActionTypes.Fetchrecommendmusic}_SUC`:
    {
      console.log(111111111111111, action);

      return {
        ...state,
        recommendentities: action.response.entities.list,
        recommendresult: action.response.result.list
      };
    }
    case ActionTypes.Selectid:// 存单选id
    {
      return {
        ...state,
        selectid: action.id
      };
    }
    case ActionTypes.Selectmoreid:// 存多选id
    {
      let count = 0;
      console.log('多选', action.id);
      const newselectmoreid = state.selectmoreid.slice();
      // console.log(state.selectid);
      // newselectmoreid.push(state.selectid);
      for (let i = 0; i < newselectmoreid.length; i++) {
        if (newselectmoreid[i] != action.id) {
          count++;
        }
      }
      if (count >= newselectmoreid.length && newselectmoreid.length < 5) {
        newselectmoreid.push(action.id);
      } else {
        for (let i = 0; i < newselectmoreid.length; i++) {
          if (newselectmoreid[i] == action.id) {
            newselectmoreid.splice(i, 1);
          }
        }
      }
      return {
        ...state,
        selectmoreid: newselectmoreid
      };
    }
    case ActionTypes.Deleteone:
    {
      console.log(state.selectid);
      console.log(state);
      const newList = state.result;
      const newState = { ...state };
      if (newList) {
        newList.map(Item => {
          console.log(Item);
          if (state.entities.data[Item] != undefined) {
            state.entities.data[Item].list.map((item, idx) => {
              console.log(item);
              console.log(idx);
              if (item == state.selectid) {
                console.log(state.entities.data[Item].list[idx]);
                state.entities.data[Item].list.splice(idx, 1);
                newState.selectid = 0;
                // state.selectid = 0;
              }
              return null;
            });
          }
          return null;
        });
      }
      return newState;
    }
    case ActionTypes.Deletemore:
    {
      console.log('多选删除');
      const newList = state.result;
      const newState = { ...state };
      if (newList) {
        newList.map(Item => {
          console.log(Item);
          if (state.entities.data[Item] != undefined) {
            state.selectmoreid.map(id => {
              state.entities.data[Item].list.map((item, idx) => {
                console.log(item);
                if (item == id) {
                  state.entities.data[Item].list.splice(idx, 1);
                  newState.selectmoreid = [];
                  // state.selectmoreid = [];
                }
                return null;
              });
              return null;
            });
          }
          return null;
        });
      }
      return newState;
    }
    case ActionTypes.Onselect:// 点击单选时
    {
      const newselectid = state.selectmoreid[0];
      return {
        ...state,
        selectid: newselectid
      };
    }
    case ActionTypes.Onmoreselect:// 点击多选时
    {
      const newselectmoreid = [];
      if (state.selectid > 0) {
        newselectmoreid.push(state.selectid);
      }
      return {
        ...state,
        selectmoreid: newselectmoreid
      };
    }
    case ActionTypes.Rename:
    {
      console.log(123, action.name);
      console.log(123, state.entities.list[state.selectid].name);
      const newState = { ...state };
      if (state.entities.list[state.selectid].plp == undefined) {
        newState.entities.list[state.selectid].name = action.name;
        // state.entities.list[state.selectid].name = action.name;
      } else {
        alert('不能修改本音乐名');
      }
      return newState;
    }
    case ActionTypes.Signtime:// 加标记
    {
      console.log(111, action.signstartTime);
      console.log(222, action.signendTime);
      const newState = { ...state };
      if (action.signendTime != undefined) {
        console.log('标记成功');
        newState.entities.list[state.selectid].bmt = action.signstartTime;
        newState.entities.list[state.selectid].emt = action.signendTime;
        // state.entities.list[state.selectid].bmt = action.signstartTime;
        // state.entities.list[state.selectid].emt = action.signendTime;
      }
      return newState;
    }
    case ActionTypes.Cleansigntime:// 清标记
    {
      const newState = { ...state };
      newState.entities.list[state.selectid].bmt = 0;
      newState.entities.list[state.selectid].emt = 0;
      // state.entities.list[state.selectid].bmt = 0;
      // state.entities.list[state.selectid].emt = 0;
      return newState;
    }
    default:
      return state;
  }
}
export default combineReducers({
  music
});
