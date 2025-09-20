import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, Plus, Minus, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useToast } from '../../hooks/use-toast';

const SweetCard = ({ sweet, onDetailsClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, addToWishlist, wishlist, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const isInWishlist = wishlist.some(item => item.sweet_id === sweet.id);
  const discount = sweet.original_price ? Math.round(((sweet.original_price - sweet.price) / sweet.original_price) * 100) : 0;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to add items to cart",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const result = await addToCart(sweet, quantity);
    if (result.success) {
      toast({
        title: "Added to Cart!",
        description: `${quantity} ${sweet.name} added to your cart`,
        variant: "default"
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to add items to wishlist",
        variant: "destructive"
      });
      return;
    }

    const result = await addToWishlist(sweet);
    if (result.success) {
      toast({
        title: isInWishlist ? "Removed from Wishlist" : "Added to Wishlist!",
        description: isInWishlist ? `${sweet.name} removed from your wishlist` : `${sweet.name} added to your wishlist`,
        variant: "default"
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={sweet.image}
          alt={sweet.name}
          className="w-full h-full object-cover"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease-in-out'
          }}
          loading="lazy"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          {sweet.featured && (
            <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 shadow-lg">
              ⭐ Featured
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-green-500 text-white border-0 shadow-lg">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white/100 shadow-md"
            onClick={handleWishlistToggle}
          >
            <Heart 
              className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
            />
          </Button>
        </div>

        {/* View Details Button */}
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full px-6 font-medium shadow-lg flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick(sweet);
            }}
          >
            Quick View <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{sweet.name}</h3>
          <div className="flex items-center bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">{sweet.rating || '4.5'}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 h-10">
          {sweet.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{sweet.price.toFixed(2)}
              </span>
              {sweet.original_price && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ₹{sweet.original_price.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">per {sweet.weight || '500g'}</span>
          </div>
          
          <Button 
            size="sm" 
            className="rounded-full px-4 font-medium bg-gradient-to-r from-indigo-600 to-fuchsia-500 hover:from-indigo-700 hover:to-fuchsia-600 shadow-md"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
      
      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-indigo-600/90 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button 
              variant="outline" 
              className="bg-white/90 backdrop-blur-sm text-indigo-600 hover:bg-white hover:text-indigo-700 border-0 shadow-lg"
              onClick={() => onDetailsClick(sweet)}
            >
              View Details
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SweetCard;