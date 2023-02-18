import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import AuthContext from "../context/AuthContext";


const data = [
    { 'name': '2020', 'react': 30, 'vue': 12 },
    { 'name': '2021', 'react': 40, 'vue': 34 },
    { 'name': '2022', 'react': 50, 'vue': 55 },
    { 'name': '2023', 'react': 60, 'vue': 43 },
]

const SpendingChart = () => {

    const { authTokens } = useContext(AuthContext)
    const [chartData, setChartData] = useState([])

    const handleInput = async (e) => {
        e.preventDefault();
        const month = e.target.month.value

        const response = await fetch("http://localhost:8000/api/receipt/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${authTokens?.access}`
            },
        });
        const data = await response.json()
        if (response.status === 200) {
            const dataPoints = data.map(x => ({
                'date': x.purchase_date,
                'price': x.total_price,
            }))
            setChartData(dataPoints);
        }

        // console.log(chartData)
    }

    return (
        <div id="spending-chart">
            <form onSubmit={handleInput}>
                <input type="month" name="month" />
                <input type="submit" value="Primeni"></input>
            </form>
            <BarChart width={600} height={300} data={chartData} barSize={20} barCategoryGap={1} >
                <CartesianGrid strokeDasharray='5 5' />
                <Bar type='monotone' dataKey='price' fill='red' />
                {/* <Line type='monotone' dataKey='vue' stroke="blue" strokeWidth={3} /> */}
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
            </BarChart>


        </div>
    )
}

export default SpendingChart