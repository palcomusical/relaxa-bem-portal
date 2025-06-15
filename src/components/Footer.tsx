
import { MapPin, Phone, Mail, Clock, Heart, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-wellness-500 to-calm-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">MassoTerapia</h3>
                <p className="text-sm text-gray-400">Clínica de Bem-Estar</p>
              </div>
            </div>
            
            <p className="text-gray-400">
              Há mais de 15 anos cuidando do seu bem-estar com profissionalismo, 
              qualidade e dedicação.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-wellness-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-wellness-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-wellness-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-wellness-500 transition-colors">Início</a></li>
              <li><a href="#sobre" className="text-gray-400 hover:text-wellness-500 transition-colors">Sobre Nós</a></li>
              <li><a href="#servicos" className="text-gray-400 hover:text-wellness-500 transition-colors">Serviços</a></li>
              <li><a href="#contato" className="text-gray-400 hover:text-wellness-500 transition-colors">Contato</a></li>
              <li><a href="/admin" className="text-gray-400 hover:text-wellness-500 transition-colors">Área Administrativa</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nossos Serviços</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Massagem Relaxante</li>
              <li className="text-gray-400">Massagem Terapêutica</li>
              <li className="text-gray-400">Drenagem Linfática</li>
              <li className="text-gray-400">Reflexologia</li>
              <li className="text-gray-400">Massagem Desportiva</li>
              <li className="text-gray-400">Quick Massage</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>contato@massoterapia.com.br</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Rua das Flores, 123<br />São Paulo, SP - 01234-567</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <Clock className="w-4 h-4 mt-1" />
                <span>Seg-Sex: 8h-18h<br />Sáb: 8h-14h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-gray-400 mb-4 md:mb-0">
              <Heart className="w-4 h-4 text-wellness-500" />
              <span>© {currentYear} MassoTerapia. Todos os direitos reservados.</span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-wellness-500 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-wellness-500 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-wellness-500 transition-colors">LGPD</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
