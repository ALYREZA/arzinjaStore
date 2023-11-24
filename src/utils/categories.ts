export type CategoryType = CategoryFields[];
export type CategoryFields = {name: string; description: string};
const data = [
  {
    name: 'T-shirts',
    description: 'Casual and comfortable tops',
  },
  {
    name: 'Jeans',
    description: 'Denim pants for a classic look',
  },
  {
    name: 'Dresses',
    description: 'Stylish outfits for various occasions',
  },
  {
    name: 'Sweaters',
    description: 'Warm and cozy knitwear',
  },
  {
    name: 'Jackets',
    description: 'Outerwear for different seasons',
  },
  {
    name: 'Activewear',
    description: 'Sporty and functional clothing',
  },
  {
    name: 'Formal Wear',
    description: 'Elegant attire for special events',
  },
  {
    name: 'Underwear',
    description: 'Comfortable and supportive undergarments',
  },
  {
    name: 'Accessories',
    description: 'Enhance your style with hats, scarves, etc.',
  },
  {
    name: 'Swimwear',
    description: 'Stylish outfits for the pool or beach',
  },
];

function getCategories(): Promise<any[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1500);
  });
}

export {getCategories};
