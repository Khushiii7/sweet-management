import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Plus, Minus, Star, Clock, Scale, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useToast } from '../../hooks/use-toast';

const SweetModal = ({ sweet, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart, addToWishlist, wishlist, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!sweet || !isOpen) return null;

  const isInWishlist = wishlist.some(item => item.id === sweet.id);
  const discount = sweet.originalPricePerKg ? Math.round(((sweet.originalPricePerKg - sweet.pricePerKg) / sweet.originalPricePerKg) * 100) : 0;
  const images = [sweet.image, ...(sweet.additional_images || [])].filter(Boolean);

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
    try {
      await addToCart(sweet, quantity);
      toast({
        title: "Added to Cart!",
        description: `${quantity} ${sweet.name} added to your cart`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to add to cart",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to manage your wishlist",
        variant: "destructive"
      });
      return;
    }

    try {
      await addToWishlist(sweet);
      toast({
        title: isInWishlist ? "Removed from Wishlist" : "Added to Wishlist!",
        description: isInWishlist ? `Removed ${sweet.name} from your wishlist` : `${sweet.name} added to your wishlist`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update wishlist",
        variant: "destructive"
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-4xl bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-2 bg-white/90 backdrop-blur-sm hover:bg-rose-50 transition-colors shadow-sm border border-gray-200"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-rose-600" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Image Gallery */}
              <div className="relative bg-gray-50">
                <div className="relative h-80 md:h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <img
                    src={images[currentImage]}
                    alt={sweet.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                
                {/* Image Thumbnails */}
                {images.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                    <div className="flex space-x-2 overflow-x-auto pb-1">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImage(index)}
                          className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                            currentImage === index 
                              ? 'border-rose-500 scale-105'
                              : 'border-transparent opacity-80 hover:opacity-100 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${sweet.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh] bg-white backdrop-blur-sm">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{sweet.name}</h2>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= (sweet.rating || 5) 
                                ? 'text-amber-400 fill-current'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({sweet.review_count || 'No'} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-rose-600">
                        ₹{sweet.pricePerKg.toFixed(2)}/kg
                      </span>
                      {sweet.originalPricePerKg && (
                        <>
                          <span className="text-lg text-gray-400 line-through">
                            ₹{sweet.originalPricePerKg.toFixed(2)}/kg
                          </span>
                          <Badge className="ml-2 bg-green-100 text-green-800">
                            {discount}% OFF
                          </Badge>
                        </>
                      )}
                    </div>
                    {sweet.stock_quantity > 0 ? (
                      <div className="flex items-center text-sm text-green-600">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        In Stock ({sweet.stock_quantity} available)
                      </div>
                    ) : (
                      <div className="text-sm text-rose-600">Out of Stock</div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <p>{sweet.description}</p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                    {sweet.weight && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Scale className="h-4 w-4 text-rose-500" />
                        <span>{sweet.weight}g</span>
                      </div>
                    )}
                    {sweet.prep_time && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Clock className="h-4 w-4 text-rose-500" />
                        <span>Ready in {sweet.prep_time}</span>
                      </div>
                    )}
                    {sweet.category && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Award className="h-4 w-4 text-rose-500" />
                        <span className="capitalize">{sweet.category}</span>
                      </div>
                    )}
                    {sweet.shelf_life && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Clock className="h-4 w-4 text-rose-500" />
                        <span>Shelf life: {sweet.shelf_life}</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="pt-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 hover:bg-gray-50 text-gray-600 transition-colors"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center text-gray-900">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-50 text-gray-600 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">
                        {sweet.stock_quantity > 0 
                          ? `${sweet.stock_quantity} available` 
                          : 'Out of stock'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3 pt-2">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 transition-all"
                      onClick={handleAddToCart}
                      disabled={sweet.stock_quantity <= 0 || isLoading}
                    >
                      {isLoading ? (
                        'Adding...'
                      ) : sweet.stock_quantity > 0 ? (
                        <>
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          Add to Cart - ₹{(sweet.pricePerKg * quantity).toFixed(2)}
                        </>
                      ) : (
                        'Out of Stock'
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                      onClick={handleWishlistToggle}
                    >
                      <Heart 
                        className={`mr-2 h-5 w-5 ${
                          isInWishlist 
                            ? 'fill-rose-500 text-rose-500' 
                            : 'text-rose-400'
                        }`} 
                      />
                      {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SweetModal;