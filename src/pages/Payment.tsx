
import axios from 'axios';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const Payment = (): JSX.Element => {
  const loadScript = async (src: string): Promise<boolean> => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (): Promise<void> => {
    await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    try {
      const result = await axios.post<{ final_price: number; id: string; callback_url: string }>(
        // 'http://localhost:5000/payment/orders'
        'https://pixelpipers.serveo.net/api/payment/',
        { user: 1 }
      );
      console.log(result.data);

      const { id: order_id, final_price, callback_url } = result.data;
      let amount = final_price * 100;
      let am = amount.toString();
      const options = {
        key: 'rzp_test_4IKoZ3Gyi4heeK',
        amount: am,
        currency: 'INR',
        name: 'Pixel Pipers',
        description: 'Test Transaction',
        image: 'sachin',
        order_id: order_id,
        callback_url: callback_url,
        handler: async (response: RazorpayResponse) => {
          const data = {
            orderCreationId: order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          const result = await axios.post('https://pixelpipers.serveo.net/api/hadlereques/', data);
          console.log(result);
        },
        prefill: {
          name: 'Sachin Verma',
          email: 'shivamvarma346@gmail.com',
          contact: '6387975718',
        },
        notes: {
          address: 'ARYA College of Engineering & I.T.',
        },
        theme: {
          color: '#61dafb',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error in fetching or processing payment:', error);
    }
  };

  return (
    <>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <p>Buy React now!</p>
      <button className="p-8 bg-slate-400" onClick={displayRazorpay}>
        Pay ₹500
      </button>
    </>
  );
};

export default Payment;
