import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser as updateCurrentUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isUpdating } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Account successfully updated');
    },
    onError: () => {
      toast.error('There was an error while updating account');
    },
  });
  return { updateUser, isUpdating };
};
