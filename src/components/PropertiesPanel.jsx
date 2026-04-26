import { File, Folder } from 'lucide-react';

function DetailRow({ label, value, mono = false }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-fg uppercase tracking-wide font-semibold">
        {label}
      </span>
      <span className={`text-sm font-semibold text-foreground break-all ${mono ? 'font-mono' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function PropertiesPanel({ selectedItem }) {
  if (!selectedItem) {
    return (
      <aside className="w-80 bg-surface border-l border-border flex flex-col items-center justify-center shrink-0">
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <File className="w-5 h-5 text-muted-fg" />
          </div>
          <p className="text-sm text-muted-fg">
            Select a file or folder to view its details
          </p>
        </div>
      </aside>
    );
  }

  const isFolder = selectedItem.type === 'folder';
  const itemCount = isFolder && selectedItem.children
    ? selectedItem.children.length
    : null;

  const created = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <aside className="w-80 bg-surface border-l border-border flex flex-col shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        {isFolder ? (
          <Folder className="w-8 h-8 text-primary shrink-0" />
        ) : (
          <File className="w-8 h-8 text-muted-fg shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-foreground truncate">
            {selectedItem.name}
          </h2>
          <p className="text-xs text-muted-fg mt-0.5 capitalize">
            {selectedItem.type}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
        <DetailRow label="Type" value={isFolder ? 'Folder' : 'Document'} />
        {itemCount !== null && (
          <DetailRow label="Items" value={`${itemCount} item${itemCount !== 1 ? 's' : ''}`} />
        )}
        {selectedItem.size && (
          <DetailRow label="Size" value={selectedItem.size} />
        )}
        <DetailRow label="Created" value={created} />
      </div>
    </aside>
  );
}

export default PropertiesPanel;
