import { ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/services/api';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { searchImageForQuery } from '@/services/imageApi';
import DeleteButton from '@/pages/DeleteProduct';
import { useAuth } from '@/context/AuthContext';

interface ProductCardProps {
  product: Product;
}

const imageCache = new Map<string, string | null>();

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCart((state) => state.addItem);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleAddToCart = (e: React.MouseEvent) => {
    if(isAuthenticated){
      e.preventDefault();
      addItem(product);
      toast.success('Produto adicionado ao carrinho!');
    }
    else{
      navigate('/login');
      alert("IRMAO VC NAO TA LOGADO");
    }
   
  };

  const [imgUrl, setImgUrl] = useState<string | undefined>(product?.imageUrl || undefined);

  useEffect(() => {
    if (!product || imgUrl) return;
    const query = product.nome || (product.descricao || '').split(' ')[0] || 'produto';
    if (imageCache.has(query)) {
      setImgUrl(imageCache.get(query) || undefined);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const url = await searchImageForQuery(query);
        imageCache.set(query, url);
        if (!cancelled) setImgUrl(url || undefined);
      } catch (err) {
        console.error('Erro ao buscar imagem:', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imgUrl, product]);

  if (!product?.id || !product?.nome || product?.preco === undefined) {
    return (
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="p-4">
          <p className="text-red-500">Erro: Dados do produto incompletos</p>
          <pre className="mt-2 text-xs text-gray-500">
            {JSON.stringify({id: product?.id, nome: product?.nome, preco: product?.preco}, null, 2)}
          </pre>
        </div>
      </Card>
    );
  }
  return (
    
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg animate_animated animate_fade-in">
        <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={product.nome}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-secondary">
              <span className="text-4xl text-muted-foreground">
                {product?.nome?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="line-clamp-1 font-semibold">{product?.nome}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {product?.descricao}
          </p>
          <p className="mt-2 text-2xl font-bold text-nlack">
            R$ {product.preco.toFixed(2)}
          </p>
        </CardContent>
      </Link> 
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-black text-primary-foreground transition-all hover:opacity-90"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
          <DeleteButton productId={product.id} productName={product.nome} onDeleteSucess/>
        </CardFooter>
      </Card>
    
  );
};

export default ProductCard;
