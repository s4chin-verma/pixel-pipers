import { Footer, Pricing, CarouselComponent } from '@/container';

const Home: React.FC = () => {
  return (
    <>
      <main>
        <CarouselComponent />
        <Pricing />
      </main>
      <Footer />
    </>
  );
};

export default Home;
