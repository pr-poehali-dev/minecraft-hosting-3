import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const plans = [
    {
      name: 'Стартовый',
      price: '299₽',
      players: '10 игроков',
      ram: '2 GB RAM',
      storage: '10 GB SSD',
      features: ['DDoS защита', 'Автобэкап', 'Поддержка 24/7'],
      popular: false
    },
    {
      name: 'Продвинутый',
      price: '599₽',
      players: '50 игроков',
      ram: '4 GB RAM',
      storage: '25 GB SSD',
      features: ['DDoS защита', 'Автобэкап', 'Поддержка 24/7', 'Мгновенная установка модов'],
      popular: true
    },
    {
      name: 'Премиум',
      price: '999₽',
      players: '100+ игроков',
      ram: '8 GB RAM',
      storage: '50 GB SSD',
      features: ['DDoS защита', 'Автобэкап', 'Поддержка 24/7', 'Мгновенная установка модов', 'Приоритет в поддержке'],
      popular: false
    }
  ];

  const plugins = [
    { name: 'EssentialsX', category: 'Утилиты', downloads: '50M+', icon: '🔧' },
    { name: 'WorldEdit', category: 'Строительство', downloads: '30M+', icon: '🏗️' },
    { name: 'Vault', category: 'Экономика', downloads: '40M+', icon: '💰' },
    { name: 'LuckPerms', category: 'Права', downloads: '25M+', icon: '🔐' },
    { name: 'ProtocolLib', category: 'API', downloads: '35M+', icon: '⚙️' },
    { name: 'Citizens', category: 'NPC', downloads: '20M+', icon: '🧑' }
  ];

  const servers = [
    { name: 'Сервер #1', status: 'online', players: '45/100', uptime: '99.9%', version: '1.20.1' },
    { name: 'Сервер #2', status: 'online', players: '12/50', uptime: '100%', version: '1.19.4' },
    { name: 'Тестовый', status: 'offline', players: '0/10', uptime: '98.5%', version: '1.20.2' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-minecraft-dark via-slate-900 to-minecraft-purple">
      <nav className="fixed top-0 w-full bg-minecraft-dark/95 backdrop-blur-md z-50 border-b border-minecraft-green/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-minecraft-green rounded-lg flex items-center justify-center text-2xl animate-glow">
                🎮
              </div>
              <span className="text-2xl font-heading font-bold text-white">MineCraft<span className="text-minecraft-green">Host</span></span>
            </div>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Серверы', 'Тарифы', 'Плагины', 'Панель', 'Сообщество'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-minecraft-green ${
                    activeSection === item.toLowerCase() ? 'text-minecraft-green' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button className="bg-minecraft-green hover:bg-minecraft-green/90 text-white">
              Войти
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-minecraft-green/20 text-minecraft-green border-minecraft-green">
              🚀 Новинка: Поддержка версии 1.20.4
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              Хостинг серверов<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-minecraft-green to-minecraft-purple">
                Minecraft
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Создай свой сервер за 60 секунд. Мощные сервера, моментальная установка плагинов и модов, DDoS защита
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-minecraft-green hover:bg-minecraft-green/90 text-white text-lg px-8">
                <Icon name="Rocket" className="mr-2" size={20} />
                Создать сервер
              </Button>
              <Button size="lg" variant="outline" className="border-minecraft-green text-minecraft-green hover:bg-minecraft-green/10 text-lg px-8">
                <Icon name="Play" className="mr-2" size={20} />
                Смотреть демо
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { icon: 'Zap', label: 'Мгновенный запуск', value: '< 60 сек' },
              { icon: 'Users', label: 'Активных игроков', value: '50K+' },
              { icon: 'Server', label: 'Серверов онлайн', value: '2.5K+' },
              { icon: 'Shield', label: 'Uptime', value: '99.9%' }
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 border-minecraft-green/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardContent className="pt-6 text-center">
                  <Icon name={stat.icon as any} className="mx-auto mb-3 text-minecraft-green" size={32} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">Тарифные планы</h2>
            <p className="text-gray-400">Выбери идеальный план для своего сервера</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <Card
                key={i}
                className={`relative bg-white/5 border-minecraft-green/20 backdrop-blur-sm hover:scale-105 transition-transform ${
                  plan.popular ? 'ring-2 ring-minecraft-green' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-minecraft-green text-white">Популярный</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    <span className="text-4xl font-bold text-minecraft-green">{plan.price}</span>
                    <span className="text-lg">/месяц</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Icon name="Users" size={18} className="text-minecraft-green" />
                      {plan.players}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Icon name="Cpu" size={18} className="text-minecraft-green" />
                      {plan.ram}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Icon name="HardDrive" size={18} className="text-minecraft-green" />
                      {plan.storage}
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-400">
                        <Icon name="Check" size={16} className="text-minecraft-green" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-minecraft-green hover:bg-minecraft-green/90 text-white">
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">Плагины и моды</h2>
            <p className="text-gray-400">Установка в один клик</p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Поиск плагинов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white/5 border-minecraft-green/20 text-white placeholder:text-gray-500 h-12"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="max-w-4xl mx-auto">
            <TabsList className="bg-white/5 border border-minecraft-green/20 mb-8">
              <TabsTrigger value="all" className="data-[state=active]:bg-minecraft-green data-[state=active]:text-white">
                Все
              </TabsTrigger>
              <TabsTrigger value="popular" className="data-[state=active]:bg-minecraft-green data-[state=active]:text-white">
                Популярные
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:bg-minecraft-green data-[state=active]:text-white">
                Новые
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 gap-4">
                {plugins.map((plugin, i) => (
                  <Card key={i} className="bg-white/5 border-minecraft-green/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{plugin.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg mb-1">{plugin.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                            <Badge variant="outline" className="border-minecraft-green/40 text-minecraft-green">
                              {plugin.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Icon name="Download" size={14} />
                              {plugin.downloads}
                            </span>
                          </div>
                          <Button size="sm" className="bg-minecraft-green/20 hover:bg-minecraft-green text-minecraft-green hover:text-white border border-minecraft-green/40">
                            Установить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="popular">
              <div className="text-center text-gray-400 py-8">Популярные плагины загружаются...</div>
            </TabsContent>
            <TabsContent value="new">
              <div className="text-center text-gray-400 py-8">Новые плагины загружаются...</div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">Панель управления</h2>
            <p className="text-gray-400">Управляй серверами из одного места</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-white/5 border-minecraft-green/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Мои серверы</CardTitle>
                  <Button className="bg-minecraft-green hover:bg-minecraft-green/90 text-white">
                    <Icon name="Plus" className="mr-2" size={18} />
                    Новый сервер
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {servers.map((server, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-minecraft-green/10 hover:border-minecraft-green/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${server.status === 'online' ? 'bg-minecraft-green animate-glow' : 'bg-red-500'}`} />
                        <div>
                          <h3 className="text-white font-semibold">{server.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Icon name="Users" size={14} />
                              {server.players}
                            </span>
                            <span>Uptime: {server.uptime}</span>
                            <Badge variant="outline" className="border-minecraft-green/40 text-minecraft-green text-xs">
                              {server.version}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-minecraft-green/40 text-minecraft-green hover:bg-minecraft-green/10">
                          <Icon name="Settings" size={16} />
                        </Button>
                        <Button size="sm" variant="outline" className="border-minecraft-green/40 text-minecraft-green hover:bg-minecraft-green/10">
                          <Icon name="BarChart" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          className={server.status === 'online' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-minecraft-green/20 text-minecraft-green hover:bg-minecraft-green/30'}
                        >
                          {server.status === 'online' ? 'Остановить' : 'Запустить'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { icon: 'Activity', label: 'CPU Usage', value: '45%', color: 'text-minecraft-green' },
                { icon: 'HardDrive', label: 'RAM Usage', value: '2.1/4 GB', color: 'text-minecraft-purple' },
                { icon: 'Wifi', label: 'Network', value: '125 Mbps', color: 'text-minecraft-gold' }
              ].map((metric, i) => (
                <Card key={i} className="bg-white/5 border-minecraft-green/20 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name={metric.icon as any} className={metric.color} size={24} />
                      <span className="text-gray-400 text-sm">{metric.label}</span>
                    </div>
                    <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-white mb-6">
              Готов создать свой сервер?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Присоединяйся к тысячам игроков, которые уже запустили свои сервера
            </p>
            <Button size="lg" className="bg-minecraft-green hover:bg-minecraft-green/90 text-white text-lg px-12 animate-glow">
              <Icon name="Rocket" className="mr-2" size={20} />
              Начать сейчас
            </Button>
          </div>

          <div className="mt-16 pt-16 border-t border-minecraft-green/20">
            <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
              <a href="#" className="hover:text-minecraft-green transition-colors">О нас</a>
              <a href="#" className="hover:text-minecraft-green transition-colors">Документация</a>
              <a href="#" className="hover:text-minecraft-green transition-colors">API</a>
              <a href="#" className="hover:text-minecraft-green transition-colors">Поддержка</a>
              <a href="#" className="hover:text-minecraft-green transition-colors">Сообщество</a>
            </div>
            <p className="text-gray-500 text-sm mt-8">© 2024 MineCraftHost. Все права защищены.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
