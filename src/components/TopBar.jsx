import { Lock, Search } from 'lucide-react';

function TopBar({ searchQuery, onSearchChange }) {
  return (
    <header className="h-16 bg-surface border-b border-border relative flex items-center px-6 shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Lock className="w-5 h-5 text-primary-fg" />
        </div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">
          SecureVault
        </h1>
      </div>

      {/* Search — absolutely centered in the header */}
      <div className="absolute left-1/2 -translate-x-1/2 w-80">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-fg pointer-events-none" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-9 pl-10 pr-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-fg focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Avatar */}
      <div className="ml-auto w-8 h-8 rounded-full bg-muted shrink-0" />
    </header>
  );
}

export default TopBar;
