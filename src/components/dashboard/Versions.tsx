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
  version: string;
}

interface VersionsProps {
  server: Server | null;
  setServer: (server: any) => void;
}

interface Core {
  name: string;
  description: string;
  versions: string[];
  recommended: boolean;
}

const Versions = ({ server, setServer }: VersionsProps) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCore, setSelectedCore] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const cores: Core[] = [
    {
      name: 'Purpur',
      description: 'Форк Paper с дополнительными возможностями',
      versions: ['1.16.5', '1.15.2', '1.14.4', '1.13.2', '1.12.2'],
      recommended: true
    },
    {
      name: 'Paper',
      description: 'Высокопроизводительное ядро с оптимизациями',
      versions: ['1.16.5', '1.15.2', '1.14.4', '1.13.2', '1.12.2'],
      recommended: false
    },
    {
      name: 'Spigot',
      description: 'Стандартное ядро с поддержкой плагинов',
      versions: ['1.16.5', '1.15.2', '1.14.4', '1.13.2', '1.12.2'],
      recommended: false
    },
    {
      name: 'Vanilla',
      description: 'Оригинальное ядро от Mojang',
      versions: ['1.16.5', '1.15.2', '1.14.4', '1.13.2', '1.12.2'],
      recommended: false
    },
  ];

  const handleInstall = (core: string, version: string) => {
    setSelectedCore(core);
    setSelectedVersion(version);
    setIsInstalling(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          if (server) {
            const updatedServer = { ...server, version };
            setServer(updatedServer);
            localStorage.setItem('selected_server', JSON.stringify(updatedServer));
          }
          
          setIsInstalling(false);
          toast.success(`${core} ${version} успешно установлен!`);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
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
        <h1 className="text-3xl font-bold mb-2">Версии и ядра</h1>
        <p className="text-muted-foreground">Установка ядер для сервера {server.name}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Текущая версия</span>
            <Icon name="Package" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">{server.version}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Доступно версий</span>
            <Icon name="Download" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">20+</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Типов ядер</span>
            <Icon name="Boxes" className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">4</div>
        </Card>
      </div>

      {isInstalling && (
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <Icon name="Loader2" className="w-6 h-6 text-primary animate-spin" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Установка {selectedCore} {selectedVersion}...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-6">
        {cores.map((core) => (
          <Card key={core.name} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold">{core.name}</h3>
                    {core.recommended && (
                      <Badge className="bg-primary">Рекомендуем</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{core.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {core.versions.map((version) => (
                <Card key={version} className="p-4 bg-background hover:bg-muted/50 transition-all">
                  <div className="text-center mb-3">
                    <div className="text-lg font-bold mb-1">{version}</div>
                    {version === server.version && (
                      <Badge variant="outline" className="text-xs">Установлено</Badge>
                    )}
                  </div>
                  <Button 
                    onClick={() => handleInstall(core.name, version)}
                    disabled={isInstalling || version === server.version}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    {version === server.version ? (
                      <>
                        <Icon name="Check" className="w-4 h-4 mr-1" />
                        Установлено
                      </>
                    ) : (
                      <>
                        <Icon name="Download" className="w-4 h-4 mr-1" />
                        Установить
                      </>
                    )}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Info" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Информация о ядрах</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="font-medium mb-2">Purpur</div>
            <div className="text-sm text-muted-foreground">
              Форк Paper с множеством дополнительных настроек и оптимизаций. 
              Идеален для серверов с большим количеством игроков и модификациями.
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="font-medium mb-2">Paper</div>
            <div className="text-sm text-muted-foreground">
              Высокопроизводительное ядро с оптимизациями производительности. 
              Совместимо с Spigot плагинами и рекомендуется для большинства серверов.
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="font-medium mb-2">Spigot</div>
            <div className="text-sm text-muted-foreground">
              Стандартное модифицированное ядро с поддержкой плагинов. 
              Подходит для серверов малого и среднего размера.
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="font-medium mb-2">Vanilla</div>
            <div className="text-sm text-muted-foreground">
              Оригинальное ядро Minecraft без модификаций. 
              Используйте для чистого ванильного опыта без плагинов.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Versions;
