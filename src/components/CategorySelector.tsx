import React from 'react';

interface CategorySelectorProps {
    selectedNumbers: number[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedNumbers }) => {
    const categories = {
        'Fralda P': selectedNumbers.filter(num => num >= 1 && num <= 25),
        'Fralda M': selectedNumbers.filter(num => num >= 26 && num <= 50),
        'Fralda G': selectedNumbers.filter(num => num >= 51 && num <= 75),
        'Fralda GG': selectedNumbers.filter(num => num >= 76 && num <= 100),
    };

    return (
        <div className="selected-categories">
            <h2>Quantidade selecionada por tamanho</h2>
            <ul>
                {Object.entries(categories).map(([category, numbers]) => (
                    <li key={category}>
                        {category}: {numbers.join(', ') || 'Nenhum'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySelector;