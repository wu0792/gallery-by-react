require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import ReactDOM from 'react-dom';
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
    this.state.const = {NAV_HEIGHT: 30, PIC_WIDTH : 200, PIC_HEIGHT : 200, ACTIVE_SCALE : 1.8};
  }

  render() {
    // debugger;
    return (
      <section>
        <section id="picContainer">
          {this.state.imageDatasArray.map((data, index) => (<Picture index={index} top={this.getPos(index).top} left={this.getPos(index).left} width={this.state.const.PIC_WIDTH} height={this.state.const.PIC_HEIGHT}
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

  getPicRefName(index){
    return `pic-${index}`;
  }

  getPos(index){
    let bodyWidth = this.state.size.width || ( this.state.size.width = document.body.scrollWidth),
        bodyHeight = (this.state.size.height || (this.state.size.height = document.body.scrollHeight)) - this.state.const.NAV_HEIGHT;

    let minLeft = 0,
        minTop = 0,
        picWidth = this.state.const.PIC_WIDTH,
        picHeight = this.state.const.PIC_HEIGHT,
        maxTop = bodyHeight - picHeight;

        // debugger;
    if(this.state.activeIndex == index){
      return {left: bodyWidth/2 - picWidth*this.state.const.ACTIVE_SCALE/2, top: bodyHeight/2 - picHeight*this.state.const.ACTIVE_SCALE/2};
    }else{
      //分为左中右三块区域，中间呈现当前激活的图片，左右呈现非激活的图片
      let inLeft = index < this.state.imageDatasArray.length/2,
          left = inLeft ? (Math.random() * (bodyWidth/2 - picWidth * 1.5)) : (bodyWidth/2 + picWidth/2 + Math.random() * (bodyWidth/2 - picWidth * 1.5)),
          top = minTop + Math.random() * (maxTop - minTop);
        
      return {left: left, top: top};
    }
  }

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

ReactDOM.render(<GalleryComponent />, document.getElementById('app'));
export default GalleryComponent;
