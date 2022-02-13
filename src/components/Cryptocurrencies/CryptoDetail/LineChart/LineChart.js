import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import s from './line_chart.module.css'
import {Line} from 'react-chartjs-2'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const LineChart = ({coinHistory,currentPrice,coinName}) =>{
    const coinPrice = []
    const coinTimeStamp = []
    for ( let i = 0; i < coinHistory?.data?.history?.length; i++){
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleTimeString())
    }
    console.log(coinHistory)
    console.log(coinPrice)
    const data = {
        labels : coinTimeStamp,
        datasets : [
            {
                label : "Price in USD",
                data : coinPrice,
                fill : false,
                backgroundColor : "#0071bd",
                borderColor : "#0071bd"
            }
        ]
    }
    const options = {
        scales: {
            yAxes:[
                {
                    ticks : {
                        beginAtZero : true
                    }
                }
            ]
        }
    }
    return (
        <>
            <div className={s.chart_header}>
                <h1>Price Chart</h1>
                <div>
                <span>{coinHistory?.data?.change}%</span>
                <span>Current {coinName} Price: $ {currentPrice}</span>
                </div>
            </div>
            <Line options={options} data={data}/>
            {/*<Line type={options} data={data}/>*/}
        </>
    )
}
export default LineChart;