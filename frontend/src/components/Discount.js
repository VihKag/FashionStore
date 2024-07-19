import DiscountBannerImg from "../assets/discount_banner.jpg"
const DiscountBanner = () => {
  return (
    <div
      className="discount-banner container h-[307px] bg-cover bg-no-repeat flex justify-center items-center mx-auto mb-4"
      style={{ backgroundImage: `url(${DiscountBannerImg})` }}
    >
      <div>
        <div data-aos="fade-up" className="aos-init aos-animate">
          <h1 className="sm:text-4xl text-2xl font-bold text-qblack mb-2 text-center">
            Get <span className="mx-1 text-qyellow">20%</span> Off Discount
            Coupon
          </h1>
          <p className="text-center sm:text-xl text-md font-medium">
            by Subscribe our Newsletter
          </p>
        </div>
      </div>
    </div>
  );
};
export default DiscountBanner;
