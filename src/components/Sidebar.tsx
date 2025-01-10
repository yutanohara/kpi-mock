import React from 'react';
import {
  LayoutIcon,
  PieChart,
  Target,
  BarChart3,
  Briefcase,
  LineChart,
  FileInput
} from 'lucide-react';

type View =
  | 'functions'
  | 'scenarios'
  | 'kpis'
  | 'kpiModels'
  | 'deals'
  | 'reports'
  | 'dataEntry';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'functions', label: 'ファンクション', icon: LayoutIcon },
    { id: 'scenarios', label: 'シナリオ', icon: PieChart },
    { id: 'kpis', label: 'KPI', icon: Target },
    { id: 'kpiModels', label: 'KPIモデル', icon: BarChart3 },
    { id: 'deals', label: '取引', icon: Briefcase },
    { id: 'reports', label: 'レポート', icon: LineChart },
    { id: 'dataEntry', label: 'データ登録', icon: FileInput },
  ] as const;

  return (
    <div className="w-64 bg-white shadow-sm">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as View)}
                className={`
                  group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium
                  ${
                    currentView === item.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    currentView === item.id
                      ? 'text-indigo-700'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}