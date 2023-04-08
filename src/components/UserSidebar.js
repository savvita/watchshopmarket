

import { Button, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const UserSidebar = () => {
    const values = [
        {
            heading: "Мої дані",
            link: "profile"
        },
        {
            heading: "Мої замовлення",
            link: "myorders"
        },
        {
            heading: "Мої відгуки",
            link: "reviews"
        }
    ];
    return (
        <div>
            { values && values.map((item, idx) => 
            <div key={ idx }>
                <Button color="dark" className='rounded-0 text-start ps-4 text-nowrap'>
                    <NavLink tag={RRNavLink} to={ item.link }>{ item.heading }</NavLink>      
                </Button>
            </div>
            ) }
        </div>
    );
}

export default UserSidebar;