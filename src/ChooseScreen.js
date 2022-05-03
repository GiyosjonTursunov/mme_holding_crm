import * as React from 'react';
import {AsyncStorage} from 'react-native';
import {useSelector} from 'react-redux';
import NotLoggedIn from './stacks/NotLoggedIn';
import VendorManagerStack from './stacks/VendorManagerStack';

import {useDispatch} from 'react-redux';
import {setRole} from './redux/actions';
import VendorStack from './stacks/VendorStack';
import WareHouseManagerStack from './stacks/WareHouseManagerStack';
import DecoratorManagerStack from './stacks/DecoratorManagerStack';
import DirectorStack from './stacks/DirectorStack';

export const ChooseNavigation = role_user => {
  if (!role_user) {
    return <NotLoggedIn />;
  } else if (role_user === 'VENDOR_MANAGER') {
    return <VendorManagerStack />;
  } else if (role_user === 'VENDOR') {
    return <VendorStack />;
  } else if (role_user === 'WAREHOUSE_MANAGER') {
    return <WareHouseManagerStack />;
  } else if (role_user === 'DECORATOR_MANAGER') {
    return <DecoratorManagerStack />;
  } else if (role_user === 'DIRECTOR') {
    return <DirectorStack />;
  } else {
    console.warn(role_user);
    return <NotLoggedIn />;
  }
  // if (role_user == 'MANAGER') return <ManagerStack />;
  // if (role_user == 'SUPPLIER') return <SupplierStack />;
  // if (role_user == 'SALON') return <SalonStack />;
  // if (role_user == 'ADMIN') return <AdminStack />;
};

const ChooseScreen = () => {
  const dispatch = useDispatch();

  const {isLogIn, role} = useSelector(state => state.userReducer);

  React.useEffect(() => {
    AsyncStorage.getItem('@user').then(value => {
      if (value) {
        dispatch(setRole(JSON.parse(value).role));
      }
    });
  }, [dispatch]);

  return isLogIn ? ChooseNavigation(role) : <NotLoggedIn />;
};

export default ChooseScreen;
