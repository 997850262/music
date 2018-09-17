import React from 'react';
import './Footer.css';

const img = require('../../source/button_new_play.png');
const img2 = require('../../source/button_rename_red.png');
const img3 = require('../../source/button_cut.png');
const img4 = require('../../source/button_share.png');
const img5 = require('../../source/button_delete.png');

let count = 0;
export default class Footer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  play=() => {
    const { select } = this.props;
    if (select === true) {
      this.props.handleplay();
    } else {
      alert('多选状态不能播放');
    }
  }
  rename=() => {
    this.props.handlerename();
  }
  part=() => {
    const { select } = this.props;
    if (select === true) {
      this.props.handlepart();
    } else {
      alert('多选状态不能选择片段');
    }
  }
  givefriend=() => {
    const { music } = this.props;
    if (music.music.selectid > 0) {
      alert(`送出 ${music.music.entities.list[music.music.selectid].name}音乐`);
    } else {
      alert('请先选择音乐');
    }
  }
  delete=() => {
    // const {
    //   select, music, todoActions, isAcitve, ondelect
    // } = this.props;
    this.props.ondelect();
  }
  renderfooter=() => {
    const { music, select } = this.props;
    if (select === true && (music.music.selectid === 0 || music.music.selectid === undefined)) {
      return (
        <div className="Footer-all">
          <div className="Footer-1" >
            <img src={img} className="Footer-img" /><br />
            <span style={{ color: 'gray' }}>播放</span>
          </div>
          <div className="Footer-2">
            <img src={img2} className="Footer-img2" /><br />
            <span style={{ color: 'gray' }}>重命名</span>
          </div>
          <div className="Footer-3">
            <img src={img3} className="Footer-img3" /><br />
            <span style={{ color: 'gray' }}>选择片段</span>
          </div>
          <div className="Footer-4">
            <img src={img4} className="Footer-img4" /><br />
            <span style={{ color: 'gray' }}>送给朋友</span>
          </div>
          <div className="Footer-5">
            <img src={img5} className="Footer-img5" /><br />
            <span style={{ color: 'gray' }}>删除</span>
          </div>
        </div>
      );
    } else if (select === true && music.music.recommendresult.indexOf(music.music.selectid) + 1) {
      return (
        <div className="Footer-all">
          <div className="Footer-1" onClick={() => this.play()}>
            <img src={img} className="Footer-img" /><br />
            <span>播放</span>
          </div>
          <div className="Footer-2">
            <img src={img2} className="Footer-img2" /><br />
            <span style={{ color: 'gray' }}>重命名</span>
          </div>
          <div className="Footer-3">
            <img src={img3} className="Footer-img3" /><br />
            <span style={{ color: 'gray' }}>选择片段</span>
          </div>
          <div className="Footer-4">
            <img src={img4} className="Footer-img4" /><br />
            <span style={{ color: 'gray' }}>送给朋友</span>
          </div>
          <div className="Footer-5">
            <img src={img5} className="Footer-img5" /><br />
            <span style={{ color: 'gray' }}>删除</span>
          </div>
        </div>
      );
    } else if (select === true && !music.music.recommendresult.indexOf(music.music.selectid) + 1) {
      return (
        <div className="Footer-all">
          <div className="Footer-1" onClick={() => this.play()}>
            <img src={img} className="Footer-img" /><br />
            <span>播放</span>
          </div>
          <div className="Footer-2" onClick={() => this.rename()}>
            <img src={img2} className="Footer-img2" /><br />
            <span>重命名</span>
          </div>
          <div className="Footer-3" onClick={() => this.part()}>
            <img src={img3} className="Footer-img3" /><br />
            <span>选择片段</span>
          </div>
          <div className="Footer-4" onClick={this.givefriend}>
            <img src={img4} className="Footer-img4" /><br />
            <span>送给朋友</span>
          </div>
          <div className="Footer-5">
            <img src={img5} className="Footer-img5" onClick={() => this.delete()} /><br />
            <span>删除</span>
          </div>
        </div>
      );
    }
    music.music.selectmoreid.map(item => {
      if (music.music.recommendresult.indexOf(item) + 1) {
        count++;
      }
      return null;
    });
    if (select === false && count === 0 && music.music.selectmoreid.length > 0) {
      return (
        <div className="Footer-all">
          <div className="Footer-1">
            <img src={img} className="Footer-img" /><br />
            <span style={{ color: 'gray' }}>播放</span>
          </div>
          <div className="Footer-2">
            <img src={img2} className="Footer-img2" /><br />
            <span style={{ color: 'gray' }}>重命名</span>
          </div>
          <div className="Footer-3">
            <img src={img3} className="Footer-img3" /><br />
            <span style={{ color: 'gray' }}>选择片段</span>
          </div>
          <div className="Footer-4">
            <img src={img4} className="Footer-img4" /><br />
            <span style={{ color: 'gray' }}>送给朋友</span>
          </div>
          <div className="Footer-5">
            <img src={img5} className="Footer-img5" onClick={() => this.delete()} /><br />
            <span>删除</span>
          </div>
        </div>
      );
    }

    count = 0;
    return (
      <div className="Footer-all">
        <div className="Footer-1">
          <img src={img} className="Footer-img" /><br />
          <span style={{ color: 'gray' }}>播放</span>
        </div>
        <div className="Footer-2">
          <img src={img2} className="Footer-img2" /><br />
          <span style={{ color: 'gray' }}>重命名</span>
        </div>
        <div className="Footer-3">
          <img src={img3} className="Footer-img3" /><br />
          <span style={{ color: 'gray' }}>选择片段</span>
        </div>
        <div className="Footer-4">
          <img src={img4} className="Footer-img4" /><br />
          <span style={{ color: 'gray' }}>送给朋友</span>
        </div>
        <div className="Footer-5">
          <img src={img5} className="Footer-img5" /><br />
          <span style={{ color: 'gray' }}>删除</span>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderfooter()}
      </div>
    );
  }
}
