"use client"

import { Bar } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { useEffect, useState } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function TrainingHistory() {
  const [data, setData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Training Hours",
        data: [2, 1.5, 0, 2, 1, 3, 0],
        backgroundColor: "rgb(124, 58, 237)",
      },
    ],
  })

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category" as const,
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear" as const,
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  }

  // Use useEffect to set data if needed
  useEffect(() => {
    // If you need to fetch or modify data, do it here
    // For example, you could fetch data from an API and set it
    // setData(fetchedData);
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training History</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  )
}

