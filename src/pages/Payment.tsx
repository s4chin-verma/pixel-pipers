
import React from 'react';

interface PaymentButtonProps {}

const PaymentButton: React.FC<PaymentButtonProps> = () => {
  const handleClick = () => {
    // Create options object as per Razorpay documentation
    const options = {
      key: 'rzp_test_4IKoZ3Gyi4heeK',
      amount: '50000',
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: 'order_NbhEIFMpU4yUKt',
      handler: (response: any) => {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    // Create a new instance of Razorpay
    const rzp1 = new (window as any).Razorpay(options);

    rzp1.on('payment.failed', function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  return (
    <button id="rzp-button1" onClick={handleClick}>
      Pay
    </button>
  );
};

export default PaymentButton;
