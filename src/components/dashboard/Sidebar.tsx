import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Server {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'starting';
}

interface SidebarProps {
  selectedServer: Server | null;
}

const Sidebar = ({ selectedServer }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === `/dashboard${path}`;

  const menuItems = [
    { path: '/servers', icon: 'Server', label: 'Серверы' },
    { path: '/console', icon: 'Terminal', label: 'Консоль' },
    { path: '/files', icon: 'FolderOpen', label: 'Файлы' },
    { path: '/analytics', icon: 'BarChart3', label: 'Аналитика' },
    { path: '/billing', icon: 'CreditCard', label: 'Биллинг' },
    { path: '/backups', icon: 'Database', label: 'Бэкапы' },
    { path: '/versions', icon: 'Package', label: 'Версии' },
    { path: '/co-owners', icon: 'Users', label: 'Сов. владельцы' },
    { path: '/support', icon: 'MessageSquare', label: 'Поддержка' },
    { path: '/profile', icon: 'User', label: 'Профиль' },
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Boxes" className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            MinecraftHost
          </span>
        </div>
        
        {selectedServer && (
          <div className="bg-background/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium truncate">{selectedServer.name}</span>
              <Badge 
                variant={selectedServer.status === 'online' ? 'default' : 'secondary'}
                className={selectedServer.status === 'online' ? 'bg-primary' : ''}
              >
                {selectedServer.status === 'online' ? 'Online' : selectedServer.status === 'starting' ? 'Starting' : 'Offline'}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">ID: {selectedServer.id}</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={isActive(item.path) ? 'secondary' : 'ghost'}
            className={`w-full justify-start mb-1 ${
              isActive(item.path) ? 'bg-primary text-white hover:bg-primary/90' : ''
            }`}
            onClick={() => navigate(`/dashboard${item.path}`)}
          >
            <Icon name={item.icon as any} className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
