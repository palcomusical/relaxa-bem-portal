
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
  const [dataLoaded, setDataLoaded] = useState(false);

  const generateSimulatedData = () => {
    console.log('🔄 Gerando dados simulados...');
    const today = new Date();
    
    const simulatedLeads = [
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
      },
      {
        id: '3',
        name: 'Pedro Costa',
        whatsapp: '(11) 96543-2109',
        message: 'Gostaria de saber os preços da massagem desportiva.',
        createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const simulatedForms = [
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
      },
      {
        id: '4',
        name: 'Ricardo Almeida',
        email: 'ricardo.almeida@email.com',
        phone: '(11) 95432-1098',
        message: 'Interesse em pacote mensal de massagens. Qual o desconto?',
        createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const simulatedBookings = [
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
      },
      {
        id: '6',
        name: 'Sandra Mendonça',
        phone: '(11) 91098-7654',
        email: 'sandra.mendonca@email.com',
        service: 'Reflexologia - R$ 100 (45 min)',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: '16:00',
        message: 'Problemas de circulação, preciso de reflexologia.',
        status: 'Agendado' as const,
        createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const simulatedClients = [
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
      },
      {
        id: '4',
        name: 'Miguel Santos',
        email: 'miguel.santos@email.com',
        phone: '(11) 97765-4321',
        whatsapp: '(11) 97765-4321',
        address: 'Rua da Consolação, 800 - Consolação, São Paulo/SP',
        birthDate: '1990-12-05',
        notes: 'Praticante de crossfit, precisa de massagem desportiva regularmente.',
        createdAt: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        name: 'Carmen Rodriguez',
        email: 'carmen.rodriguez@email.com',
        phone: '(11) 96654-3210',
        whatsapp: '(11) 96654-3210',
        address: 'Rua Oscar Freire, 1200 - Jardins, São Paulo/SP',
        birthDate: '1975-08-22',
        notes: 'Cliente VIP, prefere horários da manhã, sempre pontual.',
        createdAt: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    console.log('📊 Dados criados:', {
      leads: simulatedLeads.length,
      forms: simulatedForms.length,
      bookings: simulatedBookings.length,
      clients: simulatedClients.length
    });

    setWhatsappLeads(simulatedLeads);
    setContactForms(simulatedForms);
    setServiceBookings(simulatedBookings);
    setClients(simulatedClients);

    // Salvar no localStorage
    localStorage.setItem('whatsappLeads', JSON.stringify(simulatedLeads));
    localStorage.setItem('contactForms', JSON.stringify(simulatedForms));
    localStorage.setItem('serviceBookings', JSON.stringify(simulatedBookings));
    localStorage.setItem('clients', JSON.stringify(simulatedClients));

    console.log('✅ Dados simulados carregados com sucesso!');
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      console.log('🔍 Tentando carregar dados do localStorage...');
      
      const storedLeads = localStorage.getItem('whatsappLeads');
      const storedForms = localStorage.getItem('contactForms');
      const storedBookings = localStorage.getItem('serviceBookings');
      const storedClients = localStorage.getItem('clients');

      console.log('📦 Dados no localStorage:', {
        leads: storedLeads ? JSON.parse(storedLeads).length : 0,
        forms: storedForms ? JSON.parse(storedForms).length : 0,
        bookings: storedBookings ? JSON.parse(storedBookings).length : 0,
        clients: storedClients ? JSON.parse(storedClients).length : 0
      });

      if (storedLeads) setWhatsappLeads(JSON.parse(storedLeads));
      if (storedForms) setContactForms(JSON.parse(storedForms));
      if (storedBookings) setServiceBookings(JSON.parse(storedBookings));
      if (storedClients) setClients(JSON.parse(storedClients));

      // Se não há dados, gerar dados simulados automaticamente
      if (!storedLeads && !storedForms && !storedBookings && !storedClients) {
        console.log('🚀 Nenhum dado encontrado, gerando dados simulados...');
        setTimeout(generateSimulatedData, 500);
      }
      
      setDataLoaded(true);
    };

    loadData();
  }, []);

  // Save to localStorage whenever data changes (only after initial load)
  useEffect(() => {
    if (dataLoaded && whatsappLeads.length > 0) {
      localStorage.setItem('whatsappLeads', JSON.stringify(whatsappLeads));
      console.log('💾 WhatsApp leads salvos:', whatsappLeads.length);
    }
  }, [whatsappLeads, dataLoaded]);

  useEffect(() => {
    if (dataLoaded && contactForms.length > 0) {
      localStorage.setItem('contactForms', JSON.stringify(contactForms));
      console.log('💾 Formulários de contato salvos:', contactForms.length);
    }
  }, [contactForms, dataLoaded]);

  useEffect(() => {
    if (dataLoaded && serviceBookings.length > 0) {
      localStorage.setItem('serviceBookings', JSON.stringify(serviceBookings));
      console.log('💾 Agendamentos salvos:', serviceBookings.length);
    }
  }, [serviceBookings, dataLoaded]);

  useEffect(() => {
    if (dataLoaded && clients.length > 0) {
      localStorage.setItem('clients', JSON.stringify(clients));
      console.log('💾 Clientes salvos:', clients.length);
    }
  }, [clients, dataLoaded]);

  const addWhatsAppLead = (lead: Omit<WhatsAppLead, 'id' | 'createdAt'>) => {
    const newLead: WhatsAppLead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    console.log('➕ Novo lead WhatsApp adicionado:', newLead.name);
    setWhatsappLeads(prev => [newLead, ...prev]);
  };

  const addContactForm = (form: Omit<ContactForm, 'id' | 'createdAt'>) => {
    const newForm: ContactForm = {
      ...form,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    console.log('➕ Novo formulário de contato adicionado:', newForm.name);
    setContactForms(prev => [newForm, ...prev]);
  };

  const addServiceBooking = (booking: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: ServiceBooking = {
      ...booking,
      id: Date.now().toString(),
      status: 'Agendado',
      createdAt: new Date().toISOString(),
    };
    console.log('➕ Novo agendamento adicionado:', newBooking.name, 'para', newBooking.preferredDate);
    setServiceBookings(prev => [newBooking, ...prev]);
  };

  const addClient = (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    console.log('➕ Novo cliente adicionado:', newClient.name);
    setClients(prev => [newClient, ...prev]);
  };

  const updateServiceBooking = (id: string, updates: Partial<ServiceBooking>) => {
    console.log('🔄 Atualizando agendamento:', id, updates);
    setServiceBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, ...updates } : booking
      )
    );
  };

  console.log('📊 Estado atual dos dados:', {
    whatsappLeads: whatsappLeads.length,
    contactForms: contactForms.length,
    serviceBookings: serviceBookings.length,
    clients: clients.length
  });

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
