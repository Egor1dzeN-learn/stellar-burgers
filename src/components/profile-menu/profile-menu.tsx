import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@app-store';
import { logout } from '@slices';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dis = useDispatch();
  const handleLogout = () => {
    dis(logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
