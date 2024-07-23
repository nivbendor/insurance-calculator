import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Toggle } from './ui/toggle';
import { Product, PremiumResult, CostView} from '../utils/insuranceTypes';  // Adjust the import path as needed
import { calculatePremiumByCostView} from '../utils/insuranceUtils';  


interface ActiveProductsToggleProps {
  products: Record<Product, boolean>;
  handleProductToggle: (product: Product) => void;
  premiums: PremiumResult;
  costView: CostView;
}

const ActiveProductsToggle: React.FC<ActiveProductsToggleProps> = ({ 
  products, 
  handleProductToggle, 
  premiums, 
  costView 
}) => {
  return (
    <Card className="test">
      <CardHeader className="test">Active Products</CardHeader>
      <CardContent className="test">
        <p className="mb-2 text-sm text-gray-500">{costView} premium per employee</p>
        {Object.entries(products).map(([product, active]) => {
          const premium = premiums[product] || 0;
          const formattedPremium = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(calculatePremiumByCostView(premium, costView));
          return (
            <div key={product} className="mb-2 flex justify-between items-center">
              <Toggle
                pressed={active}
                onPressedChange={() => handleProductToggle(product as Product)}
                className={active ? "bg-blue-500 text-white" : ""}
              >
                {product}
              </Toggle>
              <span className="text-sm">{formattedPremium}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ActiveProductsToggle;