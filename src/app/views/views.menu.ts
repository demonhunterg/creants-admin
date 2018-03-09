//http://piluku.bootstrapguru.com/Build/ion-icons.html#
export const VIEWS_MENU = [
  {
    path: 'views',
    children: [
      {
        path: 'monitor',
        data: {
          menu: {
            title: 'general.menu.monitor',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'feed',
        data: {
          menu: {
            title: 'general.menu.feed',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'new-feed',
            data: {
              menu: {
                title: 'general.menu.new_feed',
              }
            }
          },{
            path: 'feed-list',
            data: {
              menu: {
                title: 'general.menu.feed_list',
              }
            }
          }
        ]
      },
      {
        path: 'setting',
        data: {
          menu: {
            title: 'general.menu.setting',
            icon: 'ion-gear-a',
            selected: false,
            expanded: false,
            order: 250,
          }
        },
        children: [
          {
            path: 'reload',
            data: {
              menu: {
                title: 'general.menu.reload',
              }
            }
          }
        ]
      },
      {
        path: 'user-list',
        data: {
          menu: {
            title: 'general.menu.user_list',
            icon: 'ion-ios-person',
            selected: false,
            expanded: false,
            order: 200,
          }
        }
      },
      {
        path: 'money-log',
        data: {
          menu: {
            title: 'general.menu.money_log',
            icon: 'ion-social-usd',
            selected: false,
            expanded: false,
            order: 300,
          }
        },
        children: [
          {
            path: 'typography',
            data: {
              menu: {
                title: 'general.menu.typography',
              }
            }
          },
          {
            path: 'buttons',
            data: {
              menu: {
                title: 'general.menu.buttons',
              }
            }
          }
        ]
      },
      {
        path: 'notification',
        data: {
          menu: {
            title: 'general.menu.notification',
            icon: 'ion-gear-a',
            selected: false,
            expanded: false,
            order: 250,
          }
        }
      },
      {
        path: 'gm',
        data: {
          menu: {
            title: 'general.menu.game-master',
            icon: 'ion-gear-a',
            selected: false,
            expanded: false,
            order: 250,
          }
        },
        children: [
          {
            path: 'equipment',
            data: {
              menu: {
                title: 'general.menu.equipment',
              }
            }
          },
          {
            path: 'item',
            data: {
              menu: {
                title: 'general.menu.item',
              }
            }
          },
          {
            path: 'mail',
            data: {
              menu: {
                title: 'general.menu.mail',
              }
            }
          },
          {
            path: 'reset',
            data: {
              menu: {
                title: 'general.menu.reset',
              }
            }
          }
        ]
      }
    ]
  }
];
