
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Eye, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClientsTabProps {
  clients: any[];
  addClient: (client: any) => void;
}

const ClientsTab = ({ clients, addClient }: ClientsTabProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [newClientForm, setNewClientForm] = useState({
    name: '', email: '', phone: '', whatsapp: '', address: '', birthDate: '', notes: ''
  });
  const { toast } = useToast();

  const handleNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    addClient(newClientForm);
    toast({ title: "Cliente cadastrado!", description: "Cliente adicionado com sucesso." });
    setNewClientForm({ name: '', email: '', phone: '', whatsapp: '', address: '', birthDate: '', notes: '' });
    setActiveModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Clientes Cadastrados ({clients.length})</h3>
        <Dialog open={activeModal === 'new-client'} onOpenChange={(open) => setActiveModal(open ? 'new-client' : null)}>
          <DialogTrigger asChild>
            <Button className="bg-wellness-500 hover:bg-wellness-600">
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleNewClient} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Nome completo"
                  value={newClientForm.name}
                  onChange={(e) => setNewClientForm({...newClientForm, name: e.target.value})}
                  required
                />
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={newClientForm.email}
                  onChange={(e) => setNewClientForm({...newClientForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Telefone"
                  value={newClientForm.phone}
                  onChange={(e) => setNewClientForm({...newClientForm, phone: e.target.value})}
                  required
                />
                <Input
                  placeholder="WhatsApp"
                  value={newClientForm.whatsapp}
                  onChange={(e) => setNewClientForm({...newClientForm, whatsapp: e.target.value})}
                />
              </div>
              <Input
                placeholder="Endereço"
                value={newClientForm.address}
                onChange={(e) => setNewClientForm({...newClientForm, address: e.target.value})}
              />
              <Input
                type="date"
                placeholder="Data de nascimento"
                value={newClientForm.birthDate}
                onChange={(e) => setNewClientForm({...newClientForm, birthDate: e.target.value})}
              />
              <Textarea
                placeholder="Observações"
                value={newClientForm.notes}
                onChange={(e) => setNewClientForm({...newClientForm, notes: e.target.value})}
              />
              <Button type="submit" className="w-full">Cadastrar Cliente</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          {clients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum cliente cadastrado.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Cadastrado em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{client.phone}</p>
                        {client.whatsapp && <p className="text-sm text-gray-500">WhatsApp: {client.whatsapp}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsTab;
