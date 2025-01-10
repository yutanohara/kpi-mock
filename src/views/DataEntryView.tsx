import React, { useState } from 'react';
import { Download, Upload } from 'lucide-react';

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
      id: '3',
      name: '継続',
      value: '300万円',
      children: [
        {
          id: '6',
          name: 'アカウント数',
          value: '5件',
        },
        {
          id: '7',
          name: '顧客単価',
          value: '60万円',
        },
      ],
    },
  ],
};

const periods = ['2024-01', '2024-02', '2024-03'];

function KPIRow({
  node,
  level = 0,
  onSelect,
}: {
  node: KPINode;
  level?: number;
  onSelect: (id: string, name: string, period: string, currentValue: string) => void;
}) {
  return (
    <>
      <tr
        className={`hover:bg-gray-50 ${
          level % 2 === 0 ? 'bg-white' : 'bg-gray-50'
        }`}
      >
        <td
          className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900"
          style={{ paddingLeft: `${level * 20}px` }} // インデントを調整
        >
          {node.name}
        </td>
        {periods.map((period) => (
          <td
            key={`${node.id}-${period}`}
            className="px-2 py-1 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(node.id, node.name, period, node.value)}
          >
            {node.value}
          </td>
        ))}
      </tr>
      {node.children?.map((child) => (
        <KPIRow key={child.id} node={child} level={level + 1} onSelect={onSelect} />
      ))}
    </>
  );
}

export function DatasetEntryView() {
  const [selectedModel, setSelectedModel] = useState('売上成長モデル');
  const [data, setData] = useState<KPINode>(sampleData);
  const [selectedCell, setSelectedCell] = useState<{
    id: string;
    name: string;
    period: string;
    currentValue: string;
  } | null>(null);
  const [sidePanelFunction, setSidePanelFunction] = useState<string>('');
  const [sidePanelValue, setSidePanelValue] = useState<string>('');

  const handleSelect = (id: string, name: string, period: string, currentValue: string) => {
    setSelectedCell({ id, name, period, currentValue });
    setSidePanelFunction(''); // 初期値をリセット
    setSidePanelValue(currentValue);
  };

  const handleSave = () => {
    if (selectedCell) {
      const updateData = (node: KPINode): KPINode => {
        if (node.id === selectedCell.id) {
          return { ...node, value: sidePanelValue };
        }
        if (node.children) {
          return {
            ...node,
            children: node.children.map(updateData),
          };
        }
        return node;
      };
      setData(updateData(data));
      setSelectedCell(null); // サイドパネルを閉じる
    }
  };

  return (
    <div className="flex p-4 space-x-6">
      {/* メインコンテンツ */}
      <div className={`flex-1 space-y-6 ${selectedCell ? 'mr-96' : ''}`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">KPIレポート</h2>
            <p className="mt-1 text-sm text-gray-500">データ入力・分析</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
              <Download className="h-4 w-4 mr-2" />
              エクスポート
            </button>
            <button className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              <Upload className="h-4 w-4 mr-2" />
              インポート
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex space-x-4">
              <div className="w-64">
                <label htmlFor="kpi-model" className="block text-sm font-medium text-gray-700 mb-1">
                  KPIモデル
                </label>
                <select
                  id="kpi-model"
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

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    KPI
                  </th>
                  {periods.map((period) => (
                    <th
                      key={period}
                      scope="col"
                      className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
                    >
                      {period}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <KPIRow node={data} onSelect={handleSelect} />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* サイドパネル */}
      {selectedCell && (
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-md p-6 border-l overflow-y-auto z-50">
          <h3 className="text-xl font-semibold mb-4">
            {selectedCell.name} - {selectedCell.period}
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Function</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={sidePanelFunction}
              onChange={(e) => setSidePanelFunction(e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="SUM">SUM</option>
              <option value="AVG">AVG</option>
              <option value="COUNT">COUNT</option>
              <option value="MAX">MAX</option>
              <option value="MIN">MIN</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Value</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={sidePanelValue}
              onChange={(e) => setSidePanelValue(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setSelectedCell(null)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              閉じる
            </button>
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              保存
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatasetEntryView;