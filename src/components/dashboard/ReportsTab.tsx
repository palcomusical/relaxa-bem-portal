
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, Users, TrendingUp, Clock, BarChart3 } from 'lucide-react';

interface ReportsTabProps {
  onReportClick: (type: string) => void;
}

const ReportsTab = ({ onReportClick }: ReportsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Relatórios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => onReportClick('appointments')}
          >
            <Calendar className="w-6 h-6 mb-2" />
            Agendamentos por Período
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => onReportClick('revenue')}
          >
            <DollarSign className="w-6 h-6 mb-2" />
            Faturamento Mensal
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => onReportClick('clients')}
          >
            <Users className="w-6 h-6 mb-2" />
            Clientes Mais Frequentes
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => onReportClick('services')}
          >
            <TrendingUp className="w-6 h-6 mb-2" />
            Serviços Mais Procurados
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => onReportClick('schedule')}
          >
            <Clock className="w-6 h-6 mb-2" />
            Horários de Pico
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => onReportClick('complete')}
          >
            <BarChart3 className="w-6 h-6 mb-2" />
            Relatório Completo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsTab;
