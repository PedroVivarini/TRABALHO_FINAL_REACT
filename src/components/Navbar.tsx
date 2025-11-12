import { Badge, ShoppingCart, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const itemCount = useCart((state) => state.itemCount());
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="text-xl font-bold">eCommerce</span>
          </Link>

          

          <div className="flex items-center gap-4">

             {isAuthenticated ? (
                <button className='flex items-center'>
                    <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" className='h-[30px] mr-3' alt="" />
                    <h1>{user ? user.nome : 'Admin'}</h1>
                </button>
            ) : (
                <button 
                    type="button" 
                    className="black hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                    <Link to="/login">Login</Link>
                </button>
            )}

            <Link to="/cart">
              <Button size="icon" className="relative text-black hover:text-white bg-[#0000] hover:bg-black hover:opacity-90">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    className="absolute text-red bg-[#00000021] -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

           {isAuthenticated ? (
                <button type="button" className="black hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "><Link to="/register">Cadastrar Produtos</Link></button>
            ) : (
                <div></div>
            )}

            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
