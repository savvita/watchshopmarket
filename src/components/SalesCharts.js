import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import PieChart from "./PieChart";




const SalesCharts = ({ getValues, selectValues, selectStatus, selectProps, saleFilter }) => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const props = useSelector(selectProps);

    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [monthData, setMonthData] = useState([]);

    useEffect(() => {
        if(getValues) {
            dispatch(getValues());
        }
    }, []);

    useEffect(() => {
        if(!props || !props.value || !values || !saleFilter) {
            return;
        }

        const data = [];
        const monthData = [];
        const currentMonth = (new Date()).getMonth();

        for(let prop of props.value) {
            const val = { 
                id: prop.id,
                label: prop.value, 
                color: getRandomColor() 
            };
            let sales = values.filter(x => saleFilter(x, prop.id) === true);
            let sum = 0;
            for(let s of sales) {
                sum += s.count;
            }

            val.value = sum;
            if(val.value > 0) {
                data.push({ ...val });
            }

            sales = sales.filter(x => new Date(x.date).getMonth() === currentMonth);
            sum = 0;

            for(let s of sales) {
                sum += s.count;
            }

            val.value = sum;

            if(val.value > 0) {
                monthData.push({ ...val });
            }
        }

        setData([...data]);
        setMonthData([...monthData]);
    }, [props, values]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div className="pt-4 mb-4">
            <h3 className="text-white">Графіки продажів</h3>
            { status !== 'loading' && 
                <div className="d-flex charts-container">
                    <PieChart values={ data } title="Усього" className="me-4" /> 
                    <PieChart values={ monthData } title="Цього місяця" /> 
                </div>
            }
            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
        </div>
    );
}

export default SalesCharts;