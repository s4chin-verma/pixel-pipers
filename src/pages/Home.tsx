import { Footer, Pricing } from '@/container';
import Demo from './Demo';

const Home: React.FC = () => {
  return (
    <>
      <main className="">
        <Demo />
        {/* <CarouselComponent /> */}
        <Pricing />
      </main>
      <Footer />
    </>
  );
};

export default Home;
