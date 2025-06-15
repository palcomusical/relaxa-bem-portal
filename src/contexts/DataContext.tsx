
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface WhatsAppLead {
  id: string;
  name: string;
  whatsapp: string;
  message: string;
  createdAt: string;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface ServiceBooking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: 'Agendado' | 'Confirmado' | 'Em andamento' | 'Concluído' | 'Cancelado';
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  birthDate: string;
  notes: string;
  createdAt: string;
}

interface DataContextType {
  whatsappLeads: WhatsAppLead[];
  contactForms: ContactForm[];
  serviceBookings: ServiceBooking[];
  clients: Client[];
  addWhatsAppLead: (lead: Omit<WhatsAppLead, 'id' | 'createdAt'>) => void;
  addContactForm: (form: Omit<ContactForm, 'id' | 'createdAt'>) => void;
  addServiceBooking: (booking: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>) => void;
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateServiceBooking: (id: string, updates: Partial<ServiceBooking>) => void;
  generateSimulatedData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [whatsappLeads, setWhatsappLeads] = useState<WhatsAppLead[]>([]);
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const generateSimulatedData = () => {
    const today = new Date();
    const simulatedData = {
      whatsappLeads: [
        {
          id: '1',
          name: 'Maria Silva',
          whatsapp: '(11) 98765-4321',
          message: 'Olá! Gostaria de agendar uma massagem relaxante para esta semana.',
          createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          name: 'João Santos',
          whatsapp: '(11) 97654-3210',
          message: 'Preciso de uma sessão de drenagem linfática. Vocês atendem aos domingos?',
          createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      contactForms: [
        {
          id: '1',
          name: 'Ana Costa',
          email: 'ana.costa@email.com',
          phone: '(11) 99876-5432',
          message: 'Gostaria de saber mais sobre os preços da massagem terapêutica e disponibilidade para a próxima semana.',
          createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          name: 'Carlos Oliveira',
          email: 'carlos.oliveira@email.com',
          phone: '(11) 98765-1234',
          message: 'Tenho problemas de coluna e gostaria de uma avaliação para massagem terapêutica.',
          createdAt: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          name: 'Fernanda Lima',
          email: 'fernanda.lima@email.com',
          phone: '(11) 97531-8642',
          message: 'Vocês fazem atendimento domiciliar? Preciso de massagem relaxante em casa.',
          createdAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      serviceBookings: [
        {
          id: '1',
          name: 'Patricia Rodrigues',
          phone: '(11) 96543-2109',
          email: 'patricia.rodrigues@email.com',
          service: 'Massagem Relaxante - R$ 120 (60 min)',
          preferredDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          preferredTime: '14:00',
          message: 'Primeira vez que vou fazer massagem, estou um pouco nervosa.',
          status: 'Confirmado' as const,
          createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          name: 'Roberto Silva',
          phone: '(11) 95432-1098',
          email: 'roberto.silva@email.com',
          service: 'Massagem Terapêutica - R$ 180 (90 min)',
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: '10:00',
          message: 'Tenho dores nas costas devido ao trabalho no escritório.',
          status: 'Em andamento' as const,
          createdAt: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          name: 'Mariana Ferreira',
          phone: '(11) 94321-0987',
          email: 'mariana.ferreira@email.com',
          service: 'Drenagem Linfática - R$ 150 (75 min)',
          preferredDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          preferredTime: '16:30',
          message: 'Recomendação médica para drenagem pós-cirúrgica.',
          status: 'Concluído' as const,
          createdAt: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '4',
          name: 'Lucas Mendes',
          phone: '(11) 93210-9876',
          email: 'lucas.mendes@email.com',
          service: 'Massagem Desportiva - R$ 140 (60 min)',
          preferredDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          preferredTime: '09:00',
          message: 'Atleta, preciso de massagem para recuperação muscular.',
          status: 'Agendado' as const,
          createdAt: new Date(today.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '5',
          name: 'Juliana Alves',
          phone: '(11) 92109-8765',
          email: 'juliana.alves@email.com',
          service: 'Quick Massage - R$ 80 (30 min)',
          preferredDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          preferredTime: '15:00',
          message: 'Pausa do trabalho, preciso relaxar rapidamente.',
          status: 'Confirmado' as const,
          createdAt: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      clients: [
        {
          id: '1',
          name: 'Claudia Nascimento',
          email: 'claudia.nascimento@email.com',
          phone: '(11) 91098-7654',
          whatsapp: '(11) 91098-7654',
          address: 'Rua das Palmeiras, 456 - Vila Madalena, São Paulo/SP',
          birthDate: '1985-03-15',
          notes: 'Cliente regular, prefere massagem suave, alérgica a óleo de amendoim.',
          createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          name: 'Eduardo Pereira',
          email: 'eduardo.pereira@email.com',
          phone: '(11) 90987-6543',
          whatsapp: '(11) 90987-6543',
          address: 'Av. Paulista, 1000 - Bela Vista, São Paulo/SP',
          birthDate: '1978-11-28',
          notes: 'Executivo, alta tensão muscular, sessões semanais recomendadas.',
          createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          name: 'Isabela Ramos',
          email: 'isabela.ramos@email.com',
          phone: '(11) 98876-5432',
          whatsapp: '(11) 98876-5432',
          address: 'Rua Augusta, 2500 - Jardins, São Paulo/SP',
          birthDate: '1992-07-10',
          notes: 'Gestante, 7º mês, necessita massagem específica para gestantes.',
          createdAt: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    };

    setWhatsappLeads(simulatedData.whatsappLeads);
    setContactForms(simulatedData.contactForms);
    setServiceBookings(simulatedData.serviceBookings);
    setClients(simulatedData.clients);

    console.log('Dados simulados carregados:', simulatedData);
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      const storedLeads = localStorage.getItem('whatsappLeads');
      const storedForms = localStorage.getItem('contactForms');
      const storedBookings = localStorage.getItem('serviceBookings');
      const storedClients = localStorage.getItem('clients');

      if (storedLeads) setWhatsappLeads(JSON.parse(storedLeads));
      if (storedForms) setContactForms(JSON.parse(storedForms));
      if (storedBookings) setServiceBookings(JSON.parse(storedBookings));
      if (storedClients) setClients(JSON.parse(storedClients));

      // Se não há dados, gerar dados simulados
      if (!storedLeads && !storedForms && !storedBookings && !storedClients) {
        setTimeout(generateSimulatedData, 1000);
      }
    };

    loadData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('whatsappLeads', JSON.stringify(whatsappLeads));
  }, [whatsappLeads]);

  useEffect(() => {
    localStorage.setItem('contactForms', JSON.stringify(contactForms));
  }, [contactForms]);

  useEffect(() => {
    localStorage.setItem('serviceBookings', JSON.stringify(serviceBookings));
  }, [serviceBookings]);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const addWhatsAppLead = (lead: Omit<WhatsAppLead, 'id' | 'createdAt'>) => {
    const newLead: WhatsAppLead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setWhatsappLeads(prev => [newLead, ...prev]);
  };

  const addContactForm = (form: Omit<ContactForm, 'id' | 'createdAt'>) => {
    const newForm: ContactForm = {
      ...form,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setContactForms(prev => [newForm, ...prev]);
  };

  const addServiceBooking = (booking: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: ServiceBooking = {
      ...booking,
      id: Date.now().toString(),
      status: 'Agendado',
      createdAt: new Date().toISOString(),
    };
    setServiceBookings(prev => [newBooking, ...prev]);
  };

  const addClient = (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setClients(prev => [newClient, ...prev]);
  };

  const updateServiceBooking = (id: string, updates: Partial<ServiceBooking>) => {
    setServiceBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, ...updates } : booking
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        whatsappLeads,
        contactForms,
        serviceBookings,
        clients,
        addWhatsAppLead,
        addContactForm,
        addServiceBooking,
        addClient,
        updateServiceBooking,
        generateSimulatedData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
