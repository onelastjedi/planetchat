<template>
  <div :class="$style.weather" v-if="isVisible">
    <div :class="$style.section">
      <div :class="$style.header">
        <span @click="close">&times;</span>
      </div>
      <div :class="$style.today">
        <div :class="$style.todayHeader">
          <div :class="$style.todayIcon">
            <i class="icon-weather-snow" />
            <span />
          </div>
          <div>
            <h3>Weather Today</h3>
            <p>69&deg;F<span>Feels like</span>60&deg;F</p>
          </div>
          <div :class="$style.units">
            <div :class="$style.low"><span class="chevron bottom" />50&deg;F</div>
            <div :class="$style.high"><span class="chevron top" />82&deg;F</div>
          </div>
        </div>
        <div :class="$style.todayContent">A beautiful day with long sunny spells and the occasional rain show. A beautiful day with long sunny spells and the occasional rain show.</div>
      </div>
      <div
        v-for="(day, index) in days"
        :class="$style.item"
        :key="`days-${index}`"
      >
        <div :class="$style.itemHeader">
          <i :class="day.icon" />
          {{ day.name }}
        </div>
        <div :class="$style.itemContent">
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.</p>
          <div :class="$style.units">
            <div :class="$style.low"><span class="chevron bottom" />50&deg;F</div>
            <div :class="$style.high"><span class="chevron top" />82&deg;F</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  data: () => ({
    days: [
      { name: "Thursday", icon: "icon-weather-sleet" },
      { name: "Friday", icon: "icon-weather-rain-v2" },
      { name: "Saturday", icon: "icon-weather-pt-cloudy-night" },
      { name: "Sunday", icon: "icon-weather-pt-cloudy-day" },
      { name: "Monday", icon: "icon-weather-fog" },
      { name: "Tuesday", icon: "icon-weather-clear-night" }
    ]
  }),
  computed: {
    isVisible() {
      return this.$store.state.popups[this.$options.name];
    }
  },
  methods: {
    close() {
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        Object.defineProperty({}, this.$options.name, {
          value: false,
          writable: false
        })
      ]);
    }
  }
};
</script>

<style module lang="stylus">
  .weather
    position fixed
    width 50%
    max-width 600px
    min-width 360px
    height auto
    z-index 99
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    display table

    i
      color #56b9d6

  .section
    border-radius 15px
    padding 10px 15px
    display table-cell
    vertical-align middle
    background-color white
    box-shadow 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)

  .header
    position relative
    font-weight 700
    text-align center
    padding 20px 0

    span
      font-size 45px
      font-weight 300
      line-height 35px
      position absolute
      right 0
      padding 0 10px
      top 0
      cursor pointer
      color #93a5ba

  .today
    position relative
    line-height 1.3
    color #2a2d31
    padding 10px 15px
    border-bottom solid 1px rgba(147, 165, 186, 0.4)

  .todayHeader
    display grid
    grid-template-columns 50px 1fr auto
    align-items center

    h3
      font-weight 700
      font-size 18px

    i
      position relative

    p
      color #57abd9
      font-weight 700

      span
        font-weight 500
        padding 0 7px
        text-transform uppercase
        color #2a2d31


  .todayIcon
    position relative

    i
      z-index 1

    span
      left -11px
      top -11px
      position absolute
      z-index 0
      background-color #f5fbff
      display block
      border-radius 50%
      overflow hidden
      width 40px
      height 40px

  .todayContent
    margin-top 7px

  .item
    position relative
    padding 10px 15px
    color #2a2d31
    border-bottom solid 1px rgba(147, 165, 186, 0.4)

    &:last-child
      border none

  .itemHeader
    font-weight 700
    font-size 18px
    display grid
    grid-template-columns auto 1fr
    grid-gap 13px
    color #2a2d31


  .itemContent
    margin-top 7px
    display grid
    grid-template-columns 1fr auto
    grid-column-gap 10px
    line-height 1.3

  .units
    font-weight 700

    span
      margin-right 4px

  .low
    color #57abd9

  .high
    color #ffa14b

</style>
