
import { ArrowRight, Sparkles, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-wellness-50 via-calm-50 to-wellness-100"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-wellness-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-calm-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-wellness-300 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-2 text-wellness-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Bem-estar e Saúde</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Seu bem-estar é nossa 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wellness-500 to-calm-500">
                  {" "}prioridade
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                Descubra o poder transformador da massoterapia em nossa clínica especializada. 
                Tratamentos personalizados para alívio de dores, relaxamento e bem-estar.
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-wellness-500" />
                <span>Profissionais Certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-wellness-500" />
                <span>Ambiente Seguro</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-wellness-500 to-calm-500 hover:from-wellness-600 hover:to-calm-600 text-white px-8 py-6 text-lg"
                onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
              >
                Agendar Consulta
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-wellness-500 text-wellness-500 hover:bg-wellness-50 px-8 py-6 text-lg"
                onClick={() => scrollToSection('servicos')}
              >
                Nossos Serviços
              </Button>
            </div>
          </div>

          {/* Right side - Image/Visual */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-wellness-100 to-calm-100 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-wellness-500 to-calm-500 rounded-full mx-auto flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">15+ Anos</h3>
                  <p className="text-gray-600">de experiência em massoterapia</p>
                </div>
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">500+</p>
                  <p className="text-sm text-gray-600">Clientes Satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
