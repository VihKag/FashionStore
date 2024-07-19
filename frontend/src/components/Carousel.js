import React from "react";
import { Link } from "react-router-dom";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export default function CarouselDarkVariant() {
  const images = [
    {
      id: 1,
      link: "https://img.freepik.com/free-photo/portrait-person-wearing-chain-necklace_52683-85060.jpg?t=st=1718098143~exp=1718101743~hmac=f0027264160dedc9ad937ea0041fae0219b8dab67da3b84b2115b185db27e924&w=740",
      alt: "carousel 1",
    },
    {
      id: 2,
      link: "https://img.freepik.com/free-photo/high-angle-male-performer-playing-electric-guitar_23-2148680328.jpg?t=st=1718098201~exp=1718101801~hmac=3f05e85687ca734abadfada7fdfc6380cc22471e60bf1171e1d20ebff9cdba84&w=740",
      alt: "carousel 2",
    },
    {
      id: 3,
      link: "https://img.freepik.com/free-photo/front-view-modern-boy-sitting-skateboard_23-2148423114.jpg?t=st=1718098228~exp=1718101828~hmac=c515f35f51851b4a99ece960da9030b2d5ddd915f2472dbd7992c61fd6f107b5&w=740",
      alt: "carousel 3",
    },
  ];
  return (
    <>
      <TECarousel
        // showControls
        showIndicators
        crossfade
        ride="carousel"
        theme={{
          indicator:
            "mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
        }}
      >
        <div className="select-none relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <TECarouselItem
            itemID={1}
            className="select-none relative float-left -mr-[100%] hidden w-full !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <div className="select-none bg-fuchsia-100 flex items-center justify-center md:text-6xl text-4xl">
              <div className="select-none relative flex container mx-auto">
                <div className="select-none py-16 sm:w-1/2 w-full mx-auto justify-center flex items-center">
                  <div className="select-none text-center mb-8 w-3/4">
                    <h1 className="select-none font-bold mb-4">Fashion Hunt</h1>
                    <h2 className="select-none font-semibold">
                      Shop the Hottest Brands and Designs at Fashion Store
                    </h2>
                    <div className="select-none flex justify-center mt-10">
                      <Link to="/products" className="select-none bg-teal-500 text-white text-2xl font-semibold px-6 py-3 rounded-md mb-8 hover:bg-slate-500 duration-300">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="select-none py-16 sm:w-1/2 hidden justify-center sm:flex">
                  <img
                    src={images[0].link}
                    alt={images[0].alt}
                    className="select-none rounded-2xl max-h-[540px] object-contain"
                  />
                </div>
              </div>
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={2}
            className="select-none relative float-left -mr-[100%] hidden w-full !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <div className="select-none bg-lime-100 flex items-center justify-center md:text-6xl text-4xl">
              <div className="select-none relative flex container mx-auto">
                <div className="select-none py-16 sm:w-1/2 w-full mx-auto justify-center flex items-center">
                  <div className="select-none text-center mb-8 w-3/4">
                    <h1 className="select-none font-bold mb-4">Fashion Hunt</h1>
                    <h2 className="select-none font-semibold">
                      Shop the Hottest Brands and Designs at Fashion Store
                    </h2>
                    <div className="select-none flex justify-center mt-10">
                      <Link to="/products" className="select-none bg-teal-500 text-white text-2xl font-semibold px-6 py-3 rounded-md mb-8 hover:bg-slate-500 duration-300">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="select-none py-16 sm:w-1/2 hidden justify-center sm:flex">
                  <img
                    src={images[1].link}
                    alt={images[1].alt}
                    className="select-none rounded-2xl max-h-[540px] object-contain"
                  />
                </div>
              </div>
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={3}
            className="select-none relative float-left -mr-[100%] hidden w-full !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <div className="select-none bg-blue-100 flex items-center justify-center md:text-6xl text-4xl">
              <div className="select-none relative flex container mx-auto">
                <div className="select-none py-16 sm:w-1/2 w-full mx-auto justify-center flex items-center">
                  <div className="select-none text-center mb-8 w-3/4">
                    <h1 className="select-none font-bold mb-4">Fashion Hunt</h1>
                    <h2 className="select-none font-semibold">
                      Shop the Hottest Brands and Designs at Fashion Store
                    </h2>
                    <div className="select-none flex justify-center mt-10">
                      <Link to="/products" className="select-none bg-teal-500 text-white text-2xl font-semibold px-6 py-3 rounded-md mb-8 hover:bg-slate-500 duration-300">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="select-none py-16 sm:w-1/2 hidden justify-center sm:flex">
                  <img
                    src={images[2].link}
                    alt={images[2].alt}
                    className="select-none rounded-2xl max-h-[540px] object-contain"
                  />
                </div>
              </div>
            </div>
          </TECarouselItem>
        </div>
      </TECarousel>
    </>
  );
}
