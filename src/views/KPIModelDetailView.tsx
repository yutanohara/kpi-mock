import React from 'react';
import { BarChart3, Tag, ChevronRight, Plus } from 'lucide-react';

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

function NodeCard({ node }: { node: KPINode }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <BarChart3 className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">{node.name}</h3>
        </div>
        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
          {node.value}
        </span>
      </div>
    </div>
  );
}

function renderNodes(node: KPINode, level: number = 0) {
  return (
    <div key={node.id} className="space-y-4">
      <NodeCard node={node} />
      {node.children && (
        <div className={`pl-8 space-y-4 ${level > 0 ? 'border-l border-gray-200' : ''}`}>
          {node.children.map((child) => renderNodes(child, level + 1))}
        </div>
      )}
    </div>
  );
}

export function KPIModelDetailView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">売上成長モデル</h2>
          <p className="mt-1 text-sm text-gray-500">KPIツリーとノード管理</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            ノード追加
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="space-y-6">
          {renderNodes(sampleData)}
        </div>
      </div>
    </div>
  );
}