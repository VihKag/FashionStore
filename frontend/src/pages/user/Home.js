// pages/Home.js
import React, { useContext, useEffect, useState } from "react";
import CarouselDarkVariant from "../../components/Carousel";
import ProductListItem from "../../components/ProductListItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../../contexts/UserContext";

const Home = () => {
  const {getProductsByType} = useContext(UserContext);
  const [trending, setTrending] = useState();
  const [newArival, setArival] = useState();
  const [feature, setFeature] = useState();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const trendings = await getProductsByType("trending");
      const newArrivals = await getProductsByType("New Arrival");
      const features = await getProductsByType("Feature Design");
      setTrending(trendings);
      setArival(newArrivals);
      setFeature(features);

    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  const logos = [
    {
      image: "https://img.freepik.com/free-vector/gentleman-shop-logo-vector-templates-design_460848-6922.jpg?t=st=1718100580~exp=1718104180~hmac=870a79a8bb517e3493bde081649ed05f365b12f90f4a34545f7de4c5bb4e1424&w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/illustration-boutique-shop-logo-stamp-banner_53876-6869.jpg?t=st=1718100633~exp=1718104233~hmac=69367d17c71737ae210acde125f537173cc59bd16b83e2990b880e3b6d9de850&w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/flat-design-nerd-logo-template_23-2149199481.jpg?t=st=1718100658~exp=1718104258~hmac=483ad3a9c8c6443756ab97824bfd0202276ef65517d5c5e3beaa3328f0926b99&w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/circular-fashion-logo-template_23-2150205294.jpg?t=st=1718100690~exp=1718104290~hmac=8c39d76f3361bf09a903bd44b59d95c91f1b9dbd4d07c0a6e125d980d1a4159c&w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/hand-drawn-shave-men-logo_197582-218.jpg?t=st=1718100715~exp=1718104315~hmac=2712c5bbe169ffc0038ac22a2851411a33d3a7193042e841642f1da46c8ac08d&w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/illustration-boutique-shop-logo-stamp-banner_53876-3743.jpg?t=st=1718100756~exp=1718104356~hmac=9bdd76e4936ad853ed9c7b40f0f04a9243484db55db4383fa715b33791e079e2&w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/fashion-logo-template-business-branding-design-vector_53876-156428.jpg?t=st=1718100821~exp=1718104421~hmac=a9e03ff74fa33e70f8cef4b0b02ef9a54705babed262afb87ada0850944b95c9&w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/premium-quality-badge-design-vector_53876-82252.jpg?t=st=1718100853~exp=1718104453~hmac=bb89dd270ceb245434f128d9303f04ce1169ff4585234c7358f312d4d1cf14b0&w=740",
    },
    {
      image: "https://img.freepik.com/premium-vector/gentleman-logo-vector-illustration-geek-glasses-barbershop-logo-logo-haircut-men-vector_468322-1239.jpg?w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/illustration-circle-stamp-banner_53876-28484.jpg?t=st=1718100961~exp=1718104561~hmac=9b68e08c363d9a2ad49547df9a420aa2d26ec6cef2e5f7d0e994da3cdffc2761&w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/flat-design-delta-logo-design_23-2149484190.jpg?t=st=1718101026~exp=1718104626~hmac=9512a5c704f488b6b64642196de2daaf1d44020154859b30eebd3aca4d384ba6&w=740",
    },
    {
      image: "https://img.freepik.com/free-vector/movember-design-background-with-hipster-beard_23-2147952772.jpg?t=st=1718101063~exp=1718104663~hmac=92fdbae2809d36c973b41af6548703edd3cdbf06ccf3d464eb880673899510c6&w=740",
    },
  ];
  return (
    <div className="select-none bg-white">
      <div className="select-none w-full">
        <CarouselDarkVariant />
      </div>
      {/* Main Content */}
      <main className="select-none container mx-auto py-8">
        <section>
          <div className="select-none bg-white">
            <div className="select-none mx-auto py-16 sm:py-24">
              <div className="select-none flex justify-between">
                <h2 className="select-none text-3xl font-bold tracking-tight text-gray-900">
                  Trending
                </h2>
                <div className="select-none flex justify-center items-center hover:scale-105">
                  <Link to="/products">
                    <h1 className="select-none text-md font-semibold text-blue-500 mr-2">
                      View More
                    </h1>
                  </Link>
                  <FontAwesomeIcon icon={faArrowRight} color="blue" />
                </div>
              </div>
              <div className="select-none mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
                {trending && trending.map((product, index) => (
                  <ProductListItem
                    key={index}
                    product={product.productDto}
                    productDetails={product.productDetailDto}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="select-none grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          {logos.map((logo, index) => (
            <div key={index} className="select-none item">
              <Link to="/products" className="select-none bg-white border border-primarygray flex justify-center items-center m-2">
                <img src={logo.image} alt="brand-logo"/>
              </Link>
            </div>
          ))}
        </div>

        <section>
          <div className="select-none bg-white">
            <div className="select-none mx-auto py-16 sm:py-24">
              <div className="select-none flex justify-between">
                <h2 className="select-none text-3xl font-bold tracking-tight text-gray-900">
                  Feature Design
                </h2>
                <div className="select-none flex justify-center items-center hover:scale-105">
                  <Link to="/products">
                    <h1 className="select-none text-md font-semibold text-blue-500 mr-2">
                      View More
                    </h1>
                  </Link>
                  <FontAwesomeIcon icon={faArrowRight} color="blue" />
                </div>
              </div>
              <div className="select-none mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
                {feature && feature.map((product, index) => (
                  <ProductListItem
                  key={index}
                  product={product.productDto}
                  productDetails={product.productDetailDto}
                />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="select-none bg-white py-6">
          <div className="select-none mx-auto px-6">
            <h2 className="select-none text-center text-lg font-semibold leading-8 text-gray-900">
              Trusted by the world’s most innovative teams
            </h2>
            <div className="select-none mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="select-none col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
                width="158"
                height="48"
              />
              <img
                className="select-none col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
                width="158"
                height="48"
              />
              <img
                className="select-none col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                alt="Tuple"
                width="158"
                height="48"
              />
              <img
                className="select-none col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
                width="158"
                height="48"
              />
              <img
                className="select-none col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width="158"
                height="48"
              />
            </div>
          </div>
        </div>

        <section>
          <div className="select-none bg-white">
            <div className="select-none mx-auto py-16 sm:py-24">
              <div className="select-none flex justify-between">
                <h2 className="select-none text-3xl font-bold tracking-tight text-gray-900">
                  New Arrival
                </h2>
                <div className="select-none flex justify-center items-center hover:scale-105">
                  <Link to="/products">
                    <h1 className="select-none text-md font-semibold text-blue-500 mr-2">
                      View More
                    </h1>
                  </Link>
                  <FontAwesomeIcon icon={faArrowRight} color="blue" />
                </div>
              </div>
              <div className="select-none mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
                {newArival && newArival.map((product, index) => (
                  <ProductListItem
                  key={index}
                  product={product.productDto}
                  productDetails={product.productDetailDto}
                />
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
