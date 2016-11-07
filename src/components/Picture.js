import React from 'react';

/*
 * 获取 0~30° 之间的一个任意正负值
 */
function getRandomDeg() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

class Picture extends React.Component {
  constructor(props) {
    super(props);
    
    //根据组件定义的props赋值，传递给state，因为只有state的更新才会触发组件render
    this.state = {};
    this.state.reverse = props.reverse || false;
    this.state.imageUrl = props.imageUrl;
    this.state.title = props.title;
    this.state.desc = props.desc;
    this.state.rotate = getRandomDeg();
    this.state.isActive = props.isActive;
    this.state.left = props.left;
    this.state.top = props.top;
    this.state.width = props.width;
    this.state.height = props.height;
    this.state.scale = props.scale;
    this.state.styleObject = this.getFigureStyle();
  }

  onClickIndex(index) {
    //此处回调父组件中的function
    this.props.onClickIndex(index);
  }

   reset(){
    this.rotateTo(0);
  }

  rotateTo(deg){
    this.state.rotate = deg;
    this.setState({styleObject: this.getFigureStyle()});    
  }

  getFigureStyle() {
    let styleObject = {};
        styleObject.left = this.state.left,
        styleObject.top = this.state.top,
        styleObject.width = this.state.width * (this.state.isActive ? this.state.scale : 1),
        styleObject.height = this.state.height * (this.state.isActive ? this.state.scale : 1);

    // 如果图片的旋转角度有值并且不为0， 添加旋转角度
    if (!this.state.isActive && this.state.rotate) {
      //添加浏览器兼容性CSS
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
        styleObject[value] = 'rotate(' + this.state.rotate + 'deg)';
      }.bind(this));
    }

    if(this.state.isActive){
      //注意驼峰式的方式，而不是 z-index
      styleObject['zIndex'] = 100;
    }

    return styleObject;
  }

  getImgStyle(){
    let figureStyle = this.getFigureStyle();
    //减掉边框的宽度
    return {width: figureStyle.width - 20, height: figureStyle.height - 20};
  }

  render() {
    //注意onClick的赋值
    return (
      <figure className={'pic' + (this.state.reverse?' reverse':'')} style={this.state.styleObject}>
        <img style={this.getImgStyle()} onClick={this.onClickIndex.bind(this, this.props.index)} alt={this.state.title} src={this.state.imageUrl} ref="img" />
        <figcaption className="pic_reverse" onClick={this.onClickIndex.bind(this, this.props.index)}>
          <div className="title">{this.state.title}</div>
          <p>{this.state.desc}</p>
        </figcaption>
      </figure>      
    );
  }
};

export default Picture;
