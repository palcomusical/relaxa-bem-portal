
import { Award, Users, Clock, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: Users,
      number: '500+',
      label: 'Clientes Atendidos',
      color: 'text-wellness-500'
    },
    {
      icon: Award,
      number: '15+',
      label: 'Anos de Experiência',
      color: 'text-calm-500'
    },
    {
      icon: Clock,
      number: '24h',
      label: 'Agendamento Online',
      color: 'text-wellness-500'
    },
    {
      icon: Heart,
      number: '98%',
      label: 'Satisfação dos Clientes',
      color: 'text-calm-500'
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Sobre Nossa Clínica
          </h2>
          <p className="text-xl text-gray-600">
            Há mais de 15 anos dedicados ao cuidado e bem-estar de nossos clientes, 
            oferecendo tratamentos de massoterapia de excelência.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Nossa Missão é Seu Bem-Estar
            </h3>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Somos uma clínica especializada em massoterapia, dedicada a proporcionar 
                alívio, relaxamento e bem-estar através de técnicas terapêuticas comprovadas 
                e profissionais altamente qualificados.
              </p>
              
              <p>
                Nosso compromisso é oferecer um atendimento personalizado, respeitando as 
                necessidades individuais de cada cliente e garantindo um ambiente seguro, 
                acolhedor e profissional.
              </p>
              
              <p>
                Utilizamos apenas as melhores técnicas e equipamentos, sempre em conformidade 
                com as normas sanitárias e éticas da profissão, garantindo resultados efetivos 
                e duradouros.
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-wellness-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-wellness-500 to-calm-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Certificações Profissionais</h4>
                <p className="text-sm text-gray-600">
                  Todos os nossos profissionais possuem certificação reconhecida pelo COFFITO
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Ambiente relaxante de massoterapia"
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Floating testimonial card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl max-w-sm animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-wellness-500 to-calm-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Maria Silva</h4>
                  <p className="text-sm text-gray-600">Cliente há 3 anos</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">
                "Excelente atendimento! Saio renovada a cada sessão."
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3 animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.number}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
