// src/components/Spreadsheet.js
import React, { useState } from 'react';
import { CopilotKit } from "@copilotkit/react-core";

const Spreadsheet = () => {
  const [data, setData] = useState([['']]);
  const [formula, setFormula] = useState('');
  const [output, setOutput] = useState('');

  // Add more rows and columns
  const addRow = () => setData([...data, Array(data[0].length).fill('')]);
  const addColumn = () => setData(data.map(row => [...row, '']));

  // Handle cell change
  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][colIndex] = value;
    setData(updatedData);
  };

  const handleFormulaChange = async () => {
    try {
      const response = await CopilotKit.getCompletion({
        prompt: `Given the following table data: ${JSON.stringify(data)}, suggest a formula or evaluate the following formula: ${formula}`,
        maxTokens: 50,
      });
      setOutput(response.data.choices[0].text);
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
  };

  return (
    <div>
      <h1>AI-Powered Spreadsheet</h1>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Enter Formula or Query:</h3>
        <input
          type="text"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="e.g., SUM(A1:A5)"
        />
        <button onClick={handleFormulaChange}>Run</button>
      </div>
      <div>
        <h3>Output:</h3>
        <p>{output}</p>
      </div>
    </div>
  );
};

export default Spreadsheet;
