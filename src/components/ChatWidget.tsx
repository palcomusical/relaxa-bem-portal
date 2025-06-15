
import { useState } from 'react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Bem-vindo à nossa clínica de massoterapia. Como posso ajudá-lo hoje?",
      sender: 'bot',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    "Quero agendar uma consulta",
    "Quais são os preços?",
    "Horário de funcionamento",
    "Localização da clínica"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('agendar') || message.includes('consulta') || message.includes('agendamento')) {
      return "Para agendar sua consulta, você pode clicar no botão do WhatsApp ou ligar para (11) 99999-9999. Nosso horário de atendimento é de Segunda a Sexta das 8h às 18h e Sábado das 8h às 14h.";
    }
    
    if (message.includes('preço') || message.includes('valor') || message.includes('quanto custa')) {
      return "Nossos preços variam de acordo com o tipo de massagem: Quick Massage (30min) - R$80, Reflexologia (45min) - R$100, Massagem Relaxante (60min) - R$120, Massagem Desportiva (60min) - R$140, Drenagem Linfática (75min) - R$150, Massagem Terapêutica (90min) - R$180.";
    }
    
    if (message.includes('horário') || message.includes('funcionamento') || message.includes('aberto')) {
      return "Nosso horário de funcionamento é: Segunda a Sexta das 8h às 18h, Sábado das 8h às 14h. Domingo fechado.";
    }
    
    if (message.includes('endereço') || message.includes('localização') || message.includes('onde')) {
      return "Estamos localizados na Rua das Flores, 123 - São Paulo/SP. Você pode encontrar nossa localização no Google Maps.";
    }
    
    return "Obrigado pela sua mensagem! Para um atendimento mais personalizado, entre em contato conosco pelo WhatsApp (11) 99999-9999 ou telefone. Nossa equipe está pronta para ajudá-lo!";
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-calm-500 hover:bg-calm-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Abrir chat"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-fade-in">
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-wellness-500 to-calm-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="w-5 h-5" />
                Chat de Atendimento
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4">
              {/* Messages */}
              <div className="h-80 overflow-y-auto mb-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start max-w-[80%] gap-2 ${
                        message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                          message.sender === 'user'
                            ? 'bg-calm-500 text-white'
                            : 'bg-wellness-500 text-white'
                        }`}
                      >
                        {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div
                        className={`px-3 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-calm-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">{message.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Respostas rápidas:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
