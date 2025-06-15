
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Phone,
  Mail,
  MapPin,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Filter,
  MessageSquare,
  Eye,
  Edit,
  RefreshCw
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import ReportsModal from '@/components/ReportsModal';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [reportType, setReportType] = useState<string>('');
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    name: '', email: '', phone: '', whatsapp: '', address: '', birthDate: '', notes: ''
  });
  const [newAppointmentForm, setNewAppointmentForm] = useState({
    name: '', phone: '', email: '', service: '', preferredDate: '', preferredTime: '', message: ''
  });
  
  const { serviceBookings, contactForms, whatsappLeads, clients, addClient, addServiceBooking, updateServiceBooking, generateSimulatedData } = useData();
  const { toast } = useToast();

  console.log('🎯 Dashboard renderizando com dados:', {
    agendamentos: serviceBookings.length,
    contatos: contactForms.length,
    leads: whatsappLeads.length,
    clientes: clients.length,
    dataFiltro: selectedDate
  });

  // Filter bookings by selected date
  const filteredBookings = serviceBookings.filter(booking => 
    booking.preferredDate === selectedDate
  );

  console.log('📅 Agendamentos filtrados para', selectedDate, ':', filteredBookings.length);

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

  const handleNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    addClient(newClientForm);
    toast({ title: "Cliente cadastrado!", description: "Cliente adicionado com sucesso." });
    setNewClientForm({ name: '', email: '', phone: '', whatsapp: '', address: '', birthDate: '', notes: '' });
    setActiveModal(null);
  };

  const handleNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    addServiceBooking(newAppointmentForm);
    toast({ title: "Agendamento criado!", description: "Novo agendamento adicionado com sucesso." });
    setNewAppointmentForm({ name: '', phone: '', email: '', service: '', preferredDate: '', preferredTime: '', message: '' });
    setActiveModal(null);
  };

  const updateBookingStatus = (id: string, status: any) => {
    updateServiceBooking(id, { status });
    toast({ title: "Status atualizado!", description: `Agendamento marcado como ${status}.` });
  };

  const handleReportClick = (type: string) => {
    setReportType(type);
    setShowReportsModal(true);
  };

  const handleRefreshData = () => {
    generateSimulatedData();
    toast({ title: "Dados atualizados!", description: "Dados simulados foram recarregados." });
  };

  const services = [
    'Massagem Relaxante - R$ 120 (60 min)',
    'Massagem Terapêutica - R$ 180 (90 min)',
    'Drenagem Linfática - R$ 150 (75 min)',
    'Reflexologia - R$ 100 (45 min)',
    'Massagem Desportiva - R$ 140 (60 min)',
    'Quick Massage - R$ 80 (30 min)'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-wellness-500 to-calm-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
                <p className="text-sm text-gray-600">MassoTerapia - Clínica de Bem-Estar</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefreshData}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Recarregar Dados
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveModal('settings')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
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

        {/* Debug Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📊 Status dos Dados</h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Agendamentos:</span> {serviceBookings.length}
            </div>
            <div>
              <span className="font-medium">Contatos:</span> {contactForms.length}
            </div>
            <div>
              <span className="font-medium">Leads WhatsApp:</span> {whatsappLeads.length}
            </div>
            <div>
              <span className="font-medium">Clientes:</span> {clients.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Agendamentos ({serviceBookings.length})</TabsTrigger>
            <TabsTrigger value="contacts">Contatos ({contactForms.length + whatsappLeads.length})</TabsTrigger>
            <TabsTrigger value="clients">Clientes ({clients.length})</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-auto"
                />
                <span className="text-sm text-gray-600">
                  {filteredBookings.length} agendamentos encontrados para {new Date(selectedDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <Dialog open={activeModal === 'new-appointment'} onOpenChange={(open) => setActiveModal(open ? 'new-appointment' : null)}>
                <DialogTrigger asChild>
                  <Button className="bg-wellness-500 hover:bg-wellness-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Agendamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Novo Agendamento</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleNewAppointment} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Nome"
                        value={newAppointmentForm.name}
                        onChange={(e) => setNewAppointmentForm({...newAppointmentForm, name: e.target.value})}
                        required
                      />
                      <Input
                        placeholder="Telefone"
                        value={newAppointmentForm.phone}
                        onChange={(e) => setNewAppointmentForm({...newAppointmentForm, phone: e.target.value})}
                        required
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={newAppointmentForm.email}
                      onChange={(e) => setNewAppointmentForm({...newAppointmentForm, email: e.target.value})}
                      required
                    />
                    <Select value={newAppointmentForm.service} onValueChange={(value) => setNewAppointmentForm({...newAppointmentForm, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service, index) => (
                          <SelectItem key={index} value={service}>{service}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="date"
                        value={newAppointmentForm.preferredDate}
                        onChange={(e) => setNewAppointmentForm({...newAppointmentForm, preferredDate: e.target.value})}
                        required
                      />
                      <Select value={newAppointmentForm.preferredTime} onValueChange={(value) => setNewAppointmentForm({...newAppointmentForm, preferredTime: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea
                      placeholder="Observações"
                      value={newAppointmentForm.message}
                      onChange={(e) => setNewAppointmentForm({...newAppointmentForm, message: e.target.value})}
                    />
                    <Button type="submit" className="w-full">Criar Agendamento</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Agendamentos do Dia {new Date(selectedDate).toLocaleDateString('pt-BR')}</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum agendamento encontrado para esta data.</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Total de agendamentos no sistema: {serviceBookings.length}
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Horário</TableHead>
                        <TableHead>Status</TableHead>
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
                          <TableCell>{booking.service}</TableCell>
                          <TableCell>{booking.preferredTime}</TableCell>
                          <TableCell>
                            <Select
                              value={booking.status}
                              onValueChange={(value) => updateBookingStatus(booking.id, value)}
                            >
                              <SelectTrigger className="w-auto">
                                <SelectValue />
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
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Leads WhatsApp ({whatsappLeads.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {whatsappLeads.length === 0 ? (
                      <p className="text-center text-gray-500 py-4">Nenhum lead WhatsApp encontrado.</p>
                    ) : (
                      whatsappLeads.map((lead) => (
                        <div key={lead.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{lead.name}</h4>
                            <span className="text-xs text-gray-500">
                              {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{lead.whatsapp}</p>
                          <p className="text-sm">{lead.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Formulários de Contato ({contactForms.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {contactForms.length === 0 ? (
                      <p className="text-center text-gray-500 py-4">Nenhum formulário de contato encontrado.</p>
                    ) : (
                      contactForms.map((form) => (
                        <div key={form.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{form.name}</h4>
                            <span className="text-xs text-gray-500">
                              {new Date(form.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{form.email}</p>
                          <p className="text-sm text-gray-600 mb-2">{form.phone}</p>
                          <p className="text-sm">{form.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Clientes Cadastrados ({clients.length})</h3>
              <Dialog open={activeModal === 'new-client'} onOpenChange={(open) => setActiveModal(open ? 'new-client' : null)}>
                <DialogTrigger asChild>
                  <Button className="bg-wellness-500 hover:bg-wellness-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Cliente
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleNewClient} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Nome completo"
                        value={newClientForm.name}
                        onChange={(e) => setNewClientForm({...newClientForm, name: e.target.value})}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="E-mail"
                        value={newClientForm.email}
                        onChange={(e) => setNewClientForm({...newClientForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Telefone"
                        value={newClientForm.phone}
                        onChange={(e) => setNewClientForm({...newClientForm, phone: e.target.value})}
                        required
                      />
                      <Input
                        placeholder="WhatsApp"
                        value={newClientForm.whatsapp}
                        onChange={(e) => setNewClientForm({...newClientForm, whatsapp: e.target.value})}
                      />
                    </div>
                    <Input
                      placeholder="Endereço"
                      value={newClientForm.address}
                      onChange={(e) => setNewClientForm({...newClientForm, address: e.target.value})}
                    />
                    <Input
                      type="date"
                      placeholder="Data de nascimento"
                      value={newClientForm.birthDate}
                      onChange={(e) => setNewClientForm({...newClientForm, birthDate: e.target.value})}
                    />
                    <Textarea
                      placeholder="Observações"
                      value={newClientForm.notes}
                      onChange={(e) => setNewClientForm({...newClientForm, notes: e.target.value})}
                    />
                    <Button type="submit" className="w-full">Cadastrar Cliente</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent>
                {clients.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum cliente cadastrado.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Cadastrado em</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-gray-500">{client.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{client.phone}</p>
                              {client.whatsapp && <p className="text-sm text-gray-500">WhatsApp: {client.whatsapp}</p>}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Relatórios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => handleReportClick('appointments')}
                  >
                    <Calendar className="w-6 h-6 mb-2" />
                    Agendamentos por Período
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => handleReportClick('revenue')}
                  >
                    <DollarSign className="w-6 h-6 mb-2" />
                    Faturamento Mensal
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => handleReportClick('clients')}
                  >
                    <Users className="w-6 h-6 mb-2" />
                    Clientes Mais Frequentes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => handleReportClick('services')}
                  >
                    <TrendingUp className="w-6 h-6 mb-2" />
                    Serviços Mais Procurados
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => handleReportClick('schedule')}
                  >
                    <Clock className="w-6 h-6 mb-2" />
                    Horários de Pico
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => handleReportClick('complete')}
                  >
                    <BarChart3 className="w-6 h-6 mb-2" />
                    Relatório Completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Settings Modal */}
        <Dialog open={activeModal === 'settings'} onOpenChange={(open) => setActiveModal(open ? 'settings' : null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Configurações</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações da Clínica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Nome da clínica" defaultValue="MassoTerapia" />
                    <Input placeholder="CNPJ" />
                  </div>
                  <Input placeholder="Endereço" defaultValue="Rua das Flores, 123 - São Paulo/SP" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Telefone" defaultValue="(11) 99999-9999" />
                    <Input placeholder="E-mail" defaultValue="contato@massoterapia.com.br" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Horário de Funcionamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium py-2">Segunda - Sexta:</span>
                    <Input defaultValue="08:00" />
                    <Input defaultValue="18:00" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-sm font-medium py-2">Sábado:</span>
                    <Input defaultValue="08:00" />
                    <Input defaultValue="14:00" />
                  </div>
                </CardContent>
              </Card>
              
              <Button className="w-full">Salvar Configurações</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reports Modal */}
        <ReportsModal 
          isOpen={showReportsModal}
          onClose={() => setShowReportsModal(false)}
          reportType={reportType}
        />
      </div>
    </div>
  );
};

export default Dashboard;
