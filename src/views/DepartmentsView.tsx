import React from 'react';
import { Building2, ChevronRight } from 'lucide-react';

export function DepartmentsView() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">部署管理</h2>
        <p className="mt-1 text-sm text-gray-500">
          組織構造と部署階層の管理
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">部署一覧</h3>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              新規部署追加
            </button>
          </div>

          <div className="space-y-4">
            {['営業本部', '技術本部', '管理本部'].map((dept) => (
              <div
                key={dept}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{dept}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}