import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Phone, Mail, Search, Eye, UserPlus, Download, Filter, Star } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';

const LeadsManagement = () => {
  const { whatsappLeads, contactForms, serviceBookings, addClient } = useData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Consolidar todos os leads com normalização dos dados
  const allLeads = [
    ...whatsappLeads.map(lead => ({ 
      ...lead, 
      source: 'WhatsApp', 
      type: 'whatsapp',
      phone: lead.whatsapp,
      email: undefined
    })),
    ...contactForms.map(form => ({ 
      ...form, 
      source: 'Formulário', 
      type: 'contact'
    })),
    ...serviceBookings.map(booking => ({ 
      ...booking, 
      source: 'Agendamento', 
      type: 'booking',
      originalMessage: booking.message,
      message: `Agendamento: ${booking.service} - ${booking.preferredDate} às ${booking.preferredTime}`
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const stats = [
    { title: 'Total de Leads', value: allLeads.length.toString(), icon: UserPlus, color: 'text-blue-600' },
    { title: 'WhatsApp', value: whatsappLeads.length.toString(), icon: MessageSquare, color: 'text-green-600' },
    { title: 'Formulários', value: contactForms.length.toString(), icon: Mail, color: 'text-purple-600' },
    { title: 'Agendamentos', value: serviceBookings.length.toString(), icon: Phone, color: 'text-orange-600' }
  ];

  const filteredLeads = allLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    const matchesTab = activeTab === 'all' || lead.type === activeTab;
    
    return matchesSearch && matchesSource && matchesTab;
  });

  const handleViewDetails = (lead: any) => {
    setSelectedLead(lead);
    setShowDetails(true);
  };

  const handleConvertToClient = (lead: any) => {
    addClient({
      name: lead.name,
      email: lead.email || '',
      phone: lead.phone,
      whatsapp: lead.type === 'whatsapp' ? lead.phone : '',
      address: '',
      birthDate: '',
      notes: lead.message || ''
    });

    toast({
      title: "Lead convertido!",
      description: `${lead.name} foi adicionado como cliente.`
    });
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'WhatsApp': return 'bg-green-100 text-green-800';
      case 'Formulário': return 'bg-blue-100 text-blue-800';
      case 'Agendamento': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Nome', 'Telefone', 'E-mail', 'Origem', 'Data', 'Mensagem'].join(','),
      ...filteredLeads.map(lead => [
        lead.name,
        lead.phone || '',
        lead.email || '',
        lead.source,
        new Date(lead.createdAt).toLocaleDateString('pt-BR'),
        (lead.message || '').replace(/,/g, ';')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();

    toast({
      title: "Export realizado",
      description: "Dados dos leads exportados com sucesso"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Leads</h2>
          <p className="text-gray-600">Controle completo dos contatos e oportunidades</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
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
                  placeholder="Buscar por nome, telefone ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Origens</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Formulário">Formulário</SelectItem>
                <SelectItem value="Agendamento">Agendamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todos ({allLeads.length})</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp ({whatsappLeads.length})</TabsTrigger>
          <TabsTrigger value="contact">Formulários ({contactForms.length})</TabsTrigger>
          <TabsTrigger value="booking">Agendamentos ({serviceBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Leads ({filteredLeads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contato</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Mensagem/Serviço</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={`${lead.type}-${lead.id}`}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.phone || 'N/A'}</p>
                          {lead.email && <p className="text-sm text-gray-500">{lead.email}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSourceColor(lead.source)}>
                          {lead.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</p>
                          <p className="text-xs text-gray-500">{new Date(lead.createdAt).toLocaleTimeString('pt-BR')}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">
                          {lead.type === 'booking' ? (lead as any).service : (lead.message || 'Sem mensagem')}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(lead)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleConvertToClient(lead)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <UserPlus className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lead Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Lead</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <p className="text-lg font-semibold">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Origem</label>
                  <Badge className={getSourceColor(selectedLead.source)}>
                    {selectedLead.source}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Telefone</label>
                  <p>{selectedLead.phone}</p>
                </div>
                {selectedLead.email && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">E-mail</label>
                    <p>{selectedLead.email}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700">Data/Hora</label>
                  <p>{new Date(selectedLead.createdAt).toLocaleString('pt-BR')}</p>
                </div>
                {selectedLead.type === 'booking' && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Badge className={
                      selectedLead.status === 'Confirmado' ? 'bg-green-100 text-green-800' :
                      selectedLead.status === 'Agendado' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {selectedLead.status}
                    </Badge>
                  </div>
                )}
              </div>
              
              {selectedLead.type === 'booking' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Serviço</label>
                    <p>{selectedLead.service}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Data Preferida</label>
                    <p>{new Date(selectedLead.preferredDate).toLocaleDateString('pt-BR')} às {selectedLead.preferredTime}</p>
                  </div>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {selectedLead.type === 'booking' ? 'Observações' : 'Mensagem'}
                  </label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedLead.message}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-wellness-500 hover:bg-wellness-600"
                  onClick={() => handleConvertToClient(selectedLead)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Converter em Cliente
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Entrar em Contato
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsManagement;