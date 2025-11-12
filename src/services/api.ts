const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface Product {
    id: number;
    nome?: string;
    descricao?: string;
    preco?: number;
    categoriaId?: number;
    categoriaNome?: string;
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
    imageUrl?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Order {
    id?: number;
    items: CartItem[];
    total: number;
    customerName: string;
    customerEmail: string;
    createdAt?: string;
}

export interface PaginationParams {
    page?: number;
    size?: number;
}

export interface ProductQueryParams extends PaginationParams {
    category?: string;
    nameQuery?: string;
}
 
export const productApi = {

    getAll: async (params: ProductQueryParams = {}): Promise<PageResponse<Product>> => {
        
        const url = new URL(`${API_BASE_URL}/products`);
        
        if (params.page !== undefined) url.searchParams.append('page', params.page.toString());
        if (params.size !== undefined) url.searchParams.append('size', params.size.toString());

        if (params.category) {
            url.searchParams.append('category', params.category);
        }
        if (params.nameQuery) {
            url.searchParams.append('nome', params.nameQuery);
        }

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    getById: async (id: number): Promise<Product> => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        return response.json();
    },

    create: async (product: Omit<Product, 'id'>): Promise<Product> => {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!response.ok) throw new Error('Failed to create product');
        return response.json();
    },

    delete: async (id: number): Promise<void> => { 
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorDetail = await response.text(); 
            throw new Error(`Failed to delete product. Server response: ${errorDetail}`);
        }
    },
};

export const orderApi = {
    create: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });
        if (!response.ok) throw new Error('Failed to create order');
        return response.json();
    },

    getAll: async (): Promise<Order[]> => {
        const response = await fetch(`${API_BASE_URL}/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },
};