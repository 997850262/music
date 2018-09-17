import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActionCreators from '../actions/index';
import Head from '../component/Game/Head';
import Gamearea from '../component/Game/Gamearea';

/* eslint-disable */
class game2048 extends React.Component {
    componentDidMount=() => {
      window.addEventListener('keydown', this.handleKeyDown);
    }

    // initialize=() => { // 初始化,随机函数
    //   const {
    //     data, isinitialize, todoActions, slide, gameover, twinkle
    //   } = this.props;
    //   // todoActions.initialize();
    //   let x = 0;
    //   let y = 0;
    //   for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 4; j++) {
    //       if (data[i][j] == 2048) {
    //         alert('游戏结束');
    //         todoActions.gameover();
    //         break;
    //       }
    //     }
    //   }
    //   for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 3; j++) {
    //       if (data[i][j] != 0 && data[i][j] != data[i][j + 1]) {
    //         x++;
    //       }
    //     }
    //   }
    //   for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j < 4; j++) {
    //       if (data[i][j] != 0 && data[i][j] != data[i + 1][j]) {
    //         y++;
    //       }
    //     }
    //   }
    //   if (x == 12 && y == 12) {
    //     alert('游戏结束');
    //     todoActions.gameover();
    //   }
    //   if (slide == true && gameover == false) {
    //     let m = 0;
    //     console.log(isinitialize);
    //     let num = Math.floor(Math.random() * (4 - 2 + 1) + 2);
    //     const hang = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    //     const lie = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    //     if (data[hang][lie] > 0) {
    //       console.log('重新随机');
    //       data.map((n, hang) => n.map((num, lie) => {
    //         if (data[hang][lie] == 0) {
    //           m++;
    //         }
    //       }));
    //       if (m > 0) {
    //         this.initialize();
    //       } else { alert('换条路试试?'); }
    //     } else if (data[hang][lie] == 0) {
    //       if (num > 3) {
    //         num = 4;
    //         console.log(num);
    //       } else {
    //         num = 2;
    //         console.log(num);
    //       }
    //       data[hang][lie] = num;
    //       twinkle[hang][lie]=2;
    //     }
    //     if (isinitialize == true) { // 是否初始化
    //       todoActions.initialize();
    //     }
    //     else todoActions.random();
    //     console.log(data);
    //   }
    // }

    handleKeyDown=event => {
      const { todoActions, gameover } = this.props;
      switch (event.keyCode) {
        case 87:
          if (gameover == false) {
            todoActions.upward();
          } else if (gameover == true) { alert('游戏结束,请重新开始'); }
          break;
        case 65:
          if (gameover == false) {
            todoActions.leftward();
          } else if (gameover == true) { alert('游戏结束,请重新开始'); }
          break;
        case 83:
          if (gameover == false) {
            todoActions.downward();
          } else if (gameover == true) { alert('游戏结束,请重新开始'); }
          break;
        case 68:
          if (gameover == false) {
            todoActions.rightward();
          } else if (gameover == true) { alert('游戏结束,请重新开始'); }
          break;
        default:
          break;
      }
    }
    render() {
      const {
        data, Score, bestScore, todoActions, gameover, twinkle, addScore, addbestScore
      } = this.props;
      const { color } = this.props;
      // this.initialize();
      return (
        <div>
          <Head
            data={data}
            Score={Score}
            bestScore={bestScore}
            todoActions={todoActions}
            addScore={addScore}
            addbestScore={addbestScore}
          />
          <Gamearea
            data={data}
            color={color}
            todoActions={todoActions}
            gameover={gameover}
            twinkle={twinkle}
          />
        </div>
      );
    }
}

function mapStateToProps(state) {
  const { game } = state;
  console.log(game.game);
  const data = game.game.data;
  const isinitialize = game.game.isinitialize;
  const Score = game.game.Score;
  const bestScore = game.game.bestScore;
  const color = game.game.color;
  const slide = game.game.slide;
  const gameover = game.game.gameover;
  const twinkle = game.game.twinkle;
  const addScore = game.game.addScore;
  const addbestScore = game.game.addbestScore;
  console.log(game.game.slide);
  return {
    data, isinitialize, Score, bestScore, color, slide, gameover, twinkle, addScore, addbestScore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(game2048);
