import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import useFetch from "../../hooks/useFetch"
import { useEffect, useState } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type BarChartProps = {
    year: number
}

const tooltip = {
    titleAlign: "center" as const,
    yAlign: "center" as const,
    callbacks: {
        label: (ctx: any) => {
            return `${ctx.dataset.label} ${Math.abs(ctx.raw)}%`
        },
    },
}

export const options = {
    indexAxis: "y" as const,
    responsive: true,
    scales: {
        x: {
            stacked: true,
            ticks: {
                callback: (value: any) => {
                    return Math.abs(value)
                },
            },
            grid: {
                display: false,
            },
            title: {
                display: true,
                text: "Percentage",
            },
        },
        y: {
            beginAtZero: true,
            stacked: true,
            title: {
                display: true,
                text: "Age groups",
            },
        },
    },
    plugins: {
        tooltip: tooltip,
        title: {
            display: true,
            text: "Argentina population",
        },
    },
}

const BarChart = ({ year = 2022 }: BarChartProps) => {
    const {
        value: populationData,
        error,
        loading,
    } = useFetch({endpoint: `population_data?year=${year}`, dependencies: [year]})
    const [data, setData] = useState(null)

    console.log({year});
    console.log({ populationData })
    console.log({ error })
    console.log({ loading })

    useEffect(() => {
        if (populationData && !loading && !error) {
            let maleValues = []
            let femaleValues = []
            let labels = []
            const labelsSet = new Set<string>([])
            for (const population of populationData) {
                if (population.gender === "M") {
                    maleValues.push(population.value * -1)
                    labelsSet.add(population.range)
                }
                if (population.gender === "F") {
                    femaleValues.push(population.value)
                }
            }
            labels = Array.from(labelsSet).reverse()
            maleValues = maleValues.reverse()
            femaleValues = femaleValues.reverse()

            setData({
                //@ts-ignore
                labels: labels,
                datasets: [
                    {
                        label: "Male",
                        data: maleValues,
                        backgroundColor: "black",
                        barPercentage: 1,
                        categoryPercentage: 1,
                    },
                    {
                        label: "Female",
                        data: femaleValues,
                        barPercentage: 1,
                        categoryPercentage: 1,
                    },
                ],
            })
        }
    }, [populationData, loading, error])

    if (data) {
        return <Bar options={options} data={data} />
    } if (error) {
        return <h1>Something ocurred: {error.message}</h1>
    } else {
        return <h1>Loading...</h1>
    }
}

export default BarChart
