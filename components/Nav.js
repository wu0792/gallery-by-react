import React from 'react'
import Dot from './Dot'

class Nav extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
    this.state.activeIndex = props.activeIndex || 0;
    this.onClick = this.onClick.bind(this);   
  }

  render(){
    let navList = [];
    for (var index = 0; index < this.props.count; index++) {
      navList.push(<Dot ref={index} key={index} active={index == this.state.activeIndex} onClick={this.onClick.bind(this, index)} />);
    }

    return (<div className="nav_root">{navList}</div>);
  }

  onClick(index){
    this.activateIndex(index);
    this.props.onClickIndex(index);
  }

  activateIndex(index){
    for (var i = 0; i < this.props.count; i++) {
      this.refs[i].setState({active:false});
    }

    this.refs[index].setState({active:true});
  }
};

export default Nav;
