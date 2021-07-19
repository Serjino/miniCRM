export const options = [
    {
        value: 'Телефон',
        text: 'Телефон',
        validationRegExp: /\+7\040\([0-9]{3}\)\040[0-9]{3}-[0-9]{2}-[0-9]{2}/,
        placeholder: 'Введите данные контакта',
        title: 'Введите телефон в формате +7 (xxx) xxx-xx-xx',
        mask: '+7 (999) 999-99-99',
    },
    {
        value: 'Доп. телефон',
        text: 'Доп. телефон',
        validationRegExp: /\+7\040\([0-9]{3}\)\040[0-9]{3}-[0-9]{2}-[0-9]{2}/,
        placeholder: 'Введите данные контакта',
        title: 'Введите телефон в формате +7 (xxx) xxx-xx-xx',
        mask: '+7 (999) 999-99-99',
    },
    {
        value: 'Email',
        text: 'Email',
        validationRegExp: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/,
        placeholder: 'xxx@xxx.xx',
        title: 'Введите почту в формате xxx@xxx.xx',

    },
    {
        value: 'Vk',
        text: 'Vk',
        // validationRegExp: /^(https?:\/\/)?(www\.)?vk\.com\/(\w|\d)+?\/?$/,
        validationRegExp:  /^(\w|\d|\-|\.|\_)+?\/?$/,
        placeholder: 'ID пользователя',
        title: 'Только английские буквы и/или знаки подчеркивания "." / "_"',
        // inputValue: 'https://vk.com/',
    },
    {
        value: 'Facebook',
        text: 'Facebook',
        // validationRegExp: /^(https?:\/\/)?(www\.)?facebook\.com\/(\w|\d)+?\/?$/,
        validationRegExp: /^(\w|\d|\-|\.|\_)+?\/?$/,
        placeholder: 'ID пользователя',
        title: 'Только английские буквы и/или знаки подчеркивания "." / "_"',
        // inputValue: 'https://facebook.com/',
    },

];