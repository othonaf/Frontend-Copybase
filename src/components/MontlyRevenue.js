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

const MontlyRevenue = ({ file, setFile, data, setData }) => {
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

    const calcularMRR = (data) => {
        const mrrPorMes = {};
        for (let i = 0; i < data.length; i++) {
            const mesAno = data[i]["data início"].slice(0, 7);
            if (!mrrPorMes[mesAno]) {
                mrrPorMes[mesAno] = 0;
            }
            const valor = data[i].valor;
            const dias = data[i]["cobrada a cada X dias"];
            const mrr = (valor / dias) * 30;
            mrrPorMes[mesAno] += mrr;
        }
        return mrrPorMes;
    }

    useEffect(() => {
        if (data) {
            const mrrPorMes = calcularMRR(data);
            const labels = Object.keys(mrrPorMes).sort();
            const mrr = labels.map(mes => mrrPorMes[mes]);
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "MRR",
                        data: mrr,
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

export default MontlyRevenue;
