
import { Button } from '@/components/ui/button';
import { Settings, LogOut, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  onRefreshData: () => void;
  onSettingsClick: () => void;
}

const DashboardHeader = ({ onRefreshData, onSettingsClick }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-wellness-500 to-calm-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
              <p className="text-sm text-gray-600">MassoTerapia - Clínica de Bem-Estar</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRefreshData}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Recarregar Dados
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onSettingsClick}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
