import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface Server {
  id: string;
  name: string;
}

interface CoOwnersProps {
  server: Server | null;
}

interface CoOwner {
  id: string;
  username: string;
  email: string;
  permissions: {
    console: boolean;
    files: boolean;
    backups: boolean;
    settings: boolean;
  };
  addedDate: string;
}

const CoOwners = ({ server }: CoOwnersProps) => {
  const [newUsername, setNewUsername] = useState('');
  const [coOwners, setCoOwners] = useState<CoOwner[]>([
    {
      id: '1',
      username: 'player123',
      email: 'player123@example.com',
      permissions: {
        console: true,
        files: true,
        backups: false,
        settings: false,
      },
      addedDate: '2024-12-05 10:30'
    }
  ]);

  const handleAddCoOwner = () => {
    if (!newUsername.trim()) {
      toast.error('Введите никнейм');
      return;
    }

    const newCoOwner: CoOwner = {
      id: Date.now().toString(),
      username: newUsername,
      email: `${newUsername}@example.com`,
      permissions: {
        console: false,
        files: false,
        backups: false,
        settings: false,
      },
      addedDate: new Date().toLocaleString()
    };

    setCoOwners([...coOwners, newCoOwner]);
    setNewUsername('');
    toast.success(`${newUsername} добавлен как совладелец`);
  };

  const handleRemoveCoOwner = (id: string) => {
    setCoOwners(coOwners.filter(co => co.id !== id));
    toast.success('Совладелец удалён');
  };

  const handlePermissionChange = (id: string, permission: keyof CoOwner['permissions']) => {
    setCoOwners(coOwners.map(co => {
      if (co.id === id) {
        return {
          ...co,
          permissions: {
            ...co.permissions,
            [permission]: !co.permissions[permission]
          }
        };
      }
      return co;
    }));
    toast.success('Права доступа обновлены');
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
        <h1 className="text-3xl font-bold mb-2">Совладельцы</h1>
        <p className="text-muted-foreground">Управление доступом к серверу {server.name}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Всего совладельцев</span>
            <Icon name="Users" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">{coOwners.length}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">С полным доступом</span>
            <Icon name="Shield" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">
            {coOwners.filter(co => Object.values(co.permissions).every(p => p)).length}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Максимум слотов</span>
            <Icon name="UserPlus" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">5</div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="UserPlus" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Добавить совладельца</h2>
        </div>

        <div className="flex gap-3">
          <Input 
            placeholder="Введите никнейм игрока"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCoOwner()}
            className="flex-1"
          />
          <Button onClick={handleAddCoOwner} className="bg-primary hover:bg-primary/90">
            <Icon name="Plus" className="w-4 h-4 mr-2" />
            Добавить
          </Button>
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">
            Совладельцы получат доступ к управлению сервером согласно выданным правам. 
            Вы можете настроить права доступа для каждого совладельца индивидуально.
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Users" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Список совладельцев</h2>
        </div>

        {coOwners.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Users" className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Нет совладельцев</p>
            <p className="text-sm text-muted-foreground">Добавьте совладельцев для совместного управления сервером</p>
          </div>
        ) : (
          <div className="space-y-4">
            {coOwners.map((coOwner) => (
              <Card key={coOwner.id} className="p-6 bg-background">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{coOwner.username}</div>
                      <div className="text-sm text-muted-foreground">{coOwner.email}</div>
                      <div className="text-xs text-muted-foreground mt-1">Добавлен: {coOwner.addedDate}</div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveCoOwner(coOwner.id)}
                  >
                    <Icon name="Trash2" className="w-4 h-4 text-destructive" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="Terminal" className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Консоль</span>
                    </div>
                    <Switch 
                      checked={coOwner.permissions.console}
                      onCheckedChange={() => handlePermissionChange(coOwner.id, 'console')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="FolderOpen" className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Файлы</span>
                    </div>
                    <Switch 
                      checked={coOwner.permissions.files}
                      onCheckedChange={() => handlePermissionChange(coOwner.id, 'files')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="Database" className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Бэкапы</span>
                    </div>
                    <Switch 
                      checked={coOwner.permissions.backups}
                      onCheckedChange={() => handlePermissionChange(coOwner.id, 'backups')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="Settings" className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Настройки</span>
                    </div>
                    <Switch 
                      checked={coOwner.permissions.settings}
                      onCheckedChange={() => handlePermissionChange(coOwner.id, 'settings')}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CoOwners;
