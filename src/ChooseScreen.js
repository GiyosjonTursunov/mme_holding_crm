import React from 'react';
import {useSelector} from 'react-redux';
import NotLoggedIn from './stacks/NotLoggedIn';
import VendorManagerStack from './stacks/VendorManagerStack';

export const ChooseNavigation = role_user => {
  if (!role_user) {
    return <NotLoggedIn />;
  } else if (role_user === 'VENDOR_MANAGER') {
    return <VendorManagerStack />;
  } else {
    return <NotLoggedIn />;
  }
  // if (role_user == 'DIRECTOR') return <DirectorStack />;
  // if (role_user == 'MANAGER') return <ManagerStack />;
  // if (role_user == 'SUPPLIER') return <SupplierStack />;
  // if (role_user == 'SALON') return <SalonStack />;
  // if (role_user == 'WAREHOUSE') return <WareHouseStack />;
  // if (role_user == 'ADMIN') return <AdminStack />;
};

const ChooseScreen = () => {
  const {isLogIn, role} = useSelector(state => state.userReducer);

  console.log('isLogIn => ', isLogIn);
  console.log('role => ◊', role);

  return isLogIn ? ChooseNavigation(role) : <NotLoggedIn />;
};

export default ChooseScreen;
