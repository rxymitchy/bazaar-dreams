
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  limit?: number;
  viewAllLink?: string;
  onAddToCart: (product: Product) => void;
}

const FeaturedProducts = ({
  title,
  subtitle,
  products,
  limit = 4,
  viewAllLink = "/products",
  onAddToCart,
}: FeaturedProductsProps) => {
  const displayProducts = products.slice(0, limit);

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          <Link to={viewAllLink} className="mt-4 md:mt-0">
            <Button variant="link" className="font-normal flex items-center gap-1 group p-0">
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="animate-slide-up">
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
