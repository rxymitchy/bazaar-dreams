
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import CartItem from "@/components/CartItem";

const Cart = ({ cartItems, updateQuantity, removeItem, clearCart }) => {
  const [subtotal, setSubtotal] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Calculate subtotal when cart items change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This would normally proceed to payment...",
    });
    // In a real app, this would navigate to a checkout page or process
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Calculate other costs
  const shipping = subtotal > 75 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="pt-20 page-enter">
      {/* Cart Header */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-medium mb-4">Your Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length > 0
              ? `You have ${cartItems.length} ${
                  cartItems.length === 1 ? "item" : "items"
                } in your cart.`
              : "Your cart is empty."}
          </p>
        </div>
      </section>
      
      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="mb-6">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/products">
                <Button className="btn-hover">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Items</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive flex items-center gap-1"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.product.id}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeItem={removeItem}
                    />
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary rounded-lg p-6">
                  <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0
                          ? "Free"
                          : formatCurrency(shipping)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (7%)</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-base font-medium pt-2">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-6 btn-hover"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Shipping calculated at checkout. <br />
                    Free shipping on orders over $75.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
