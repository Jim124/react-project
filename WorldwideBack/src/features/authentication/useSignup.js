import { useMutation } from '@tanstack/react-query';

import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: (user) =>
      toast.success(
        `Account successfully created, please verify the new account from the user's email address`
      ),
    onError: () => toast.error('There was an error while creating a user'),
  });
  return { isLoading, signup };
}
