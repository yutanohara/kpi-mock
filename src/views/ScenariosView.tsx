import React from 'react';
import { PieChart, Tag } from 'lucide-react';

export function ScenariosView() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">シナリオ管理</h2>
        <p className="mt-1 text-sm text-gray-500">
          ビジネスシナリオの作成と管理
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {['成長戦略', '収益改善', 'リスク管理'].map((scenario) => (
          <div
            key={scenario}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <PieChart className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {scenario}
                    </dt>
                    <dd className="flex items-center">
                      <Tag className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        関連KPI: 5
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  詳細を見る
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}