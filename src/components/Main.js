require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

//导入图片信息，JSON格式
let imageDatas = require('../data/imageDatas.json');
//将图片的文件名映射到URL属性
imageDatas = (function(data){
  data.forEach(function(item){
    item.imageURL = require('../images/' + item.fileName);
  });
})(imageDatas);

class GalleryComponent extends React.Component{
  render() {
    return (
      <section>
        <section>
        pic here....
        </section>
        <nav>
        num here...
        </nav>
      </section>
    );
  }
};

GalleryComponent.defaultProps = {
};

ReactDOM.render(<GalleryComponent />, document.getElementById('app'));
export default GalleryComponent;
