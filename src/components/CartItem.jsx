
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { product, quantity } = item;
  
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);
  
  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price * quantity);

  return (
    <div className="flex items-start space-x-4 py-6 animate-fade-in">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block flex-shrink-0">
        <div className={`w-24 h-24 rounded-md overflow-hidden ${!isImageLoaded ? "img-loading" : ""}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
      </Link>
      
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mt-1">
          {formattedPrice} × {quantity} = {totalPrice}
        </p>
        
        {/* Quantity Control */}
        <div className="flex items-center mt-3 space-x-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => quantity > 1 && updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm">{quantity}</span>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={() => removeItem(product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
