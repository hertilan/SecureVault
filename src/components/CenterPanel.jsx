import { useState } from 'react';
import { Clock, LayoutGrid, List, Folder, File } from 'lucide-react';

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function CenterPanel({ recentItems, onSelect, selectedId }) {
  const [view, setView] = useState('list');

  return (
    <main className="flex-1 overflow-y-auto bg-background px-6 py-6 flex flex-col">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary" />
            Recently Opened
          </h2>
          <p className="text-sm text-muted-fg mt-1">
            Your recently accessed files and folders
          </p>
        </div>

        {/* List / Grid toggle */}
        <div className="flex items-center gap-1 bg-surface p-1 rounded-lg">
          <button
            onClick={() => setView('list')}
            aria-label="List view"
            className={[
              'w-8 h-8 flex items-center justify-center rounded-md transition-colors',
              view === 'list'
                ? 'bg-muted text-foreground'
                : 'text-muted-fg hover:text-foreground',
            ].join(' ')}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('grid')}
            aria-label="Grid view"
            className={[
              'w-8 h-8 flex items-center justify-center rounded-md transition-colors',
              view === 'grid'
                ? 'bg-muted text-foreground'
                : 'text-muted-fg hover:text-foreground',
            ].join(' ')}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Empty state */}
      {recentItems.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Clock className="w-10 h-10 text-muted-fg opacity-40" />
          <p className="text-sm text-muted-fg text-center">
            No recent files yet.<br />
            Click a file or folder in the sidebar to get started.
          </p>
        </div>
      )}

      {/* List view */}
      {recentItems.length > 0 && view === 'list' && (
        <div className="flex flex-col gap-2">
          {recentItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={[
                'flex items-center gap-3 p-3 rounded-lg border text-left transition-all',
                selectedId === item.id
                  ? 'border-primary bg-surface'
                  : 'border-border bg-surface hover:border-primary/60',
              ].join(' ')}
            >
              {item.type === 'folder'
                ? <Folder className="w-5 h-5 text-primary shrink-0" />
                : <File className="w-5 h-5 text-muted-fg shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-fg capitalize">{item.type}</p>
              </div>
              <span className="text-xs text-muted-fg shrink-0 ml-4">
                {timeAgo(item.openedAt)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Grid view */}
      {recentItems.length > 0 && view === 'grid' && (
        <div className="grid grid-cols-2 gap-4">
          {recentItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={[
                'p-4 rounded-lg border text-left transition-all',
                selectedId === item.id
                  ? 'border-primary bg-surface'
                  : 'border-border bg-surface hover:border-primary/60',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                {item.type === 'folder'
                  ? <Folder className="w-8 h-8 text-primary shrink-0" />
                  : <File className="w-8 h-8 text-muted-fg shrink-0" />}
                <span className="text-xs text-muted-fg bg-background px-2 py-1 rounded capitalize">
                  {item.type}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground line-clamp-2 mb-3">
                {item.name}
              </p>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-fg">{timeAgo(item.openedAt)}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

export default CenterPanel;
