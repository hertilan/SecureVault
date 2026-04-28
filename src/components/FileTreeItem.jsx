import { useState } from 'react';
import { ChevronRight, Folder, File } from 'lucide-react';

function hasMatch(item, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  if (item.name.toLowerCase().includes(q)) return true;
  return item.children?.some((child) => hasMatch(child, q)) ?? false;
}

function FileTreeItem({ item, level = 0, selectedId, onSelect, searchQuery = '', treePath = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.type === 'folder' && item.children?.length > 0;
  const isSelected = selectedId === item.id;
  const isExpandedParent = hasChildren && isExpanded;

  const nameMatches = searchQuery
    ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
    : false;
  const childMatches = searchQuery && hasChildren
    ? item.children.some((c) => hasMatch(c, searchQuery))
    : false;

  if (searchQuery && !nameMatches && !childMatches) return null;

  const expanded = isExpanded || (!!searchQuery && childMatches);
  const currentPath = [...treePath, item.name];

  const handleClick = () => {
    if (hasChildren) {
      const next = !isExpanded;
      setIsExpanded(next);
      onSelect({ ...item, treePath: next ? currentPath : treePath });
    } else {
      onSelect({ ...item, treePath: currentPath });
    }
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
        if (hasChildren) {
          const next = !isExpanded;
          setIsExpanded(next);
          onSelect({ ...item, treePath: next ? currentPath : treePath });
        } else {
          onSelect({ ...item, treePath: currentPath });
        }
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

  const isMainParent = isExpandedParent && level === 0;
  const isActive = item.type === 'folder' ? isExpandedParent : isSelected;

  const bgClass = isActive
    ? 'bg-[#334155]/60'
    : 'tree-item-hover';

  const borderStyle = isMainParent
    ? { borderLeft: '2px solid #3B82F6' }
    : { borderLeft: '2px solid transparent' };

  return (
    <div role="treeitem" aria-expanded={hasChildren ? expanded : undefined} aria-selected={isSelected} className="mb-[4px]">
      <div
        data-tree-item
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={[
          'flex items-center gap-[3px] rounded-[5px] cursor-pointer transition-colors duration-150',
          'outline-none focus-visible:ring-1 focus-visible:ring-primary',
          bgClass,
        ].join(' ')}
        style={{
          padding: '5px',
          marginLeft: `${level * 20 + 4}px`,
          marginRight: '4px',
          ...borderStyle,
        }}
      >
        {hasChildren ? (
          <ChevronRight
            className={[
              'w-4 h-4 shrink-0 transition-transform duration-150',
              expanded ? 'rotate-90' : '',
              'text-muted-fg',
            ].join(' ')}
          />
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {item.type === 'folder' ? (
          <Folder className="w-4 h-4 text-primary shrink-0" />
        ) : (
          <File className={[
            'w-4 h-4 shrink-0',
            isSelected ? 'text-primary' : 'text-muted-fg',
          ].join(' ')} />
        )}

        <span className={[
          'text-sm truncate',
          isActive
            ? 'text-foreground font-medium'
            : nameMatches && searchQuery
            ? 'text-primary font-medium'
            : 'text-foreground',
        ].join(' ')}>
          {item.name}
        </span>
      </div>

      {hasChildren && expanded && (
        <div role="group" className="mt-[4px]">
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              searchQuery={searchQuery}
              treePath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileTreeItem;
