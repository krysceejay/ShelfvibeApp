import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {createStackNavigator} from '@react-navigation/stack';
//import {enableScreens} from 'react-native-screens';
//import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScene from './src/screens/LoadingScene';
import BottomTabs from './src/screens/tabs/BottomTabs';

Icon.loadFont();
Ionicons.loadFont();
MaterialCommunityIcons.loadFont();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(0, 0, 0)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
  },
};

// function DashboardheaderRight() {
//   const navigation = useNavigation();
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.dispatch(DrawerActions.toggleDrawer());
//       }}>
//       <Ionicons
//         name="md-menu"
//         size={30}
//         style={{paddingRight: 20, color: '#fff', fontFamily: 'Nunito-Regular'}}
//       />
//     </TouchableOpacity>
//   );
// }
const Stack = createStackNavigator();
// enableScreens();
// const Stack = createSharedElementStackNavigator();

const App = () => {
  // useEffect(async () => {
  //   const authData = await AsyncStorage.getItem('loginData');
  //   authDataParse = JSON.parse(authData);
  //   console.log('from useEffect: ' + authDataParse);
  // }, []);

  // getAsynStore = async () => {
  //   const authData = await AsyncStorage.getItem('loginData');
  //   const authDataParse = JSON.parse(authData);
  //   console.log(authDataParse);
  //   if (authDataParse != null) {
  //     ///setIsLoggedIn(true);
  //     console.log('not null');
  //   } else {
  //     console.log('is null');
  //   }
  // };

  // shouldHeaderBeShown = route => {
  //   const routeName = route.state
  //     ? route.state.routes[route.state.index].name
  //     : 'ManageShelf';

  //   switch (routeName) {
  //     case 'ManageShelf':
  //       return false;
  //   }
  // };

  // getHeaderTitle = route => {
  //   const routeName = route.state
  //     ? route.state.routes[route.state.index].name
  //     : 'Dashboard';

  //   return routeName;
  // };
  // HeaderRight = () => {
  //   const navigation = useNavigation();
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         navigation.dispatch(DrawerActions.openDrawer());
  //       }}>
  //       <Text>Open</Text>
  //     </TouchableOpacity>
  //   );
  // };

  // getTabTitle = route => {
  //   const routeName = route.state
  //     ? route.state.routes[route.state.index].name
  //     : 'Tab1';

  //   if (routeName === 'Tab5') {
  //     return <DashboardheaderRight />;
  //   } else {
  //     return (
  //       <Ionicons
  //         name="md-search"
  //         size={30}
  //         style={{paddingRight: 20, color: '#000'}}
  //       />
  //     );
  //   }
  // };

  return (
    <Provider store={store}>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Loading"
          headerMode="screen"
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
          }}>
          <Stack.Screen name="Loading" component={LoadingScene} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
