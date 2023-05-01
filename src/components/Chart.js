

import { Bar } from "react-chartjs-2";


import { Chart as ChartJS, LinearScale, CategoryScale, BarController, BarElement, Filler } from 'chart.js';
ChartJS.register(CategoryScale, BarController, BarElement, Filler, LinearScale);


const Chart = ({ title, data }) => {
    if(!data) {
        return null;
    }

    const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];

    const barData = {
        labels: months,
        datasets: [
            {
                data: data,
                borderColor: "#3333ff",
                backgroundColor: "rgba(0, 0, 255, 0.5)",
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div>
            <h5 className="text-white">{ title }</h5>
            <Bar type="bar" width={ 130 } height={ 50 } style={{ backgroundColor: '#ffffffde' }} data={ barData } options={ options } />
        </div>
    );
}

export default Chart;