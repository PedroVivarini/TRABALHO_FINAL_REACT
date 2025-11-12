import React, { useState } from 'react';
import { productApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DeleteButton({ productId, productName, onDeleteSucess }){
    const { isAuthenticated } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmado = window.confirm(`O produto "${productName}" será deletado "${productId}"`);

        if(!confirmado){
            return
        }

        setIsDeleting(true);

        try{
            await productApi.delete(productId);
            alert(`Produto "${productName}" deletado com sucesso`);

            if(typeof onDeleteSucess === 'function'){
                onDeleteSucess(productId);
            }
            navigate("/"); 

        }catch(error){
            console.error('Error ao deletar', error);
            alert('Falha ao deletar o produto.');
        }finally{
            setIsDeleting(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return(
        <button 
        className='shadow-sm text-white ml-4 p-2 rounded-xl hover:scale-110'
        onClick={handleDelete}
        disabled={isDeleting}
        >
        🗑️
        </button>
    );
}

export default DeleteButton;