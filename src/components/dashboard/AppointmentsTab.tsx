
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter, Plus, Eye, Edit, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import EditAppointmentModal from './EditAppointmentModal';

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
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
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

  const getFilteredBookingsByMode = () => {
    const date = new Date(calendarDate);
    
    switch (viewMode) {
      case 'day':
        return serviceBookings.filter(booking => 
          booking.preferredDate === format(date, 'yyyy-MM-dd')
        );
      case 'week':
        const weekStart = startOfWeek(date, { locale: ptBR });
        const weekEnd = endOfWeek(date, { locale: ptBR });
        return serviceBookings.filter(booking => {
          const bookingDate = new Date(booking.preferredDate);
          return bookingDate >= weekStart && bookingDate <= weekEnd;
        });
      case 'month':
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);
        return serviceBookings.filter(booking => {
          const bookingDate = new Date(booking.preferredDate);
          return bookingDate >= monthStart && bookingDate <= monthEnd;
        });
      default:
        return filteredBookings;
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCalendarDate(date);
      setSelectedDate(format(date, 'yyyy-MM-dd'));
    }
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

  const handleEditBooking = (booking: any) => {
    setEditingBooking(booking);
    setActiveModal('edit-appointment');
  };

  const handleSaveEdit = (updatedBooking: any) => {
    updateServiceBooking(editingBooking.id, updatedBooking);
    toast({ title: "Agendamento atualizado!", description: "Agendamento editado com sucesso." });
    setEditingBooking(null);
    setActiveModal(null);
  };

  const currentFilteredBookings = getFilteredBookingsByMode();

  const getViewModeText = () => {
    switch (viewMode) {
      case 'day':
        return `Dia ${format(calendarDate, 'dd/MM/yyyy')}`;
      case 'week':
        const weekStart = startOfWeek(calendarDate, { locale: ptBR });
        const weekEnd = endOfWeek(calendarDate, { locale: ptBR });
        return `Semana de ${format(weekStart, 'dd/MM')} a ${format(weekEnd, 'dd/MM/yyyy')}`;
      case 'month':
        return `Mês de ${format(calendarDate, 'MMMM yyyy', { locale: ptBR })}`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          
          {/* View Mode Selector */}
          <Select value={viewMode} onValueChange={(value: 'day' | 'week' | 'month') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Dia</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
            </SelectContent>
          </Select>

          {/* Calendar Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !calendarDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {getViewModeText()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={calendarDate}
                onSelect={handleDateSelect}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <span className="text-sm text-gray-600">
            {currentFilteredBookings.length} agendamentos encontrados
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
          <CardTitle>Agendamentos - {getViewModeText()}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentFilteredBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum agendamento encontrado para este período.</p>
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
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFilteredBookings.map((booking) => (
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
                      {format(new Date(booking.preferredDate), 'dd/MM/yyyy')}
                    </TableCell>
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
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditBooking(booking)}
                        >
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

      {/* Edit Appointment Modal */}
      <EditAppointmentModal
        isOpen={activeModal === 'edit-appointment'}
        onClose={() => {
          setActiveModal(null);
          setEditingBooking(null);
        }}
        booking={editingBooking}
        onSave={handleSaveEdit}
        services={services}
        timeSlots={timeSlots}
      />
    </div>
  );
};

export default AppointmentsTab;
