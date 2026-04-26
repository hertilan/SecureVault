import { ChevronRight } from 'lucide-react';

function Breadcrumb({ items, onNavigate }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 px-6 py-3 bg-background border-b border-border shrink-0"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.path} className="flex items-center gap-2">
            <button
              onClick={() => !isLast && onNavigate(item.path)}
              className={[
                'text-sm transition-colors duration-150',
                isLast
                  ? 'text-foreground font-medium cursor-default'
                  : 'text-muted-fg hover:text-foreground cursor-pointer',
              ].join(' ')}
              aria-current={isLast ? 'page' : undefined}
            >
              {item.label}
            </button>
            {!isLast && (
              <ChevronRight className="w-4 h-4 text-muted-fg shrink-0" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
