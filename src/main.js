import './asserts/css/hello.css';
import './asserts/css/common.css';
import './asserts/js/add.js';
import './asserts/js/hello.js';
console.log('我是主文件22！');
// 引入组件
import Layer from './components/layer/layer.js';




const App=()=>{
  const dom=document.getElementById('app');
  var cLayer=new Layer();
  dom.innerHTML=cLayer.tpl;
}
new App;