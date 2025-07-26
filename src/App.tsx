import React, { useState, useEffect } from 'react';
import NumberTable from './components/NumberTable';
import CategorySelector from './components/CategorySelector';
import UserForm from './components/UserForm';
import './styles/App.css';
import { firestore } from './firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";

interface BusyNumbers {
    [key: number]: { name: string; contact: string };
}

const App: React.FC = () => {
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [busyNumbers, setBusyNumbers] = useState<BusyNumbers>({});

    // Carrega os números ocupados do Firestore em tempo real
    useEffect(() => {
        const fetchBusyNumbers = async () => {
            const querySnapshot = await getDocs(collection(firestore, "contactAndNumber"));
            const busy: BusyNumbers = {};
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (Array.isArray(data.numbers)) {
                    data.numbers.forEach((num: number) => {
                        busy[num] = { name: data.name, contact: data.contact };
                    });
                }
            });
            setBusyNumbers(busy);
        };
        fetchBusyNumbers();
    }, []);

    // Seleciona/desseleciona número se não estiver ocupado
    const handleNumberSelect = (number: number) => {
        if (busyNumbers[number]) return;
        setSelectedNumbers(prevSelected =>
            prevSelected.includes(number)
                ? prevSelected.filter(n => n !== number)
                : [...prevSelected, number]
        );
    };

    // Salva os números escolhidos no Firestore e limpa seleção
    const handleFormSubmit = async (name: string, contact: string) => {
        if (selectedNumbers.length === 0) return;
        await addDoc(collection(firestore, "contactAndNumber"), {
            name,
            contact,
            numbers: selectedNumbers
        });
        setSelectedNumbers([]);
    };

    return (
        <div className="app-container">
            <h1>Escolha um número do chá Rifa</h1>
            <NumberTable
                selectedNumbers={selectedNumbers}
                onNumberSelect={handleNumberSelect}
                busyNumbers={busyNumbers}
            />
            <CategorySelector selectedNumbers={selectedNumbers} />
            <UserForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default App;