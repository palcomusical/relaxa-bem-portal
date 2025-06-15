
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/contexts/DataContext';

interface ServiceBookingModalProps {
  children: React.ReactNode;
}

const ServiceBookingModal = ({ children }: ServiceBookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const { toast } = useToast();
  const { addServiceBooking } = useData();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service booking submitted:', formData);
    
    addServiceBooking(formData);
    
    toast({
      title: "Agendamento solicitado!",
      description: "Entraremos em contato para confirmar o horário.",
    });
    
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-wellness-600">
            <Calendar className="w-5 h-5" />
            Agendar Consulta
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <Input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <Input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail *
            </label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serviço Desejado *
            </label>
            <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service, index) => (
                  <SelectItem key={index} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Preferida *
              </label>
              <Input
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horário Preferido *
              </label>
              <Select value={formData.preferredTime} onValueChange={(value) => setFormData({...formData, preferredTime: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Alguma observação especial ou preferência?"
              rows={3}
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-wellness-500 to-calm-500 hover:from-wellness-600 hover:to-calm-600"
          >
            <Clock className="w-4 h-4 mr-2" />
            Solicitar Agendamento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceBookingModal;
