import React from 'react';
import { BarChart3, ArrowRight } from 'lucide-react';
import { KPIModelDetailView } from './KPIModelDetailView';

export function KPIModelsView() {
  const [selectedModel, setSelectedModel] = React.useState<string | null>(null);

  if (selectedModel) {
    return <KPIModelDetailView />;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">KPIモデル</h2>
        <p className="mt-1 text-sm text-gray-500">
          KPIモデルとノードの管理
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">KPIモデル一覧</h3>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            新規モデル作成
          </button>
        </div>

        <div className="space-y-6">
          {[
            '売上成長モデル',
            '顧客満足度モデル',
            'オペレーション効率モデル'
          ].map((model) => (
            <div
              key={model}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedModel(model)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {model}
                    </h4>
                    <p className="text-sm text-gray-500">
                      ノード数: 8 | 最終更新: 2024/03/15
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}