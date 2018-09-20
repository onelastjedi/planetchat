  <template>
  <div :class="$style.wrapper" v-if="isVisible">
    <div :class="$style.section">
      <div :class="$style.header">
        Add Members
        <span @click="close">&times;</span>
        <div :class="$style.search">
          <i class="icon-search" />
          <input type="text"
            placeholder="Search here..."
            v-model.trim="searchString"
          />
        </div>
      </div>
      <div :class="$style.content">
        <div :class="$style.contact" @click="openAddContactPopup">
          <span><i class="icon-new-contact" /></span>
          Add New Contact
          <i class="icon-right-arrow" />
        </div>
        <div
          :class="[$style.contact, {[$style.isSelected]: contact.selected }]"
          v-for="(contact, index) in searched(currentUser.contacts, searchString)"
          :key="`contacts-${index}`"
          @click="selectContact(contact)"
        >
          <div :class="$style.avatar">
            <img
              :src="
              contact.pid
              ? contact.pid
              : '/img/mocks/inbox_avatar_default.png'
            "/>
          </div>
          {{ contact.fn }}&nbsp;{{ contact.ln }}
        </div>
      </div>
      <styled-button @click="updateSelectedContacts(currentUser)" type="filled-blue">Done</styled-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    StyledButton: () => import("@/shared/components/StyledButton")
  },
  name: "AddGroupMembers",
  data: () => ({
    searchString: "",
    selectedContacts: []
  }),
  computed: {
    isVisible() {
      return this.$store.state.popups[this.$options.name];
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    searched(contacts, searchString) {
      return contacts.filter(contact => {
        if (contact.fn && searchString && contact.ln) {
          return contact.fn
            .concat(contact.ln)
            .toLowerCase()
            .includes(searchString.toLowerCase());
        } else return contact;
      });
    },
    selectContact(contact) {
      const user = {
        ...contact,
        selected: contact.selected ? false : true
      };
      this.$store.commit("UPDATE_CONTACT", {
        contact,
        user
      });
    },
    updateSelectedContacts({ contacts }) {
      const usersToAdd = contacts.filter(obj => obj.selected === true);

      if (usersToAdd.length) {
        usersToAdd.forEach(user => {
          this.$socket.emit("postGroupMember", {
            group_id: this.$route.params.id,
            member_user_id: user.uid
          });
        });
      }
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        { EditGroup: true },
        { AddGroupMembers: false }
      ]);

      this.clearSelection(this.currentUser.contacts);
    },
    clearSelection(contacts) {
      contacts.forEach(contact => {
        this.$store.commit("UPDATE_CONTACT", {
          contact,
          user: {
            ...contact,
            selected: false
          }
        });
      });
    },
    openAddContactPopup() {
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        { AddGroupMembers: false },
        { AddNewContact: true }
      ]);
      this.clearSelection(this.currentUser.contacts);
    },
    close() {
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        Object.defineProperty({}, this.$options.name, {
          value: false,
          writable: false
        })
      ]);
      this.clearSelection(this.currentUser.contacts);
    }
  }
};
</script>

<style module lang="stylus">
  .wrapper
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

  .section
    border-radius 15px
    padding 10px 15px
    display table-cell
    vertical-align middle
    background-color white
    box-shadow 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22)

  .header
    position relative
    font-weight 700
    text-align center
    padding 15px 0

    span
      font-size 45px
      font-weight 300
      line-height 35px
      position absolute
      right -9px
      padding 0 10px
      top 0
      cursor pointer
      color #93a5ba

  .content
    max-height 400px
    overflow-x scroll

  .contact
    position relative
    display grid
    padding 10px 0
    grid-template-columns 50px 1fr 25px
    grid-column-gap 15px
    align-items center
    border-bottom 1px solid rgba(146, 165, 186, .4)
    cursor pointer

    i[class^="icon-right-arrow"]
      font-size 12px
      color #56b9d6

    span
      display block
      height 50px
      border-radius 40%
      display grid
      align-items center
      text-align center
      background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)

      i
        color white
        font-size 18px

  .avatar
    position relative
    border-radius 40%
    width 50px
    height 50px
    overflow hidden
    display block

    img
      width inherit
      height inherit

  .isSelected
    .avatar
      &:before
        content ''
        display block
        position absolute
        width 50px
        height 50px
        background-color rgba(8, 69, 136, .7)
        top 0

      &:after
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        margin auto
        content ''
        display block
        width 6px
        height 12px
        border solid white
        border-width 0 2px 2px 0
        transform rotate(45deg)

  .search
    background-color #ebf1f5
    border-radius 15px
    padding 15px
    display grid
    grid-template-columns 30px auto
    grid-column-gap 10px
    margin-top 20px

    i
      font-size 18px
      padding-left 1px
      color #56b9d6

    input
      background transparent
      font-weight 300

    ::-webkit-input-placeholder
      color #93a5ba
      font-weight 300

    ::-moz-placeholder
      color #93a5ba
      font-weight 300

    :-ms-input-placeholder
      color #93a5ba
      font-weight 300

    :-moz-placeholder
      color #93a5ba
      font-weight 300
</style>
