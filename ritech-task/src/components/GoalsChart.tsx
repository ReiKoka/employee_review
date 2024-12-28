import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Goal } from "@/utils/types";
import { useAuth } from "@/context/AuthContext";

const chartConfig = {
  goals: {
    label: "All Goals",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1)",
  },
  inProgress: {
    label: "In-Progress",
    color: "hsl(var(--chart-2)",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-3)",
  },
};

type GoalsChartProps = {
  allGoals: Goal[];
};

export function GoalsChart({ allGoals }: GoalsChartProps) {
  const { user } = useAuth();
  const totalGoals = allGoals?.length || 0;

  const completedGoals = allGoals.filter(
    (goal) => goal.status === "completed",
  ).length;
  const inProgressGoals = allGoals.filter(
    (goal) => goal.status === "in-progress",
  ).length;
  const pendingGoals = allGoals.filter(
    (goal) => goal.status === "pending",
  ).length;

  const chartData = [
    {
      status: "Completed",
      amount: completedGoals,
      fill: chartConfig.completed.color,
    },
    {
      status: "In-Progress",
      amount: inProgressGoals,
      fill: chartConfig.inProgress.color,
    },
    {
      status: "Pending",
      amount: pendingGoals,
      fill: chartConfig.pending.color,
    },
  ];

  return (
    <Card className="grid w-full max-h-full border-none -mt-6">
      <CardHeader className="items-center pb-0">
        <CardDescription className="font-primary text-base mb-6 tracking-wide">
          Current Goals
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`${user?.role === "employee" ? "-mt-20" : "-mt-14"} h-full flex-1 pb-0`}
      >
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg bg-muted p-4 text-foreground shadow-xl">
                      <p className="font-bold">{label}</p>
                      {payload.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2"
                        >
                          <span className="font-medium">{item.name}:</span>
                          <span className="font-semibold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              className="font-primary"
              data={chartData}
              dataKey="amount"
              nameKey="status"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={2}
              label={({ status, amount }) => `${status}: ${amount}`}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          fill="black"
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalGoals?.toLocaleString() ?? "0"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy as number) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Goals
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
