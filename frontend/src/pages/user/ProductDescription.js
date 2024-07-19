import React, { useState } from 'react';

const ProductDescription = (description) => {
  const [activeTab, setActiveTab] = useState('description');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full relative pb-[60px] container mx-auto">
      <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
        <div className="container-x mx-auto">
          <ul className="flex space-x-12">
            <li>
              <span
                className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                  activeTab === 'description'
                    ? 'border-qyellow text-qblack'
                    : 'border-transparent text-qgray'
                }`}
                onClick={() => handleTabClick('description')}
              >
                Description
              </span>
            </li>
            <li>
              <span
                className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-qyellow text-qblack'
                    : 'border-transparent text-qgray'
                }`}
                onClick={() => handleTabClick('reviews')}
              >
                Reviews
              </span>
            </li>
          </ul>
        </div>
        <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
      </div>

      <div className="tab-contents w-full min-h-[400px]">
        <div className="container-x mx-auto">
          {activeTab === 'description' && (
            <div data-aos="fade-up" className="w-full tab-content-item aos-init aos-animate">
              <h6 className="text-[18px] font-medium text-qblack mb-2">MÔ TẢ: </h6>
              <p className="text-[15px] text-qgray text-normal mb-10">
                {description.description}
              </p>
            </div>
          )}
          {activeTab === 'reviews' && <div>Reviews content goes here</div>}
          {activeTab === 'seller' && <div>Seller info goes here</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;