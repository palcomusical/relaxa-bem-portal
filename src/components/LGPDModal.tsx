
import { useState, useEffect } from 'react';
import { Shield, X, Check, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const LGPDModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const hasAcceptedLGPD = localStorage.getItem('lgpd-accepted');
    if (!hasAcceptedLGPD) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(newPreferences);
    localStorage.setItem('lgpd-accepted', 'true');
    localStorage.setItem('lgpd-preferences', JSON.stringify(newPreferences));
    setIsOpen(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('lgpd-accepted', 'true');
    localStorage.setItem('lgpd-preferences', JSON.stringify(preferences));
    setIsOpen(false);
  };

  const handleRejectOptional = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(newPreferences);
    localStorage.setItem('lgpd-accepted', 'true');
    localStorage.setItem('lgpd-preferences', JSON.stringify(newPreferences));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-wellness-500 to-calm-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Política de Privacidade e Cookies
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-gray-700">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, 
              personalizar conteúdo e anúncios, e analisar nosso tráfego. Respeitamos sua privacidade 
              e estamos em conformidade com a LGPD.
            </p>

            {!showDetails ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">O que coletamos:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Informações de contato (nome, email, telefone)</li>
                    <li>• Dados de navegação e preferências</li>
                    <li>• Informações de agendamento</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Como usamos:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Agendar e confirmar consultas</li>
                    <li>• Melhorar nossos serviços</li>
                    <li>• Comunicar promoções (com seu consentimento)</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowDetails(true)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Personalizar
                  </Button>
                  <Button 
                    onClick={handleAcceptAll}
                    className="flex-1 bg-gradient-to-r from-wellness-500 to-calm-500 hover:from-wellness-600 hover:to-calm-600"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Aceitar Todos
                  </Button>
                </div>

                <Button 
                  onClick={handleRejectOptional}
                  variant="ghost"
                  className="w-full text-gray-600"
                >
                  Aceitar Apenas Necessários
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Cookies Necessários</h4>
                      <p className="text-sm text-gray-600">Essenciais para o funcionamento do site</p>
                    </div>
                    <Switch checked={preferences.necessary} disabled />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Cookies Analíticos</h4>
                      <p className="text-sm text-gray-600">Nos ajudam a entender como você usa o site</p>
                    </div>
                    <Switch 
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => setPreferences({...preferences, analytics: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Cookies de Marketing</h4>
                      <p className="text-sm text-gray-600">Para personalizar anúncios e conteúdo</p>
                    </div>
                    <Switch 
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => setPreferences({...preferences, marketing: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Cookies Funcionais</h4>
                      <p className="text-sm text-gray-600">Para lembrar suas preferências</p>
                    </div>
                    <Switch 
                      checked={preferences.functional}
                      onCheckedChange={(checked) => setPreferences({...preferences, functional: checked})}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowDetails(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleAcceptSelected}
                    className="flex-1 bg-gradient-to-r from-wellness-500 to-calm-500 hover:from-wellness-600 hover:to-calm-600"
                  >
                    Salvar Preferências
                  </Button>
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 pt-4 border-t">
              <p>
                Para mais informações, consulte nossa{' '}
                <a href="#" className="text-wellness-500 hover:underline">
                  Política de Privacidade
                </a>{' '}
                completa. Você pode alterar suas preferências a qualquer momento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LGPDModal;
