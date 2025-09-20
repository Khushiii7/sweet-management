import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SortAsc } from 'lucide-react';
import SweetCard from './SweetCard';
import SweetModal from './SweetModal';
import { sweetsAPI, categoriesAPI } from '../../services/api';
import { mockSweetsAPI, mockCategoriesAPI } from '../../services/mockApi'; 
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../../hooks/use-toast';

// Use mock data in development or if explicitly enabled
const useMockData = process.env.NODE_ENV === 'development' || process.env.REACT_APP_USE_MOCK_DATA === 'true';

const SweetGrid = ({ searchQuery = '' }) => {
  const [sweets, setSweets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const api = useMockData ? {
    sweets: mockSweetsAPI,
    categories: mockCategoriesAPI
  } : {
    sweets: sweetsAPI,
    categories: categoriesAPI
  };

  useEffect(() => {
    loadSweets();
    loadCategories();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      loadSweets();
    }
  }, [selectedCategory, sortBy, searchQuery]);

  const loadSweets = async () => {
    try {
      setIsLoading(true);
      const params = {
        category: selectedCategory !== 'all' ? categories.find(c => c.name === selectedCategory)?.name : undefined,
        search: searchQuery || undefined,
        sort_by: sortBy === 'name' ? 'name' : 'price',
        sort_order: sortBy === 'price-high' ? 'desc' : 'asc',
      };
      
      const response = await api.sweets.getSweets(params);
      
      if (response.data.length === 0 && searchQuery) {
        const broadSearchResponse = await api.sweets.getSweets({
          search: searchQuery,
          sort_by: 'name',
        });
        setSweets(broadSearchResponse.data);
      } else {
        setSweets(response.data);
      }
    } catch (error) {
      console.error('Error loading sweets:', error);
      toast({
        title: 'Error',
        description: 'Failed to load sweets. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await api.categories.getCategories();
      setCategories([{ id: 'all', name: 'All Categories' }, ...response.data]);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories. Using default categories.',
        variant: 'destructive',
      });
      setCategories([
        { id: 'all', name: 'All Categories' },
        { id: 'indian', name: 'Indian Sweets' },
        { id: 'chocolates', name: 'Chocolates' },
        { id: 'cupcakes', name: 'Cupcakes' },
        { id: 'gummies', name: 'Gummies' },
        { id: 'candies', name: 'Candies' },
      ]);
    }
  };

  const handleSweetClick = (sweet) => {
    setSelectedSweet(sweet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSweet(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Our Sweet Collection
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {isLoading ? 'Loading delicious sweets...' : `Found ${sweets.length} delicious sweets`}
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="flex-1 md:flex-none">
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <SortAsc className="h-4 w-4 mr-1" />
              <span className="mr-2">Sort by:</span>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-32 animate-pulse"></div>
          ))}
        </div>
      ) : sweets.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍬</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No sweets found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSelectedCategory('all');
              setSortBy('name');
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sweets.map((sweet) => (
            <motion.div 
              key={sweet.id} 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSweetClick(sweet)}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-40 h-32 rounded-lg overflow-hidden">
                  <img 
                    src={sweet.image} 
                    alt={sweet.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{sweet.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                    {sweet.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold">
                        ₹{sweet.pricePerKg.toFixed(2)}/kg
                        {sweet.originalPricePerKg && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{sweet.originalPricePerKg.toFixed(2)}/kg
                          </span>
                        )}
                      </span>
                      {sweet.originalPricePerKg && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          {Math.round(((sweet.originalPricePerKg - sweet.pricePerKg) / sweet.originalPricePerKg) * 100)}% OFF
                        </span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="hidden sm:flex"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSweetClick(sweet);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Sweet Details Modal */}
      <SweetModal 
        sweet={selectedSweet} 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SweetGrid;