import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, PieController, Legend, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from "react";
ChartJS.register(ArcElement, PieController, Legend, Title, Tooltip);




const PieChart = ({ values, title, className }) => {
    const [data, setData] = useState({ datasets: [] });
    const [options, setOptions] = useState({}); 

    useEffect(() => {
        if(!values) {
            return;
        }

        const data = {
            datasets: [
                {
                    data: [...(values.map(x => x.value))],
                    backgroundColor: [...(values.map(x => x.color))]
                }
            ],
            labels: [...(values.map(x => x.label))]
        };

        setData({ ...data });
        const options = {
            responsive: true,
            // cutout: '40%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = 'Продано: ';
                            label += context.parsed;
                            
                            return label;
                        }
                    }
                }
            }
        };
        setOptions({...options});

    }, [values]);

   

    if(!values) {
        return null;
    }

    return (
        <div style={{ width: '30%', height: 'auto', minWidth: '20rem' }} className={ className ?? '' }>
            { title && <h4 className="text-white text-center">{ title }</h4>}
            { values.length > 0 ? 
                <div className="text-center" style={{ width: '100%', paddingLeft: '1%' }}>
                    <Pie width={ 130 } height={ 50 } data={ data }  options = { options } /> 
                </div>
                : 
                <p className="text-white text-center">Немає даних</p> 
            }
        </div>
    );
}

export default PieChart;