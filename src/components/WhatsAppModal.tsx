
import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/contexts/DataContext';

const WhatsAppModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    message: 'Olá! Gostaria de agendar uma consulta de massoterapia.'
  });
  const { toast } = useToast();
  const { addWhatsAppLead } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('WhatsApp form submitted:', formData);
    
    addWhatsAppLead(formData);
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve via WhatsApp.",
    });
    
    // Open WhatsApp with the message
    const message = encodeURIComponent(`Olá! Meu nome é ${formData.name}. ${formData.message}`);
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
    
    setFormData({
      name: '',
      whatsapp: '',
      message: 'Olá! Gostaria de agendar uma consulta de massoterapia.'
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <button
            className="group bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
            aria-label="Entrar em contato via WhatsApp"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-16 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Fale conosco no WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <MessageCircle className="w-5 h-5" />
            Contato via WhatsApp
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
              WhatsApp *
            </label>
            <Input
              type="tel"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              placeholder="(11) 99999-9999"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem *
            </label>
            <Textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Como podemos ajudar você?"
              rows={4}
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;
