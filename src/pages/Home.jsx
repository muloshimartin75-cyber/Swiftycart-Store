import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import AdvancedFilters from "../components/AdvancedFilters";
import { productsAPI } from "../utils/api";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  
  // Advanced filter states
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Sync search term with URL params
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch && urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (category !== "all") params.category = category;
        if (brand !== "all") params.brand = brand;
        if (priceRange[0] > 0) params.minPrice = priceRange[0];
        if (priceRange[1] < 2000) params.maxPrice = priceRange[1];
        if (sortBy) params.sortBy = sortBy;
        
        const response = await productsAPI.getAll(params);
        let filtered = response.products || [];

        // Client-side filtering for advanced filters
        if (selectedCategories.length > 0) {
          filtered = filtered.filter(product => 
            selectedCategories.includes(product.category)
          );
        }

        if (selectedBrands.length > 0) {
          filtered = filtered.filter(product => 
            selectedBrands.includes(product.brand)
          );
        }

        if (selectedRatings.length > 0) {
          filtered = filtered.filter(product => 
            selectedRatings.some(rating => product.rating >= rating)
          );
        }

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        // Fallback to empty array
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    searchTerm, category, brand, sortBy, priceRange, 
    selectedCategories, selectedBrands, selectedRatings
  ]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (cat) => {
    setCategory(cat);
  };

  const handleBrandFilter = (brand) => {
    setBrand(brand);
  };

  const handleSort = (sort) => {
    setSortBy(sort);
  };

  const handleAdvancedFilterChange = (type, value) => {
    if (type === 'brands') {
      setSelectedBrands(value);
    } else if (type === 'ratings') {
      setSelectedRatings(value);
    } else if (type === 'clear') {
      setSelectedCategories([]);
      setSelectedBrands([]);
      setSelectedRatings([]);
      setPriceRange([0, 2000]);
    }
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange([min, max]);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  // Calculate statistics
  const showingProducts = products.length;
  const priceRangeText = showingProducts > 0 
    ? `$${Math.min(...products.map(p => p.price))} - $${Math.max(...products.map(p => p.price))}`
    : "$0 - $0";

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error-container">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Search and Basic Filters */}
      <SearchFilter 
        onSearch={handleSearch}
        onFilter={handleFilter}
        onBrandFilter={handleBrandFilter}
        onSort={handleSort}
      />

      {/* Results Header */}
      <div className="results-header">
        <div className="results-stats">
          <div className="results-count">
            <span className="count-number">{showingProducts}</span>
            <span className="count-label">products found</span>
          </div>
          
          {showingProducts > 0 && (
            <div className="price-range-info">
              <span className="price-range-label">Price Range: </span>
              <span className="price-range-value">{priceRangeText}</span>
            </div>
          )}
        </div>
        
        <div className="results-actions">
          <button 
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? (
              <>
                <span className="btn-icon">▲</span>
                Hide Filters
              </>
            ) : (
              <>
                <span className="btn-icon">▼</span>
                Show Filters
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="home-content">
        {/* Advanced Filters Sidebar */}
        {showFilters && (
          <div className="filters-sidebar">
            <AdvancedFilters
              filters={{
                categories: selectedCategories,
                brands: selectedBrands,
                ratings: selectedRatings,
                priceRange: priceRange
              }}
              onFilterChange={handleAdvancedFilterChange}
              onPriceRangeChange={handlePriceRangeChange}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        )}

        {/* Products Grid */}
        <div className={`products-container ${showFilters ? 'with-filters' : ''}`}>
          {products.length > 0 ? (
            <div className="products-grid" style={{ marginTop: '1rem' }}>
              {products.map((product) => (
                <ProductCard product={product} key={product._id || product.id} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>We couldn't find any products matching your criteria.</p>
              <button 
                className="browse-all-btn"
                onClick={() => {
                  setSearchTerm("");
                  setCategory("all");
                  setBrand("all");
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                  setSelectedRatings([]);
                  setPriceRange([0, 2000]);
                }}
              >
                Browse All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;