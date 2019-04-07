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

function WeightMeasurementGraph(props) {

  props.currentMeasurements.forEach(measurement => {
    measurement.date = moment(measurement.date).valueOf()
  })

  props.currentMeasurements.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));

    console.log(props.currentMeasurements)

  return (
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={props.currentMeasurements}>
        <XAxis 
         dataKey = 'date'
         domain = {['auto', 'auto']}
         name = 'Time'
         tickFormatter = {(unixTime) => moment(unixTime).format('YYYY-MM-DD')}
         type = 'number'
        />
        <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} allowDecimals={true}/>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip labelFormatter={(label) => moment(label).format('YYYY-MM-DD')}/>
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeightMeasurementGraph;