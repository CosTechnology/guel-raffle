import React from 'react';
import '../styles/NumberTable.css';

interface BusyNumbers {
    [key: number]: { name: string; contact: string };
}

interface NumberTableProps {
    selectedNumbers: number[];
    onNumberSelect: (number: number) => void;
    busyNumbers: BusyNumbers;
}

const NumberTable: React.FC<NumberTableProps> = ({ selectedNumbers, onNumberSelect, busyNumbers }) => {
    return (
        <div className="number-table">
            <table>
                <tbody>
                    {Array.from({ length: 10 }, (_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: 10 }, (_, colIndex) => {
                                const number = rowIndex * 10 + colIndex + 1;
                                const isSelected = selectedNumbers.includes(number);
                                const isBusy = !!busyNumbers[number];
                                return (
                                    <td
                                        key={number}
                                        onClick={() => !isBusy && onNumberSelect(number)}
                                        className={
                                            isBusy
                                                ? 'busy'
                                                : isSelected
                                                ? 'selected'
                                                : ''
                                        }
                                    >
                                        {number}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NumberTable;