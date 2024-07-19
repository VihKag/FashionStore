const Footer =() =>{
    return(
        <footer className="bg-slate-600 ">
        <div className="container block mx-auto pt-16 h-80">
          <div className="lg:flex justify-between mb-[95px]">
          <div className="lg:w-4/10 w-full mb-10 lg:mb-0"><div className="mb-14"><a href="/"><img width="152" height="36" src="/assets/images/logo-5.svg" alt="logo"/></a></div><div><ul className="flex flex-col space-y-5 "><li><a href="/"><span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">Track Order</span></a></li><li><a href="/"><span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">Delivery &amp; Returns</span></a></li><li><a href="/"><span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">Warranty</span></a></li></ul></div></div>
            <div className="lg:w-2/10 w-full mb-10 lg:mb-0">
              <div className="mb-5">
                <h6 className="text-xl font-bold text-white">About us</h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-5 ">
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Rave’s Story
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Work With Us
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Coporate News
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Investors
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-2/10 w-full mb-10 lg:mb-0 ">
              <div className="mb-5">
                <h6 className="text-xl font-bold text-white">Online Shop</h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-5 ">
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Furniture
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Decoration
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Kitchen
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Interior
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-2/10 w-full mb-10 lg:mb-0">
              <div className="mb-5">
                <h6 className="text-xl font-bold text-white">Useful Links</h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-5 ">
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Secure Payment
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Privacy Policy
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Terms of Use
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="text-white text-[15px] hover:text-[#9a9a9a] hover:underline">
                        Archived Products
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}
export default Footer;