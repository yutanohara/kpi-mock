import React, { useState } from 'react';
import { Target, Plus, Edit2, Trash2 } from 'lucide-react';
import type { MasterKPI, KPICategory } from '../types';

export function KPIsView() {
  const [categories, setCategories] = useState<KPICategory[]>([]);
  const [kpis, setKpis] = useState<MasterKPI[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">KPI管理</h2>
        <p className="mt-1 text-sm text-gray-500">
          マスタKPIとKPIの管理
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Categories */}
        <div className="col-span-12 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">マスタKPI</h3>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                新規マスタKPI
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCategory === category.id
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'hover:shadow-md hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-indigo-600 mr-2" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:text-indigo-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    KPI数: {kpis.filter(kpi => kpi.kpi_category_id === category.id).length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="col-span-12 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">KPI一覧</h3>
              <button
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                disabled={!selectedCategory}
              >
                <Plus className="h-4 w-4 mr-1" />
                新規KPI
              </button>
            </div>
          </div>
          <div className="p-4">
            {selectedCategory ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {kpis
                  .filter((kpi) => kpi.kpi_category_id === selectedCategory)
                  .map((kpi) => (
                    <div
                      key={kpi.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Target className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="font-medium">{kpi.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:text-indigo-600">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button className="p-1 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                マスタKPIを選択してKPIを表示
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}