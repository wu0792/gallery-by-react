import React from 'react'
import Dot from './Dot'

class Nav extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
    this.state.count = props.count || 0;
    this.state.activeSeq = props.activeSeq || 0;
    //this.onClick = this.onClick.bind(this);   
  }

  render(){
    let navList = [];
    for (var index = 0; index < this.state.count; index++) {
      // navList.push(<Dot key={index} seq={index} activeSeq={this.state.activeSeq} onClick={this.onClick.bind(this, index)} />);
      navList.push(<li className={'nav_dot' + (this.state.activeSeq == index?' active':'')} onClick={this.onClickDot}></li>);
    }

    return (<div className="nav_root">{navList}</div>);
  }

  onClickDot(index){
    console.log('index:' + index);
    debugger;
  }
};

export default Nav;
