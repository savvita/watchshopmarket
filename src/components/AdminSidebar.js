

import Collapse from './Collapse/Collapse';


const AdminSidebar = () => {
    
    const articles = [
        { 
            heading: 'Доставка',
            link: 'delivery' 
        },
        { 
            heading: 'Оплата',
            link: 'payment' 
        }
    ];

    const np = [
        {
            heading: 'Міста та відділення',
            link: 'np'
        }
    ]

    const users = [
        {
            heading: 'Користувачі',
            link: 'users'
        }
    ]

    return (
        <div className='d-flex flex-column'>
            <Collapse heading='Продаж' items={ articles } />
            <Collapse heading='Нова пошта' items={ np } />
            <Collapse heading='Користувачі' items={ users } />
        </div>
    );
}

export default AdminSidebar;