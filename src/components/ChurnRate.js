import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Graficos } from '../styled';
import "chartjs-plugin-datalabels";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js/auto';
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(ChartDataLabels);
Chart.register(LineElement);
Chart.register(BarController, BarElement, CategoryScale, LinearScale);

const ChurnRate = ({ file, setFile, data, setData }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: 'rgba(43, 63, 229, 0.8)',
                borderColor: 'rgba(75, 92, 92, 0.2)',
                borderWidth: 1
            }
        ]
    });

    const calcularChurnRate = (data) => {
        const churnPorMes = {};
        const totalPorMes = {};
        for (let i = 0; i < data.length; i++) {
            const mesAno = data[i]["data início"].slice(0, 7);
            if (!churnPorMes[mesAno]) {
                churnPorMes[mesAno] = 0;
                totalPorMes[mesAno] = 0;
            }
            totalPorMes[mesAno]++;
            if (data[i].status === 'Cancelada') {
                churnPorMes[mesAno]++;
            }
        }
        const churnRatePorMes = {};
        for (let mesAno in churnPorMes) {
            churnRatePorMes[mesAno] = churnPorMes[mesAno] / totalPorMes[mesAno];
        }
        return churnRatePorMes;
    }

    useEffect(() => {
        if (data) {
            const churnRatePorMes = calcularChurnRate(data);
            const labels = Object.keys(churnRatePorMes).sort();
            const churnRate = labels.map(mes => churnRatePorMes[mes]);
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "Churn Rate",
                        data: churnRate,
                        backgroundColor: 'rgba(43, 63, 229, 0.8)',
                        borderColor: 'rgba(75, 92, 92, 0.2)',
                        borderWidth: 1
                    }
                ]
            });
        }
    }, [data]);

    const options = {
        plugins: {
            legend: {
                title: {
                    display: true,
                    text: [],
                    font: {
                        size: 16
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            datalabels: {
                display: false
            }
        }
    }

    return (
        <Graficos>
            {data && data.length > 0 && <Bar data={chartData} options={options} />}
        </Graficos>
    );
}

export default ChurnRate;
