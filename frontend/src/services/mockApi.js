import { mockSweets, mockCategories } from '../data/mockData';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API for sweets
export const mockSweetsAPI = {
  getSweets: async (params = {}) => {
    // Simulate network delay
    await delay(300);
    
    let filteredSweets = [...mockSweets];
    
    // Filter by category if specified
    if (params.category) {
      filteredSweets = filteredSweets.filter(sweet => 
        sweet.category === params.category
      );
    }
    
    // Filter by search query if specified
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredSweets = filteredSweets.filter(sweet => 
        sweet.name.toLowerCase().includes(searchTerm) ||
        sweet.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort the results
    if (params.sort_by === 'name') {
      filteredSweets.sort((a, b) => a.name.localeCompare(b.name));
    } else if (params.sort_by === 'price') {
      filteredSweets.sort((a, b) => {
        if (params.sort_order === 'desc') {
          return b.price - a.price;
        }
        return a.price - b.price;
      });
    }
    
    return { data: filteredSweets };
  },
  
  getSweet: async (id) => {
    await delay(200);
    const sweet = mockSweets.find(s => s.id === parseInt(id));
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return { data: sweet };
  }
};

// Mock API for categories
export const mockCategoriesAPI = {
  getCategories: async () => {
    await delay(200);
    return { data: mockCategories };
  }
};
