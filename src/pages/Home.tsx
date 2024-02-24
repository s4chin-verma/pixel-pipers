import { Footer } from '@/container';
import Demo2 from './Demo-2';

const Home: React.FC = () => {
  return (
    <>
      <main className="">
        <Demo2 />
        {/* <CarouselComponent /> */}
        {/* <Pricing /> */}
      </main>
      <Footer />
    </>
  );
};

export default Home;
