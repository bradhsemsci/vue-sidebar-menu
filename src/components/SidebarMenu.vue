<template>
  <div
    class="v-sidebar-menu"
    :class="sidebarClass"
    :style="[{'max-width': sidebarWidth}]"
    @mouseleave="onMouseLeave"
  >
    <slot name="header" />
    <div
      class="vsm--scroll-wrapper"
      @scroll="scrollEvent"
      ref="testRef"
    >
      <div
        class="vsm--list"
        :style="isCollapsed && {'width': widthCollapsed}"
      >
        <sidebar-menu-item
          v-for="(item, index) in menu"
          :key="index"
          :menu-item="item"
          :is-collapsed="isCollapsed"
          :active-show="activeShow"
          :show-one-child="showOneChild"
          :show-child="showChild"
          :rtl="rtl"
          :mobile-item="mobileItem"
          :disable-hover="disableHover"
          :use-location-polling="useLocationPolling"
          :disable-vue-router="disableVueRouter"
          @set-mobile-item="setMobileItem"
          @unset-mobile-item="unsetMobileItem"
        >
          <slot
            slot="dropdown-icon"
            name="dropdown-icon"
          />
        </sidebar-menu-item>
      </div>
      <div
        v-if="mobileItem"
        class="vsm--mobile-item"
        :style="mobileItemStyle.item"
      >
        <sidebar-menu-item
          :menu-item="mobileItem"
          :is-mobile-item="true"
          :mobile-item-style="mobileItemStyle"
          :is-collapsed="isCollapsed"
          :show-child="showChild"
          :rtl="rtl"
          :use-location-polling="useLocationPolling"
          :disable-vue-router="disableVueRouter"
        >
          <slot
            slot="dropdown-icon"
            name="dropdown-icon"
          />
        </sidebar-menu-item>
        <transition name="slide-animation">
          <div
            class="vsm--mobile-bg"
            :style="mobileItemStyle.background"
          />
        </transition>
      </div>
    </div>
    <slot name="footer" />
    <button
      v-if="!hideToggle"
      class="vsm--toggle-btn"
      :class="{'vsm--toggle-btn_slot' : $slots['toggle-icon']}"
      @click="onToggleClick"
    >
      <slot name="toggle-icon" />
    </button>
  </div>
</template>

<script>
import SidebarMenuItem from './SidebarMenuItem.vue'
import { animationMixin } from '../mixin'

