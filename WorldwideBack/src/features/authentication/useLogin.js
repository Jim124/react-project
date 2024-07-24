import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiUsers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogining } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      navigate('/dashboard');
    },
    onError: () => toast.error('Provide email or password are incorrect'),
  });
  return { login, isLogining };
}
