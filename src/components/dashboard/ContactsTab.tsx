
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Mail } from 'lucide-react';

interface ContactsTabProps {
  whatsappLeads: any[];
  contactForms: any[];
}

const ContactsTab = ({ whatsappLeads, contactForms }: ContactsTabProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Leads WhatsApp ({whatsappLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {whatsappLeads.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Nenhum lead WhatsApp encontrado.</p>
            ) : (
              whatsappLeads.map((lead) => (
                <div key={lead.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{lead.name}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{lead.whatsapp}</p>
                  <p className="text-sm">{lead.message}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Formulários de Contato ({contactForms.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {contactForms.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Nenhum formulário de contato encontrado.</p>
            ) : (
              contactForms.map((form) => (
                <div key={form.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{form.name}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(form.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{form.email}</p>
                  <p className="text-sm text-gray-600 mb-2">{form.phone}</p>
                  <p className="text-sm">{form.message}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsTab;
