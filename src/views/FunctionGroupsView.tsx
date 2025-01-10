import React, { useState } from 'react';
import { FolderTree, Plus, Edit2, Trash2, ChevronRight } from 'lucide-react';
import type { FunctionGroup, Function } from '../types';

export function FunctionGroupsView() {
  const [groups, setGroups] = useState<FunctionGroup[]>([]);
  const [functions, setFunctions] = useState<Function[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">機能グループ管理</h2>
        <p className="mt-1 text-sm text-gray-500">
          機能グループと機能の階層管理
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
                    <FolderTree className="h-5 w-5 text-gray-400 mr-2" />
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
              <h3 className="text-lg font-medium">機能一覧</h3>
              <button
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                disabled={!selectedGroup}
              >
                <Plus className="h-4 w-4 mr-1" />
                新規機能
              </button>
            </div>
          </div>
          <div className="p-4">
            {selectedGroup ? (
              <div className="space-y-2">
                {functions
                  .filter((f) => f.function_group_id === selectedGroup)
                  .map((func) => (
                    <div
                      key={func.id}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{func.name}</span>
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
                グループを選択してください
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}