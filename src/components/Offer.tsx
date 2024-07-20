import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Offer = () => {
  return (
    <div className="flex h-[36px] min-w-full items-center justify-center gap-5 bg-[#F4F4F4] text-xs">
      <IoIosArrowBack />
      <span>Get 10% off on business sign up</span>
      <IoIosArrowForward />
    </div>
  );
};

export default Offer;
