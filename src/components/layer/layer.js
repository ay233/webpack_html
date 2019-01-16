import  './layer.css';
import tpl from './layer.html';
import aa from '../index/index.js';
$('body').on('click','.layer',()=>{
	$('.layer').html(new aa().tpl);
});
const Layer=()=>{
  return {
  	name:'layer',
  	tpl:tpl
  }
} 
export default Layer;