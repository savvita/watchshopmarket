

import Chart from '../Chart';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row, Spinner } from 'reactstrap';

const PropertyDetailView = ({ id, selectValue, selectStatus, title, get, getOrders, selectOrderStatus }) => {
    const value = useSelector(selectValue);
    const [orders, setOrders] = useState([]);
    const status = useSelector(selectStatus);
    const orderStatus = useSelector(selectOrderStatus);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [totalSum, setTotalSum] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const [monthSum, setMonthSum] = useState([]);
    const [monthCount, setMonthCount] = useState([]);

    useEffect (() => {
        if(!get || !id) {
            return;
        }

        dispatch(get(id));
        getSales();
    }, [id]);

    const getSales = async () => {
        if(!getOrders || !id) {
            return;
        }
        
        const res = await getOrders(id);
        
        if(res) {
            setOrders([...res]);
            let total_s = 0;
            const month_s = [];
            const month_c = [];
            
            const now = new Date();
            const year = now.getFullYear();
            let total_c = 0;

            for(let order of res) {
                if(!order.details) {
                    continue;
                }

                const date = new Date(order.date);

                for(let detail of order.details) {
                    total_s += detail.unitPrice * detail.count;
                    total_c += detail.count;

                    if(date.getFullYear() === year) {
                        const month = date.getMonth();

                        month_s[month] = month_s[month] ?? 0;
                        month_c[month] = month_c[month] ?? 0;
                        month_s[month] += detail.unitPrice * detail.count;
                        month_c[month] += detail.count;
                    }
                }
            }

            setTotalSum(total_s);
            setTotalCount(total_c);

            setMonthSum([...month_s]);
            setMonthCount([...month_c]);
        }
    }

    return (
        <div className="text-white mt-3">
            <Button onClick={() => navigate(-1)}>Назад</Button>
            <div className={ status === 'idle' ? 'border p-2 rounded-1 mt-3' : 'd-none' }>
                { title && <h3>{ title }</h3>}
                { value && value.value && <p className="m-0">Значення: { value.value.value }</p> }
                { value && <p className="m-0">Товарів: { value.hits }</p> }
            </div>          
            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
            <div className='border p-2 rounded-1 mt-3'>
                <h5>Продажі</h5>
                { orders && <div>
                    <div className={ orderStatus !== 'idle' ? 'd-none' : '' }>
                        <p className="m-0">Продано: { totalCount }</p>
                        <p className="m-0">Сума: { totalSum }&nbsp;&#8372;</p>

                        <Row>
                            <Col lg="12" xl="6" className='mt-3'>
                                { monthCount && <Chart title="Кількість товарів" data={ monthCount } />}
                            </Col>
                            <Col lg="12" xl="6" className='mt-3'>
                                { monthSum && <Chart title="Сума продажів" data={ monthSum } />}
                            </Col>
                        </Row>
                    </div>
                    <div className={ orderStatus === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                </div> }
            </div>

        </div>
    );
}

export default PropertyDetailView;