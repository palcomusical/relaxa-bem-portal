
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsGrid from '@/components/dashboard/StatsGrid';
import AppointmentsTab from '@/components/dashboard/AppointmentsTab';
import ContactsTab from '@/components/dashboard/ContactsTab';
import ClientsTab from '@/components/dashboard/ClientsTab';
import ReportsTab from '@/components/dashboard/ReportsTab';
import CalendarTab from '@/components/dashboard/CalendarTab';
import SettingsModal from '@/components/dashboard/SettingsModal';
import ReportsModal from '@/components/ReportsModal';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportType, setReportType] = useState<string>('');
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  const { serviceBookings, contactForms, whatsappLeads, clients, addClient, addServiceBooking, updateServiceBooking, generateSimulatedData } = useData();
  const { toast } = useToast();

  console.log('🎯 Dashboard renderizando com dados:', {
    agendamentos: serviceBookings.length,
    contatos: contactForms.length,
    leads: whatsappLeads.length,
    clientes: clients.length,
    dataFiltro: selectedDate
  });

  // Filter bookings by selected date
  const filteredBookings = serviceBookings.filter(booking => 
    booking.preferredDate === selectedDate
  );

  console.log('📅 Agendamentos filtrados para', selectedDate, ':', filteredBookings.length);

  const handleRefreshData = () => {
    generateSimulatedData();
    toast({ title: "Dados atualizados!", description: "Dados simulados foram recarregados." });
  };

  const handleReportClick = (type: string) => {
    setReportType(type);
    setShowReportsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        onRefreshData={handleRefreshData}
        onSettingsClick={() => setShowSettingsModal(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid filteredBookings={filteredBookings} clients={clients} />

        {/* Debug Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📊 Status dos Dados</h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Agendamentos:</span> {serviceBookings.length}
            </div>
            <div>
              <span className="font-medium">Contatos:</span> {contactForms.length}
            </div>
            <div>
              <span className="font-medium">Leads WhatsApp:</span> {whatsappLeads.length}
            </div>
            <div>
              <span className="font-medium">Clientes:</span> {clients.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="appointments">Agendamentos ({serviceBookings.length})</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="contacts">Contatos ({contactForms.length + whatsappLeads.length})</TabsTrigger>
            <TabsTrigger value="clients">Clientes ({clients.length})</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AppointmentsTab
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              filteredBookings={filteredBookings}
              serviceBookings={serviceBookings}
              addServiceBooking={addServiceBooking}
              updateServiceBooking={updateServiceBooking}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarTab
              serviceBookings={serviceBookings}
              addServiceBooking={addServiceBooking}
            />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsTab 
              whatsappLeads={whatsappLeads}
              contactForms={contactForms}
            />
          </TabsContent>

          <TabsContent value="clients">
            <ClientsTab 
              clients={clients}
              addClient={addClient}
            />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab onReportClick={handleReportClick} />
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <SettingsModal 
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
        />

        <ReportsModal 
          isOpen={showReportsModal}
          onClose={() => setShowReportsModal(false)}
          reportType={reportType}
        />
      </div>
    </div>
  );
};

export default Dashboard;
