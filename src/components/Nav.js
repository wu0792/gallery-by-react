import React from 'react'
import Dot from './Dot'

class Nav extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
    this.state.count = props.count || 0;
    this.state.activeSeq = props.activeSeq || 0;    
  }

  render(){
    let navList = [];
    for (var index = 0; index < this.state.count; index++) {
      navList.push(<Dot key={index} seq={index} activeSeq={this.state.activeSeq} />);
    }

    return (<div className="nav_root">{navList}</div>);
  }
};

export default Nav;
