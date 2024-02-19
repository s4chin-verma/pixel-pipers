import { Footer, Pricing, CarouselComponent } from '@/container';

const Home: React.FC = () => {
  return (
    <>
      <main className='pt-20'>

        <CarouselComponent />
        <Pricing />
      </main>
      <Footer />
    </>
  );
};

export default Home;
