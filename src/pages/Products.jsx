
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { 
  products, 
  categories, 
  getAllTags,
  newArrivals,
  featuredProducts,
  discountedProducts 
} from "@/lib/data";
import { useIsMobile } from "@/hooks/use-mobile";

const Products = ({ addToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const allTags = getAllTags();

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const filter = searchParams.get('filter');
    
    if (category) {
      setSelectedCategories([category]);
    }
    
    // Apply filter
    let filtered = [...products];
    
    if (filter === 'new') {
      filtered = newArrivals;
    } else if (filter === 'featured') {
      filtered = featuredProducts;
    } else if (filter === 'discounted') {
      filtered = discountedProducts;
    }
    
    setFilteredProducts(filtered);
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product => 
        product.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [selectedCategories, selectedTags, priceRange]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setPriceRange([0, 500]);
    setSearchParams({});
  };

  return (
    <div className="pt-20 page-enter">
      {/* Header */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
            Our Products
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our collection of thoughtfully designed products for your home and workspace. 
            Each item is selected for its exceptional quality, functionality, and timeless aesthetic.
          </p>
        </div>
      </section>
      
      {/* Products Section with Filters */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            {isMobile && (
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            )}
            
            {/* Filters Sidebar */}
            <div
              className={`lg:w-1/4 ${
                isMobile
                  ? isMobileFiltersOpen
                    ? "fixed inset-0 z-50 bg-background p-6 overflow-y-auto animate-fade-in"
                    : "hidden"
                  : "block"
              }`}
            >
              {isMobile && isMobileFiltersOpen && (
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-medium text-lg">Filters</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
              
              <div className="space-y-8">
                {/* Categories Filter */}
                <div>
                  <h3 className="font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags Filter */}
                <div>
                  <h3 className="font-medium mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
                
                {isMobile && (
                  <Button 
                    className="w-full mt-4"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    View {filteredProducts.length} Products
                  </Button>
                )}
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:w-3/4">
              {!isMobile && (
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredProducts.length} products
                  </p>
                  
                  {/* Applied filters */}
                  {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Active filters:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map(category => (
                          <Badge key={category} variant="secondary" className="flex items-center gap-1">
                            {category}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => toggleCategory(category)} 
                            />
                          </Badge>
                        ))}
                        {selectedTags.map(tag => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => toggleTag(tag)} 
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="font-medium text-lg mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="animate-slide-up">
                      <ProductCard product={product} onAddToCart={addToCart} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
