import axios from 'axios';

const Payment: React.FC = () => {
  const callApi = async () => {
    event?.preventDefault();
    try {
      const response = await axios.post('https://pixelpipers.serveo.net/api/payment/', {
        user: '1',
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        <button
          className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white"
          onClick={callApi}>
          Hover me!
          <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>
      </main>
    </>
  );
};

export default Payment;