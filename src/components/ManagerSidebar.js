
import Collapse from './Collapse/Collapse';

const ManagerSidebar = () => {
    const properties = [
        {
            heading: 'Водозахист',
            link: 'waterresistance'
        },
        {
            heading: 'Стиль',
            link: 'style'
        },
        {
            heading: 'Форма корпусу',
            link: 'caseshape'
        },
        {
            heading: 'Колекція',
            link: 'collection'
        },
        {
            heading: 'Колір',
            link: 'color'
        },
        {
            heading: 'Країна',
            link: 'country'
        },
        {
            heading: 'Вид циферблату',
            link: 'dialtype'
        },
        {
            heading: 'Функції',
            link: 'function'
        },
        {
            heading: 'Стать',
            link: 'gender'
        },
        {
            heading: 'Скло',
            link: 'glasstype'
        },
        {
            heading: 'Інкрустація',
            link: 'incrustationtype'
        },
        {
            heading: 'Матеріал',
            link: 'material'
        },
        {
            heading: 'Тип механізму',
            link: 'movementtype'
        },
        {
            heading: 'Браслет/ремінець',
            link: 'straptype'
        },
        {
            heading: 'Виробник',
            link: 'brand'
        }
    ].sort((a, b) => a.heading.localeCompare(b.heading));

    const articles = [
        { 
            heading: 'Годинники',
            link: 'watch' 
        }
    ];

    return (
        <div className='d-flex flex-column'>
            <Collapse heading='Характеристики' items={ properties } />
            <Collapse heading='Товари' items={ articles } />
        </div>
    );
}

export default ManagerSidebar;