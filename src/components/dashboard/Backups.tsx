import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Server {
  id: string;
  name: string;
}

interface BackupsProps {
  server: Server | null;
}

interface Backup {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'auto' | 'manual';
}

const Backups = ({ server }: BackupsProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [backups, setBackups] = useState<Backup[]>([
    { id: '1', name: 'Автобэкап 07.12.2024', date: '2024-12-07 14:30', size: '245 MB', type: 'auto' },
    { id: '2', name: 'Автобэкап 07.12.2024', date: '2024-12-07 08:30', size: '243 MB', type: 'auto' },
    { id: '3', name: 'Перед обновлением', date: '2024-12-06 16:45', size: '240 MB', type: 'manual' },
    { id: '4', name: 'Автобэкап 06.12.2024', date: '2024-12-06 14:30', size: '238 MB', type: 'auto' },
  ]);

  const handleCreateBackup = () => {
    setIsCreating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const newBackup: Backup = {
            id: Date.now().toString(),
            name: 'Ручной бэкап ' + new Date().toLocaleDateString(),
            date: new Date().toLocaleString(),
            size: '246 MB',
            type: 'manual'
          };
          setBackups([newBackup, ...backups]);
          setIsCreating(false);
          toast.success('Бэкап успешно создан!');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleRestore = (backup: Backup) => {
    toast.info(`Восстановление бэкапа "${backup.name}"...`);
    setTimeout(() => {
      toast.success('Бэкап успешно восстановлен!');
    }, 2000);
  };

  const handleDownload = (backup: Backup) => {
    toast.success(`Скачивание бэкапа "${backup.name}"...`);
  };

  const handleDelete = (backupId: string) => {
    setBackups(backups.filter(b => b.id !== backupId));
    toast.success('Бэкап удалён');
  };

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
        <h1 className="text-3xl font-bold mb-2">Бэкапы</h1>
        <p className="text-muted-foreground">Резервные копии сервера {server.name}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Всего бэкапов</span>
            <Icon name="Database" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">{backups.length}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Занято места</span>
            <Icon name="HardDrive" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">966 MB</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Последний бэкап</span>
            <Icon name="Clock" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">6ч назад</div>
        </Card>
      </div>

      {isCreating && (
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <Icon name="Loader2" className="w-6 h-6 text-primary animate-spin" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Создание бэкапа...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Icon name="Database" className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Создать бэкап</h2>
          </div>
          <Button 
            onClick={handleCreateBackup}
            disabled={isCreating}
            className="bg-primary hover:bg-primary/90"
          >
            <Icon name="Plus" className="w-4 h-4 mr-2" />
            Создать бэкап сейчас
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Clock" className="w-4 h-4 text-primary" />
              <span className="font-medium">Автоматические</span>
            </div>
            <div className="text-sm text-muted-foreground">Каждые 6 часов</div>
          </div>

          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Calendar" className="w-4 h-4 text-primary" />
              <span className="font-medium">Хранение</span>
            </div>
            <div className="text-sm text-muted-foreground">14 дней</div>
          </div>

          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Shield" className="w-4 h-4 text-primary" />
              <span className="font-medium">Защита</span>
            </div>
            <div className="text-sm text-muted-foreground">Зашифрованы</div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Archive" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Доступные бэкапы</h2>
        </div>

        <div className="bg-background rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm border-b border-border">
            <div className="col-span-4">Название</div>
            <div className="col-span-2">Тип</div>
            <div className="col-span-2">Дата создания</div>
            <div className="col-span-2">Размер</div>
            <div className="col-span-2 text-right">Действия</div>
          </div>

          <div className="divide-y divide-border">
            {backups.map((backup) => (
              <div key={backup.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className="col-span-4 flex items-center gap-3">
                  <Icon name="Archive" className="w-5 h-5 text-primary" />
                  <span className="font-medium">{backup.name}</span>
                </div>
                <div className="col-span-2">
                  <Badge variant={backup.type === 'auto' ? 'secondary' : 'default'} className={backup.type === 'manual' ? 'bg-primary' : ''}>
                    {backup.type === 'auto' ? 'Авто' : 'Ручной'}
                  </Badge>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">{backup.date}</div>
                <div className="col-span-2 text-sm text-muted-foreground">{backup.size}</div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleRestore(backup)}
                  >
                    <Icon name="RotateCcw" className="w-4 h-4 mr-1" />
                    Восстановить
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleDownload(backup)}
                  >
                    <Icon name="Download" className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleDelete(backup.id)}
                  >
                    <Icon name="Trash2" className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Backups;
