import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

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

interface ServerConsoleProps {
  server: Server | null;
  setServer: (server: Server) => void;
}

const ServerConsole = ({ server, setServer }: ServerConsoleProps) => {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [startingProgress, setStartingProgress] = useState(0);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    if (server?.status === 'starting') {
      const interval = setInterval(() => {
        setStartingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            simulateServerStart();
            return 100;
          }
          return prev + 5;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [server?.status]);

  useEffect(() => {
    if (server?.status === 'online') {
      const interval = setInterval(() => {
        if (server) {
          const updatedServer = {
            ...server,
            cpu: Math.floor(Math.random() * 40) + 10,
            ram: Math.floor(Math.random() * 1000) + 1500,
            uptime: server.uptime + 1
          };
          setServer(updatedServer);
          localStorage.setItem('selected_server', JSON.stringify(updatedServer));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [server?.status, server, setServer]);

  const simulateServerStart = () => {
    if (!server) return;
    
    const startLogs = [
      '[Server] Starting Minecraft server version 1.16.5',
      '[Server] Loading properties',
      '[Server] Preparing level "world"',
      '[Server] Preparing start region for dimension minecraft:overworld',
      '[Server] Time elapsed: 5432 ms',
      '[Server] Done! For help, type "help"'
    ];

    startLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
        if (index === startLogs.length - 1) {
          const onlineServer = { ...server, status: 'online' as const, uptime: 0 };
          setServer(onlineServer);
          localStorage.setItem('selected_server', JSON.stringify(onlineServer));
          toast.success('Сервер успешно запущен!');
        }
      }, index * 500);
    });
  };

  const handleStart = () => {
    if (!server) return;
    const startingServer = { ...server, status: 'starting' as const };
    setServer(startingServer);
    localStorage.setItem('selected_server', JSON.stringify(startingServer));
    setStartingProgress(0);
    setLogs([`[${new Date().toLocaleTimeString()}] [Server] Initializing server...`]);
    toast.info('Запуск сервера...');
  };

  const handleStop = () => {
    if (!server) return;
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [Server] Stopping server...`]);
    setTimeout(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [Server] Server stopped`]);
      const offlineServer = { ...server, status: 'offline' as const, cpu: 0, ram: 0, uptime: 0 };
      setServer(offlineServer);
      localStorage.setItem('selected_server', JSON.stringify(offlineServer));
      toast.success('Сервер остановлен');
    }, 1000);
  };

  const handleRestart = () => {
    if (!server) return;
    handleStop();
    setTimeout(() => handleStart(), 2000);
    toast.info('Перезапуск сервера...');
  };

  const handleCommand = () => {
    if (!command.trim() || server?.status !== 'online') return;
    
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] > ${command}`]);

    if (command.startsWith('op ')) {
      const player = command.substring(3);
      setLogs(prev => [...prev, `[${timestamp}] [Server] Made ${player} a server operator`]);
    } else if (command === 'stop') {
      handleStop();
    } else if (command === 'restart') {
      handleRestart();
    } else {
      setLogs(prev => [...prev, `[${timestamp}] [Server] Command executed: ${command}`]);
    }
    
    setCommand('');
  };

  if (!server) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Выберите сервер для управления</p>
      </div>
    );
  }

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{server.name}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>IP: {server.ip}:{server.port}</span>
              <span>•</span>
              <span>Версия: {server.version}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleStart} 
              disabled={server.status !== 'offline'}
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Play" className="w-4 h-4 mr-2" />
              Start
            </Button>
            <Button 
              onClick={handleRestart}
              disabled={server.status !== 'online'}
              variant="secondary"
            >
              <Icon name="RotateCw" className="w-4 h-4 mr-2" />
              Restart
            </Button>
            <Button 
              onClick={handleStop}
              disabled={server.status === 'offline'}
              variant="destructive"
            >
              <Icon name="Square" className="w-4 h-4 mr-2" />
              Stop
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Статус</span>
              <Icon name="Activity" className="w-4 h-4 text-primary" />
            </div>
            <Badge 
              variant={server.status === 'online' ? 'default' : 'secondary'}
              className={server.status === 'online' ? 'bg-primary' : ''}
            >
              {server.status === 'online' ? 'Online' : server.status === 'starting' ? 'Starting' : 'Offline'}
            </Badge>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">CPU</span>
              <Icon name="Cpu" className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{server.cpu}%</div>
            <Progress value={server.cpu} className="h-1 mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">RAM</span>
              <Icon name="HardDrive" className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{server.ram} MB</div>
            <Progress value={(server.ram / server.maxRam) * 100} className="h-1 mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <Icon name="Clock" className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{formatUptime(server.uptime)}</div>
          </Card>
        </div>
      </div>

      {server.status === 'starting' && (
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <Icon name="Loader2" className="w-6 h-6 text-primary animate-spin" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Запуск сервера...</span>
                <span className="text-sm text-muted-foreground">{startingProgress}%</span>
              </div>
              <Progress value={startingProgress} className="h-2" />
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Terminal" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Консоль сервера</h2>
        </div>

        <div className="bg-background rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm mb-4">
          {logs.length === 0 ? (
            <div className="text-muted-foreground">Логи появятся после запуска сервера...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-foreground/80 mb-1">{log}</div>
            ))
          )}
          <div ref={logsEndRef} />
        </div>

        <div className="flex gap-2">
          <Input 
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
            placeholder={server.status === 'online' ? 'Введите команду (op, stop, restart)' : 'Сервер не запущен'}
            disabled={server.status !== 'online'}
            className="font-mono"
          />
          <Button 
            onClick={handleCommand}
            disabled={server.status !== 'online' || !command.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Icon name="Send" className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ServerConsole;
