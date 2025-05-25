import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app-store';
import { getUserOrders, userOrdersThunk, isload } from '../../services';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(getUserOrders);
  const isDataSucces: boolean = useAppSelector(isload);

  useEffect(() => {
    dispatch(userOrdersThunk());
  }, []);

  if (isDataSucces) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
