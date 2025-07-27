import React, { useState, useEffect, useRef } from 'react';
import NumberTable from './components/NumberTable';
import CategorySelector from './components/CategorySelector';
import UserForm from './components/UserForm';
import './styles/App.css';
import { firestore } from './firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import html2canvas from 'html2canvas';

interface BusyNumbers {
    [key: number]: { name: string; contact: string };
}

const App: React.FC = () => {
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [busyNumbers, setBusyNumbers] = useState<BusyNumbers>({});
    const tableRef = useRef<HTMLDivElement>(null);


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

    const handleShare = async () => {
        if (tableRef.current) {
            // Cria um container temporário para adicionar título e instruções
            const clone = tableRef.current.cloneNode(true) as HTMLElement;
            const container = document.createElement('div');
            container.style.backgroundImage = "url('/bg_2.jpg')";
            container.style.backgroundSize = "cover";
            container.style.backgroundPosition = "center";
            container.style.padding = '24px';
            container.style.borderRadius = '12px';
            container.style.color = '#fff';
            container.style.width = 'fit-content';
            container.style.margin = '0 auto';

            const title = document.createElement('h2');
            title.innerText = 'Chá rifa Miguel';
            title.style.textAlign = 'center';

            const desc = document.createElement('p');
            desc.innerText = 'Escolha um número de 1 a 100 e entregue uma fralda para a mamãe.';
            desc.style.textAlign = 'center';
            desc.style.marginBottom = '16px';

            container.appendChild(title);
            container.appendChild(desc);
            container.appendChild(clone);

            document.body.appendChild(container);

            const canvas = await html2canvas(container, { backgroundColor: null });
            const link = document.createElement('a');
            link.download = 'cha-rifa-miguel.png';
            link.href = canvas.toDataURL();
            link.click();

            document.body.removeChild(container);
        }
    };

    return (
        <div className="app-container">
        <header className="app-navbar">
            <h2>Chá Rifa do Miguel</h2>
        </header>

            <h1>Escolha um número do chá Rifa</h1>

            <div ref={tableRef}>
                <NumberTable
                    selectedNumbers={selectedNumbers}
                    onNumberSelect={handleNumberSelect}
                    busyNumbers={busyNumbers}
                />
            </div>

            <CategorySelector selectedNumbers={selectedNumbers} />

            <UserForm onSubmit={handleFormSubmit} />

            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                <button
                    onClick={handleShare}
                    style={{
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "10px 20px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Compartilhar (Gerar PNG)
                </button>
            </div>
            <footer className="app-footer">
                <p>© {new Date().getFullYear()} Chá Rifa Miguel. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default App;