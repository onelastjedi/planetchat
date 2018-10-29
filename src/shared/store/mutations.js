import Vue from "vue";

/* eslint-disable */

const getContactByUID = (user, uid) =>
  user.contacts.find(obj => obj.uid === uid);

export default {
  /**
   * Socket related mutations
   */
  SET_SOCKET_CONNECTION_STATE: (state, connection) => {
    state.isSocketConnected = connection;
  },

  /* Errors */
  PUSH_ERROR: ({ errors }, error) => {
    errors.push(error);
  },

  CLEAR_ERRORS: state => {
    state.errors = [];
  },

  /**
   * Groups related mutations
   */
  ADD_GROUP: ({ groups }, group) =>
    groups.push(group),

  UPDATE_GROUP: ({ groups }, payload) => {
    const group = groups.find(obj => obj.gid === payload.gid);
    for (const key in payload) Vue.set(group, key, payload[key]);
  },

  REMOVE_GROUP: (state, { gid }) =>
    state.groups = state.groups.filter(obj => obj.gid !== gid),

  ADD_MEMBER: ({ groups }, { gid, member }) =>
    groups.find(group => group.gid === gid).members.push(member),

  UPDATE_MEMBER: ({ groups }, { gid, user } ) => {
    const group = groups.find(obj => obj.gid === gid);
    const member = group.members.find(obj => obj.uid === user.uid)
    for (const key in user) Vue.set(member, key, user[key]);
  },

  REMOVE_MEMBER: ({ groups }, { gid, member }) => {
    const group = groups.find(group => group.gid === gid);
    group.members = group.members.filter(m => m.uid !== member.uid);
  },

  INCREMENT_NEW_COUNT: (state, group) => {
    group.new += 1;
  },

  DECREMENT_NEW_COUNT: (state, group) => {
    if (group.new > 0) group.new -= 1;
  },

  SET_GROUP_PHOTO: ({ groups }, { pid, gid }) => {
    const group = groups.find(obj => obj.gid === gid);
    group.group_photo_id = pid;
  },

  ADD_MESSAGE: (state, { group, obj }) => {
    group.messages.push(obj);
  },

  SET_LAST_MESSAGE: ({ groups }, { messages, m }) => {
    const foundIndex = messages.findIndex(obj => obj.sd == m.sd);
    if (foundIndex >= 0) Vue.set(messages, 0, m);
    else messages.unshift(m);
  },

  UPDATE_CURRENT_GROUP_MESSAGES: ({ groups }, message) => {
    const group = groups.find(obj => obj.gid === message.gid)
    group.messages.unshift(message);
  },

  SET_READ_STATUS: ({ groups }, message) => {
    Vue.set(message, "dr", 2);
  },

  /**
   * UI related mutations
   */
  SET_LOADING_STATE: (state, loading) => {
    state.isDataLoading = loading;
  },

  SET_POPUPS_VISIBILITY: ({ popups }, options) => {
    options.forEach(popup => {
      const name = Object.getOwnPropertyNames(popup)[0];
      popups[name] = popup[name];
    });
  },

  /**
   * Users related mutations
   */
  SET_CURRENT_USER: ({ currentUser }, user) => {
    for (var key in user) Vue.set(currentUser, key, user[key]);
  },

  SET_CURRENT_USER_STATUS: ({ currentUser }, { sta }) => {
    Vue.set(currentUser, "sta", sta);
  },

  SET_CURRENT_USER_PRIVACY: ({ currentUser: { privacy } }, payload) => {
    for (var key in payload) Vue.set(privacy, key, payload[key]);
  },

  SET_CURRENT_USER_PIC: ({ currentUser }, pic) => {
    Vue.set(currentUser, "pid", pic);
  },

  SET_USERS_RETURNED_BY_SEARCH: ({ searchedUsers }, user) => {
    if (!searchedUsers.some(obj => obj.uid === user.uid))
      searchedUsers.push(user);
  },

  CLEAR_USERS_RETURNED_BY_SEARCH: state => {
    // TODO: Refactor
    state.searchedUsers = [];
  },

  /**
   * Contacts related mutations
   */
  ADD_CONTACT: ({ currentUser }, contact) => {
    currentUser.contacts.push(contact);
  },

  UPDATE_CONTACT: ({ currentUser }, contact) => {
    const existing = currentUser.contacts.find(obj => obj.uid === contact.uid)
    for (const key in contact) Vue.set(existing, key, contact[key]);
  },

  SELECT_CONTACT: ({ currentUser }, { selected, uid }) =>
    Vue.set(getContactByUID(currentUser, uid), "selected", selected),


  /**
   * Plans related mutations
   */
  SET_PLANS(state, payload) {
    state.plans = payload;
  },

  /**
   * Hardware related mutations
   */
  ADD_HARDWARE(state, payload) {
    state.hardware.push(payload);
  }
};
