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

const AssinaturasMensais = ({ file, setFile, data, setData }) => {

    const [chartData, setChartData] = useState(null);

    const contarStatus = (data) => {
        const statusPorMes = {};

        for (let i = 0; i < data.length; i++) {
            const mesAno = data[i]["data status"].slice(0, 7);
            if (!statusPorMes[mesAno]) {
                statusPorMes[mesAno] = { ativas: 0, canceladas: 0 };
            }
            if (data[i].status === 'Ativa') {
                statusPorMes[mesAno].ativas++;
            } else if (data[i].status === 'Cancelada') {
                statusPorMes[mesAno].canceladas++;
            }
        }

        return statusPorMes;
    }

    useEffect(() => {
        if (data) {
            const statusPorMes = contarStatus(data);
            const labels = Object.keys(statusPorMes).sort();
            const ativas = labels.map(mes => statusPorMes[mes].ativas);
            const canceladas = labels.map(mes => statusPorMes[mes].canceladas);
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "Assinaturas Ativas",
                        data: ativas,
                        backgroundColor: 'rgba(43, 63, 229, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: "Assinaturas Canceladas",
                        data: canceladas,
                        backgroundColor: 'rgba(250, 192, 19, 0.8)',
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
                },
            }
        }
    }

    return (
        <Graficos>
            {chartData && <Bar data={chartData}  options={options} />}
        </Graficos>
    );
}

export default AssinaturasMensais;
