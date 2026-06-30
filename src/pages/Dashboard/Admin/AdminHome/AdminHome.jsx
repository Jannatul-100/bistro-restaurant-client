import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {  FaDollarSign, FaShoppingBag, FaShoppingCart, FaUsers } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Tooltip,
  Cell,
  PieChart, Pie, Sector, ResponsiveContainer,
  Legend
} from 'recharts';



const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    //admin-stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })

    //order-stats
    const { data: charts = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    })

    if(isLoading){
        return <progress className='progress w-56 md:w-76'></progress>
    }

//custom bar chart
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', 'black'];

    const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
        C${x + width / 3},${y + height}
        ${x + width / 2},${y + height / 3}
        ${x + width / 2},${y}
        C${x + width / 2},${y + height / 3}
        ${x + (2 * width) / 3},${y + height}
        ${x + width},${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
    const { x, y, width, height, index } = props;
    const color = colors[index % colors.length];

    return (
        <path
        d={getPath(x, y, width, height)}
        stroke={color}
        fill={color}
        />
    );
    };

//custom pie charts

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    }) => {
    if (
        cx == null ||
        cy == null ||
        innerRadius == null ||
        outerRadius == null ||
        percent == null
    ) {
        return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
            x={x}
            y={y}
            fill="#fff"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            >
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = (charts || []).map((item) => ({
    name: item.category,
    value: item.revenue,
    }));

    return (
        <div>
            <h2 className='text-xl md:text-3xl mt-6 font-bold'>
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }!
            </h2>

            <div className="stats shadow my-6">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaDollarSign className='text-3xl'></FaDollarSign>
                    </div>
                    <div className="stat-title font-bold">Revenue</div>
                    <div className="stat-value">${stats?.revenue}</div>
                    <div className="stat-desc">Jan 1st - June 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaUsers className='text-3xl'></FaUsers>
                    </div>
                    <div className="stat-title font-bold">Users</div>
                    <div className="stat-value">{stats.users}</div>
                    <div className="stat-desc">↗︎ 22% </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaShoppingBag className='text-3xl' />
                    </div>
                    <div className="stat-title font-bold">Products</div>
                    <div className="stat-value">{stats.menuItems}</div>
                    <div className="stat-desc">↗︎ 22% </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaShoppingCart className='text-3xl'/>
                    </div>
                    <div className="stat-title font-bold">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-desc">↘︎ 14% </div>
                </div>
            </div>

            {/* stats */}
            <div className='flex flex-col md:flex-row my-6'>
                {/* bar chart */}
                <div className='w-1/2'>
                    <h2 className='font-bold'>Bar Chart</h2>
                    <BarChart
                        // style={{ width: '100%', maxWidth: '700px', maxHeight: '500px' }}
                        width={400}
                        height={300}
                        data={charts}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip cursor={{ fillOpacity: 0.5 }} />
                        <XAxis dataKey="category" />
                        <YAxis width="auto" />
                        <Bar dataKey="quantity" fill="#8884d8" shape={TriangleBar} activeBar>
                            {
                                charts.map((entry, index) =>(
                                    <Cell key={`cell=${index}`} fill={colors}></Cell>
                            ))}
                        </Bar>
                        
                    </BarChart>
                </div>

                {/* pie chart */}
                <div className='w-1/2'>
                <h2 className='font-bold mx-0 md:mx-8 my-4 md:my-0'>Pie Chart</h2>
                    <ResponsiveContainer width={400} height={300}>
                        <PieChart>
                        <Pie
                            data={pieChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label={renderCustomizedLabel}
                        >
                            {pieChartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                            ))}
                        </Pie>
                        <Legend></Legend>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;