import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';
import { useLoginout } from './useLogout';
export function Logout() {
  const { isLoading, logout } = useLoginout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
