import React, { useState } from 'react';
import { Tags, Plus, Edit2, Trash2 } from 'lucide-react';
import type { KPICategory } from '../types';

export function KPICategoriesView() {
  const [categories, setCategories] = useState<KPICategory[]>([]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">KPIカテゴリ管理</h2>
        <p className="mt-1 text-sm text-gray-500">
          KPIのカテゴリ分類の管理
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">カテゴリ一覧</h3>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              新規カテゴリ
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Tags className="h-5 w-5 text-indigo-600 mr-2" />
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}