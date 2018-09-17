import React from 'react';
import './Select.css';

let color1 = 'white';
let color2 = 'white';
let select = true;
let selectmore = false;
export default class Select extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  handleselect=() => {
    console.log(select);
    select = true;
    selectmore = false;
    this.props.handleselect();
  }
  handlemoreselect=() => {
    select = false;
    selectmore = true;
    this.props.handlemoreselect();
  }
  render() {
    const { select } = this.props;
    if (select === true) {
      color1 = 'red';
      color2 = 'white';
    } else {
      color2 = 'red';
      color1 = 'white';
    }
    return (
      <div className="Select-all">
        <div className={`Select-1-${select}`} onClick={this.handleselect} style={{ background: `${color1}` }} />单选
            <div className={`Select-2-${selectmore}`} onClick={this.handlemoreselect} style={{ background: `${color2}` }} />多选
      </div>
    );
  }
}
