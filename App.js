import 'react-native-gesture-handler';
import React, {useState, useEffect, useMemo} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeContext} from './src/utils/context';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingScene from './src/screens/LoadingScene';
import BottomTabs from './src/screens/tabs/BottomTabs';
import linking from './src/linking';

Icon.loadFont();
Ionicons.loadFont();
MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();
AntDesign.loadFont();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: '#fafafa',
    text: '#333333',
    border: 'rgb(199, 199, 204)',
    icon: '#242c42',
    dashStats: 'rgba(0,0,0,0.1)',
    profileCard: '#fafafa',
    borderBottomColor: '#eee',
    placeholder: '#444444'
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#333333',
    card: '#222',
    text: 'rgb(242, 242, 242)',
    border: 'rgb(199, 199, 204)',
    icon: 'rgb(242, 242, 242)',
    dashStats: 'rgba(255,255,255,0.1)',
    profileCard: '#222',
    borderBottomColor: '#777',
    placeholder: '#777'
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    getIsDarkFromStore();
  }, []);

  const themeContext = useMemo(() => ({
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
        setIsDarkInStorage(!isDarkTheme);
      }
     }), [isDarkTheme])

  const setIsDarkInStorage = async theme => {
    try {
       await AsyncStorage.setItem('isDark', JSON.stringify(theme));
    } catch (err) {
      return 'failed';
    }
  }

  getIsDarkFromStore = async () => {
    let isDarkData = await AsyncStorage.getItem('isDark');
    if (isDarkData !== null){
      switch (isDarkData) {
          case "true":
            setIsDarkTheme(true);
            break;

          case "false":
            setIsDarkTheme(false);
            break;
        
          default:
            setIsDarkTheme(false);
            break;
        }
    }else{
      setIsDarkTheme(false);
    }
  }

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
      <ThemeContext.Provider value={themeContext}>
        <NavigationContainer theme={isDarkTheme ? MyDarkTheme : MyTheme} linking={linking}>
          <Stack.Navigator
            initialRouteName="Loading"
            headerMode="screen"
            screenOptions={{
              gestureEnabled: false,
              headerShown: false,
              headerLeft: null,
            }}>
            <Stack.Screen name="Loading" component={LoadingScene} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
