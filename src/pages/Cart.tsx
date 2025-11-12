import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';


const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-bold">Seu carrinho está vazio</h2>
          <p className="mt-2 text-muted-foreground">
            Adicione produtos para começar suas compras
          </p>
          <Button onClick={() => navigate('/')} className="mt-6">
            Ver Produtos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-black py-8 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuar Comprando
          </Button>
          <h1 className="text-3xl font-bold md:text-4xl">Carrinho de Compras</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4 animate-fade-in">
            {items.map((item) => (
              <Card key={item.product.id} className="rounded-xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.nome}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <span className="text-3xl font-semibold text-muted-foreground">
                            {item.product.nome?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between w-full">
                      <div>
                        <h3 className="font-semibold text-lg">{item.product.nome}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.product.descricao}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full border bg-white/0 text-sm transition-colors text-black hover:bg-black hover:text-white"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            -
                          </Button>
                          <span className="w-10 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full border bg-white/0 text-sm text-black transition-colors hover:bg-black hover:text-white"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                          <p className="text-xl font-semibold text-black">
                            R$ {(item.product.preco * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.product.id)}
                            className="text-destructive hover:bg-gray-400/10 hover:text-red"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1 w-full">
            <Card className="sticky top-24 animate-scale-in">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold">Resumo do Pedido</h2>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>R$ {total().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span>Grátis</span>
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">R$ {total().toFixed(2)}</span>
                  </div>
                </div>

                <Button className="mt-6 w-full text-lg transition-all hover:opacity-90" size="lg">
                  Finalizar Compra
                </Button>

                <Button className="mt-2 w-full" onClick={clearCart}>
                  Limpar Carrinho
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
