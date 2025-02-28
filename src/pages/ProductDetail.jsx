
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ChevronRight, Star, Minus, Plus, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import FeaturedProducts from "@/components/FeaturedProducts";
import { getProductById, getRelatedProducts } from "@/lib/data";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch product and related products
  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setRelatedProducts(getRelatedProducts(fetchedProduct));
        setIsLoading(false);
        
        // Reset states on product change
        setQuantity(1);
        setSelectedImage(0);
        setImagesLoaded(Array(fetchedProduct.images.length).fill(false));
      } else {
        navigate("/products", { replace: true });
      }
    }
  }, [id, navigate]);

  const handleImageLoad = (index) => {
    setImagesLoaded(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to your cart`,
      });
    }
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading product...</div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const discountedPrice = product.discountPercentage
    ? product.price - (product.price * product.discountPercentage) / 100
    : null;

  const formattedDiscountedPrice = discountedPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(discountedPrice)
    : null;

  return (
    <div className="pt-20 page-enter">
      {/* Breadcrumbs */}
      <div className="bg-secondary py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground font-medium truncate">
              {product.name}
            </span>
          </div>
        </div>
      </div>
      
      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className={`aspect-square rounded-lg overflow-hidden ${!imagesLoaded[selectedImage] ? "img-loading" : ""}`}>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded[selectedImage] ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => handleImageLoad(selectedImage)}
                />
              </div>
              
              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 transition-opacity ${
                        selectedImage === index
                          ? "ring-2 ring-primary"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Mobile Back Button */}
              <div className="mt-6 lg:hidden">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Products
                </Button>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.new && (
                  <Badge className="bg-primary text-primary-foreground">New</Badge>
                )}
                {product.discountPercentage && (
                  <Badge variant="destructive">-{product.discountPercentage}%</Badge>
                )}
                {product.stock < 10 && (
                  <Badge variant="outline">Low Stock</Badge>
                )}
              </div>
              
              {/* Title */}
              <h1 className="text-3xl font-medium">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="text-xl">
                {discountedPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formattedDiscountedPrice}</span>
                    <span className="text-muted-foreground line-through text-sm">
                      {formattedPrice}
                    </span>
                  </div>
                ) : (
                  <span className="font-medium">{formattedPrice}</span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {product.tags.map(tag => (
                  <Link 
                    key={tag} 
                    to={`/products?tag=${tag}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              
              <Separator />
              
              {/* Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium w-24">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-r-none"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="w-12 text-center">{quantity}</span>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-l-none"
                      onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <span className="ml-4 text-sm text-muted-foreground">
                    {product.stock} available
                  </span>
                </div>
                
                <Button 
                  className="w-full btn-hover" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Additional Info Tabs */}
              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="py-4">
                  <div className="space-y-4 text-sm">
                    <p>
                      Every product in our collection is crafted with premium materials and attention to detail.
                      The {product.name} features:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Premium quality materials</li>
                      <li>Thoughtful, functional design</li>
                      <li>Durable construction</li>
                      <li>Timeless aesthetic</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="py-4">
                  <div className="space-y-3 text-sm">
                    <p>Free standard shipping on all orders over $75.</p>
                    <p>Standard shipping: 3-5 business days</p>
                    <p>Express shipping: 1-2 business days</p>
                    <p>International shipping available to select countries.</p>
                  </div>
                </TabsContent>
                <TabsContent value="returns" className="py-4">
                  <div className="space-y-3 text-sm">
                    <p>We offer a 30-day return policy for most items.</p>
                    <p>Items must be returned in original condition with packaging.</p>
                    <p>Please contact our customer service team to initiate a return.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Desktop Back Button */}
          <div className="mt-12 hidden lg:block">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-medium mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <div key={product.id} className="animate-slide-up">
                  <ProductCard 
                    product={product} 
                    onAddToCart={(p) => addToCart(p, 1)} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
