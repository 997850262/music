import React from 'react';
import './Delect.css';

export default class Delect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handlerename = this.handlerename.bind(this);
  }
  onrename=() => {
    const { todoActions } = this.props;
    // const name = this.state.name;
    const { name } = this.state;
    //   console.log(name)
    todoActions.rename(name);
    this.props.onCancel();
  }
  getMaskClassName = isAcitve => {
    console.log(123987);
    if (!isAcitve) {
      return 'mask hideMask';
    }
    return 'mask showMask';
  }
  handledelect=() => {
    const { select, todoActions } = this.props;
    if (select === true) {
      todoActions.deleteone();
    } else {
      todoActions.deletemore();
    }
    this.props.onCancel();
  }
  handlerename=e => {
    this.setState({
      name: e.target.value
    });
  }
  renderbody=() => {
    const { music, select, ispart } = this.props;
    const count = music.music.selectmoreid.length;
    if (select === true && music.music.selectid > 0 && ispart === 4) {
      return (
        <div className="delect-Body">
          <div className="delect-title">确定删除{music.music.entities.list[music.music.selectid].name}音乐吗</div>
          <div className="delect-btn">
            <span className="delect-btn1" onClick={this.props.onCancel}>取消</span>
            <span className="delect-btn2" onClick={this.handledelect}>确定</span>
          </div>
        </div>
      );
    } else if (select === false && music.music.selectmoreid.length > 0 && ispart === 4) {
      return (
        <div className="delect-Body">
          <div className="delect-title">确定删除{count}首音乐吗</div>
          <div className="delect-btn">
            <span className="delect-btn1" onClick={this.props.onCancel}>取消</span>
            <span className="delect-btn2" onClick={this.handledelect}>确定</span>
          </div>
        </div>
      );
    } else if (ispart === 1) {
      return (
        <div className="rename-Body">
          <div className="rename-title">请输入新音乐名称</div>
          <input
            className="rename-input"
            type="text"
            defaultValue={music.music.entities.list[music.music.selectid].name}
            onChange={this.handlerename}
          />
          <div className="rename-btn">
            <span className="rename-btn1" onClick={this.props.onCancel}>取消</span>
            <span className="rename-btn2" onClick={this.onrename}>确定</span>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { isAcitve } = this.props;
    if (isAcitve === true) {
      return (
        <div>
          <div className={this.getMaskClassName(isAcitve)} />
          <div>
            {this.renderbody()}
          </div>
        </div>
      );
    }
    return null;
  }
}
