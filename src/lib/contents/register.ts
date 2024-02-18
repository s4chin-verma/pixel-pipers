import { RegisterSection } from '../types';

export const registerSection: RegisterSection = {
  registerValue: [
    {
      _id: '1',
      id: 'first name',
      icon: 'solar:user-outline',
      name: 'first_name',
      type: 'text',
      label: 'First Name',
    },
    {
      _id: '2',
      id: 'last name',
      icon: 'solar:user-outline',
      name: 'last_name',
      type: 'text',
      label: 'Last Name',
    },
    {
      _id: '3',
      id: 'username',
      icon: 'solar:user-outline',
      name: 'username',
      type: 'text',
      label: 'Username',
    },
    {
      _id: '4',
      id: 'email',
      icon: 'teenyicons:at-solid',
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      _id: '5',
      id: 'password',
      icon: 'mingcute:lock-line',
      name: 'password',
      type: 'password',
      label: 'Password',
    },
    {
      _id: '6',
      id: 'confirm password',
      icon: 'mingcute:lock-line',
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
    },
  ],
};
