import { useState } from "react";

function AdvancedFilters({ 
  filters, 
  onFilterChange, 
  onPriceRangeChange,
  onCategoryChange 
}) {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const categories = ["electronics", "fashion", "home", "beauty", "sports"];
  const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas", "Dyson"];
  const ratings = [4, 3, 2, 1];

  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    onCategoryChange(newCategories);
  };

  const handleBrandToggle = (brand) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    setSelectedBrands(newBrands);
    onFilterChange('brands', newBrands);
  };

  const handleRatingToggle = (rating) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    
    setSelectedRatings(newRatings);
    onFilterChange('ratings', newRatings);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
    onPriceRangeChange(min, max);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setPriceRange([0, 2000]);
    onFilterChange('clear', null);
  };

  return (
    <div className="advanced-filters-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={clearAllFilters} className="clear-filters-btn">
          Clear all
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
          />
        </div>
        <div className="price-slider">
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
          />
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
          />
        </div>
        <div className="price-display">
          ${priceRange[0]} - ${priceRange[1]}
        </div>
      </div>

      {/* Categories Filter */}
      <div className="filter-section">
        <h4>Categories</h4>
        {categories.map(category => (
          <label key={category} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
            />
            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </label>
        ))}
      </div>

      {/* Brands Filter */}
      <div className="filter-section">
        <h4>Brands</h4>
        {brands.map(brand => (
          <label key={brand} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandToggle(brand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      {/* Ratings Filter */}
      <div className="filter-section">
        <h4>Customer Reviews</h4>
        {ratings.map(rating => (
          <label key={rating} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => handleRatingToggle(rating)}
            />
            <span>
              {Array(rating).fill('★').join('')}
              {Array(5 - rating).fill('☆').join('')} & Up
            </span>
          </label>
        ))}
      </div>

      {/* Delivery Options */}
      <div className="filter-section">
        <h4>Delivery</h4>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span>Free Shipping</span>
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span>Next-Day Delivery</span>
        </label>
      </div>

      {/* Availability */}
      <div className="filter-section">
        <h4>Availability</h4>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span>In Stock Only</span>
        </label>
      </div>
    </div>
  );
}

export default AdvancedFilters;