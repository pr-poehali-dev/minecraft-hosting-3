import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const Billing = () => {
  const [balance, setBalance] = useState(500);
  const [amount, setAmount] = useState('');

  const handleTopUp = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      toast.error('Введите корректную сумму');
      return;
    }
    
    setBalance(prev => prev + value);
    toast.success(`Баланс пополнен на ${value} ₽`);
    setAmount('');
  };

  const transactions = [
    { id: 1, date: '2024-12-07 14:30', type: 'Пополнение', amount: 1000, method: 'СБП' },
    { id: 2, date: '2024-12-05 10:20', type: 'Списание', amount: -350, method: 'Тариф Premium' },
    { id: 3, date: '2024-12-01 09:15', type: 'Пополнение', amount: 500, method: 'Банковская карта' },
    { id: 4, date: '2024-11-28 16:45', type: 'Списание', amount: -250, method: 'Тариф Standard' },
  ];

  const tariffs = [
    { 
      name: 'Starter', 
      price: 199, 
      ram: '2 GB', 
      cpu: '2 ядра', 
      disk: '10 GB SSD',
      players: 10,
      recommended: false
    },
    { 
      name: 'Standard', 
      price: 399, 
      ram: '4 GB', 
      cpu: '4 ядра', 
      disk: '25 GB SSD',
      players: 50,
      recommended: true
    },
    { 
      name: 'Premium', 
      price: 799, 
      ram: '8 GB', 
      cpu: '8 ядер', 
      disk: '50 GB SSD',
      players: 100,
      recommended: false
    },
    { 
      name: 'Ultimate', 
      price: 1499, 
      ram: '16 GB', 
      cpu: '16 ядер', 
      disk: '100 GB SSD',
      players: 200,
      recommended: false
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Биллинг</h1>
        <p className="text-muted-foreground">Управление балансом и подписками</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="p-6 col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Текущий баланс</div>
              <div className="text-4xl font-bold text-primary">{balance} ₽</div>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Wallet" className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="flex gap-3">
            <Input 
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTopUp} className="bg-primary hover:bg-primary/90">
              <Icon name="Plus" className="w-4 h-4 mr-2" />
              Пополнить
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground mb-4">Способы пополнения:</div>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="justify-start">
                <Icon name="Smartphone" className="w-4 h-4 mr-2" />
                СБП
              </Button>
              <Button variant="outline" className="justify-start">
                <Icon name="CreditCard" className="w-4 h-4 mr-2" />
                Карта
              </Button>
              <Button variant="outline" className="justify-start">
                <Icon name="Wallet" className="w-4 h-4 mr-2" />
                ЮMoney
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="TrendingUp" className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Статистика</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Расходы за месяц</div>
              <div className="text-2xl font-bold">1,200 ₽</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Активных серверов</div>
              <div className="text-2xl font-bold">1</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Следующее списание</div>
              <div className="text-2xl font-bold">15 дек</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Package" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Тарифы</h2>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {tariffs.map((tariff) => (
            <Card key={tariff.name} className={`p-6 relative ${tariff.recommended ? 'border-primary border-2' : ''}`}>
              {tariff.recommended && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Рекомендуем
                </Badge>
              )}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-2">{tariff.name}</h3>
                <div className="text-3xl font-bold text-primary mb-1">{tariff.price} ₽</div>
                <div className="text-sm text-muted-foreground">в месяц</div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" className="w-4 h-4 text-primary" />
                  <span>{tariff.ram} RAM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" className="w-4 h-4 text-primary" />
                  <span>{tariff.cpu}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" className="w-4 h-4 text-primary" />
                  <span>{tariff.disk}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" className="w-4 h-4 text-primary" />
                  <span>До {tariff.players} игроков</span>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Выбрать
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Receipt" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">История транзакций</h2>
        </div>

        <div className="bg-background rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm border-b border-border">
            <div className="col-span-3">Дата</div>
            <div className="col-span-3">Тип</div>
            <div className="col-span-3">Способ</div>
            <div className="col-span-3 text-right">Сумма</div>
          </div>

          <div className="divide-y divide-border">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className="col-span-3 text-sm">{transaction.date}</div>
                <div className="col-span-3">
                  <Badge variant={transaction.type === 'Пополнение' ? 'default' : 'secondary'}>
                    {transaction.type}
                  </Badge>
                </div>
                <div className="col-span-3 text-sm text-muted-foreground">{transaction.method}</div>
                <div className={`col-span-3 text-right font-bold ${transaction.amount > 0 ? 'text-primary' : 'text-foreground'}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount} ₽
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Billing;
