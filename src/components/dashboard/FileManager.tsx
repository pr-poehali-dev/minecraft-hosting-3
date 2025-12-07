import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface Server {
  id: string;
  name: string;
}

interface FileManagerProps {
  server: Server | null;
}

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  content?: string;
}

const FileManager = ({ server }: FileManagerProps) => {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const defaultFiles: FileItem[] = [
    { name: 'server.properties', type: 'file', size: '2.4 KB', modified: '2024-12-07 14:30', content: 'server-port=25565\nmax-players=20\nmotd=Welcome to my server!' },
    { name: 'plugins', type: 'folder', modified: '2024-12-07 12:00' },
    { name: 'world', type: 'folder', modified: '2024-12-06 18:45' },
    { name: 'logs', type: 'folder', modified: '2024-12-07 14:30' },
    { name: 'banned-players.json', type: 'file', size: '156 B', modified: '2024-12-05 10:20', content: '[]' },
    { name: 'ops.json', type: 'file', size: '89 B', modified: '2024-12-04 16:15', content: '[]' },
    { name: 'whitelist.json', type: 'file', size: '67 B', modified: '2024-12-03 09:30', content: '[]' },
  ];

  const [files, setFiles] = useState<FileItem[]>(defaultFiles);

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath(`${currentPath}${file.name}/`);
      toast.info(`Открыта папка: ${file.name}`);
    } else {
      setSelectedFile(file);
      setFileContent(file.content || '');
      setIsEditing(true);
    }
  };

  const handleSaveFile = () => {
    if (selectedFile) {
      const updatedFiles = files.map(f => 
        f.name === selectedFile.name ? { ...f, content: fileContent } : f
      );
      setFiles(updatedFiles);
      toast.success(`Файл ${selectedFile.name} сохранён`);
      setIsEditing(false);
    }
  };

  const handleDeleteFile = (fileName: string) => {
    setFiles(files.filter(f => f.name !== fileName));
    toast.success(`Файл ${fileName} удалён`);
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      toast.success('Файл загружен успешно');
    };
    input.click();
  };

  const handleDownload = (file: FileItem) => {
    toast.success(`Файл ${file.name} скачивается...`);
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold mb-2">Файловый менеджер</h1>
        <p className="text-muted-foreground">Управление файлами сервера {server.name}</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 flex-1">
            <Icon name="Folder" className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm">{currentPath}</span>
          </div>
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Поиск файлов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90">
              <Icon name="Upload" className="w-4 h-4 mr-2" />
              Загрузить
            </Button>
          </div>
        </div>

        <div className="bg-background rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm border-b border-border">
            <div className="col-span-6">Название</div>
            <div className="col-span-2">Размер</div>
            <div className="col-span-2">Изменён</div>
            <div className="col-span-2 text-right">Действия</div>
          </div>

          <div className="divide-y divide-border">
            {currentPath !== '/' && (
              <div 
                className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => setCurrentPath('/')}
              >
                <div className="col-span-6 flex items-center gap-3">
                  <Icon name="ArrowLeft" className="w-5 h-5 text-primary" />
                  <span className="font-medium">..</span>
                </div>
              </div>
            )}

            {filteredFiles.map((file) => (
              <div 
                key={file.name}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors group"
              >
                <div 
                  className="col-span-6 flex items-center gap-3 cursor-pointer"
                  onClick={() => handleFileClick(file)}
                >
                  <Icon 
                    name={file.type === 'folder' ? 'Folder' : 'FileText'} 
                    className="w-5 h-5 text-primary" 
                  />
                  <span className="font-medium">{file.name}</span>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">
                  {file.size || '-'}
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">
                  {file.modified}
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  {file.type === 'file' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDownload(file)}
                      >
                        <Icon name="Download" className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteFile(file.name)}
                      >
                        <Icon name="Trash2" className="w-4 h-4 text-destructive" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Settings" className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">SFTP доступ</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Хост</label>
            <Input value="sftp.minecrafthost.com" readOnly />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Порт</label>
            <Input value="2022" readOnly />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Логин</label>
            <Input value={server.id} readOnly />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Пароль</label>
            <div className="flex gap-2">
              <Input type="password" value="••••••••" readOnly />
              <Button variant="outline">
                <Icon name="Copy" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Редактирование файла</DialogTitle>
            <DialogDescription>{selectedFile?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea 
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="font-mono h-96"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Отмена
              </Button>
              <Button onClick={handleSaveFile} className="bg-primary hover:bg-primary/90">
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileManager;
