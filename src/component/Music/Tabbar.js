import React from 'react';
import { Link } from 'react-router';
import './Tabbar.css';

let color1 = 'red';
let color2 = 'black';
let color3 = 'black';
let linecolor1 = 'red';
let linecolor2 = 'white';
let linecolor3 = 'white';
export default class Tabbar extends React.Component {
  setcolor=() => {
    color1 = 'red';
    color2 = 'black';
    color3 = 'black';
    linecolor1 = 'red';
    linecolor2 = 'white';
    linecolor3 = 'white';
  }
  setcolor2=() => {
    color1 = 'black';
    color2 = 'red';
    color3 = 'black';
    linecolor1 = 'white';
    linecolor2 = 'red';
    linecolor3 = 'white';
  }
  setcolor3=() => {
    color1 = 'black';
    color2 = 'black';
    color3 = 'red';
    linecolor1 = 'white';
    linecolor2 = 'white';
    linecolor3 = 'red';
  }
  render() {
    return (
      <div>
        <div className="Tabbar-all">
          <Link to="music">
            <div
              className="Tabbar-1"
              style={{ color: `${color1}`, borderBottom: `1px solid ${linecolor1}` }}
              onClick={this.setcolor}
            >
          我的音乐
            </div>
          </Link>
          <Link to="searchmusic">
            <div
              className="Tabbar-2"
              style={{ color: `${color2}`, borderBottom: `1px solid ${linecolor2}` }}
              onClick={this.setcolor2}
            >
          搜索音乐
            </div>
          </Link>
          <Link to="uploadmusic">
            <div
              className="Tabbar-3"
              style={{ color: `${color3}`, borderBottom: `1px solid ${linecolor3}` }}
              onClick={this.setcolor3}
            >
          上传音乐
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
