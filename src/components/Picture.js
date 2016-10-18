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
    
    this.state = {};
    this.state.imageUrl = props.imageUrl;
    this.state.title = props.title;
    this.state.desc = props.desc;
    this.state.rotate = props.rotate;
    this.state.isCenter = false;
    this.state.styleObject = this.getStyle();

    this.shuffle = this.shuffle.bind(this);
  }

  shuffle() {
    this.state.rotate = getRandomDeg();
    this.setState({styleObject: this.getStyle()});
  }

  getStyle() {
    let styleObject = {};
    // 如果图片的旋转角度有值并且不为0， 添加旋转角度
    if (this.state.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
        styleObject[value] = 'rotate(' + this.state.rotate + 'deg)';
      }.bind(this));
    }

    return styleObject;
  }

  render() {
    return (<img onClick={this.shuffle} style={this.state.styleObject} className="pic" alt={this.state.title} src={this.state.imageUrl} ref="img" />);
  }
};

Picture.defaultProps = {
};

export default Picture;
