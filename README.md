# SecureVault — Enterprise File Explorer

A high-performance, keyboard-accessible file explorer UI built for SecureVault Inc., a cloud storage platform serving law firms and financial institutions. Designed from scratch with a dark-mode design system and zero UI component libraries.

---

## Live Demo

https://securevault.hertilan.rw/

## Design File

https://www.figma.com/design/2jfe2qPqh9bQchATy8EkSv/SecureVault?node-id=172-244&t=RZz2vQeLlXfs4WF4-1
---

## Setup Instructions

**Prerequisites:** Node.js 18+

```bash
# Clone the repository
git clone https://github.com/Hertilan/SecureVault.git
cd SecureVault

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Tech Stack

- **React 19** — component architecture and state management
- **Vite** — build tooling and dev server
- **Tailwind CSS v4** — utility-first styling (all components built from scratch, no UI libraries)
- **Lucide React** — icon set

---

## Recursive Strategy

The file tree is rendered by a single recursive component — `FileTreeItem` — that calls itself for every `children` array it encounters in the data structure.

```
FileTreeItem (root)
  └── FileTreeItem (folder)
        └── FileTreeItem (nested folder)
              └── FileTreeItem (file)
```

Each instance owns its own `isOpen` state, so expanding or collapsing a node never re-renders siblings. The component receives the full `item` object and an `onSelect` callback, making it stateless with respect to selection. This approach handles arbitrary depth — 2 levels or 20 levels — without any changes to the component.

The `treePath` array is built as the tree renders and passed down through each level, so when a folder is selected it can update the breadcrumb to reflect the exact path in the hierarchy.

**Search** forces any folder containing a match to auto-expand by evaluating a `hasMatch(item, query)` check before rendering. Matched nodes override the local `isOpen` state, keeping all other folders collapsed.

---

## Wildcard Feature — Recently Opened Panel

**What it is:** A center panel that tracks and displays the files and folders a user has accessed, in reverse-chronological order. Items persist within the session and support both list and grid views.

**Why it adds business value:**

SecureVault's clients are lawyers and analysts who return to the same critical documents repeatedly — case summaries, payroll exports, compliance checklists. The existing requirements only describe navigation *into* the tree, but offer no way to get back to frequently used items quickly. In a vault with deeply nested folders, re-navigating the full tree on every visit is friction that costs time.

The Recently Opened panel eliminates that friction. A user can open a file four levels deep, close the branch, and return to it in one click — without remembering where it lives. This is a standard pattern in every professional file management tool (Finder, Windows Explorer, VS Code) precisely because it mirrors how knowledge workers actually use file systems.

**Implementation details:**
- Maintains a session list (max 5 items) in App-level state, deduplicating by `id` and always promoting the latest access to the top
- Pre-seeded with representative items from `data.json` so the panel is never empty on first load
- Timestamps displayed as human-readable relative time (`2m ago`, `1h ago`, `3d ago`)
- List view and grid view toggle, consistent with the sidebar's visual language

---

## Features

| Feature | Status |
|---|---|
| Recursive file tree (unlimited depth) | Done |
| Expand / collapse folders | Done |
| File selection with visual state | Done |
| Properties panel (name, type, size) | Done |
| Keyboard navigation (↑ ↓ → ← Enter) | Done |
| Breadcrumb navigation | Done |
| Search with auto-expand | Done |
| Recently Opened panel (wildcard) | Done |

---

## Project Structure

```
src/
├── components/
│   ├── TopBar.jsx          # Search bar and branding
│   ├── Breadcrumb.jsx      # Path navigation
│   ├── SideBar.jsx         # Recursive tree host + keyboard handler
│   ├── FileTreeItem.jsx    # Recursive tree node
│   ├── CenterPanel.jsx     # Recently Opened panel
│   └── PropertiesPanel.jsx # File/folder metadata
├── data/
│   └── data.json           # File system fixture data
└── App.jsx                 # Root state and layout
```
