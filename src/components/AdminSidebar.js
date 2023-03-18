

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

    return (
        <div className='d-flex flex-column'>
            <Collapse heading='Продаж' items={ articles } />
            <Collapse heading='Нова пошта' items={ np } />
        </div>
    );
}

export default AdminSidebar;