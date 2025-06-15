
import { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-wellness-600 to-calm-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center gap-4 mb-2 sm:mb-0">
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                (11) 99999-9999
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                São Paulo, SP
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Seg-Sex: 8h-18h | Sáb: 8h-14h
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-wellness-500 to-calm-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MassoTerapia</h1>
              <p className="text-sm text-gray-600">Clínica de Bem-Estar</p>
            </div>
          </div>

          {/* Desktop menu */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-wellness-600 transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-gray-700 hover:text-wellness-600 transition-colors"
            >
              Sobre Nós
            </button>
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-gray-700 hover:text-wellness-600 transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-gray-700 hover:text-wellness-600 transition-colors"
            >
              Contato
            </button>
            <Button 
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
              className="bg-gradient-to-r from-wellness-500 to-calm-500 hover:from-wellness-600 hover:to-calm-600"
            >
              Agendar Consulta
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-gray-700 hover:text-wellness-600 transition-colors text-left"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-gray-700 hover:text-wellness-600 transition-colors text-left"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => scrollToSection('servicos')}
                className="text-gray-700 hover:text-wellness-600 transition-colors text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-gray-700 hover:text-wellness-600 transition-colors text-left"
              >
                Contato
              </button>
              <Button 
                onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                className="bg-gradient-to-r from-wellness-500 to-calm-500 hover:from-wellness-600 hover:to-calm-600 w-full"
              >
                Agendar Consulta
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
