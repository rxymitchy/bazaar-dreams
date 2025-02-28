
import { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Product, CartItem } from "@/lib/types";
import { 
  featuredProducts, 
  newArrivals, 
  discountedProducts 
} from "@/lib/data";

interface IndexProps {
  addToCart: (product: Product) => void;
}

const Index = ({ addToCart }: IndexProps) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  
  // Hero image preload
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    img.onload = () => setHeroLoaded(true);
  }, []);

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="pt-20 md:pt-32 min-h-[85vh] relative flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <Badge variant="outline" className="mb-4 animate-fade-in">
                New Collection
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight animate-slide-up">
                Thoughtfully designed home essentials
              </h1>
              <p className="mt-6 text-lg text-muted-foreground animate-slide-up animation-delay-100">
                Premium products that combine beautiful design with exceptional functionality. Made to elevate your everyday life.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 animate-slide-up animation-delay-200">
                <Link to="/products">
                  <Button size="lg" className="btn-hover">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="btn-hover">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className={`aspect-square relative rounded-lg overflow-hidden transition-opacity duration-500 ${heroLoaded ? 'opacity-100' : 'opacity-0 img-loading'}`}>
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Minimalist home interior with modern furniture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium tracking-tight text-center mb-12">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Lighting', 'Furniture', 'Electronics', 'Home Decor'].map((category, index) => (
              <div 
                key={category} 
                className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-all animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-medium mb-2">{category}</h3>
                <Link to={`/products?category=${category}`}>
                  <Button variant="link" className="group">
                    Shop now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <FeaturedProducts
        title="Featured Products"
        subtitle="Our most popular products, carefully selected for their exceptional design and quality."
        products={featuredProducts}
        onAddToCart={addToCart}
      />
      
      {/* Brand Story Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600494603989-9650cf6dad51?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Our workspace"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="max-w-lg">
              <h2 className="text-3xl font-medium tracking-tight mb-6">
                Designed with intention, built to last
              </h2>
              <p className="text-muted-foreground mb-4">
                At minimalist, we believe that the objects in your life should be thoughtfully designed, ethically made, and built to stand the test of time.
              </p>
              <p className="text-muted-foreground mb-6">
                Each product in our collection is created with careful attention to materials, function, and aesthetic—because we believe that the everyday should be exceptional.
              </p>
              <Link to="/about">
                <Button variant="outline" className="btn-hover">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <FeaturedProducts
          title="New Arrivals"
          subtitle="The latest additions to our collection of thoughtfully designed products."
          products={newArrivals}
          viewAllLink="/products?filter=new"
          onAddToCart={addToCart}
        />
      )}
      
      {/* Banner Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-medium tracking-tight mb-4">
            Join our newsletter
          </h2>
          <p className="max-w-xl mx-auto mb-6">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:font-medium placeholder:text-primary-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button variant="secondary" className="btn-hover whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      
      {/* On Sale Section */}
      {discountedProducts.length > 0 && (
        <FeaturedProducts
          title="On Sale"
          subtitle="Limited-time offers on select premium products."
          products={discountedProducts}
          viewAllLink="/products?filter=discounted"
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default Index;
