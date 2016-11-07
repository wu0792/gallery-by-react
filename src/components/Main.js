require('normalize.css/normalize.css');
require('styles/App.less');

//导入两个React基本对象
import React from 'react';
import ReactDOM from 'react-dom';
//导入自定义的组件对象
import Picture from './Picture';
import Nav from './Nav';

//导入图片信息，JSON格式
let imageDatas = require('../data/imageDatas.json');
//将图片的文件名映射到URL属性
(function (data) {
  data.forEach(function (item) {
    item.imageUrl = require('../images/' + item.fileName);
  });
})(imageDatas);

class GalleryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.size = {};
    this.state.activeIndex = 0;
    this.state.imageDatasArray = imageDatas;
    //常量的定义
    this.state.const = {NAV_HEIGHT: 30, PIC_WIDTH : 200, PIC_HEIGHT : 200, ACTIVE_SCALE : 1.8};
  }

  render() {
    return (
      //将JSON对象的数组映射成Picture组件数组
      //下面的映射过程，就是返回Picture组件，组件中定义的键值对就是该组件的props，注意其中的三个prop：
      //1）key   2)ref     3)onClickIndex
      <section>
        <section id="picContainer">
          {this.state.imageDatasArray.map((data, index) => (<Picture index={index} top={this.getPos(index).top} 
            left={this.getPos(index).left} width={this.state.const.PIC_WIDTH} height={this.state.const.PIC_HEIGHT}
            scale={this.state.const.ACTIVE_SCALE} isActive={index === this.state.activeIndex}
            ref={this.getPicRefName(index)} key={index} imageUrl={data.imageUrl} title={data.title}
            onClickIndex={this.onClickIndex.bind(this)} desc={data.desc} />))}
        </section>
        <nav>
            <Nav ref="nav" activeIndex={this.state.activeIndex} onClickIndex={this.onClickIndex.bind(this)} count={this.state.imageDatasArray.length} />
        </nav>
      </section>
    );
  }

  //ES6格式的function定义：根据index获取对应Picture组件的ref属性
  getPicRefName(index){
    //ES6特性，类似String.Format
    return `pic-${index}`;
  }

  //根据图片的index获取对应的坐标值，主要是根据两个因素：
  //1）是否是激活状态的图片，如果是，则返回居中的坐标值
  //2）如果不是激活状态，则根据index的大小判断其左右位置，再返回随机数
  getPos(index){
    //获取整个body对象的宽高
    let bodyWidth = this.state.size.width || ( this.state.size.width = document.body.scrollWidth),
        bodyHeight = (this.state.size.height || (this.state.size.height = document.body.scrollHeight)) - this.state.const.NAV_HEIGHT;

    //获取Picture对象的宽高
    let minLeft = 0,
        minTop = 0,
        picWidth = this.state.const.PIC_WIDTH,
        picHeight = this.state.const.PIC_HEIGHT,
        maxTop = bodyHeight - picHeight;

    //1）如果是激活状态的图片
    if(this.state.activeIndex == index){
      return {left: bodyWidth/2 - picWidth*this.state.const.ACTIVE_SCALE/2, top: bodyHeight/2 - picHeight*this.state.const.ACTIVE_SCALE/2};
    }else{
      //2）如果不是激活状态的图片，分为左中右三块区域，中间呈现当前激活的图片，左右呈现非激活的图片
      let inLeft = index < this.state.imageDatasArray.length/2,
          left = inLeft ? (Math.random() * (bodyWidth/2 - picWidth * 1.5)) : (bodyWidth/2 + picWidth/2 + Math.random() * (bodyWidth/2 - picWidth * 1.5)),
          top = minTop + Math.random() * (maxTop - minTop);
        
      return {left: left, top: top};
    }
  }

  //当单击图片或单击导航时候调用
  onClickIndex(index){
    if(this.state.activeIndex !== index){
      this.state.activeIndex = index;
      this.state.imageDatasArray.forEach((val, idx) => {
          let img = this.refs[this.getPicRefName(idx)];
          let pos = this.getPos(idx);
          img.state.left = pos.left;
          img.state.top = pos.top;
          img.state.isActive = img.props.index === index;
          img.state.reverse = false;

          //setState方法用来通知组件进行状态更新，重新render
          img.setState({styleObject: img.getFigureStyle()});
      });
    }else{
      let img = this.refs[this.getPicRefName(index)];
      img.state.reverse = !img.state.reverse;
      img.setState({styleObject: img.getFigureStyle()});
    }

    this.refs.nav.activateIndex(index);
  }
};

//将整个组件呈现到HTML的#app元素内部
ReactDOM.render(<GalleryComponent />, document.getElementById('app'));
export default GalleryComponent;
