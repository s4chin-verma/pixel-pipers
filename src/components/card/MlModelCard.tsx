import { MlModelBtn } from '@/components';

const MlModelCard: React.FC = () => {
  return (
    <>
      <section className="bg-white da:bg-gray-900 mt-48">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 border border-spacing-14 rounded-xl">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl da:text-white">
              Welcome To Harare City
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl da:text-gray-400">
              Welcome to [Company Name], your gateway to unforgettable travel experiences. We are a
              leading travel and tour company dedicated to creating exceptional journeys for
              adventurers, explorers, and wanderers like you.
            </p>
            <MlModelBtn children="Buy Now" icon='devicon-plain:docker'/>
            <MlModelBtn children="Add to Cart" icon='ion:cart-outline'/>
            <MlModelBtn children="See More Details" icon='ph:info-thin'/>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
            <img
              src="https://lp-cms-production.imgix.net/2019-06/554369495_full.jpg"
              alt="mockup"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default MlModelCard;
