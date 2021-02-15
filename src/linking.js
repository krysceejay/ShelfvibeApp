const config = {
    screens: {
        BottomTabs: {
        path: 'bottom-tabs',
        screens: {
            Home: {
                path: 'home-tab',
                screens: {
                    Detail: 'detail'
                }
            },
           Notification: {
               path: 'notification',
            },
           Club: {
              path: 'club'
            }
        },
      },
    },
  };

//   const config = {
//     screens: {
//       BottomTabs: 'bottomtab',
//       Loading: 'loading',
//     },
//   };

//   const config = {
//     BottomTabs: {
//         Details: {
//             path: 'Details/:itemId',
//             params: {
//                 itemId: null
//             }
//         }
//     }
//   };

const linking = {
    prefixes: ['https://shelfvibe.com', 'shelfvibe://'],
    config
}

export default linking;