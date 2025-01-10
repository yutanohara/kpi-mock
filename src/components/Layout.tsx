import React from 'react';
import { Building2 } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-semibold text-gray-900">
                KPI Management System
              </h1>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}