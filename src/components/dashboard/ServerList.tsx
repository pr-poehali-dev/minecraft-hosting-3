import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Server {
  id: string;
  name: string;
  version: string;
  status: 'online' | 'offline' | 'starting';
  ip: string;
  port: number;
  players: number;
  maxPlayers: number;
  cpu: number;
  ram: number;
  maxRam: number;
  uptime: number;
}

interface ServerListProps {
  setSelectedServer: (server: Server) => void;
}

const ServerList = ({ setSelectedServer }: ServerListProps) => {
  const navigate = useNavigate();

  const servers: Server[] = [
    {
      id: 'server-1',
      name: 'Мой первый сервер',
      version: '1.16.5',
      status: 'offline',
      ip: 'mc.yourdomain.com',
      port: 25565,
      players: 0,
      maxPlayers: 20,
      cpu: 0,
      ram: 0,
      maxRam: 4096,
      uptime: 0
    }
  ];

  const handleSelectServer = (server: Server) => {
    setSelectedServer(server);
    localStorage.setItem('selected_server', JSON.stringify(server));
    navigate('/dashboard/console');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Мои серверы</h1>
        <p className="text-muted-foreground">Управление вашими Minecraft серверами</p>
      </div>

      <div className="grid gap-4">
        {servers.map((server) => (
          <Card key={server.id} className="p-6 hover:border-primary/50 transition-all cursor-pointer" onClick={() => handleSelectServer(server)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Server" className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold">{server.name}</h3>
                    <Badge variant={server.status === 'online' ? 'default' : 'secondary'} className={server.status === 'online' ? 'bg-primary' : ''}>
                      {server.status === 'online' ? 'Online' : server.status === 'starting' ? 'Starting' : 'Offline'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Версия: {server.version}</span>
                    <span>•</span>
                    <span>IP: {server.ip}:{server.port}</span>
                    <span>•</span>
                    <span>Игроки: {server.players}/{server.maxPlayers}</span>
                  </div>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Play" className="w-4 h-4 mr-2" />
                Управление
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-8 border-dashed border-2 hover:border-primary/50 transition-all cursor-pointer">
        <div className="text-center">
          <Icon name="Plus" className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Создать новый сервер</h3>
          <p className="text-muted-foreground mb-4">Запустите новый Minecraft сервер за минуту</p>
          <Button className="bg-primary hover:bg-primary/90">
            Создать сервер
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ServerList;
