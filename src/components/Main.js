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
    this.state.imageDatasArray = imageDatas;
  }

  render() {
    return (
      <section>
        <section>
          {
            this.state.imageDatasArray.map((data, index) => (<Picture onClick={this.shuffle} key={index} imageUrl={data.imageUrl} title={data.title} desc={data.desc} />))
          }
        </section>
        <nav>
            <Nav count={this.state.imageDatasArray.length} />
        </nav>
      </section>
    );
  }
};

GalleryComponent.defaultProps = {
};

ReactDOM.render(<GalleryComponent />, document.getElementById('app'));
export default GalleryComponent;
