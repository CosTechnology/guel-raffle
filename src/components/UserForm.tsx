import React, { useState } from 'react';

const UserForm: React.FC<{ onSubmit: (name: string, contact: string) => void }> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !contact) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        setError('');
        onSubmit(name, contact);
        setName('');
        setContact('');
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="contact">Contato:</label>
                <input
                    type="text"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Enviar</button>
        </form>
    );
};

export default UserForm;