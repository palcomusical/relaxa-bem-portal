
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Clínica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Nome da clínica" defaultValue="MassoTerapia" />
                <Input placeholder="CNPJ" />
              </div>
              <Input placeholder="Endereço" defaultValue="Rua das Flores, 123 - São Paulo/SP" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Telefone" defaultValue="(11) 99999-9999" />
                <Input placeholder="E-mail" defaultValue="contato@massoterapia.com.br" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Horário de Funcionamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <span className="text-sm font-medium py-2">Segunda - Sexta:</span>
                <Input defaultValue="08:00" />
                <Input defaultValue="18:00" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-sm font-medium py-2">Sábado:</span>
                <Input defaultValue="08:00" />
                <Input defaultValue="14:00" />
              </div>
            </CardContent>
          </Card>
          
          <Button className="w-full">Salvar Configurações</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
