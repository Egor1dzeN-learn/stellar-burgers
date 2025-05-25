import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { Route, Routes } from 'react-router-dom';
import React from 'react';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path="/" element={<ConstructorPage />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="*" element={<NotFound404 />} />
      <Route path="/feed/:number" element={<OrderInfo />} />
      <Route path="/ingredients/:id" element={<IngredientDetails />} />
      <Route path="/profile/orders/:number" element={<OrderInfo />} />
      <Route
        path="/login" element={
          <ProtectedRouter isPublic>
            <Login />
          </ProtectedRouter>
        }
      />
      <Route
        path="/profile" element={
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        }
      />
      <Route
        path="/register" element={
        <ProtectedRouter isPublic>
          <Register />
        </ProtectedRouter>
      }
      />
      <Route
        path="/forgot-password" element={
          <ProtectedRouter>
            <ForgotPassword />
          </ProtectedRouter>
        }
      />
      <Route
        path="/reset-password" element={
          <ProtectedRouter>
            <ResetPassword />
          </ProtectedRouter>
        }
      />
      <Route
        path="/profile/orders" element={
          <ProtectedRouter>
            <ProfileOrders />
          </ProtectedRouter>
        }
      />
    </Routes>
    <ConstructorPage />
  </div>
);

export default App;
