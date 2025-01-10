import React, { useState, useEffect } from 'react';
import { LayoutIcon, Plus, Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import type { FunctionGroup, Function as Func } from '../types';

interface FunctionNode extends Func {
  children: FunctionNode[];
}

export function FunctionsView() {
  const [groups, setGroups] = useState<FunctionGroup[]>([]);
  const [functions, setFunctions] = useState<Func[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const mockGroups: FunctionGroup[] = [
      { id: '1', name: '部署' },
      { id: '2', name: '商品' },
    ];

    const mockFunctions: Func[] = [
      { id: '1', name: '東日本', function_group_id: '1', parent_id: null },
      { id: '2', name: 'A事業', function_group_id: '1', parent_id: '1' },
      { id: '3', name: 'B事業', function_group_id: '1', parent_id: '1' },
      { id: '4', name: '西日本', function_group_id: '1', parent_id: null },
      { id: '5', name: 'C事業', function_group_id: '1', parent_id: '4' },
      { id: '6', name: 'A商品', function_group_id: '2', parent_id: null },
      { id: '7', name: 'B商品', function_group_id: '2', parent_id: null },
    ];

    setGroups(mockGroups);
    setFunctions(mockFunctions);
  }, []);

  // ツリー構造を構築する関数
  const buildFunctionTree = (functions: Func[]): FunctionNode[] => {
    const functionMap: { [key: string]: FunctionNode } = {};
    const roots: FunctionNode[] = [];

    // 初期化
    functions.forEach((func) => {
      functionMap[func.id] = { ...func, children: [] };
    });

    // ツリー構築
    functions.forEach((func) => {
      if (func.parent_id) {
        const parent = functionMap[func.parent_id];
        if (parent) {
          parent.children.push(functionMap[func.id]);
        }
      } else {
        roots.push(functionMap[func.id]);
      }
    });

    return roots;
  };

  // 関数ツリーのレンダリング
  const renderFunctionTree = (nodes: FunctionNode[], level: number = 0) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <div
          className="flex items-center p-2 pl-4"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {node.children.length > 0 && (
            <button
              className="mr-2 focus:outline-none"
              onClick={() => toggleNode(node.id)}
            >
              {expandedNodes.has(node.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          {node.children.length === 0 && <div className="w-6 mr-2" />} {/* インデント調整 */}
          <span className="text-sm font-medium">{node.name}</span>
        </div>
        {node.children.length > 0 && expandedNodes.has(node.id) && (
          <div>{renderFunctionTree(node.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  // ノードの展開/折りたたみを切り替える関数
  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // 選択されたグループに基づいてツリーを取得
  const selectedFunctionsTree = selectedGroup
    ? buildFunctionTree(functions.filter((f) => f.function_group_id === selectedGroup))
    : [];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">ファンクション管理</h2>
        <p className="mt-1 text-sm text-gray-500">
          ファンクショングループとファンクションの階層管理
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Groups List */}
        <div className="col-span-4 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">グループ一覧</h3>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                新規グループ
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                    selectedGroup === group.id
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'hover:bg-gray-50 border-transparent'
                  } border`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <div className="flex items-center">
                    <LayoutIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium">{group.name}</span>
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
          </div>
        </div>

        {/* Functions List */}
        <div className="col-span-8 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">ファンクション一覧</h3>
              <button
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                disabled={!selectedGroup}
              >
                <Plus className="h-4 w-4 mr-1" />
                新規ファンクション
              </button>
            </div>
          </div>
          <div className="p-4">
            {selectedGroup ? (
              selectedFunctionsTree.length > 0 ? (
                <div className="space-y-2">
                  {renderFunctionTree(selectedFunctionsTree)}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  ファンクションがありません
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-500">
                グループを選択してください
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
