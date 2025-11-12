import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ShoppingCart, Package } from 'lucide-react';
import { productApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { searchImageForQuery, imageCache } from '@/services/imageApi';
import { useAuth } from '@/context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCart((state) => state.addItem);
  const {isAuthenticated} = useAuth();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(Number(id)),
    enabled: !!id,
  });

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
        console.error('Erro ao buscar imagem detalhe:', err);
      }
    })();
    return () => { cancelled = true; };
  }, [product, imgUrl]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addItem(product, quantity);
      toast.success(`${quantity} ${quantity > 1 ? 'itens adicionados' : 'item adicionado'} ao carrinho!`);
    }
    else{
      alert("VOCE NAO TA LOGADO")
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-8 h-10 w-32" />
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-bold">Produto não encontrado</h2>
        <Button onClick={() => navigate('/')} className="mt-4">
          Voltar para produtos
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid gap-8 lg:grid-cols-2 animate-fade-in">
          <Card className="overflow-hidden">
            <div className="aspect-square overflow-hidden bg-muted">
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt={product.nome}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-secondary">
                  <span className="text-9xl text-muted-foreground">
                    {product.nome.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </Card>

          <div className="flex flex-col">
            <div className="flex-1 space-y-6">
              <div>
                {(product.categoriaNome || product.category) && (
                  <Badge variant="secondary" className="mb-3">
                    {product.categoriaNome || product.category}
                  </Badge>
                )}
                <h1 className="text-3xl font-bold md:text-4xl">
                  {product.nome || product.name}
                </h1>
              </div>

              <div>
                <p className="text-4xl font-bold text-primary">
                  R$ {(product.preco ?? product.price ?? 0).toFixed(2)}
                </p>
                {product.stock !== undefined && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {product.stock > 0
                      ? `${product.stock} unidades disponíveis`
                      : 'Fora de estoque'}
                  </p>
                )}
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">Descrição</h3>
                  <p className="text-muted-foreground">{product.descricao}</p>
                </CardContent>
              </Card>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              size="lg"
              className="mt-6 w-full text-lg transition-all hover:opacity-90"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
