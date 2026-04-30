import React from 'react';

/**
 * Brand Color Reference Component
 * Use this to verify all company colors are rendering correctly
 */
const BrandColorReference = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8">E-Africa Brand Colors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary - Brand Green */}
          <div>
            <div className="h-32 bg-primary rounded-lg shadow-md mb-4"></div>
            <h3 className="font-bold text-lg">Primary (Brand Green)</h3>
            <p className="text-sm text-gray-600">HEX: #12672A</p>
            <p className="text-sm text-gray-600">HSL: 137 64% 24%</p>
            <p className="text-xs text-gray-500 mt-2">Used for: Buttons, footer, primary CTAs</p>
          </div>

          {/* Accent - Brand Red */}
          <div>
            <div className="h-32 bg-accent rounded-lg shadow-md mb-4"></div>
            <h3 className="font-bold text-lg">Accent (Brand Red)</h3>
            <p className="text-sm text-gray-600">HEX: #BE3419</p>
            <p className="text-sm text-gray-600">HSL: 10 77% 42%</p>
            <p className="text-xs text-gray-500 mt-2">Used for: Icons, accent bars, highlights</p>
          </div>

          {/* Charcoal - Dark Text */}
          <div>
            <div className="h-32 bg-charcoal rounded-lg shadow-md mb-4"></div>
            <h3 className="font-bold text-lg text-charcoal">Charcoal (Text)</h3>
            <p className="text-sm text-gray-600">HEX: #12171D</p>
            <p className="text-sm text-gray-600">HSL: 0 0% 7%</p>
            <p className="text-xs text-gray-500 mt-2">Used for: Body text, dark elements</p>
          </div>

          {/* Primary Light - Hover State */}
          <div>
            <div className="h-32 bg-primary/80 rounded-lg shadow-md mb-4"></div>
            <h3 className="font-bold text-lg">Primary Light (Hover)</h3>
            <p className="text-sm text-gray-600">HEX: #12672A (80% opacity)</p>
            <p className="text-sm text-gray-600">HSL: 137 50% 35%</p>
            <p className="text-xs text-gray-500 mt-2">Used for: Hover states, secondary usage</p>
          </div>
        </div>

        {/* Button Examples */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">Button Examples</h3>
          <div className="space-y-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:brightness-110">
              Primary Button (Brand Green)
            </button>
            <button className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:brightness-110">
              Accent Button (Brand Red)
            </button>
            <button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary/10">
              Outline Button (Brand Green)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandColorReference;
