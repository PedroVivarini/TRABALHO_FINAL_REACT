import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi, PageResponse, Product, ProductQueryParams } from '../services/api'; 
import ProductCard from '../components/ProductCard';
import { Skeleton } from '../components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import SearchInput from '@/components/ui/searchInput';

const PAGE_SIZE = 12; 

const Products = () => {
    const [currentPage, setCurrentPage] = useState(0); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [categoryFilter, setCategoryFilter] = useState(''); 

   const handleSearch = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(0); 
    }, []);

    const queryParams: ProductQueryParams = {
        page: currentPage, 
        size: PAGE_SIZE,
        nameQuery: searchTerm,
        category: categoryFilter,
    };

    const { 
        data: pageData, 
        isLoading, 
        error 
    } = useQuery<PageResponse<Product>>({
        queryKey: ['products', currentPage, PAGE_SIZE, searchTerm, categoryFilter], 
        queryFn: async () => {
            const response = await productApi.getAll(queryParams);
            
            const products = response.content.map(product => ({
                ...product,
                price: typeof product.preco === 'string' ? parseFloat(product.preco) : Number(product.preco)
            }));
            
            return { ...response, content: products };
        },
        keepPreviousData: true, 
    });

    const goToPage = (page: number) => {
        if (page >= 0) { 
            setCurrentPage(page);
        }
    };

    const productsList = pageData?.content || [];
    const totalPages = pageData?.totalPages || 0;
    
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>
                        Não foi possível carregar os produtos. Verifique se a API está rodando e se a configuração CORS está correta.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-black py-12 text-center text-primary-foreground">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Nossos Produtos
                    </h1>
                    <p className="mt-3 text-lg opacity-90">
                        Encontre os melhores produtos com preços incríveis
                    </p>
                </div>
            </div>

            <div className="container my-12">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between">
                    
                    <div className="md:w-1/3">
                        <SearchInput 
                            onSearch={handleSearch} 
                            placeholder="Buscar por nome..."
                        />
                    </div>
                </div>

                {isLoading && !pageData ? ( 
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(PAGE_SIZE)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="aspect-square w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : productsList.length > 0 ? ( 
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {productsList.map((product) => ( 
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        
                        <div className="mt-12 flex justify-center items-center space-x-4">
                            <Button 
                                onClick={() => goToPage(currentPage - 1)} 
                                disabled={currentPage === 0 || isLoading} 
                                variant="outline"
                            >
                                Anterior
                            </Button>
                            
                            <span className="text-sm text-muted-foreground">
                                Página {currentPage + 1} de {totalPages}
                            </span>
                            
                            <Button 
                                onClick={() => goToPage(currentPage + 1)} 
                                disabled={currentPage >= totalPages - 1 || totalPages === 0 || isLoading} 
                                variant="outline"
                            >
                                Próximo
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-lg text-muted-foreground">
                            Nenhum produto encontrado com os filtros atuais.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;