
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, DollarSign, Filter, Search, Plus, Edit, Eye, Trash2, Download } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';

const AppointmentManagement = () => {
  const { serviceBookings, updateServiceBooking } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const stats = [
    { title: 'Total de Agendamentos', value: serviceBookings.length.toString(), icon: Calendar, color: 'text-blue-600' },
    { title: 'Hoje', value: serviceBookings.filter(b => b.preferredDate === new Date().toISOString().split('T')[0]).length.toString(), icon: Clock, color: 'text-green-600' },
    { title: 'Confirmados', value: serviceBookings.filter(b => b.status === 'Confirmado').length.toString(), icon: Users, color: 'text-purple-600' },
    { title: 'Receita Mensal', value: 'R$ 12.450', icon: DollarSign, color: 'text-orange-600' }
  ];

  const filteredBookings = serviceBookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.phone.includes(searchTerm) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.service.includes(serviceFilter);
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    // Type guard to ensure the status is valid
    const validStatuses = ['Agendado', 'Confirmado', 'Em andamento', 'Concluído', 'Cancelado'] as const;
    if (validStatuses.includes(newStatus as any)) {
      updateServiceBooking(bookingId, { status: newStatus as 'Agendado' | 'Confirmado' | 'Em andamento' | 'Concluído' | 'Cancelado' });
      toast({
        title: "Status atualizado",
        description: `Agendamento marcado como ${newStatus}`
      });
    }
  };

  const handleViewDetails = (booking: any) => {
    setSelectedAppointment(booking);
    setShowDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendado': return 'bg-blue-100 text-blue-800';
      case 'Confirmado': return 'bg-green-100 text-green-800';
      case 'Em andamento': return 'bg-yellow-100 text-yellow-800';
      case 'Concluído': return 'bg-gray-100 text-gray-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Nome', 'Telefone', 'Serviço', 'Data', 'Horário', 'Status'].join(','),
      ...filteredBookings.map(booking => [
        booking.name,
        booking.phone,
        booking.service,
        booking.preferredDate,
        booking.preferredTime,
        booking.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agendamentos.csv';
    a.click();

    toast({
      title: "Export realizado",
      description: "Dados exportados com sucesso"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Consultas</h2>
          <p className="text-gray-600">Controle completo dos agendamentos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-wellness-500 hover:bg-wellness-600">
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-gray-50">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, telefone ou serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Agendado">Agendado</SelectItem>
                <SelectItem value="Confirmado">Confirmado</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Serviços</SelectItem>
                <SelectItem value="Relaxante">Massagem Relaxante</SelectItem>
                <SelectItem value="Terapêutica">Massagem Terapêutica</SelectItem>
                <SelectItem value="Drenagem">Drenagem Linfática</SelectItem>
                <SelectItem value="Reflexologia">Reflexologia</SelectItem>
                <SelectItem value="Desportiva">Massagem Desportiva</SelectItem>
                <SelectItem value="Quick">Quick Massage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agendamentos ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.name}</p>
                      <p className="text-sm text-gray-500">{booking.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="text-sm">{booking.service}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{new Date(booking.preferredDate).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-gray-500">{booking.preferredTime}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={booking.status}
                      onValueChange={(value) => handleStatusChange(booking.id, value)}
                    >
                      <SelectTrigger className="w-auto">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Agendado">Agendado</SelectItem>
                        <SelectItem value="Confirmado">Confirmado</SelectItem>
                        <SelectItem value="Em andamento">Em andamento</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">
                      {booking.service.includes('Relaxante') ? 'R$ 120' :
                       booking.service.includes('Terapêutica') ? 'R$ 180' :
                       booking.service.includes('Drenagem') ? 'R$ 150' :
                       booking.service.includes('Reflexologia') ? 'R$ 100' :
                       booking.service.includes('Desportiva') ? 'R$ 140' :
                       'R$ 80'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(booking)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Appointment Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Cliente</label>
                  <p className="text-lg font-semibold">{selectedAppointment.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Badge className={getStatusColor(selectedAppointment.status)}>
                    {selectedAppointment.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Telefone</label>
                  <p>{selectedAppointment.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">E-mail</label>
                  <p>{selectedAppointment.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Data</label>
                  <p>{new Date(selectedAppointment.preferredDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Horário</label>
                  <p>{selectedAppointment.preferredTime}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Serviço</label>
                <p className="mt-1">{selectedAppointment.service}</p>
              </div>
              {selectedAppointment.message && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Observações</label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedAppointment.message}</p>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-wellness-500 hover:bg-wellness-600">
                  Editar Agendamento
                </Button>
                <Button variant="outline" className="flex-1">
                  Enviar Lembrete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentManagement;
