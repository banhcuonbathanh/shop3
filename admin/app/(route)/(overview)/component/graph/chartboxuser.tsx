import { SpanStatus } from "next/dist/trace";
import Link from "next/link";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import Image from "next/image";
type Props = {
  color: string;
  icon: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
};
// export const chartBoxUser = {
//   color: "#8884d8",
//   icon: "/userIcon.svg",
//   title: "Total Users",
//   number: "11.238",
//   dataKey: "users",
//   percentage: 45,
//   chartData: [
//     { name: "Sun", users: 400 },
//     { name: "Mon", users: 600 },
//     { name: "Tue", users: 500 },
//     { name: "Wed", users: 700 },
//     { name: "Thu", users: 400 },
//     { name: "Fri", users: 500 },
//     { name: "Sat", users: 450 }
//   ]
// };

const ChartBoxUser = (props: Props) => {
  return (
    <div className="flex h-full flex-col  p-6 rounded-md">
      <div className="flex flex-row gap-3">
        <div className="flex items-center space-x-2 text-sm 2xl:text-base">
          <Image
            src={props.icon}
            alt=""
            width={200}
            height={500}
            style={{ width: "auto", height: "auto" }}
          />
          <span>{props.title} :</span>
        </div>
        <span className="">{props.number}</span>
      </div>

      <div className="flex  justify-between ">
        <div className="w-full h-full">
          <ResponsiveContainer
            width="100%"
            height={150}
            className={"border border-cyan-50 py-2 rounded-sm"}
          >
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-row justify-between items-end">
        <span
          className={`font-bold text-lg 2xl:text-base ${
            props.percentage < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {props.percentage}%
        </span>
        <span className="text-base">this month</span>
        <Link href="/your-desired-path">View all</Link>
      </div>
    </div>
  );
};

export default ChartBoxUser;
