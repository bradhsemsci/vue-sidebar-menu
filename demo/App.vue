<template>
  <div
    id="demo"
    :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]"
  >
    <div class="demo">
      <sidebar-menu
        :menu="menu"
        :collapsed="collapsed"
        :theme="selectedTheme"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick"
      />
      <div class="container">
        <h1>
          vue-sidebar-menu
          <a
            style="color: #000;text-transform: uppercase;font-size: 14px;font-weight: 400;"
            href="https://github.com/yaminncco/vue-sidebar-menu"
          >
            Github
          </a>
        </h1>
        <p>A vue.js sidebar menu component</p>
        <div>
          Select theme:
          <select v-model="selectedTheme">
            <option
              v-for="(theme, index) in themes"
              :key="index"
              :value="theme.input"
            >
              {{ theme.name }}
            </option>
          </select>
        </div>
        <hr style="margin: 50px 0px;border: 1px solid #e3e3e3;">
        <router-view />
      </div>
      <div
        v-if="isOnMobile && !collapsed"
        class="sidebar-overlay"
        @click="collapsed = true"
      />
    </div>
    <div class="right-sidebar">
      <sidebar-menu
        :menu="addHRefHash(menu)"
        :relative="true"
        :collapsed="collapsed"
        :disable-vue-router="true"
        :use-location-polling="true"
        :theme="selectedTheme"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick"
      />
    </div>
  </div>
</template>

<script>
const separator = {
  template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`
}

export default {
  name: 'App',
  data () {
    return {
      menu: [
        {
          header: true,
          title: 'Getting Started',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Installation',
          icon: 'fa fa-download'
        },
        {
          href: '/basic-usage',
          title: 'Basic Usage',
          icon: 'fa fa-code'
        },
        {
          header: true,
          title: 'Usage',
          hiddenOnCollapse: true
        },
        {
          href: '/props',
          title: 'Props',
          icon: 'fa fa-cogs'
        },
        {
          href: '/events',
          title: 'Events',
          icon: 'fa fa-bell'
        },
        {
          href: '/styling',
          title: 'Styling',
          icon: 'fa fa-palette'
        },
        {
          component: separator
        },
        {
          header: true,
          title: 'Example',
          hiddenOnCollapse: true
        },
        {
          href: '/disabled',
          title: 'Disabled page',
          icon: 'fa fa-lock',
          disabled: true
        },
        {
          title: 'Badge',
          icon: 'fa fa-cog',
          badge: {
            text: 'new',
            class: 'vsm--badge_default'
          }
        },
        {
          href: '/page',
          isPopout: true,
          title: 'Dropdown Page',
          icon: 'fa fa-list-ul',
          child: [
            {
              href: '/page/sub-page-1',
              title: 'Sub Page 01',
              icon: 'fa fa-file-alt'
            },
            {
              href: '/page/sub-page-2',
              title: 'Sub Page 02',
              icon: 'fa fa-file-alt'
            }
          ]
        },
        {
          title: 'Multiple Level',
          icon: 'fa fa-list-alt',
          child: [
            {
              title: 'page'
            },
            {
              title: 'Level 2 ',
              isPopout: true,
              child: [
                {
                  title: 'Page 01',
                  onClick: () => {
                    console.log("changeing href", this.menu[this.menu.length - 1].child[3].child[0].child[1].href);
                    this.menu[this.menu.length - 1].child[3].child[0].child[1].href = '/al2/level-3-page-1'
                  }
                },
                {
                  title: 'Page 02',
                  onClick: () => {
                    console.log("changeing href", this.menu[this.menu.length - 1].child[3].child[0].child[1].href);
                    this.menu[this.menu.length - 1].child[3].child[0].child[1].href = '/al2/level-3-page-2'
                  }
                }
              ]
            },
            {
              title: 'Page'
            },
            {
              title: 'Another Level 2',
              child: [
                {
                  title: 'Level 3',
                  child: [
                    {
                      href: '/al2/level-3-page-1',
                      title: 'Page 01',
                    },
                    {
                      href: '/al2/level-3-page-2',
                      title: 'Page 02',
                    }
                  ]
                }
              ]
            },
            {
              title: 'Yet Another Level 2',
              child: [
                {
                  title: 'Level 3',
                  child: [
                    {
                      href: '/yal2/level-3-page-1',
                      title: 'Page 01',
                    },
                    {
                      href: '/yal2/level-3-page-2',
                      title: 'Page 02',
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      collapsed: false,
      themes: [
        {
          name: 'Default theme',
          input: ''
        },
        {
          name: 'White theme',
          input: 'white-theme'
        }
      ],
      selectedTheme: 'white-theme',
      isOnMobile: false
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onToggleCollapse (collapsed) {
      console.log(collapsed)
      this.collapsed = collapsed
    },
    onItemClick (event, item, node) {
      console.log('onItemClick')
      // console.log(event)
      // console.log(item)
      // console.log(node)
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    },
    addHRefHash (menu) {
      return menu.map((menuItem) => {
        let newItem = { ...menuItem }
        if (newItem.href) {
          newItem.href = '/#' + newItem.href
        }
        if (newItem.child) {
          newItem.child = this.addHRefHash(newItem.child)
        }
        return newItem
      })
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}

.right-sidebar {
  grid-area: right-sidebar;
  height: 100%;
}

#demo {
  transition: 0.3s ease;
  display: grid;
  grid-template-columns: 350px 1fr 700px;
  grid-template-rows: auto;
  grid-template-areas: "left-sidebar main right-sidebar";
}
#demo.collapsed {
  grid-template-columns: 50px 1fr 50px;
}
#demo.onmobile {
  grid-template-columns: 50px 1fr 50px;
}

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}

.demo {
  grid-area: main;
  padding: 50px;
}

.container {
  max-width: 900px;
}

pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
</style>
