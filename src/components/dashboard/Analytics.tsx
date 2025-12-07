import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Server {
  id: string;
  name: string;
}

interface AnalyticsProps {
  server: Server | null;
}

const Analytics = ({ server }: AnalyticsProps) => {
  const cpuData = [
    { time: '00:00', value: 15 },
    { time: '04:00', value: 12 },
    { time: '08:00', value: 25 },
    { time: '12:00', value: 35 },
    { time: '16:00', value: 45 },
    { time: '20:00', value: 38 },
    { time: '23:59', value: 20 },
  ];

  const ramData = [
    { time: '00:00', value: 1200 },
    { time: '04:00', value: 1100 },
    { time: '08:00', value: 1800 },
    { time: '12:00', value: 2400 },
    { time: '16:00', value: 2800 },
    { time: '20:00', value: 2200 },
    { time: '23:59', value: 1500 },
  ];

  const playersData = [
    { time: '00:00', value: 2 },
    { time: '04:00', value: 1 },
    { time: '08:00', value: 5 },
    { time: '12:00', value: 12 },
    { time: '16:00', value: 18 },
    { time: '20:00', value: 15 },
    { time: '23:59', value: 8 },
  ];

  const trafficData = [
    { time: '00:00', in: 120, out: 80 },
    { time: '04:00', in: 90, out: 60 },
    { time: '08:00', in: 180, out: 140 },
    { time: '12:00', in: 250, out: 200 },
    { time: '16:00', in: 320, out: 280 },
    { time: '20:00', in: 280, out: 240 },
    { time: '23:59', in: 150, out: 110 },
  ];

  if (!server) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Выберите сервер</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Аналитика</h1>
        <p className="text-muted-foreground">Мониторинг ресурсов и статистика {server.name}</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Среднее CPU</span>
            <Icon name="Cpu" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">28%</div>
          <div className="text-xs text-primary">+5% с прошлой недели</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Среднее RAM</span>
            <Icon name="HardDrive" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">1.8 GB</div>
          <div className="text-xs text-primary">+200 MB с прошлой недели</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Пиковый онлайн</span>
            <Icon name="Users" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">18</div>
          <div className="text-xs text-primary">+3 игрока</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Uptime</span>
            <Icon name="Clock" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">99.8%</div>
          <div className="text-xs text-primary">За последние 30 дней</div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Cpu" className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Нагрузка CPU</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cpuData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))' 
                }} 
              />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="HardDrive" className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Использование RAM</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ramData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))' 
                }} 
              />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Users" className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Онлайн игроков</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={playersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))' 
                }} 
              />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Activity" className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Сетевой трафик</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))' 
                }} 
              />
              <Line type="monotone" dataKey="in" stroke="hsl(var(--primary))" strokeWidth={2} name="Входящий" />
              <Line type="monotone" dataKey="out" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Исходящий" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
