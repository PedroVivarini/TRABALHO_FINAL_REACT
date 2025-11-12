import React, { useState, useCallback } from 'react';
import { productApi, Product } from '../services/api';
import { useAuth } from '../context/AuthContext';

type NewProductData = Omit<Product, 'id' | 'categoriaNome' | 'name' | 'description' | 'price' | 'category' | 'stock' | 'imageUrl'> & {
    nome: string;
    descricao: string;
    preco: number;
    categoriaId: number;
};

const initialProductState: NewProductData = {
    nome: '',
    descricao: '',
    preco: 0,
    categoriaId: 1,
};

export const Register: React.FC = () => {
    const [productData, setProductData] = useState<NewProductData>(initialProductState);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: (type === 'number' || name === 'categoriaId') ? Number(value) : value,
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const productToCreate = {
            nome: productData.nome,
            descricao: productData.descricao,
            preco: productData.preco,
            categoriaId: productData.categoriaId,
        };

        try {
            const createdProduct = await productApi.create(productToCreate);
            setSuccess(`Produto "${createdProduct.nome}" criado com sucesso! ID: ${createdProduct.id}`);
            setProductData(initialProductState);
        } catch (err) {
            console.error('Erro ao criar produto:', err);
            setError('Falha ao criar o produto.');
        } finally {
            setLoading(false);
        }
    }, [productData]);


    return (
        <div className="flex w-full justify-center items-center min-h-screen px-4 bg-[#f3f3f3]">
            {isAuthenticated ? (
                <div className="bg-white shadow-2xl rounded-lg w-full max-w-xl p-6 sm:p-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
                        Cadastrar Novo Produto
                    </h2>

                    {loading && (
                        <div className="p-3 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg">
                            Processando...
                        </div>
                    )}
                    {error && (
                        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg">
                            Erro: {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 border border-green-400 rounded-lg">
                            Sucesso: {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                id="nome"
                                type="text"
                                name="nome"
                                value={productData.nome}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#dbdbdb] appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-black peer"
                            />
                            <label htmlFor="nome" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                Nome do Produto
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                id="descricao"
                                name="descricao"
                                value={productData.descricao}
                                onChange={handleChange as any}
                                required
                                placeholder=" "
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#dbdbdb] appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-black peer"
                            />
                            <label htmlFor="descricao" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                Descrição
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                id="preco"
                                type="text"
                                name="preco"
                                value={productData.preco === 0 ? '' : productData.preco}
                                onChange={handleChange}
                                min="0.01"
                                step="0.01"
                                required
                                placeholder=" "
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#dbdbdb] appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-black peer"
                            />
                            <label htmlFor="preco" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                Preço:
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                id="categoriaId"
                                type="number"
                                name="categoriaId"
                                value={productData.categoriaId === 0 ? '' : productData.categoriaId}
                                onChange={handleChange}
                                placeholder=" "
                                min="1"
                                required
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#dbdbdb] appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-black peer"
                            />
                            <label htmlFor="categoriaId" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                Categoria ID:
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 rounded-md text-sm sm:text-base text-black hover:text-white font-semibold transition duration-200 ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'border border-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2'
                                }`}
                        >
                            {loading ? 'Criando...' : 'Postar Produto'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-white shadow-2xl rounded-lg p-10 text-center">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">NAO VAI SUBIR NINGUEM✌🏾✌🏾✌🏾</h2>
                    <p className="text-lg text-gray-700">Você precisa estar logado para cadastrar novos produtos.</p>
                </div>
            )}
        </div>

    );
};