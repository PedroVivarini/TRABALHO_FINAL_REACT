import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import { Login } from '@/pages/Login';
import { AuthProvider, Protected } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

import { Register } from '@/pages/CreateProducts';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import VLibras from '@djpfs/react-vlibras';
import Footer from '@/components/footer';

export function Rotas() {
    return (
        <AuthProvider>
            <BrowserRouter>
            <Navbar />
                <Routes>

                    <Route path="/" element={<Index />} />

                    <Route path="/login" element={<Login />} />

                    <Route path='/cart' element={<Cart />} />

                    <Route path='/register' element={<Register/>}/>

                    <Route path="/product/:id" element={<ProductDetail />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            <Footer />
            <VLibras forceOnload={true} />
            </BrowserRouter>
        </AuthProvider>
    );
}