import './index.css';
import tpl from './index.html';
$('body').on('click', '#btn', () => {
	console.log($('.changeText'))
    $('body').html('some text by ay!');
});
const Index = () => {
    return {
        name: 'index',
        tpl: tpl
    }
}
export default Index;