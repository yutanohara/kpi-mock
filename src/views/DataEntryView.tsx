import React, { useState } from 'react';
import { Download, Upload } from 'lucide-react';

const periods = ['2024-01', '2024-02', '2024-03'];

interface DataEntry {
  item: string;
  '2024-01': { function?: string; value?: string };
  '2024-02': { function?: string; value?: string };
  '2024-03': { function?: string; value?: string };
}

const initialData: DataEntry[] = [
  { item: '項目1', '2024-01': {}, '2024-02': {}, '2024-03': {} },
  { item: '項目2', '2024-01': {}, '2024-02': {}, '2024-03': {} },
  { item: '項目3', '2024-01': {}, '2024-02': {}, '2024-03': {} },
];

const DataEntryView: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [selectedCell, setSelectedCell] = useState<{ itemIndex: number; period: string } | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [sidePanelFunction, setSidePanelFunction] = useState<string | undefined>();
  const [sidePanelValue, setSidePanelValue] = useState<string | undefined>();

  const handleCellClick = (itemIndex: number, period: string) => {
    setSelectedCell({ itemIndex, period });
    setIsSidePanelOpen(true);
    setSidePanelFunction(data[itemIndex][period].function);
    setSidePanelValue(data[itemIndex][period].value);
  };

  const handleSave = () => {
    if (selectedCell) {
      const newData = [...data];
      newData[selectedCell.itemIndex][selectedCell.period] = {
        function: sidePanelFunction,
        value: sidePanelValue,
      };
      setData(newData);
      setIsSidePanelOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">データ登録</h2>
          <p className="mt-1 text-sm text-gray-500">データ入力</p>
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

      <div className="bg-white rounded-lg shadow relative">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  項目
                </th>
                {periods.map(period => (
                  <th key={period} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, itemIndex) => (
                <tr key={item.item}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.item}
                  </td>
                    <td
                      key="2024-01"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCellClick(itemIndex, '2024-01')}
                    >
                      {item['2024-01'].value}
                    </td>
                    <td
                      key="2024-02"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCellClick(itemIndex, '2024-02')}
                    >
                      {item['2024-02'].value}
                    </td>
                    <td
                      key="2024-03"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCellClick(itemIndex, '2024-03')}
                    >
                      {item['2024-03'].value}
                    </td>
 treinamento
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isSidePanelOpen && selectedCell && (
          <div className="absolute top-0 right-0 h-full w-96 bg-white shadow-md p-6 border-l">
            <h3>{data[selectedCell.itemIndex].item} - {selectedCell.period}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Function</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={sidePanelFunction}
                onChange={(e) => setSidePanelFunction(e.target.value)}
              >
                <option>SUM</option>
                <option>AVG</option>
                <option>COUNT</option>
                <option>MAX</option>
                <option>MIN</option>
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
            <button onClick={() => setIsSidePanelOpen(false)} className="bg-gray-200 px-4 py-2 rounded">閉じる</button>
            <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded ml-2">保存</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataEntryView;
