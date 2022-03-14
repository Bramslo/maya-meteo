import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
      meta: {
        title: 'Welcome | MAYA-METEO',
        metaTags: [
          {
            name: 'description',
            content: 'Landing page with basic weather information'
          },
          {
            property: 'og:description',
            content: 'Landing page with basic weather information'
          }
        ]
      }
    },
    {
      path: '/advanced',
      name: 'advanced',
      component: () => import('@/views/AdvancedView.vue'),
      meta: {
        title: 'Advanced | MAYA-METEO',
        metaTags: [
          {
            name: 'description',
            content: 'Advanced page for more functionality about the weather '
          },
          {
            property: 'og:description',
            content: 'Advanced page for more functionality about the weather '
          }
        ]
      }
    },
    {
      path: '/extra',
      name: 'extra',
      component: () => import('@/views/ExtraView.vue'),
      meta: {
        title: 'Extra | MAYA-METEO',
        metaTags: [
          {
            name: 'description',
            content: 'Some configurations and settings for the app'
          },
          {
            property: 'og:description',
            content: 'Some configurations and settings for the app'
          }
        ]
      }
    }
  ]
})



// EXTERNAL SOURCE FROM DIGITAL OCEAN
// https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head

// ================================================

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })

  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
