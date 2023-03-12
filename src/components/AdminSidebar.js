

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

    return (
        <div className='d-flex flex-column'>
            <Collapse heading='Продаж' items={ articles } />
        </div>
    );
}

export default AdminSidebar;