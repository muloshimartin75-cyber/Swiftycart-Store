import React, { useState } from "react";

function SearchFilter({ onSearch, onFilter, onSort, onBrandFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onFilter(value);
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand(value);
    onBrandFilter(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  const quickFilters = [
    { label: "Electronics", value: "electronics", icon: "📱" },
    { label: "Clothing", value: "clothing", icon: "👕" },
    { label: "Under $50", value: "price-low", icon: "💲" },
    { label: "Top Rated", value: "rating", icon: "⭐" },
    { label: "Fast Delivery", value: "delivery", icon: "🚚" }
  ];

  const handleQuickFilter = (filter) => {
    if (filter.value === "electronics" || filter.value === "clothing") {
      setCategory(filter.value);
      onFilter(filter.value);
    } else if (filter.value === "price-low") {
      setSortBy("price-low");
      onSort("price-low");
    } else if (filter.value === "rating") {
      setSortBy("rating");
      onSort("rating");
    }
  };

  return (
    <div className="search-filter-container">
      {/* Main Search Bar */}
      <div className="search-section">
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="filters-section">
        <div className="filter-grid">
          {/* Category Filter */}
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select 
              value={category} 
              onChange={handleCategoryChange}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Kitchen</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>

          {/* Brand Filter */}
          <div className="filter-group">
            <label className="filter-label">Brand</label>
            <select 
              value={brand} 
              onChange={handleBrandChange}
              className="filter-select"
            >
              <option value="all">All Brands</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select 
              value={sortBy} 
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="quick-filters">
          <label className="quick-filters-label">Quick Filters:</label>
          <div className="filter-chips">
            {quickFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleQuickFilter(filter)}
                className={`filter-chip ${
                  (category === filter.value || sortBy === filter.value) ? 'active' : ''
                }`}
              >
                <span className="chip-icon">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;