import React from 'react'

class Dot extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
    this.state.seq = props.seq || 0;
    this.state.activeSeq = props.activeSeq || 0;
    // this.onClick = this.onClick.bind(this); 
  }

  render(){
    return (<li className={'nav_dot' + (this.state.activeSeq == this.state.seq?' active':'')}></li>)
  }

  // onClick(e){
  //   this.setState({activeSeq: this.state.seq});
  // }
}

export default Dot;
