import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export const useEditSetting = () => {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting successfully edited');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isEditing, editSetting };
};
