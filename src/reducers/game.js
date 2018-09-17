import { combineReducers } from 'redux';
import ActionTypes from '../const/ActionTypes';
/* eslint-disable */
function initialize(state) {
  const data = state.data;
  let x = 0;
  let y = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (data[i][j] == 2048) {
        alert('游戏结束');
        state.gameover = true;
        break;
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (data[i][j] != 0 && data[i][j] != data[i][j + 1]) {
        x++;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (data[i][j] != 0 && data[i][j] != data[i + 1][j]) {
        y++;
      }
    }
  }
  if (x == 12 && y == 12) {
    alert('游戏结束');
    state.gameover = true;
  }
  if (state.slide == true && state.gameover == false) {
    let m = 0;
    let num = Math.floor(Math.random() * (4 - 2 + 1) + 2);
    const hang = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    const lie = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    if (data[hang][lie] > 0) {
      console.log('重新随机');
      data.map((n, hang) => n.map((num, lie) => {
        if (data[hang][lie] == 0) {
          m++;
        }
      }));
      if (m > 0) {
        initialize(state);
      } else { alert('换条路试试?'); }
    } else if (data[hang][lie] == 0) {
      if (num > 3) {
        num = 4;
      } else {
        num = 2;
      }
      data[hang][lie] = num;
      state.twinkle[hang][lie] = 2;
    }
    if (state.isinitialize == true) { // 是否初始化
      state.isinitialize = false;
      initialize(state);
    } else state.slide = false;
  }
}
function game(state = {
  data: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  twinkle: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  Score: 0,
  bestScore: 0,
  addScore: 0,
  addbestScore: 0,
  isinitialize: true, // 是否初始化
  slide: true, // 是否滑动
  gameover: false,
  color: 'white'
}, action) {
  initialize(state);
  switch (action.type) {
    case ActionTypes.Reset:
    {
      console.log('重置');
      state.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      state.twinkle = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      state.Score = 0,
      state.slide = true,
      state.gameover = false,
      state.isinitialize = true;
      state.addScore = 0;
      state.addbestScore = 0;
      initialize(state);
      return {
        ...state
      };
    }
    case ActionTypes.Upward:
    {
      console.log('向上');
      console.log(state.data);
      const newdata = state.data.slice();
      const newtwinkle = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      let newaddScore = 0;
      let newaddbestScore = 0;
      let m = 3;
      while (m) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 4; j++) {
            if (newdata[i][j] == 0 && newdata[i + 1][j] != 0) {
              newdata[i][j] = newdata[i + 1][j];
              newdata[i + 1][j] = 0;
              state.slide = true;
            }
          }
        }
        m--;
      }
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          if (newdata[i][j] != 0 && newdata[i][j] == newdata[i + 1][j]) {
            newdata[i][j] = 2 * newdata[i][j];
            state.Score += newdata[i][j];
            newaddScore += newdata[i][j];
            console.log('加倍', newdata[i][j]);
            newdata[i + 1][j] = 0;
            console.log('清空', newdata[i + 1][j]);
            state.slide = true;
            newtwinkle[i][j] = 1;
            if (state.Score > state.bestScore) {
              newaddbestScore += newdata[i][j];
              state.bestScore = state.Score;
            }
          }
        }
      }
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          if (newdata[i][j] == 0 && newdata[i + 1][j] != 0) {
            newdata[i][j] = newdata[i + 1][j];
            newdata[i + 1][j] = 0;
            state.slide = true;
            newtwinkle[i][j] = newtwinkle[i + 1][j];
            newtwinkle[i + 1][j] = 0;
          }
        }
      }
      initialize(state);
      return {
        ...state,
        data: newdata,
        twinkle: newtwinkle,
        addScore: newaddScore,
        addbestScore: newaddbestScore
      };
    }
    case ActionTypes.Leftward:
    {
      const newdata = state.data.slice();
      const newtwinkle = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      let newaddScore = 0;
      let newaddbestScore = 0;
      let m = 3;
      while (m) {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 3; j++) {
            if (newdata[i][j] == 0 && newdata[i][j + 1] != 0) {
              newdata[i][j] = newdata[i][j + 1];
              newdata[i][j + 1] = 0;
              state.slide = true;
            }
          }
        }
        m--;
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          if (newdata[i][j] != 0 && newdata[i][j] == newdata[i][j + 1]) {
            newdata[i][j] = 2 * newdata[i][j];
            state.Score += newdata[i][j];
            newaddScore += newdata[i][j];
            console.log('加倍', newdata[i][j]);
            newdata[i][j + 1] = 0;
            console.log('清空', newdata[i][j + 1]);
            state.slide = true;
            newtwinkle[i][j] = 1;
            if (state.Score > state.bestScore) {
              newaddbestScore += newdata[i][j];
              state.bestScore = state.Score;
            }
          }
        }
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          if (newdata[i][j] == 0 && newdata[i][j + 1] != 0) {
            newdata[i][j] = newdata[i][j + 1];
            newdata[i][j + 1] = 0;
            state.slide = true;
            newtwinkle[i][j] = newtwinkle[i][j + 1];
            newtwinkle[i][j + 1] = 0;
          }
        }
      }
      initialize(state);
      return {
        ...state,
        data: newdata,
        twinkle: newtwinkle,
        addScore: newaddScore,
        addbestScore: newaddbestScore
      };
    }
    case ActionTypes.Downward:
    {
      const newdata = state.data.slice();
      const newtwinkle = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      let newaddScore = 0;
      let newaddbestScore = 0;
      let m = 3;
      while (m) {
        for (let i = 3; i > 0; i--) {
          for (let j = 3; j >= 0; j--) {
            if (newdata[i - 1][j] != 0 && newdata[i][j] == 0) {
              newdata[i][j] = newdata[i - 1][j];
              newdata[i - 1][j] = 0;
              state.slide = true;
            }
          }
        }
        m--;
      }
      for (let i = 3; i > 0; i--) {
        for (let j = 3; j >= 0; j--) {
          if (newdata[i][j] != 0 && newdata[i][j] == newdata[i - 1][j]) {
            newdata[i][j] = 2 * newdata[i][j];
            newaddScore += newdata[i][j];
            state.Score += newdata[i][j];
            console.log('加倍', newdata[i][j]);
            newdata[i - 1][j] = 0;
            console.log('清空', newdata[i - 1][j]);
            state.slide = true;
            newtwinkle[i][j] = 1;
            if (state.Score > state.bestScore) {
              newaddbestScore += newdata[i][j];
              state.bestScore = state.Score;
            }
          }
        }
      }
      for (let i = 3; i > 0; i--) {
        for (let j = 3; j >= 0; j--) {
          if (newdata[i - 1][j] != 0 && newdata[i][j] == 0) {
            newdata[i][j] = newdata[i - 1][j];
            newdata[i - 1][j] = 0;
            state.slide = true;
            newtwinkle[i][j] = newtwinkle[i - 1][j];
            newtwinkle[i - 1][j] = 0;
          }
        }
      }
      initialize(state);
      return {
        ...state,
        data: newdata,
        twinkle: newtwinkle,
        addScore: newaddScore,
        addbestScore: newaddbestScore
      };
    }
    case ActionTypes.Rightward:
    {
      const newdata = state.data.slice();
      const newtwinkle = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      let newaddScore = 0;
      let newaddbestScore = 0;
      let m = 3;
      while (m) {
        for (let i = 3; i >= 0; i--) {
          for (let j = 3; j > 0; j--) {
            if (newdata[i][j] == 0 && newdata[i][j - 1] != 0) {
              newdata[i][j] = newdata[i][j - 1];
              newdata[i][j - 1] = 0;
              state.slide = true;
            }
          }
        }
        m--;
      }
      for (let i = 3; i >= 0; i--) {
        for (let j = 3; j > 0; j--) {
          if (newdata[i][j] != 0 && newdata[i][j] == newdata[i][j - 1]) {
            newdata[i][j] = 2 * newdata[i][j];
            state.Score += newdata[i][j];
            newaddScore += newdata[i][j];
            console.log('加倍', newdata[i][j]);
            newdata[i][j - 1] = 0;
            console.log('清空', newdata[i][j - 1]);
            state.slide = true;
            newtwinkle[i][j] = 1;
            if (state.Score > state.bestScore) {
              newaddbestScore += newdata[i][j];
              state.bestScore = state.Score;
            }
          }
        }
      }
      for (let i = 3; i >= 0; i--) {
        for (let j = 3; j > 0; j--) {
          if (newdata[i][j] == 0 && newdata[i][j - 1] != 0) {
            newdata[i][j] = newdata[i][j - 1];
            newdata[i][j - 1] = 0;
            state.slide = true;
            newtwinkle[i][j] = newtwinkle[i][j - 1];
            newtwinkle[i][j - 1] = 0;
          }
        }
      }
      initialize(state);
      return {
        ...state,
        data: newdata,
        twinkle: newtwinkle,
        addScore: newaddScore,
        addbestScore: newaddbestScore
      };
    }
    case ActionTypes.Initialize:
    {
      return {
        ...state,
        isinitialize: false
      };
    }
    case ActionTypes.Random:
    {
      return {
        ...state,
        slide: false
      };
    }
    case ActionTypes.Gameover:
    {
      return {
        ...state,
        gameover: true
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  game
});
