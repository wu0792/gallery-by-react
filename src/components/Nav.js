import React from 'react'
//导入Dot组件，每个导航小点
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
      //注意onClick的赋值
      navList.push(<Dot ref={index} key={index} active={index == this.state.activeIndex} onClick={this.onClick.bind(this, index)} />);
    }

    //留意一下这种render方式
    return (<div className="nav_root">{navList}</div>);
  }

  onClick(index){
    //触发onClick之后
    //1）修改状态
    this.activateIndex(index);
    //2）调用父组件的function，方便父组件进行其他状态更新：图片的重新排列
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
