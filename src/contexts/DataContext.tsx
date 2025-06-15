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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [whatsappLeads, setWhatsappLeads] = useState<WhatsAppLead[]>([]);
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

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
