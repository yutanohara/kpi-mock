import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { FunctionsView } from './views/FunctionsView';
import { ScenariosView } from './views/ScenariosView';
import { KPIsView } from './views/KPIsView';
import { KPIModelsView } from './views/KPIModelsView';
import { DealsView } from './views/DealsView';
import { KPIReportView } from './views/KPIReportView';
import DataEntryView from './views/DataEntryView';

type View =
  | 'functions'
  | 'scenarios'
  | 'kpis'
  | 'kpiModels'
  | 'deals'
  | 'reports'
  | 'dataEntry';

function App() {
  const [currentView, setCurrentView] = useState<View>('functions');

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <div className="flex h-screen">
          <Sidebar currentView={currentView} onViewChange={setCurrentView} />
          <main className="flex-1 overflow-auto p-8">
            {currentView === 'functions' && <FunctionsView />}
            {currentView === 'scenarios' && <ScenariosView />}
            {currentView === 'kpis' && <KPIsView />}
            {currentView === 'kpiModels' && <KPIModelsView />}
            {currentView === 'deals' && <DealsView />}
            {currentView === 'reports' && <KPIReportView />}
            {currentView === 'dataEntry' && <DataEntryView />}
          </main>
        </div>
      </Layout>
    </div>
  );
}

export default App;
