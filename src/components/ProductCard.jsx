
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({ product, onAddToCart }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const {
    id,
    name,
    price,
    images,
    rating,
    reviews,
    discountPercentage,
    new: isNew,
  } = product;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const discountedPrice = discountPercentage
    ? price - (price * discountPercentage) / 100
    : null;

  const formattedDiscountedPrice = discountedPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(discountedPrice)
    : null;

  return (
    <div className="product-card group rounded-lg overflow-hidden bg-card">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="block relative aspect-square overflow-hidden">
        <div className={`w-full h-full ${!isImageLoaded ? "img-loading" : ""}`}>
          <img
            src={images[0]}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          )}
          {discountPercentage && (
            <Badge variant="destructive">-{discountPercentage}%</Badge>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        
        <Link to={`/product/${id}`}>
          <h3 className="font-medium transition-colors group-hover:text-primary">
            {name}
          </h3>
        </Link>
        
        <div className="mt-1 mb-4">
          {discountPercentage ? (
            <div className="flex items-center space-x-2">
              <span className="font-medium">{formattedDiscountedPrice}</span>
              <span className="text-sm text-muted-foreground line-through">
                {formattedPrice}
              </span>
            </div>
          ) : (
            <span className="font-medium">{formattedPrice}</span>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center gap-2 btn-hover"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
