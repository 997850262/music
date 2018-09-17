import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActionCreators from '../actions/index';
import Head from '../component/Music/Head';
import Tabbar from '../component/Music/Tabbar';
import Select from '../component/Music/Select';
import MyMusic from '../component/Music/MyMusic';
// import RecommendMusic from '../component/Music/RecommendMusic';
import Footer from '../component/Music/Footer';
import ListenMusic from '../component/Music/ListenMusic';
import Delect from '../component/Music/Delect';
import './Music.css';

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: true,
      isAcitve: false,
      ispart: 0
    };
  }
    componentDidMount=() => {
      const { todoActions } = this.props;
      const {
        music: {
          music: {
            data: {
              token
            }
          }
        }
      } = this.props;
      // const token = music.music.data.token;
      todoActions.fetchmymusic(token);
      todoActions.fetchrecommendmusic(token);
    }
    onCancel=() => {
      this.setState({
        isAcitve: false
      });
    }

    ondelect=() => {
      this.setState({
        isAcitve: true,
        ispart: 4
      });
    }
    handleplay=() => {
      this.setState({
        isAcitve: true,
        ispart: 0
      });
    }
    handlepart=() => {
      this.setState({
        isAcitve: true,
        ispart: 2
      });
    }
    handlerename=() => {
      this.setState({
        isAcitve: true,
        ispart: 1
      });
    }
    handlemoreselect=() => {
      const { todoActions } = this.props;
      this.setState({
        select: false
      });
      todoActions.onmoreselect();
    }
    handleselect=() => {
      const { todoActions } = this.props;
      this.setState({
        select: true
      });
      todoActions.onselect();
    }
    render() {
      const { music, todoActions } = this.props;
      return (
        <div className="Music-all">
          <Head music={music} todoActions={todoActions} select={this.state.select} />
          {/* <div className="main"> */}
          <Tabbar music={music} todoActions={todoActions} />
          <Select
            music={music}
            todoActions={todoActions}
            handleselect={this.handleselect}
            handlemoreselect={this.handlemoreselect}
            select={this.state.select}
          />
          <MyMusic music={music} todoActions={todoActions} select={this.state.select} />
          {/* <RecommendMusic music={music} todoActions={todoActions} select={this.state.select} /> */}
          {/* </div> */}
          <Footer
            music={music}
            todoActions={todoActions}
            select={this.state.select}
            handleplay={this.handleplay}
            ispart={this.state.ispart}
            handlepart={this.handlepart}
            handlerename={this.handlerename}
            isAcitve={this.state.isAcitve}
            ondelect={this.ondelect}
          />
          <ListenMusic
            isAcitve={this.state.isAcitve}
            todoActions={todoActions}
            music={music}
            onCancel={this.onCancel}
            ispart={this.state.ispart}
          />
          <Delect
            music={music}
            select={this.state.select}
            todoActions={todoActions}
            isAcitve={this.state.isAcitve}
            onCancel={this.onCancel}
            ispart={this.state.ispart}
          />
        </div>
      );
    }
}

function mapStateToProps(state) {
  const {
    music
  } = state;
  console.log('容器', music);

  return {
    music
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Music);