export default {
  name: 'SidebarMenu',
  components: {
    SidebarMenuItem
  },
  mixins: [animationMixin],
  props: {
    menu: {
      type: Array,
      required: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '350px'
    },
    widthCollapsed: {
      type: String,
      default: '60px'
    },
    showChild: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: ''
    },
    showOneChild: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    },
    relative: {
      type: Boolean,
      default: false
    },
    hideToggle: {
      type: Boolean,
      default: false
    },
    disableHover: {
      type: Boolean,
      default: false
    },
    useLocationPolling: {
      type: Boolean,
      default: false
    },
    disableVueRouter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCollapsed: this.collapsed,
      mobileItem: null,
      mobileItemPos: 0,
      mobileItemHeight: 0,
      mobileItemCloseTimeout: null,
      mobileItemOpenTimeout: null,
      activeShow: null,
      parentHeight: 0,
      parentWidth: 0,
      parentOffsetTop: 0,
      parentOffsetLeft: 0
    }
  },
  computed: {
    sidebarWidth () {
      return this.isCollapsed ? this.widthCollapsed : this.width
    },
    sidebarClass () {
      return [
        !this.isCollapsed ? 'vsm_expanded' : 'vsm_collapsed',
        this.theme ? `vsm_${this.theme}` : '',
        this.rtl ? 'vsm_rtl' : '',
        this.relative ? 'vsm_relative' : ''
      ]
    },
    mobileItemStyle () {
      return {
        item: [
          { 'position': 'absolute' },
          { 'top': `${this.mobileItemPos}px` },
          this.rtl ? { 'right': '0px' } : { 'left': '0px' },
          this.rtl ? { 'padding-right': this.sidebarWidth } : { 'padding-left': this.sidebarWidth },
          this.rtl && { 'direction': 'rtl' },
          { 'width': `${window.innerWidth}px` },
          this.isCollapsed ? { 'max-width': this.width } : { 'max-width': 'calc(' + this.width + '*2 - ' + this.widthCollapsed + ')' }
        ],
        dropdown: [
          { 'position': 'absolute' },
          { 'top': `${this.mobileItemHeight}px` },
          { 'width': `${window.innerWidth}px` },
          { 'max-width': 'calc(' + this.width + ' - ' + this.widthCollapsed + ')' },
          { 'max-height': `${this.parentHeight - (this.mobileItemPos + this.mobileItemHeight) - this.parentOffsetTop}px` },
          { 'overflow-y': 'auto' }
        ],
        background: [
          { 'position': 'absolute' },
          { 'top': '0px' },
          { 'left': '0px' },
          { 'right': '0px' },
          { 'width': '100%' },
          { 'height': `${this.mobileItemHeight}px` },
        ]
      }
    }
  },
  watch: {
    collapsed (val) {
      if (this.isCollapsed === this.collapsed) return
      this.isCollapsed = val
    }
  },
  methods: {
    onMouseLeave () {
      this.unsetMobileItem(true)
    },
    scrollEvent (event) {
      this.unsetMobileItem()
    },
    onToggleClick () {
      this.isCollapsed = !this.isCollapsed
      this.unsetMobileItem()
      this.$emit('toggle-collapse', this.isCollapsed)
    },
    onActiveShow (item) {
      this.activeShow = item
    },
    onItemClick (event, item, node) {
      this.$emit('item-click', event, item, node)
      if (!node.item.child && !node.showOneChild && (node.isMobileItem || node.isMobileItemChild)) {
         this.unsetMobileItem()
      }
    },
    setMobileItem ({ item, itemEl }) {
      this.stopMobileTimerClose()
      this.stopMobileTimerOpen()
      this.mobileItemOpenTimeout = setTimeout(() => {
        if (this.mobileItem === item) return
        let sidebarTop = this.$el.getBoundingClientRect().top
        let itemTop = itemEl.getBoundingClientRect().top
        let itemLinkEl = itemEl.children[0]

        let styles = window.getComputedStyle(itemEl)
        let paddingTop = parseFloat(styles.paddingTop)
        let marginTop = parseFloat(styles.marginTop)

        let height = itemLinkEl.offsetHeight
        let positionTop = itemTop - sidebarTop + paddingTop + marginTop

        this.$nextTick(() => {
          this.initParentOffsets()
          this.mobileItem = item
          this.mobileItemPos = positionTop
          this.mobileItemHeight = height
        })
      }, 50)
    },
    unsetMobileItem (delay) {
      this.stopMobileTimerOpen()
      if (!delay) {
        this.stopMobileTimerClose()
        this.mobileItem = null
        return
      }
      if (!this.mobileItemCloseTimeout) {
        this.mobileItemCloseTimeout = setTimeout(() => {
          this.mobileItem = null
        }, 600)
      }
    },
    stopMobileTimerClose () {
      if (this.mobileItemCloseTimeout) clearTimeout(this.mobileItemCloseTimeout)
      this.mobileItemCloseTimeout = null
    },
    stopMobileTimerOpen () {
      if (this.mobileItemOpenTimeout) clearTimeout(this.mobileItemOpenTimeout)
      this.mobileItemOpenTimeout = null
    },
    initParentOffsets () {
      let { top: sidebarTop, left: sidebarLeft, right: sidebarRight } = this.$el.getBoundingClientRect()
      let parent = this.relative ? this.$el.parentElement : document.documentElement
      this.parentHeight = parent.clientHeight
      this.parentWidth = parent.clientWidth
      if (this.relative) {
        let { top: parentTop, left: parentLeft } = parent.getBoundingClientRect()
        this.parentOffsetTop = sidebarTop - (parentTop + parent.clientTop)
        this.parentOffsetLeft = this.rtl ? this.parentWidth - sidebarRight + (parentLeft + parent.clientLeft) : sidebarLeft - (parentLeft + parent.clientLeft)
      } else {
        this.parentOffsetTop = sidebarTop
        this.parentOffsetLeft = this.rtl ? this.parentWidth - sidebarRight : sidebarLeft
      }
    },
    onItemUpdate (newItem, item) {
      if (item === this.mobileItem) {
        this.mobileItem = newItem
      }
      if (item === this.activeShow) {
        this.activeShow = newItem
      }
    }
  },
  provide () {
    return {
      emitActiveShow: this.onActiveShow,
      emitItemClick: this.onItemClick,
      emitItemUpdate: this.onItemUpdate,
      emitStopMobileTimerClose: this.stopMobileTimerClose,
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vue-sidebar-menu';
</style>
