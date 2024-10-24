import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';

const ConversionDashboard = () => {
  const funnelData = [
    { name: 'Leads Totales', value: 165 },
    { name: 'Registrados en VIGA', value: 52 },
    { name: 'Oportunidades', value: 38 },
    { name: 'Clientes Ganados', value: 16 }
  ];

  const vigaRegistrationData = [
    { name: 'Registrados', value: 52 },
    { name: 'No Registrados', value: 113 }
  ];

  const opportunityData = [
    { name: 'Ganadas', value: 12510500 },
    { name: 'Perdidas', value: 224708000 }
  ];

  const timelineData = [
    { month: 'Febrero', contactos: 14, conversiones: 2 },
    { month: 'Marzo', contactos: 16, conversiones: 1 },
    { month: 'Abril', contactos: 30, conversiones: 3 },
    { month: 'Mayo', contactos: 35, conversiones: 4 },
    { month: 'Junio', contactos: 28, conversiones: 3 },
    { month: 'Julio', contactos: 20, conversiones: 1 },
    { month: 'Agosto', contactos: 24, conversiones: 3 },
    { month: 'Septiembre', contactos: 22, conversiones: 2 },
    { month: 'Octubre', contactos: 16, conversiones: 1 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const CustomizedDot = (props) => {
    const { cx, cy, value } = props;
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill={props.stroke} />
        <text x={cx} y={cy - 10} textAnchor="middle" fill={props.stroke}>
          {value}
        </text>
      </g>
    );
  };

  const CustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text 
        x={x + width + 5} 
        y={y + 20} 
        fill="#0088FE"
        textAnchor="start"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-12">
      <h1 className="text-2xl font-bold mb-12 text-center">Dashboard de Conversión y Análisis de Ventas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Embudo de Conversión */}
        <div className="bg-white p-12 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-8">Embudo de Conversión</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={funnelData}
              layout="vertical"
              margin={{ top: 40, right: 90, left: 60, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill="#0088FE"
                label={<CustomizedLabel />}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Registro en VIGA */}
        <div className="bg-white p-12 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-8">Registro en VIGA</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 40, right: 60, left: 60, bottom: 40 }}>
              <Pie
                data={vigaRegistrationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vigaRegistrationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Línea de tiempo de contactos y conversiones */}
      <div className="bg-white p-12 rounded-lg shadow mb-12">
        <h2 className="text-lg font-semibold mb-8">Tendencia de Contactos y Conversiones</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart 
            data={timelineData}
            margin={{ top: 40, right: 60, left: 60, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="contactos" 
              stroke="#0088FE"
              dot={<CustomizedDot />}
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="conversiones" 
              stroke="#00C49F"
              dot={<CustomizedDot />}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Valor de Oportunidades */}
      <div className="bg-white p-12 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-8">Valor de Oportunidades (COP)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={opportunityData}
            margin={{ top: 40, right: 60, left: 60, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConversionDashboard;