import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const activityData = [
  { time: '08:00', queries: 12 },
  { time: '10:00', queries: 45 },
  { time: '12:00', queries: 89 },
  { time: '14:00', queries: 65 },
  { time: '16:00', queries: 34 },
  { time: '18:00', queries: 20 },
  { time: '20:00', queries: 15 },
];

const topicData = [
  { name: 'Assignments', count: 120 },
  { name: 'Lunch', count: 98 },
  { name: 'IT Services', count: 86 },
  { name: 'Electives', count: 65 },
  { name: 'Workspaces', count: 45 },
];

export default function InsightsGraph() {
  return (
    <div className="insights-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
      
      {/* Activity Trend Chart */}
      <div className="card" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', color: '#fff' }}>Student Activity (24h)</h3>
        <div style={{ height: '250px', width: '100%' }}>
          <ResponsiveContainer>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff6b00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{fontSize: 12}} />
              <YAxis stroke="rgba(255,255,255,0.5)" tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="queries" stroke="#ff6b00" fillOpacity={1} fill="url(#colorQueries)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic Distribution Chart */}
      <div className="card" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', color: '#fff' }}>Top Topics</h3>
        <div style={{ height: '250px', width: '100%' }}>
          <ResponsiveContainer>
            <BarChart data={topicData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
              <XAxis type="number" stroke="rgba(255,255,255,0.5)" tick={{fontSize: 12}} />
              <YAxis dataKey="name" type="category" width={100} stroke="rgba(255,255,255,0.5)" tick={{fontSize: 12}} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="count" fill="#00aaff" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
