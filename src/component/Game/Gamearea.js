import React, { Component } from 'react';
import './Game.css';

// const KEY_RETURN = [87,65,83,68];//W A S D
export default class Gamearea extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onTouchStart=event => {
    console.log(event);
    console.log(event.touches);
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    console.log('11111111', this.startX);
    console.log('11111111', this.startY);
  }
  onTouchEnd=event => {
    const { todoActions, gameover } = this.props;
    console.log(event.changedTouches);
    this.endX = event.changedTouches[0].clientX;
    this.endY = event.changedTouches[0].clientY;
    console.log('22222222', this.endX);
    console.log('22222222', this.endY);
    const x = this.endX - this.startX;
    const y = this.endY - this.startY;
    console.log('33333', x);
    console.log('33333', y);
    if (x > 0 && y > 0) {
      if (x - y > 0) {
        if (gameover == false) { todoActions.rightward(); } else { alert('游戏结束,请重新开始'); }
      } else if (gameover == false) { todoActions.downward(); } else { alert('游戏结束,请重新开始'); }
    } else if (x > 0 && y < 0) {
      if (x + y > 0) {
        if (gameover == false) { todoActions.rightward(); } else { alert('游戏结束,请重新开始'); }
      } else if (gameover == false) { todoActions.upward(); } else { alert('游戏结束,请重新开始'); }
    } else if (x < 0 && y > 0) {
      if (x + y > 0) {
        if (gameover == false) { todoActions.downward(); } else { alert('游戏结束,请重新开始'); }
      } else if (gameover == false) { todoActions.leftward(); } else { alert('游戏结束,请重新开始'); }
    } else if (x < 0 && y < 0) {
      if (x - y > 0) {
        if (gameover == false) { todoActions.upward(); } else { alert('游戏结束,请重新开始'); }
      } else if (gameover == false) { todoActions.leftward(); } else { alert('游戏结束,请重新开始'); }
    }
  }
  onTouchMove=event => {
    console.log(event.defaultPrevented);
    event.preventDefault();
  }
  /* eslint-disable */
  rendergamebtn=() => {
    const { data,twinkle } = this.props;
    let { color } = this.props;
    console.log(twinkle)
    return data.map((n, hang) =>
      n.map((num, lie) => {
        if (data[hang][lie] > 0) {
          if (num == 2) { color = 'white'; } else if (num == 4) { color = 'green'; } else if (num == 8) { color = 'orange'; } else if (num == 16) { color = 'yellow'; } else if (num >= 32) { color = 'red'; }
          if(twinkle[hang][lie]==1){
            return(<div className="btn1-2" style={{ background: `${color}` }}>{data[hang][lie]}</div>)
          }
          else if(twinkle[hang][lie]==2){
            return(<div className="btn1-3" style={{ background: `${color}` }}>{data[hang][lie]}</div>)
          }
          else{
            return (
              <div className="btn1-1" style={{ background: `${color}` }}>{data[hang][lie]}</div>
            );
          }
        }
        return (
          <div className="btn1-1" />
        );
      }));
  }
  render() {
    const { data } = this.props;
    console.log('游戏区域', data);
    return (
      <div
        className="game-all"
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        onTouchMove={this.onTouchMove}
      >
        {this.rendergamebtn()}
      </div>
    );
  }
}
