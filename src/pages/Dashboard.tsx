import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import ServerConsole from '@/components/dashboard/ServerConsole';
import FileManager from '@/components/dashboard/FileManager';
import Analytics from '@/components/dashboard/Analytics';
import Billing from '@/components/dashboard/Billing';
import Support from '@/components/dashboard/Support';
import Profile from '@/components/dashboard/Profile';
import ServerList from '@/components/dashboard/ServerList';
import Backups from '@/components/dashboard/Backups';
import CoOwners from '@/components/dashboard/CoOwners';
import Versions from '@/components/dashboard/Versions';

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

const Dashboard = () => {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  useEffect(() => {
    const savedServer = localStorage.getItem('selected_server');
    if (savedServer) {
      setSelectedServer(JSON.parse(savedServer));
    } else {
      const defaultServer: Server = {
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
      };
      setSelectedServer(defaultServer);
      localStorage.setItem('selected_server', JSON.stringify(defaultServer));
    }
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar selectedServer={selectedServer} />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/servers" replace />} />
          <Route path="/servers" element={<ServerList setSelectedServer={setSelectedServer} />} />
          <Route path="/console" element={<ServerConsole server={selectedServer} setServer={setSelectedServer} />} />
          <Route path="/files" element={<FileManager server={selectedServer} />} />
          <Route path="/analytics" element={<Analytics server={selectedServer} />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/backups" element={<Backups server={selectedServer} />} />
          <Route path="/co-owners" element={<CoOwners server={selectedServer} />} />
          <Route path="/versions" element={<Versions server={selectedServer} setServer={setSelectedServer} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
