import CollapsedActions from '../CollapsedActions/CollapsedActions';

import { Input, FormFeedback, FormGroup } from 'reactstrap';
import { FaCheck, FaBan } from "react-icons/fa";

import { useState, useEffect } from 'react';

import './WatchPropertyTable.css';

const WatchPropertyTableRow = ({ idx, item, className, onEdit, onView, onOnSaleChange, onIsTopChange }) => {
    const [onSale, setOnSale] = useState(item && item.onSale);
    const [isTop, setIsTop] = useState(item && item.isTop);

    const onSaleChange = async (e) => {
        if(!item || !onOnSaleChange) {
            return;
        }

        const res = await onOnSaleChange(item.id, e.target.checked);

        if(res === true) {
            setOnSale(!onSale);
        }
    }

    const isTopChange = async (e) => {
        if(!item || !onIsTopChange) {
            return;
        }

        const res = await onIsTopChange(item.id, e.target.checked);

        if(res === true) {
            setIsTop(!onSale);
        }
    }

    return (
        <tr className={ className }>
            <th scope="row" className='text-center ms-4 me-4'><p className="p-1 m-0">{ idx }</p></th>
            <td><p className="p-1 m-0">{ item && item.id }</p></td>
            <td>{ item && item.title }</td>
            <td>{ item && item.model }</td>
            <td>{ item && item.price }</td>
            <td>{ item && item.discount }</td>
            <td>{ item && item.available }</td>
            <td>
                <FormGroup switch>
                    <Input type="switch" checked={ onSale } onChange={ onSaleChange } />
                </FormGroup>
            </td>
            <td>
                <FormGroup switch>
                    <Input type="switch" checked={ isTop } onChange={ isTopChange } />
                </FormGroup>
            </td>
            <CollapsedActions item={ item } editMode={ false } onView={ () => item && onView && onView(item.id) } onEdit={ () => item && onEdit && onEdit(item.id)} />
        </tr>
    );
}

export default WatchPropertyTableRow;