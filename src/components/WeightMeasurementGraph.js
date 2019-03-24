import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import moment from 'moment'

const data = [
  { date: '2018/02/01', Weight: 200 },
  { date: '2018/02/02', Weight: 198},
  { date: '2018/02/03', Weight: 197},
  { date: '2018/02/04', Weight: 197.2},
  { date: '2018/02/05', Weight: 197.8}, 
  { date: '2018/02/06', Weight: 196.5},
  { date: '2018/02/07', Weight: 195},
];

function WeightMeasurementGraph(props) {

  const currentMeasurements = props.currentMeasurements

  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={currentMeasurements}>
        <XAxis dataKey="date" />
        <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} allowDecimals={true}/>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeightMeasurementGraph;