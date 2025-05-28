import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@app-store';
import { getUserOrders, userOrdersThunk, isload } from '../../services';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrders);
  const isDataSucces: boolean = useSelector(isload);

  useEffect(() => {
    dispatch(userOrdersThunk());
  }, []);

  if (isDataSucces) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
