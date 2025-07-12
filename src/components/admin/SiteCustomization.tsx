
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Upload, Eye, Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SiteCustomization = () => {
  const [colors, setColors] = useState({
    primary: '#14b8a6',
    secondary: '#3b82f6',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#1f2937'
  });

  const [siteInfo, setSiteInfo] = useState({
    title: 'MassoTerapia',
    description: 'Clínica de Bem-Estar e Massoterapia',
    phone: '(11) 99999-9999',
    email: 'contato@massoterapia.com.br',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    workingHours: 'Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h'
  });

  const [features, setFeatures] = useState({
    onlineBooking: true,
    whatsappIntegration: true,
    emailNotifications: true,
    smsNotifications: false,
    loyaltyProgram: true,
    multiLanguage: false
  });

  const { toast } = useToast();

  const handleColorChange = (colorKey: keyof typeof colors, value: string) => {
    setColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const handleSiteInfoChange = (key: keyof typeof siteInfo, value: string) => {
    setSiteInfo(prev => ({ ...prev, [key]: value }));
  };

  const handleFeatureToggle = (feature: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const handleSave = () => {
    // Aqui seria implementada a lógica para salvar as configurações
    toast({
      title: "Configurações salvas!",
      description: "As alterações foram aplicadas com sucesso."
    });
  };

  const handlePreview = () => {
    // Aqui seria implementada a lógica para visualizar as mudanças
    toast({
      title: "Abrindo preview",
      description: "Visualizando as alterações em uma nova aba."
    });
  };

  const presetColors = [
    { name: 'Wellness', primary: '#14b8a6', secondary: '#3b82f6' },
    { name: 'Nature', primary: '#059669', secondary: '#10b981' },
    { name: 'Ocean', primary: '#0891b2', secondary: '#06b6d4' },
    { name: 'Sunset', primary: '#ea580c', secondary: '#f59e0b' },
    { name: 'Purple', primary: '#7c3aed', secondary: '#a855f7' },
    { name: 'Rose', primary: '#e11d48', secondary: '#f43f5e' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Customização do Site</h2>
          <p className="text-gray-600">Personalize a aparência e configurações do seu site</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} className="bg-wellness-500 hover:bg-wellness-600">
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="design" className="space-y-6">
        <TabsList>
          <TabsTrigger value="design">Design & Cores</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Esquema de Cores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Presets de Cores</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {presetColors.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className="h-16 flex flex-col items-center gap-1"
                      onClick={() => {
                        setColors(prev => ({
                          ...prev,
                          primary: preset.primary,
                          secondary: preset.secondary
                        }));
                      }}
                    >
                      <div className="w-6 h-3 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                      <div className="w-6 h-3 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
                      <span className="text-xs">{preset.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(colors).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="text-sm font-medium capitalize">
                      {key === 'primary' ? 'Primária' : 
                       key === 'secondary' ? 'Secundária' :
                       key === 'accent' ? 'Destaque' :
                       key === 'background' ? 'Fundo' : 'Texto'}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof typeof colors, e.target.value)}
                        className="w-12 h-10 p-1 rounded"
                      />
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof typeof colors, e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Preview das Cores</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded" style={{ backgroundColor: colors.primary, color: 'white' }}>
                    Cor Primária - Botões principais
                  </div>
                  <div className="p-3 rounded" style={{ backgroundColor: colors.secondary, color: 'white' }}>
                    Cor Secundária - Links e destaques
                  </div>
                  <div className="p-3 rounded border" style={{ backgroundColor: colors.background, color: colors.text }}>
                    Fundo e texto principal
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo e Imagens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Logo Principal</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-wellness-500">M</span>
                  </div>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Carregar Nova Logo
                  </Button>
                </div>
              </div>
              <div>
                <Label>Favicon</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-wellness-500">M</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Carregar Favicon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome da Clínica</Label>
                  <Input
                    value={siteInfo.title}
                    onChange={(e) => handleSiteInfoChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>E-mail de Contato</Label>
                  <Input
                    type="email"
                    value={siteInfo.email}
                    onChange={(e) => handleSiteInfoChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={siteInfo.phone}
                    onChange={(e) => handleSiteInfoChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Horário de Funcionamento</Label>
                  <Input
                    value={siteInfo.workingHours}
                    onChange={(e) => handleSiteInfoChange('workingHours', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={siteInfo.description}
                  onChange={(e) => handleSiteInfoChange('description', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label>Endereço</Label>
                <Textarea
                  value={siteInfo.address}
                  onChange={(e) => handleSiteInfoChange('address', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades do Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(features).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <div>
                    <Label className="font-medium">
                      {key === 'onlineBooking' ? 'Agendamento Online' :
                       key === 'whatsappIntegration' ? 'Integração WhatsApp' :
                       key === 'emailNotifications' ? 'Notificações por E-mail' :
                       key === 'smsNotifications' ? 'Notificações por SMS' :
                       key === 'loyaltyProgram' ? 'Programa de Fidelidade' :
                       'Multi-idioma'}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {key === 'onlineBooking' ? 'Permite agendamentos direto pelo site' :
                       key === 'whatsappIntegration' ? 'Botão de contato via WhatsApp' :
                       key === 'emailNotifications' ? 'Envio automático de confirmações' :
                       key === 'smsNotifications' ? 'Lembretes via SMS' :
                       key === 'loyaltyProgram' ? 'Sistema de pontos e recompensas' :
                       'Suporte a múltiplos idiomas'}
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={() => handleFeatureToggle(key as keyof typeof features)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Otimização para Mecanismos de Busca</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Título da Página (SEO)</Label>
                <Input placeholder="MassoTerapia - Clínica de Bem-Estar em São Paulo" />
              </div>
              <div>
                <Label>Meta Descrição</Label>
                <Textarea
                  placeholder="Clínica especializada em massoterapia e bem-estar. Agende sua sessão e cuide da sua saúde e relaxamento."
                  rows={3}
                />
              </div>
              <div>
                <Label>Palavras-chave</Label>
                <Input placeholder="massoterapia, massagem, bem-estar, relaxamento, são paulo" />
              </div>
              <div>
                <Label>URL do Site</Label>
                <Input placeholder="https://www.massoterapia.com.br" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteCustomization;
