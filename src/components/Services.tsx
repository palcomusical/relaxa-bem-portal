
import { Clock, Users, Sparkles, Zap, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ServiceBookingModal from '@/components/ServiceBookingModal';

const Services = () => {
  const services = [
    {
      title: 'Massagem Relaxante',
      description: 'Técnicas suaves para alívio do estresse e tensões do dia a dia',
      duration: '60 min',
      price: 'R$ 120',
      icon: Heart,
      benefits: ['Reduz o estresse', 'Melhora o sono', 'Relaxamento muscular']
    },
    {
      title: 'Massagem Terapêutica',
      description: 'Tratamento específico para dores musculares e articulares',
      duration: '90 min',
      price: 'R$ 180',
      icon: Shield,
      benefits: ['Alívio de dores', 'Melhora da postura', 'Recuperação muscular']
    },
    {
      title: 'Drenagem Linfática',
      description: 'Técnica especializada para redução de inchaços e retenção de líquidos',
      duration: '75 min',
      price: 'R$ 150',
      icon: Sparkles,
      benefits: ['Reduz inchaços', 'Melhora circulação', 'Desintoxica o corpo']
    },
    {
      title: 'Reflexologia',
      description: 'Massagem nos pés que atua em pontos reflexos de todo o corpo',
      duration: '45 min',
      price: 'R$ 100',
      icon: Zap,
      benefits: ['Equilibra energias', 'Melhora circulação', 'Relaxamento profundo']
    },
    {
      title: 'Massagem Desportiva',
      description: 'Ideal para atletas e praticantes de atividade física',
      duration: '60 min',
      price: 'R$ 140',
      icon: Users,
      benefits: ['Prepara músculos', 'Previne lesões', 'Acelera recuperação']
    },
    {
      title: 'Quick Massage',
      description: 'Massagem rápida para alívio de tensões no pescoço e ombros',
      duration: '30 min',
      price: 'R$ 80',
      icon: Clock,
      benefits: ['Rápido alívio', 'Ideal para pausa', 'Foco em tensões']
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-gradient-to-br from-gray-50 to-wellness-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600">
            Oferecemos uma ampla gama de tratamentos de massoterapia para atender 
            às suas necessidades específicas de bem-estar e saúde.
          </p>
        </div>

        {/* Hero image section */}
        <div className="mb-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Sala de massagem relaxante com ambiente tranquilo"
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-wellness-900/70 to-calm-900/70 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <h3 className="text-2xl lg:text-3xl font-bold">Ambiente Relaxante e Profissional</h3>
                <p className="text-lg opacity-90">Cada detalhe pensado para o seu conforto</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-wellness-500 to-calm-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </span>
                  <span className="text-2xl font-bold text-wellness-600">
                    {service.price}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Benefícios:</h4>
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-wellness-500 rounded-full"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <ServiceBookingModal preSelectedService={`${service.title} - ${service.price} (${service.duration})`}>
                  <Button className="w-full bg-gradient-to-r from-wellness-500 to-calm-500 hover:from-wellness-600 hover:to-calm-600">
                    Agendar Agora
                  </Button>
                </ServiceBookingModal>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-wellness-50 to-calm-50 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Não encontrou o que procura?
              </h3>
              <p className="text-gray-600 mb-6">
                Entre em contato conosco para consultas personalizadas e outros tratamentos específicos.
              </p>
              <ServiceBookingModal>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-wellness-500 to-calm-500 hover:from-wellness-600 hover:to-calm-600"
                >
                  Falar com Especialista
                </Button>
              </ServiceBookingModal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
