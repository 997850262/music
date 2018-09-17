import React from 'react';
import './Head.css';

const img = require('../../source/return.png');

export default class Head extends React.Component {
  handleback=() => {
    alert('go back');
  }
  handleover=() => {
    const { music, select } = this.props;
    if (select === true && music.music.selectid > 0) {
      if (!(music.music.recommendresult.indexOf(music.music.selectid) + 1)) {
        alert(`当前选中了 ${music.music.entities.list[music.music.selectid].id}`);
      } else {
        alert(`当前选中了 ${music.music.recommendentities[music.music.selectid].id}`);
      }
    } else if (select === false && music.music.selectmoreid.length > 0) {
      alert(`当前选中了 ${music.music.selectmoreid}`);
    }
  }
  render() {
    const { music } = this.props;
    console.log(music.music.data);
    console.log(music.music.data.token);
    return (
      <div className="Head-all">
        <div className="Head-back">
          <img src={img} className="Head-img" />
          <div onClick={this.handleback}>我</div>
        </div>
        <div className="Head-name">{music.music.data.nick}</div>
        <div className="Head-over" onClick={this.handleover}>完成</div>
      </div>

    );
  }
}
