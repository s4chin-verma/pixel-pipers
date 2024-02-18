import { Footer, Pricing, CarouselComponent } from '@/container';
// import { ToastWithTitle } from './Toast';
const Home: React.FC = () => {
  return (
    <>
      <main className='pt-20'>
        {/* <ToastWithTitle /> */}
        <CarouselComponent />
        <Pricing />
      </main>
      <Footer />
    </>
  );
};

export default Home;
