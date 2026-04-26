import { useState } from 'react';
import { ChevronRight, Folder, File } from 'lucide-react';

/** Returns true if item or any descendant matches the search query */
function hasMatch(item, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  if (item.name.toLowerCase().includes(q)) return true;
  return item.children?.some((child) => hasMatch(child, q)) ?? false;
}

function FileTreeItem({ item, level = 0, selectedId, onSelect, searchQuery = '' }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.type === 'folder' && item.children?.length > 0;
  const isSelected = selectedId === item.id;
  const nameMatches = searchQuery
    ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
    : false;
  const childMatches = searchQuery && hasChildren
    ? item.children.some((c) => hasMatch(c, searchQuery))
    : false;

  // Hide items with no match anywhere in their subtree
  if (searchQuery && !nameMatches && !childMatches) return null;

  // Auto-expand when a search finds matches inside this folder
  const expanded = isExpanded || (!!searchQuery && childMatches);

  const handleClick = () => {
    onSelect(item);
    if (hasChildren) setIsExpanded((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        if (hasChildren && !expanded) setIsExpanded(true);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (expanded) setIsExpanded(false);
        break;
      case 'Enter':
        e.preventDefault();
        onSelect(item);
        if (hasChildren) setIsExpanded((prev) => !prev);
        break;
      case 'ArrowDown': {
        e.preventDefault();
        const all = [...document.querySelectorAll('[data-tree-item]')];
        const idx = all.indexOf(e.currentTarget);
        if (idx < all.length - 1) all[idx + 1].focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const all = [...document.querySelectorAll('[data-tree-item]')];
        const idx = all.indexOf(e.currentTarget);
        if (idx > 0) all[idx - 1].focus();
        break;
      }
      default:
        break;
    }
  };

  return (
    <div role="treeitem" aria-expanded={hasChildren ? expanded : undefined} aria-selected={isSelected}>
      <div
        data-tree-item
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={[
          'flex items-center gap-2 py-2 pr-3 cursor-pointer rounded-md transition-colors duration-150',
          'outline-none focus-visible:ring-1 focus-visible:ring-primary',
          isSelected
            ? 'bg-muted/60 border-l-2 border-primary'
            : 'hover:bg-muted/40',
        ].join(' ')}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        {/* Chevron or spacer */}
        {hasChildren ? (
          <ChevronRight
            className={[
              'w-4 h-4 text-muted-fg shrink-0 transition-transform duration-150',
              expanded ? 'rotate-90' : '',
            ].join(' ')}
          />
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* Icon */}
        {item.type === 'folder' ? (
          <Folder className="w-4 h-4 text-primary shrink-0" />
        ) : (
          <File className="w-4 h-4 text-muted-fg shrink-0" />
        )}

        {/* Name — highlighted when it matches the search */}
        <span
          className={[
            'text-sm truncate',
            nameMatches && searchQuery
              ? 'text-primary font-medium'
              : 'text-foreground',
          ].join(' ')}
        >
          {item.name}
        </span>
      </div>

      {/* Children rendered recursively */}
      {hasChildren && expanded && (
        <div role="group">
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileTreeItem;
