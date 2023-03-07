import CollapsedActions from '../CollapsedActions/CollapsedActions';

import { Input, FormFeedback, FormGroup } from 'reactstrap';
import { FaCheck, FaBan } from "react-icons/fa";

import { useState, useEffect } from 'react';

import './WatchPropertyTable.css';

const WatchPropertyTableRow = ({ idx, item, className, onEdit, onDelete, onView, onOnSaleChange, onIsTopChange }) => {


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
                    <Input type="switch" checked={ item && item.onSale } onChange={ onOnSaleChange } />
                </FormGroup>
            </td>
            <td>
                <FormGroup switch>
                    <Input type="switch" checked={ item && item.isTop } onChange={ onIsTopChange } />
                </FormGroup>
            </td>
            <CollapsedActions item={ item } editMode={ false } onView={ () => item && onView && onView(item.id) } onEdit={ () => item && onEdit && onEdit(item.id)} />
        </tr>
    );
}

export default WatchPropertyTableRow;