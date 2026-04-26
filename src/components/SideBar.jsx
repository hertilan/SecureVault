import FileTreeItem from './FileTreeItem';

function SideBar({ items, selectedId, onSelect, searchQuery }) {
  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col shrink-0 overflow-hidden">
      <div className="px-4 py-3 border-b border-border shrink-0">
        <h2 className="text-sm font-semibold text-foreground">Files</h2>
      </div>

      <div className="flex-1 overflow-y-auto py-2" role="tree" aria-label="File explorer">
        {items.map((item) => (
          <FileTreeItem
            key={item.id}
            item={item}
            level={0}
            selectedId={selectedId}
            onSelect={onSelect}
            searchQuery={searchQuery}
            treePath={[]}
          />
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
