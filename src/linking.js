// const item = {
//     "description": "For all singles. Get in here!!! 💕💕💕", 
//     "details": null, 
//     "genre": ["Comedy", "Action", "Adventure", "Romance"], 
//     "id": "9", 
//     "image": "images (2)_1612352765.jpeg", 
//     "insertedAt": "2021-01-12", 
//     "lists": [
//         {"bookcover": "IMG_20210123_234709_1611497444.jpg", "current": true, "id": "11", "title": "Sell like Crazy"}
//     ], 
//     "members": [{"id": "9"}], 
//     "name": "Singles  Club", 
//     "polls": [], 
//     "public": true, 
//     "publish": true, 
//     "updatedAt": "2021-02-03", 
//      "user": {"id": "17", "username": "kryso"}
//     }
// https://shelfvibe.com/club/54HPlIIt15
// shelfvibe://club/54HPlIIt15436
 
getItem = slug => {
    let id = slug.slice(8);
    return id;
}

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
              path: 'club',
              screens: {
                Club: 'clubs',
                Details: {
                    path: 'club/:clubId',
                    parse: {
                        clubId: clubId => getItem(clubId),
                      },
                    exact: true,
                }
             }
            }
        },
      },
      NotFound: '*',
    },
  };

const linking = {
    prefixes: ['https://shelfvibe.com', 'shelfvibe://'],
    config
}

export default linking;