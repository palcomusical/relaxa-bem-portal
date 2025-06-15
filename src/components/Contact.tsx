
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/contexts/DataContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();
  const { addContactForm } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    
    addContactForm(formData);
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado!",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      info: '(11) 99999-9999',
      action: () => window.open('tel:11999999999')
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      info: '(11) 99999-9999',
      action: () => window.open('https://wa.me/5511999999999')
    },
    {
      icon: Mail,
      title: 'E-mail',
      info: 'contato@massoterapia.com.br',
      action: () => window.open('mailto:contato@massoterapia.com.br')
    },
    {
      icon: MapPin,
      title: 'Endereço',
      info: 'Rua das Flores, 123 - São Paulo/SP',
      action: () => window.open('https://maps.google.com')
    }
  ];

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-600">
            Estamos prontos para ajudar você. Entre em contato conosco para agendar 
            sua consulta ou esclarecer suas dúvidas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h3>
              <div className="grid gap-4">
                {contactInfo.map((item, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={item.action}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-wellness-500 to-calm-500 rounded-full flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600">{item.info}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-wellness-500" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Segunda - Sexta</span>
                  <span className="font-semibold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábado</span>
                  <span className="font-semibold">08:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingo</span>
                  <span className="font-semibold text-red-500">Fechado</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    Mensagem *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Como podemos ajudar você?"
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-wellness-500 to-calm-500 hover:from-wellness-600 hover:to-calm-600"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
