import React from 'react';
import './MyMusic.css';

const img = require('../../source/select_music.png');

export default class MyMusic extends React.Component {
handleoneselect=item => {
  const { todoActions } = this.props;
  const id = item;
  todoActions.selectid(id);
}
handlemoreselect=item => {
  const { todoActions } = this.props;
  const id = item;
  todoActions.selectmoreid(id);
}

rendermylist=() => {
  const { music, select } = this.props;
  // const count = 0;
  const newList = music.music.result;
  if (newList) {
    return newList.map(Item => {
      if (music.music.entities.data[Item] !== undefined) {
        return music.music.entities.data[Item].list.map(item => {
          if (select === true && music.music.selectid === item) { // 单选
            return (
              <div className="list-all">
                <img src={img} className="singleselect" />
                <div
                  className="MyMusic-list-all"
                  onClick={() => this.handleoneselect(item)}
                >{music.music.entities.list[item].name}
                </div>
              </div>
            );
          } else if (select === true && music.music.selectid !== item) {
            return (
              <div className="list-all">
                <div
                  className="MyMusic-list-all"
                  onClick={() => this.handleoneselect(item)}
                >{music.music.entities.list[item].name}
                </div>
              </div>
            );
          } else if (select === false) { // 多选
            if (music.music.selectmoreid.indexOf(item) + 1) {
              return (
                <div className="list-all">
                  <div className="moreselect" style={{ background: 'red' }} onClick={() => this.handlemoreselect(item)}>
                    <span className="number">{music.music.selectmoreid.indexOf(item) + 1}</span>
                  </div>
                  <div className="MyMusic-list-all">{music.music.entities.list[item].name}</div>
                </div>
              );
            }

            return (
              <div className="list-all">
                <div className="moreselect" onClick={() => this.handlemoreselect(item)} />
                <div className="MyMusic-list-all">{music.music.entities.list[item].name}</div>
              </div>
            );
          }
          return null;
        });
      }
      return null;
    });
  }
  return null;
}
renderrelist=() => {
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
  return (
    <div className="MUSIC-all">
      <div className="MyMusic-all">
        <div className="MyMusic-title">
          我的音乐
          <span className="MyMusic-Subtitle">瓶子</span>
        </div>
        <div className="MyMusic-list">{this.rendermylist()}</div>
      </div>
      <div className="RecommendMusic-all">
        <div className="RecommendMusic-title">推荐音乐</div>
        <div className="RecommendMusic-list">{this.renderrelist()}</div>
      </div>
    </div>
  );
}
}
