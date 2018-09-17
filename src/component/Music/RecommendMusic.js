import React from 'react';
import './RecommendMusic.css';

const img = require('../../source/select_music.png');

export default class RecommendMusic extends React.Component {
handleoneselect=Item => {
  const { todoActions } = this.props;
  const id = Item;
  todoActions.selectid(id);
}
handlemoreselect=Item => {
  const { todoActions } = this.props;
  const id = Item;
  todoActions.selectmoreid(id);
}
  rendermylist=() => {
    const { music, select } = this.props;
    const newList = music.music.recommendresult;
    return newList.map(Item => {
      if (select === true && music.music.selectid === Item) {
        return (
          <div className="list-all">
            <img src={img} className="singleselect" />
            <div
              className="RecommendMusic-list-all"
              onClick={() => this.handleoneselect(Item)}
            >{music.music.recommendentities[Item].name}
            </div>
          </div>
        );
      } else if (select === true && music.music.selectid !== Item) {
        return (
          <div className="list-all">
            <div
              className="RecommendMusic-list-all"
              onClick={() => this.handleoneselect(Item)}
            >{music.music.recommendentities[Item].name}
            </div>
          </div>
        );
      } else if (select === false) { // 多选
        if (music.music.selectmoreid.indexOf(Item) + 1) {
          return (
            <div className="list-all">
              <div className="moreselect" style={{ background: 'red' }} onClick={() => this.handlemoreselect(Item)}>
                <span className="number">{music.music.selectmoreid.indexOf(Item) + 1}</span>
              </div>
              <div className="RecommendMusic-list-all">{music.music.recommendentities[Item].name}</div>
            </div>
          );
        }

        return (
          <div className="list-all">
            <div className="moreselect" onClick={() => this.handlemoreselect(Item)} />
            <div className="RecommendMusic-list-all">{music.music.recommendentities[Item].name}</div>
          </div>
        );
      }
      return null;
    });
  }
  render() {
    const { music } = this.props;
    console.log(music.music.data.token);
    return (
      <div className="RecommendMusic-all">
        <div className="RecommendMusic-title">推荐音乐</div>
        <div className="RecommendMusic-list">{this.rendermylist()}</div>
      </div>
    );
  }
}
