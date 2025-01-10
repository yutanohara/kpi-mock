import React, { useState } from 'react';
import { BarChart3, ChevronDown, Download, Upload } from 'lucide-react';

interface KPINode {
  id: string;
  name: string;
  value: string;
  children?: KPINode[];
}

const sampleData: KPINode = {
  id: '1',
  name: '売上',
  value: '120%',
  children: [
    {
      id: '2',
      name: '新規契約',
      value: '100万円',
      children: [
        {
          id: '4',
          name: 'アカウント数',
          value: '2件',
        },
        {
          id: '5',
          name: '顧客単価',
          value: '50万円',
        },
      ],
    },
    {
      id: '2',
      name: '継続',
      value: '300万円',
      children: [
        {
          id: '4',
          name: 'アカウント数',
          value: '5件',
        },
        {
          id: '5',
          name: '顧客単価',
          value: '60万円',
        },
      ],
    },
  ],
};

const periods = ['2024-01', '2024-02', '2024-03'];

function KPIRow({ node, level = 0, onEdit }: { node: KPINode; level?: number; onEdit: (id: string, period: string, value: string) => void }) {
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <>
      <tr className={`hover:bg-gray-50 ${level > 0 ? 'bg-gray-50' : ''}`}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
            <span>{node.name}</span>
          </div>
        </td>
        {periods.map(period => (
          <td
            key={`${node.id}-${period}`}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            onClick={() => setEditing(period)}
          >
            {editing === period ? (
              <input
                type="text"
                className="w-24 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue={node.value}
                onBlur={(e) => {
                  onEdit(node.id, period, e.target.value);
                  setEditing(null);
                }}
                autoFocus
              />
            ) : (
              <div className="cursor-pointer hover:bg-gray-100 p-1 rounded">
                {node.value}
              </div>
            )}
          </td>
        ))}
      </tr>
      {node.children?.map((child) => (
        <KPIRow key={child.id} node={child} level={level + 1} onEdit={onEdit} />
      ))}
    </>
  );
}

export function KPIReportView() {
  const [selectedModel, setSelectedModel] = useState('売上成長モデル');
  const [data, setData] = useState(sampleData);

  const handleEdit = (id: string, period: string, value: string) => {
    console.log(`Editing node ${id} for period ${period} with value ${value}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">KPIレポート</h2>
          <p className="mt-1 text-sm text-gray-500">データ入力・分析</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            エクスポート
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            インポート
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex space-x-4">
            <div className="w-64">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                KPIモデル
              </label>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option>売上成長モデル</option>
                  <option>顧客満足度モデル</option>
                  <option>オペレーション効率モデル</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KPI
                </th>
                {periods.map(period => (
                  <th key={period} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <KPIRow node={data} onEdit={handleEdit} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}