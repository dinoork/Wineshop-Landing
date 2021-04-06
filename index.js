import {Select} from './select/select';
import './select/style.scss';


const select = new Select('#select', {
    placeholder: 'Choose me',
    selectedId: '1',
    data: [
        {id: '1', value: 'Бутик на Невском 103'},
        {id: '2', value: 'Новокузнечный переулок 4/1'},
        {id: '3', value: 'Московский проспект 14'},
        {id: '4', value: 'Бутик на  Лиговском 89'},
        {id: '5', value: 'улица Рубинштейна 32'},
        {id: '6', value: 'Кронверкский проспект 57'},
    ],
    onSelect(item) {
        console.log('Selected Item', item);
    }
})

window.s = select;