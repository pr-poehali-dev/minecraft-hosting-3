import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('user@example.com');
  const [apiKey, setApiKey] = useState('sk_live_1234567890abcdef');

  useEffect(() => {
    const auth = localStorage.getItem('minecraft_auth');
    if (auth) {
      const data = JSON.parse(auth);
      setUsername(data.username);
    }
  }, []);

  const handleSave = () => {
    const auth = JSON.parse(localStorage.getItem('minecraft_auth') || '{}');
    auth.username = username;
    localStorage.setItem('minecraft_auth', JSON.stringify(auth));
    toast.success('Профиль обновлён');
  };

  const handleLogout = () => {
    localStorage.removeItem('minecraft_auth');
    localStorage.removeItem('selected_server');
    toast.success('Вы вышли из аккаунта');
    navigate('/');
  };

  const handleGenerateApiKey = () => {
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast.success('Новый API ключ сгенерирован');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Скопировано в буфер обмена');
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Профиль</h1>
        <p className="text-muted-foreground">Управление аккаунтом и настройками</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="User" className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Основная информация</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Никнейм</label>
              <Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Icon name="Save" className="w-4 h-4 mr-2" />
              Сохранить изменения
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Key" className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">API ключ</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ваш API ключ</label>
                <div className="flex gap-2">
                  <Input 
                    type="password"
                    value={apiKey}
                    readOnly
                    className="font-mono"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => handleCopy(apiKey)}
                  >
                    <Icon name="Copy" className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button 
                variant="outline"
                onClick={handleGenerateApiKey}
              >
                <Icon name="RefreshCw" className="w-4 h-4 mr-2" />
                Сгенерировать новый ключ
              </Button>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  API ключ используется для программного доступа к серверам через REST API.
                  Храните его в безопасности и не передавайте третьим лицам.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Settings" className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">SFTP настройки</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">SFTP хост</label>
                  <div className="flex gap-2">
                    <Input value="sftp.minecrafthost.com" readOnly />
                    <Button 
                      variant="outline"
                      onClick={() => handleCopy('sftp.minecrafthost.com')}
                    >
                      <Icon name="Copy" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">SFTP порт</label>
                  <div className="flex gap-2">
                    <Input value="2022" readOnly />
                    <Button 
                      variant="outline"
                      onClick={() => handleCopy('2022')}
                    >
                      <Icon name="Copy" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="font-bold text-lg">{username}</div>
                <div className="text-sm text-muted-foreground">{email}</div>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLogout}
            >
              <Icon name="LogOut" className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="BarChart3" className="w-5 h-5 text-primary" />
              <h3 className="font-bold">Статистика аккаунта</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Серверов</div>
                <div className="text-2xl font-bold">1</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Дней в сервисе</div>
                <div className="text-2xl font-bold">45</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Активных тикетов</div>
                <div className="text-2xl font-bold">1</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Shield" className="w-5 h-5 text-primary" />
              <h3 className="font-bold">Безопасность</h3>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Lock" className="w-4 h-4 mr-2" />
                Изменить пароль
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Shield" className="w-4 h-4 mr-2" />
                Двухфакторная аутентификация
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
