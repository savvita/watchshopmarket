

import BasketTableRow from "./BasketTableRow";

import { Table } from 'reactstrap';
import { useEffect, useState } from "react";

import { setValid } from "../../app/basketSlice";

import './BasketTable.css';
import { useDispatch } from "react-redux";


const BasketTable = ({ basket, onChange, onDelete }) => {

    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        let sum = 0;
        if(basket && basket.details) {
            basket.details.forEach(item => sum += item.unitPrice * item.count);

            setTotal(sum);

            dispatch(setValid(basket.details.map(item => { return { id: item.id, valid: true } })));
        }


    }, [basket]);

    const changeBasket = (id, value) => {
        onChange && onChange(id, value);
    }

    const deleteFromBasket = (id) => {
        onDelete && onDelete(id);
    }

    return (
        <Table dark>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Товар</th>
                    <th>Ціна</th>
                    <th>Кількість</th>
                    <th>Сума</th>
                </tr>
            </thead>
            <tbody>
                { basket && basket.details && basket.details.map((item, idx) => <BasketTableRow key={ item.id } idx={ idx + 1 } item={ item } onChange={ (value) => changeBasket(item.id, value) } onDelete= { deleteFromBasket }/>) }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="5" className="text-end fs-4">Всього: { total }&nbsp;&#8372;</td>
                </tr>
            </tfoot>
        </Table>
    );
}

export default BasketTable;