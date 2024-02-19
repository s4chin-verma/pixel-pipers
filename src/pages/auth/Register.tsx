import { Icon } from '@iconify/react';
import { FormButton, FormInput } from '@/components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { registerSection } from '@/lib/contents/register';
import { RegisterInput } from '@/lib/types';
import { registerValidator, showToast } from '@/lib/validators';
import { useAppDispatch } from '@/app/hooks';
import { registerUser } from '@/app/actions/authActions';

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterInput>();
  const { registerValue } = registerSection;
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<RegisterInput> = async data => {
    const { status, error } = registerValidator(data);
    status ? dispatch(registerUser(data)) : showToast(error, 'warning');
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-300 p-6">
      <div className="flex flex-col bg-white shadow-md px-4 mt-14 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Register To Your Account
        </div>
        <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
            <Icon icon="devicon:google" className="h-5 w-5" />
          </span>
          <span>Register with Google</span>
        </button>
        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">
              Or Register With Email
            </span>
          </div>
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerValue.map(value => (
              <FormInput
                key={value.id}
                icon={value.icon}
                label={value.label}
                id={value.id}
                register={register}
                name={value.name}
                type={value.type}
              />
            ))}

            <FormButton icon="ri:login-circle-line" children="Register" />
          </form>
        </div>
        <div className="flex justify-center items-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
            <span>
              <Icon icon={'tabler:user-plus'} className="text-blue-500 h-8 w-8" />
            </span>
            <span className="ml-2">Have an account? Login.</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Login;
