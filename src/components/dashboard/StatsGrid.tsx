
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, DollarSign, Users, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  filteredBookings: any[];
  clients: any[];
}

const StatsGrid = ({ filteredBookings, clients }: StatsGridProps) => {
  const stats = [
    {
      title: 'Consultas Hoje',
      value: filteredBookings.length.toString(),
      icon: Calendar,
      trend: '+2 que ontem',
      color: 'text-wellness-500'
    },
    {
      title: 'Faturamento Mensal',
      value: 'R$ 15.840',
      icon: DollarSign,
      trend: '+15% vs mês anterior',
      color: 'text-green-500'
    },
    {
      title: 'Clientes Ativos',
      value: clients.length.toString(),
      icon: Users,
      trend: `+${clients.length} novos este mês`,
      color: 'text-calm-500'
    },
    {
      title: 'Taxa de Ocupação',
      value: '85%',
      icon: TrendingUp,
      trend: '+5% vs semana anterior',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-50">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
