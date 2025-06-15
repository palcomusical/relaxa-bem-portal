
import { useState } from 'react';
import { Calendar, DollarSign, Users, TrendingUp, Clock, BarChart3, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType: string;
}

const ReportsModal = ({ isOpen, onClose, reportType }: ReportsModalProps) => {
  const [period, setPeriod] = useState('30');
  const { serviceBookings, contactForms, whatsappLeads, clients } = useData();

  const generateReport = () => {
    const periodDays = parseInt(period);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);

    switch (reportType) {
      case 'appointments':
        return generateAppointmentsReport(cutoffDate);
      case 'revenue':
        return generateRevenueReport(cutoffDate);
      case 'clients':
        return generateClientsReport(cutoffDate);
      case 'services':
        return generateServicesReport(cutoffDate);
      case 'schedule':
        return generateScheduleReport();
      case 'complete':
        return generateCompleteReport(cutoffDate);
      default:
        return null;
    }
  };

  const generateAppointmentsReport = (cutoffDate: Date) => {
    const filteredBookings = serviceBookings.filter(
      booking => new Date(booking.createdAt) >= cutoffDate
    );

    const statusCounts = filteredBookings.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      title: 'Relatório de Agendamentos',
      data: [
        { label: 'Total de Agendamentos', value: filteredBookings.length },
        { label: 'Agendados', value: statusCounts['Agendado'] || 0 },
        { label: 'Confirmados', value: statusCounts['Confirmado'] || 0 },
        { label: 'Em Andamento', value: statusCounts['Em andamento'] || 0 },
        { label: 'Concluídos', value: statusCounts['Concluído'] || 0 },
        { label: 'Cancelados', value: statusCounts['Cancelado'] || 0 },
      ]
    };
  };

  const generateRevenueReport = (cutoffDate: Date) => {
    const completedBookings = serviceBookings.filter(
      booking => booking.status === 'Concluído' && new Date(booking.createdAt) >= cutoffDate
    );

    const serviceValues = {
      'Massagem Relaxante - R$ 120 (60 min)': 120,
      'Massagem Terapêutica - R$ 180 (90 min)': 180,
      'Drenagem Linfática - R$ 150 (75 min)': 150,
      'Reflexologia - R$ 100 (45 min)': 100,
      'Massagem Desportiva - R$ 140 (60 min)': 140,
      'Quick Massage - R$ 80 (30 min)': 80,
    };

    const totalRevenue = completedBookings.reduce((total, booking) => {
      return total + (serviceValues[booking.service as keyof typeof serviceValues] || 0);
    }, 0);

    return {
      title: 'Relatório de Faturamento',
      data: [
        { label: 'Faturamento Total', value: `R$ ${totalRevenue.toFixed(2)}` },
        { label: 'Serviços Concluídos', value: completedBookings.length },
        { label: 'Ticket Médio', value: `R$ ${(totalRevenue / Math.max(completedBookings.length, 1)).toFixed(2)}` },
        { label: 'Meta Mensal', value: 'R$ 15.000,00' },
        { label: 'Atingimento', value: `${((totalRevenue / 15000) * 100).toFixed(1)}%` },
      ]
    };
  };

  const generateClientsReport = (cutoffDate: Date) => {
    const recentClients = clients.filter(
      client => new Date(client.createdAt) >= cutoffDate
    );

    const clientBookings = serviceBookings.reduce((acc, booking) => {
      const clientName = booking.name;
      acc[clientName] = (acc[clientName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const frequentClients = Object.entries(clientBookings)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      title: 'Relatório de Clientes',
      data: [
        { label: 'Total de Clientes', value: clients.length },
        { label: 'Novos Clientes (período)', value: recentClients.length },
        { label: 'Cliente Mais Frequente', value: frequentClients[0]?.[0] || 'N/A' },
        { label: 'Leads WhatsApp', value: whatsappLeads.length },
        { label: 'Contatos Site', value: contactForms.length },
      ]
    };
  };

  const generateServicesReport = (cutoffDate: Date) => {
    const recentBookings = serviceBookings.filter(
      booking => new Date(booking.createdAt) >= cutoffDate
    );

    const serviceCounts = recentBookings.reduce((acc, booking) => {
      const serviceName = booking.service.split(' - ')[0];
      acc[serviceName] = (acc[serviceName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedServices = Object.entries(serviceCounts)
      .sort(([,a], [,b]) => b - a);

    return {
      title: 'Serviços Mais Procurados',
      data: sortedServices.map(([service, count], index) => ({
        label: `${index + 1}º ${service}`, 
        value: `${count} agendamentos`
      }))
    };
  };

  const generateScheduleReport = () => {
    const timeCounts = serviceBookings.reduce((acc, booking) => {
      const time = booking.preferredTime;
      acc[time] = (acc[time] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedTimes = Object.entries(timeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      title: 'Horários de Pico',
      data: sortedTimes.map(([time, count], index) => ({
        label: `${index + 1}º ${time}`, 
        value: `${count} agendamentos`
      }))
    };
  };

  const generateCompleteReport = (cutoffDate: Date) => {
    const appointments = generateAppointmentsReport(cutoffDate);
    const revenue = generateRevenueReport(cutoffDate);
    const clientsData = generateClientsReport(cutoffDate);

    return {
      title: 'Relatório Completo',
      data: [
        ...appointments.data.slice(0, 2),
        ...revenue.data.slice(0, 2),
        ...clientsData.data.slice(0, 2),
      ]
    };
  };

  const getReportTitle = () => {
    const titles = {
      appointments: 'Agendamentos por Período',
      revenue: 'Faturamento Mensal',
      clients: 'Clientes Mais Frequentes',
      services: 'Serviços Mais Procurados',
      schedule: 'Horários de Pico',
      complete: 'Relatório Completo'
    };
    return titles[reportType as keyof typeof titles] || 'Relatório';
  };

  const getReportIcon = () => {
    const icons = {
      appointments: Calendar,
      revenue: DollarSign,
      clients: Users,
      services: TrendingUp,
      schedule: Clock,
      complete: BarChart3
    };
    const IconComponent = icons[reportType as keyof typeof icons] || FileText;
    return <IconComponent className="w-5 h-5" />;
  };

  const report = generateReport();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getReportIcon()}
            {getReportTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="15">Últimos 15 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="60">Últimos 60 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => window.print()}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Imprimir
            </Button>
          </div>

          {report && (
            <Card>
              <CardHeader>
                <CardTitle>{report.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {report.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">{item.label}</span>
                      <span className="font-bold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button className="bg-wellness-500 hover:bg-wellness-600">
              Exportar PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportsModal;
