import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const Support = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) {
      toast.error('Заполните все поля');
      return;
    }
    
    toast.success('Тикет создан! Ожидайте ответа в течение 24 часов');
    setSubject('');
    setMessage('');
  };

  const tickets = [
    { 
      id: '#12345', 
      subject: 'Проблема с запуском сервера', 
      status: 'open', 
      date: '2024-12-07 14:30',
      lastReply: 'Вы',
      priority: 'high'
    },
    { 
      id: '#12344', 
      subject: 'Вопрос по настройке плагинов', 
      status: 'answered', 
      date: '2024-12-06 10:20',
      lastReply: 'Поддержка',
      priority: 'normal'
    },
    { 
      id: '#12343', 
      subject: 'Увеличение RAM', 
      status: 'closed', 
      date: '2024-12-05 16:45',
      lastReply: 'Поддержка',
      priority: 'low'
    },
  ];

  const faq = [
    {
      question: 'Как установить плагины на сервер?',
      answer: 'Загрузите .jar файл плагина в папку /plugins через файловый менеджер и перезапустите сервер.'
    },
    {
      question: 'Как настроить SFTP доступ?',
      answer: 'Используйте данные из раздела "Файлы" → "SFTP доступ" для подключения через FileZilla или WinSCP.'
    },
    {
      question: 'Как создать бэкап сервера?',
      answer: 'Перейдите в раздел "Бэкапы" и нажмите "Создать бэкап". Восстановление доступно в том же разделе.'
    },
    {
      question: 'Как изменить версию Minecraft?',
      answer: 'В разделе "Версии" выберите нужную версию и ядро, затем нажмите "Установить".'
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Поддержка</h1>
        <p className="text-muted-foreground">Помощь и тикеты</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="MessageSquarePlus" className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Создать тикет</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Тема обращения</label>
              <Input 
                placeholder="Опишите проблему кратко"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Сообщение</label>
              <Textarea 
                placeholder="Подробно опишите вашу проблему или вопрос..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90">
              <Icon name="Send" className="w-4 h-4 mr-2" />
              Отправить тикет
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="MessageCircle" className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Контакты</h2>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Icon name="MessageCircle" className="w-4 h-4 mr-2" />
              Онлайн-чат
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Mail" className="w-4 h-4 mr-2" />
              Email: support@minecrafthost.com
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="MessageSquare" className="w-4 h-4 mr-2" />
              Telegram: @mc_support
            </Button>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <div className="text-sm font-medium mb-2">Время ответа</div>
            <div className="text-2xl font-bold text-primary mb-1">~ 2 часа</div>
            <div className="text-xs text-muted-foreground">В среднем</div>
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Ticket" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Мои тикеты</h2>
        </div>

        <div className="bg-background rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm border-b border-border">
            <div className="col-span-2">ID</div>
            <div className="col-span-4">Тема</div>
            <div className="col-span-2">Статус</div>
            <div className="col-span-2">Дата</div>
            <div className="col-span-2">Последний ответ</div>
          </div>

          <div className="divide-y divide-border">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="col-span-2 font-mono text-sm text-primary">{ticket.id}</div>
                <div className="col-span-4 font-medium">{ticket.subject}</div>
                <div className="col-span-2">
                  <Badge 
                    variant={ticket.status === 'open' ? 'default' : ticket.status === 'answered' ? 'secondary' : 'outline'}
                    className={ticket.status === 'open' ? 'bg-primary' : ''}
                  >
                    {ticket.status === 'open' ? 'Открыт' : ticket.status === 'answered' ? 'Отвечен' : 'Закрыт'}
                  </Badge>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">{ticket.date}</div>
                <div className="col-span-2 text-sm text-muted-foreground">{ticket.lastReply}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="HelpCircle" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Часто задаваемые вопросы</h2>
        </div>

        <div className="space-y-4">
          {faq.map((item, index) => (
            <Card key={index} className="p-4 bg-background">
              <div className="font-medium mb-2 flex items-start gap-2">
                <Icon name="ChevronRight" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                {item.question}
              </div>
              <div className="text-sm text-muted-foreground pl-7">{item.answer}</div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Support;
