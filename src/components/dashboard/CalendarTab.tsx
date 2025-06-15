
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface CalendarTabProps {
  serviceBookings: any[];
  addServiceBooking: (booking: any) => void;
}

const CalendarTab = ({ serviceBookings, addServiceBooking }: CalendarTabProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pegar os dias da semana anterior para completar a primeira semana
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());
  
  // Pegar os dias da próxima semana para completar a última semana
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
  
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getBookingsForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return serviceBookings.filter(booking => booking.preferredDate === dateString);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setNewAppointmentForm({
      ...newAppointmentForm,
      preferredDate: format(date, 'yyyy-MM-dd')
    });
    setShowNewAppointmentModal(true);
  };

  const handleNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    addServiceBooking(newAppointmentForm);
    toast({ title: "Agendamento criado!", description: "Novo agendamento adicionado com sucesso." });
    setNewAppointmentForm({ name: '', phone: '', email: '', service: '', preferredDate: '', preferredTime: '', message: '' });
    setShowNewAppointmentModal(false);
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

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-2xl font-bold">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendário de Agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Cabeçalho com dias da semana */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Grid do calendário */}
          <div className="grid grid-cols-7 gap-2">
            {allDays.map((day) => {
              const bookings = getBookingsForDate(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={day.toISOString()}
                  className={`
                    min-h-24 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                    ${!isCurrentMonth ? 'opacity-40 bg-gray-50' : ''}
                    ${isToday ? 'ring-2 ring-wellness-500' : ''}
                  `}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${isToday ? 'text-wellness-600' : 'text-gray-900'}`}>
                      {format(day, 'd')}
                    </span>
                    {bookings.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {bookings.length}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-1 space-y-1">
                    {bookings.slice(0, 2).map((booking) => (
                      <div
                        key={booking.id}
                        className={`text-xs p-1 rounded truncate ${getStatusColor(booking.status)}`}
                        title={`${booking.name} - ${booking.preferredTime} - ${booking.service}`}
                      >
                        {booking.preferredTime} - {booking.name}
                      </div>
                    ))}
                    {bookings.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{bookings.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modal para novo agendamento */}
      <Dialog open={showNewAppointmentModal} onOpenChange={setShowNewAppointmentModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Novo Agendamento - {selectedDate && format(selectedDate, 'dd/MM/yyyy')}
            </DialogTitle>
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
            <Button type="submit" className="w-full bg-wellness-500 hover:bg-wellness-600">
              Criar Agendamento
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarTab;
