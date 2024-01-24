import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2'; // Importe Pie em vez de Bar
import { GraficoPizza } from '../styled';
import {Chart, PieController, ArcElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(PieController, ArcElement, CategoryScale, LinearScale); // Registre PieController e ArcElement

const TipoDeAssinatura = ({ file, setFile, data, setData }) => {
    const [chartData, setChartData] = useState(null);

    const contarStatus = (data) => {
        let anual = 0;
        let mensal = 0;

        for (let i = 0; i < data.length; i++) {
            if (data[i]["cobrada a cada X dias"] === 365) {
                anual++;
            } else if (data[i]["cobrada a cada X dias"] === 30) {
                mensal++;
            }
        }

        return [anual, mensal];
    }

    useEffect(() => {
        if (data) {
            const statusCount = contarStatus(data);
            setChartData({
                labels: ['Quantidade de Assinaturas anuais', 'Quantidade de Assinaturas Mensais'],
                datasets: [
                    {
                        label: ["Relação entre Assinaturas Anuais e Mensais"],
                        data: statusCount,
                        backgroundColor: ['rgba(43, 63, 229, 0.8)', 'rgba(250, 192, 19, 0.8)'],
                        borderColor: ['rgba(75, 192, 192, 0.2)', 'rgba(75, 92, 92, 0.2)'],
                        borderWidth: 1
                    }
                ]
            });
        }
    }, [data]);

    return (
        <GraficoPizza>
            {chartData && <Pie data={chartData} options={{responsive: true}} />} {/* Use Pie em vez de Bar */}
        </GraficoPizza>
    );
}

export default TipoDeAssinatura;
