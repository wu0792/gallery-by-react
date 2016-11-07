import React from 'react'

class Dot extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
    this.state.reverse = props.reverse || false;
    this.state.active = props.active || false;
  }

  render(){
    return (<li className={'nav_dot' + (this.state.active?' active':'')} onClick={this.props.onClick}></li>);
  }
}

export default Dot;
