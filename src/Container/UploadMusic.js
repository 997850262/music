import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActionCreators from '../actions/index';
import Head from '../component/Music/Head';
import Tabbar from '../component/Music/Tabbar';
import './Music.css';

class UploadMusic extends React.Component {
    componentDidMount=() => {
      const { todoActions } = this.props;
      todoActions.login(109);
    }
    render() {
      const { music, todoActions } = this.props;
      return (
        <div className="Music-all">
          <Head music={music} todoActions={todoActions} />
          <Tabbar music={music} todoActions={todoActions} />
        </div>
      );
    }
}

function mapStateToProps(state) {
  const {
    music
  } = state;
  console.log(music);
  return {
    music
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadMusic);
