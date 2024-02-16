import { Pricing, CarouselComponent } from '@/container';
import { ImageUploader } from '@/container';

const Home: React.FC = () => {
  return (
    <>
      <CarouselComponent />

      <ImageUploader />
      <Pricing />
    </>
  );
};

export default Home;
