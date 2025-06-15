
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onSave: (updatedBooking: any) => void;
  services: string[];
  timeSlots: string[];
}

const EditAppointmentModal = ({ 
  isOpen, 
  onClose, 
  booking, 
  onSave, 
  services, 
  timeSlots 
}: EditAppointmentModalProps) => {
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    status: ''
  });

  useEffect(() => {
    if (booking) {
      setEditForm({
        name: booking.name || '',
        phone: booking.phone || '',
        email: booking.email || '',
        service: booking.service || '',
        preferredDate: booking.preferredDate || '',
        preferredTime: booking.preferredTime || '',
        message: booking.message || '',
        status: booking.status || ''
      });
    }
  }, [booking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editForm);
  };

  const handleCancel = () => {
    onClose();
  };

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Agendamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Nome</label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Telefone</label>
              <Input
                value={editForm.phone}
                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">E-mail</label>
            <Input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Serviço</label>
            <Select value={editForm.service} onValueChange={(value) => setEditForm({...editForm, service: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service, index) => (
                  <SelectItem key={index} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Data</label>
              <Input
                type="date"
                value={editForm.preferredDate}
                onChange={(e) => setEditForm({...editForm, preferredDate: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Horário</label>
              <Select value={editForm.preferredTime} onValueChange={(value) => setEditForm({...editForm, preferredTime: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
            <Select value={editForm.status} onValueChange={(value) => setEditForm({...editForm, status: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Agendado">Agendado</SelectItem>
                <SelectItem value="Confirmado">Confirmado</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Observações</label>
            <Textarea
              value={editForm.message}
              onChange={(e) => setEditForm({...editForm, message: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-wellness-500 hover:bg-wellness-600">
              Salvar Alterações
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentModal;
