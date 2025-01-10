import React, { useState } from 'react';
import { Tag, Plus, X, Edit2, Save, Trash2 } from 'lucide-react';

interface TagGroup {
  id: string;
  name: string;
  tags: {
    id: string;
    name: string;
  }[];
}

const initialTagGroups: TagGroup[] = [
  {
    id: '1',
    name: '財務指標',
    tags: [
      { id: '1-1', name: '収益性' },
      { id: '1-2', name: '成長性' },
      { id: '1-3', name: '効率性' },
    ],
  },
  {
    id: '2',
    name: '顧客指標',
    tags: [
      { id: '2-1', name: '満足度' },
      { id: '2-2', name: '継続率' },
      { id: '2-3', name: '獲得効率' },
    ],
  },
];

export function TagManagementView() {
  const [tagGroups, setTagGroups] = useState<TagGroup[]>(initialTagGroups);
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  const [editingTag, setEditingTag] = useState<{ groupId: string; tagId: string } | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [addingTagToGroup, setAddingTagToGroup] = useState<string | null>(null);

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      setTagGroups([
        ...tagGroups,
        {
          id: Date.now().toString(),
          name: newGroupName,
          tags: [],
        },
      ]);
      setNewGroupName('');
    }
  };

  const handleAddTag = (groupId: string) => {
    if (newTagName.trim()) {
      setTagGroups(tagGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            tags: [...group.tags, { id: Date.now().toString(), name: newTagName }],
          };
        }
        return group;
      }));
      setNewTagName('');
      setAddingTagToGroup(null);
    }
  };

  const handleUpdateGroup = (groupId: string, newName: string) => {
    setTagGroups(tagGroups.map(group => 
      group.id === groupId ? { ...group, name: newName } : group
    ));
    setEditingGroup(null);
  };

  const handleUpdateTag = (groupId: string, tagId: string, newName: string) => {
    setTagGroups(tagGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          tags: group.tags.map(tag => 
            tag.id === tagId ? { ...tag, name: newName } : tag
          ),
        };
      }
      return group;
    }));
    setEditingTag(null);
  };

  const handleDeleteGroup = (groupId: string) => {
    setTagGroups(tagGroups.filter(group => group.id !== groupId));
  };

  const handleDeleteTag = (groupId: string, tagId: string) => {
    setTagGroups(tagGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          tags: group.tags.filter(tag => tag.id !== tagId),
        };
      }
      return group;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">タグ管理</h2>
          <p className="mt-1 text-sm text-gray-500">タググループとタグの管理</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="新規グループ名"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddGroup}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              グループ追加
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {tagGroups.map(group => (
            <div key={group.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                {editingGroup === group.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      defaultValue={group.name}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdateGroup(group.id, e.currentTarget.value);
                        }
                      }}
                    />
                    <button
                      onClick={() => setEditingGroup(null)}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                    <button
                      onClick={() => setEditingGroup(group.id)}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="p-1 text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setAddingTagToGroup(group.id)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  タグ追加
                </button>
              </div>

              {addingTagToGroup === group.id && (
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="text"
                    placeholder="新規タグ名"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => handleAddTag(group.id)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    追加
                  </button>
                  <button
                    onClick={() => setAddingTagToGroup(null)}
                    className="p-1 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {group.tags.map(tag => (
                  <div
                    key={tag.id}
                    className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100"
                  >
                    <Tag className="h-4 w-4 text-gray-500" />
                    {editingTag?.groupId === group.id && editingTag?.tagId === tag.id ? (
                      <div className="flex items-center space-x-1">
                        <input
                          type="text"
                          defaultValue={tag.name}
                          className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateTag(group.id, tag.id, e.currentTarget.value);
                            }
                          }}
                        />
                        <button
                          onClick={() => setEditingTag(null)}
                          className="p-1 text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm text-gray-700">{tag.name}</span>
                        <button
                          onClick={() => setEditingTag({ groupId: group.id, tagId: tag.id })}
                          className="p-1 text-gray-400 hover:text-gray-500"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteTag(group.id, tag.id)}
                          className="p-1 text-red-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}