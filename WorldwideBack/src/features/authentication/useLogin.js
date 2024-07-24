import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogining } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // query cache
      queryClient.setQueriesData('user', user.user);
      navigate('/dashboard', { replace: true });
    },
    onError: () => toast.error('Provide email or password are incorrect'),
  });
  return { login, isLogining };
}
