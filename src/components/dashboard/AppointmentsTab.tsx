
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter, Plus, Eye, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AppointmentsTabProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  filteredBookings: any[];
  serviceBookings: any[];
  addServiceBooking: (booking: any) => void;
  updateServiceBooking: (id: string, updates: any) => void;
}

const AppointmentsTab = ({ 
  selectedDate, 
  setSelectedDate, 
  filteredBookings, 
  serviceBookings,
  addServiceBooking,
  updateServiceBooking 
}: AppointmentsTabProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [newAppointmentForm, setNewAppointmentForm] = useState({
    name: '', phone: '', email: '', service: '', preferredDate: '', preferredTime: '', message: ''
  });
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default AppointmentsTab;
