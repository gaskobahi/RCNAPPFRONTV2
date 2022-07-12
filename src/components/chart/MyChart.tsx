import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toMonthName } from "../../Helpers/custom";

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];


const MyChart = (props:any) => {
 let  { aspect, title,data }=props
 
  return (
      <div className="card">
          <div className="card-header border-transparent">
            <h3 className="card-title">{title}</h3>

            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus"></i>
              </button>
              <button type="button" className="btn btn-tool" data-card-widget="remove">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
            <div className="card-body p-0">
                <ResponsiveContainer width="100%" aspect={aspect}>
                  <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="Total"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#total)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              
        </div>
    </div>
  );
};

export default MyChart;
