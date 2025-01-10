import React, { useState } from 'react';
import { Target, Plus, Edit2, Trash2, Tags } from 'lucide-react';
import type { MasterKPI, KPICategory } from '../types';

export function MasterKPIsView() {
  const [kpis, setKpis] = useState<MasterKPI[]>([]);
  const [categories, setCategories] = useState<KPICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">マスターKPI管理</h2>
        <p className="mt-1 text-sm text-gray-500">
          基準となるKPIの管理
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Categories List */}
        <div className="col-span-4 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">カテゴリ</h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'hover:bg-gray-50 border-transparent'
                  } border`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center">
                    <Tags className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPIs List */}
        <div className="col-span-8 bg-white rounded-lg shadow">
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
              <div className="space-y-2">
                {kpis
                  .filter((kpi) => kpi.kpi_category_id === selectedCategory)
                  .map((kpi) => (
                    <div
                      key={kpi.id}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <Target className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium">{kpi.name}</span>
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
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                カテゴリを選択してください
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}