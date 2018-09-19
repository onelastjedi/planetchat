import Vue from "vue";
import Vuex from "vuex";
import socket from "@/shared/utils/socket.io";
// import router from "@/router";
import lib from "@/shared/utils/lib";
import moment from "moment";

/* eslint-disable */
Vue.use(Vuex);

const getContactByUID = (user, uid) =>
  user.contacts.find(obj => obj.uid === uid);

const performImageRotation = async pid =>
  pid ? await lib.getRotatedPhotoAsBase64String(pid) : null;

export default new Vuex.Store({
  state: new function() {
    /* Socket related */
    this.isSocketConnected = false;

    /* Groups related */
    this.groups = [];
    this.searchedUsers = [];
    // this.currentGroupId = () => +router.currentRoute.params.id;
    this.currentGroup = () =>
      this.groups.find(obj => obj.gid === this.currentGroupId());

    /* Users related */
    this.currentUser = {
      contacts: [],
      privacy: {}
    };

    /* UI related */
    this.isDataLoading = false;

    this.popups = {
      AddNewContact: false,
      Weather: false,
      CreateGroup: false,
      EditGroup: false,
      AddGroupMembers: false,
      UserAdded: false,
      FullScreenImage: false
    };

    /* Errors related */
    this.errors = [];
  }(),
  getters: {
    /* Groups related */
    getGroupById: ({ groups }) => id => groups.find(group => group.gid === id),

    /* Messages related */
    getMessagesByGroupId: ({ groups }, { getGroupById }) => id => {
      const { messages } = getGroupById(id);
      if (messages.length) return messages.slice().reverse();
    },

    getLastMessageByGroupId: ({ groups }, { getGroupById }) => id => {
      const { messages } = getGroupById(id);
      if (messages.length) return messages[0];
    },

    getLastMessageTimeByGroupId: ({ groups }, { getGroupById }) => id => {
      const { messages } = getGroupById(id);
      if (messages.length) {
        const time = messages[0].sd;
        return moment(new Date(time * 1000), "YYYYMMDD").fromNow();
      }
    },

    isGroupExist: ({ groups }) => group =>
      groups.some(obj => obj.gid === group.gid || obj.gid === group.gid),

    isMemberExistInGroup: ({ groups }) => ({ gid, uid }) =>
      groups.find(group => group.gid === gid)
        .members.some(obj => obj.uid === uid),

    isMessageExist: state => (group, message) =>
      group.messages.some(obj => obj.mid === message.mid),

    getMembersByGroupId: ({ groups }, { getGroupById }) => id => {
      const group = getGroupById(id);
      if (group && group.members) return group.members;
    },

    getTypingUsers: state => id => {
      const group = state.groups.find(obj => obj.gid === id);
      return group.members.filter(obj => obj.typing === true && obj.uid !== lib.currentUserUID());
    },
    // getLastAddedContact: ({ currentUser: { contacts } }) => {
    //   if (contacts && contacts.length) return contacts[contacts.length - 1];
    // },

    // /* UI related */
    isAnyPopupVisible: state => {
      return Object.keys(state.popups).some(val => state.popups[val]);
    },

    isAdminOfGroup: ({ currentUser }) => group => {
      const member = group.members.find(m => m.uid === currentUser.uid);
      return member.isAdmin;
    },

    getContactByUID: ({ currentUser }) => uid =>
      currentUser.contacts.find(obj => obj.uid === uid),

    getGroupMemberByUID: ({ groups }) => (gid, uid) =>
      groups.find(obj => obj.gid === gid).members.find(obj => obj.uid === uid)
  },
  mutations: {
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

    UPDATE_GROUP: (state, { group, payload }) => {
      for (const key in payload) Vue.set(group, key, payload[key]);
    },

    REMOVE_GROUP: (state, { gid }) =>
      state.groups = state.groups.filter(obj => obj.gid !== gid),

    ADD_MEMBER: ({ groups }, { gid, member }) =>
      groups.find(group => group.gid === gid).members.push(member),

    UPDATE_MEMBER: (state, { member, user }) => {
      for (const key in user) Vue.set(member, key, user[key]);
    },

    REMOVE_MEMBER: ({ groups }, { gid, member }) => {
      const group = groups.find(group => group.gid === gid);
      group.members = group.members.filter(m => m.uid !== member.uid);
    },

    // SET_CURRENT_GROUP_USER_TYPING: (state, payload) => {
    //   const group = state.groups.find(obj => obj.gid === payload.gid);
    //   if (group.members) {
    //     const typingUser = group.members.find(obj => obj.uid === payload.uid);
    //     typingUser.status = "typing";
    //   }
    // },
    // UNSET_CURRENT_GROUP_USER_TYPING: (state, payload) => {
    //   const group = state.groups.find(obj => obj.gid === payload.gid);
    //   if (group.members) {
    //     const typingUser = group.members.find(obj => obj.uid === payload.uid);
    //     typingUser.status = "success";
    //   }
    // },
    INCREMENT_NEW_COUNT: (state, group) => {
      group.new += 1;
    },
    DECREMENT_NEW_COUNT: (state, group) => {
      if (group.new > 0) group.new -= 1;
    },
    // PUSH_CREATED_GROUP: (state, gid) => {
    //   state.groups.push({ gid });
    // },
    // DELETE_GROUP_BY_ID: (state, gid) => {
    //   state.groups = state.groups.filter(obj => obj.gid !== +gid);
    // },
    SET_GROUP_PHOTO: ({ groups }, { pid, gid }) => {
      const group = groups.find(obj => obj.gid === gid);
      group.group_photo_id = pid;
    },
    // SET_CURRENT_GROUP_MEMBERS_OPTIONS_VISIBILITY: (
    //   { currentGroup },
    //   { options, uid }
    // ) => {
    //   if (currentGroup().members) {
    //     const member = currentGroup().members.find(obj => obj.uid === uid);
    //     Vue.set(member, "options", options);
    //   }
    // },
    // UNSET_CURRENT_GROUP_MEMBERS_OPTIONS_VISIBILITY: ({ currentGroup }) => {
    //   if (currentGroup().members) {
    //     currentGroup().members.forEach(member =>
    //       Vue.set(member, "options", false)
    //     );
    //   }
    // },
    // ADD_USER_TO_THE_GROUP: ({ groups }, { gid, uid }) => {
    //   const group = groups.find(obj => obj.gid === +gid);
    //   group.members.push({ uid });
    // },
    // REMOVE_USER_FROM_THE_GROUP: ({ groups }, { gid, uid }) => {
    //   const group = groups.find(obj => obj.gid === +gid);
    //   group.members = group.members.filter(obj => obj.uid !== uid);
    // },

    /**
     * Messages related mutations
     */
    // SET_MESSAGES: ({ groups }, { messages, gid }) => {
    //   const group = groups.find(obj => obj.gid === gid);
    //   Vue.set(group, "messages", messages);
    // },
    ADD_MESSAGE: (state, { group, obj }) => {
      group.messages.push(obj);
    },

    SET_LAST_MESSAGE: ({ groups }, { messages, m }) => {
      const foundIndex = messages.findIndex(obj => obj.sd == m.sd);
      if (foundIndex >= 0) Vue.set(messages, 0, m);
      else messages.unshift(m);
    },

    UPDATE_CURRENT_GROUP_MESSAGES: ({ currentGroup }, message) => {
      currentGroup().messages.unshift(message);
    },

    SET_READ_STATUS: ({ groups }, message) => {
      Vue.set(message, "dr", 2);
    },

    /**
     * UI related mutations
     */
    // SET_LOADING_STATE: (state, loading) => {
    //   state.isDataLoading = loading;
    // },
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

    UPDATE_CONTACT: (state, { contact, user }) => {
      for (const key in user) Vue.set(contact, key, user[key]);
    },

    SELECT_CONTACT: ({ currentUser }, { selected, uid }) =>
      Vue.set(getContactByUID(currentUser, uid), "selected", selected),

    // ADD_USER_CONTACTS: ({ currentUser: { contacts } }, uidsArr) => {
    //   uidsArr.forEach(
    //     uid => (isContactExist(contacts, uid) ? contacts.push(uid) : false)
    //   );
    // },
    // SET_CURRENT_USER_CONTACT_SELECTION: (
    //   { currentUser },
    //   { selected, uid }
    // ) => {
    //   const contact = currentUser.contacts.find(obj => obj.uid === uid);
    //   Vue.set(contact, "selected", selected);
    // },
    // UNSET_CURRENT_USER_CONTACTS_SELECTION: ({ currentUser }) => {
    //   if (currentUser.contacts) {
    //     currentUser.contacts.forEach(contact =>
    //       Vue.set(contact, "selected", false)
    //     );
    //   }
    // },
    // SET_CURRENT_USER_CONTACT_OPTIONS_VISIBILITY: (
    //   { currentUser },
    //   { options, uid }
    // ) => {
    //   if (currentUser.contacts) {
    //     const contact = currentUser.contacts.find(obj => obj.uid === uid);
    //     Vue.set(contact, "options", options);
    //   }
    // },
    // UNSET_CURRENT_USER_CONTACT_OPTIONS_VISIBILITY: ({ currentUser }) => {
    //   if (currentUser.contacts) {
    //     currentUser.contacts.forEach(contact =>
    //       Vue.set(contact, "options", false)
    //     );
    //   }
    // },
    // DELETE_USER_CONTACT: ({ currentUser }, uid) => {
    //   const { contacts } = currentUser;
    //   const filteredContacts = contacts.filter(obj => obj.uid !== uid);
    //   Vue.set(currentUser, "contacts", filteredContacts);
    // }
  },
  actions: {
    /**
     * Performs initial app loading
     */
    init: ({ commit }) => {
        /* Get current user groups (and chats) */
        socket.emit("getGroupAll", {});

        /* Get current user info */
        socket.emit("getOtherInfo", { user_id: lib.currentUserUID() });

        // /* TODO: Move privacy request here */
        socket.emit("getPrivacy", {});

        // /* Get current user contacts */
        socket.emit("getContacts", {});
      },

    addGroup: ({ commit }, group) => {
      commit("ADD_GROUP", group);
      socket.emit("getGroupInfo", { group_id: group.gid })
      socket.emit("getGroupMembersById", { group_id: group.gid })
      if (group.mmx) socket.emit("getMessageById", { message_id: group.mmx });
    },


    /**
     * Groups
     *
     */
    getGroupAll: async ({ commit, getters: { isGroupExist }, dispatch }, { groups }) => {
      // Handling
      groups = groups.map(g => {
        return {
          ...g,
          members: [],
          messages: []
        };
      });

      // Saving
      groups.forEach(group => {
        if (!isGroupExist(group)) {
          dispatch("addGroup", group);
        }
      })
    },

    getGroupInfo: async ({ commit, getters: { getGroupById } }, payload) => {
      const group = getGroupById(payload.gid);

      // Handling
      payload.group_photo_id = await performImageRotation(
        payload.group_photo_id
      );

      // Saving
      commit("UPDATE_GROUP", { group, payload });
    },

    getGroupMembersById: (
      { commit, getters: { isMemberExistInGroup, getGroupMemberByUID } },
      { admins, members, gid }
    ) => {

      // Handling
      members = members.map(member => {
        return {
          isAdmin: admins.some(admin => admin === member),
          uid: member,
          typing: false
        };
      });

      // Saving
      members.forEach(member => {

        if (!isMemberExistInGroup({ gid, uid: member.uid }))
          commit("ADD_MEMBER", { gid, member });

        else {
          const oldM = getGroupMemberByUID(gid, member.uid);
          commit("UPDATE_MEMBER", { member: oldM, user: member });
        }

        socket.emit("getOtherInfo", { user_id: member.uid })
      });
    },

    postGroup: ({ commit, getters: { isGroupExist }, dispatch} , group) => {
      group = {
        ...group,
        members: [],
        messages: [],
        gid: group.group_id
      };

      if (!isGroupExist(group)) dispatch("addGroup", group);
      router.push(`/groups/${group.gid}`);
    },

    deleteGroupById: ({ commit, }, payload) => {
      commit("REMOVE_GROUP", payload);
      router.push("/");
    },

    /**
     * Notifications
     *
     */
    notification: async (
      { commit, state: { currentUser }, getters: { getGroupById, isGroupExist, isMemberExistInGroup, getGroupMemberByUID }, dispatch },
      payload
    ) => {
      /* TODO: Refactor that shame below */

      /* Messages */
      if (payload.tp === "m") {
        if (payload.in === "cr") {

          if (payload.uid !== lib.currentUserUID()) {
            const group = getGroupById(payload.gid);

            if (group)
              commit("INCREMENT_NEW_COUNT", group);
          }

          if (isGroupExist({ gid: payload.gid }))
            socket.emit("getMessageById", { message_id: payload.mid });
        }
      }

      /* Typing */
      if (payload.tp === "t") {

        /* Start */
        if (payload.in === "sta") {
          const member = getGroupMemberByUID(payload.gid, payload.uid);

          const user = member;
          user.typing = true;

          commit("UPDATE_MEMBER", { member, user })
        }

        /* Stop */
        if (payload.in === "stp") {
          const member = getGroupMemberByUID(payload.gid, payload.uid);

          const user = member;
          user.typing = false;

          commit("UPDATE_MEMBER", { member, user })
        }
      }

      /* Delivering */
      if (payload.tp === "d") {
        if (payload.in === "red") {
          const { messages } = getGroupById(payload.gid);
          const message = messages.find(obj => obj.mid === payload.mid);
          commit("SET_READ_STATUS", message);
        }
      }

      /* Groups */
      if (payload.tp === "g") {

        const { gid, uid } = payload;


        /* Remove group */
        if (payload.in === "gdl")
          dispatch("deleteGroupById", payload);

        /* Add user to the group */
        if (payload.in === "mad") {

          if (!isGroupExist({ gid })) {
            dispatch("addGroup", {
              members: uid === currentUser.uid ? [{ uid: currentUser.uid }] : [],
              messages: [],
              gid
            });
          }

          if (
            !isMemberExistInGroup({ gid, uid })
          ) {
            commit("ADD_MEMBER", {
              gid,
              member: {
                isAdmin: false,
                uid
              }
            });

            socket.emit("getOtherInfo", { user_id: uid })
          }
        }

        /* Remove user from the group */
        if (payload.in === "mdl") {
          commit("REMOVE_MEMBER", {
            gid,
            member: {
              uid
            }
          });

          if (uid === currentUser.uid) {
            dispatch('deleteGroupById', { gid })
          };
        }
      }

      /* Contacts */
      if (payload.tp === "u") {
        /* Add user to contacts */
        if (payload.in === "cad") {
          const contacts = payload.uids;
          commit("ADD_USER_CONTACTS", contacts);
          contacts.forEach(user_id => {
            socket.emit("getOtherInfo", { user_id });
          });
        }

        /* Remove user from contacts */
        if (payload.in === "cdl") commit("DELETE_USER_CONTACT", payload.uid);

        /* Handle change status notification */
        if (payload.in === "sta" && payload.uid === lib.currentUserUID())
          commit("SET_CURRENT_USER_STATUS", payload);
      }
    },

    /**
     * Messages
     *
     */
    getMessageById: async (
      { commit, getters: { getGroupById, isMessageExist } },
      { gid, m }
    ) => {
      const group = getGroupById(gid);

      // Handling
      m.pid = await performImageRotation(m.pid);

      // Saving
      if (!isMessageExist(group, m))
        commit("SET_LAST_MESSAGE", { messages: group.messages, m });
    },

    getBefore: async (
      { commit, getters: { getGroupById, isMessageExist } },
      { gid, m }
    ) => {
      // commit("SET_LOADING_STATE", true);

      /* TODO: Refactor for fast loading */
      const pArray = m.map(async mes => {
        return {
          ...mes,
          pid: await performImageRotation(mes.pid)
        };
      });

      const messages = await Promise.all(pArray);
      const group = getGroupById(gid);

      messages.forEach(obj => {
        if (!isMessageExist(group, obj)) commit("ADD_MESSAGE", { group, obj });
      });

      // commit("SET_LOADING_STATE", false);
    },

    /**
     * User
     *
     */
    getContacts: ({ commit }, { contacts }) => {
      // Handling
      contacts = contacts.map(c => {
        return { uid: c };
      });

      // Saving
      contacts.forEach(c => {

        socket.emit("getOtherInfo", { user_id: c.uid })
        commit("ADD_CONTACT", c)
      });
    },

    searchByName: ({ commit }, user) => {
      commit("SET_USERS_RETURNED_BY_SEARCH", user);
    },

    getPrivacy: ({ commit }, privacy) => {
      commit("SET_CURRENT_USER_PRIVACY", privacy);
    },

    /**
     * Send data to correct mutation, based on app state
     */
    getOtherInfo: async (
      {
        commit,
        state: { currentUser, groups },
        getters: { getContactByUID, getGroupMemberByUID }
      },
      { user }
    ) => {
      /* TODO: Convert to decorator */
      user.pid = await performImageRotation(user.pid);

      /* Updates current user info */
      if (user.uid === lib.currentUserUID()) commit("SET_CURRENT_USER", user);

      /* Updates current user contacts */
      if (currentUser.contacts.some(obj => obj.uid === user.uid)) {
        const contact = getContactByUID(user.uid);
        commit("UPDATE_CONTACT", { contact, user });
      }

      /* Updates current group members */
      groups.forEach(g => {
        if (g.members.some(obj => obj.uid === user.uid)) {
          const member = getGroupMemberByUID(g.gid, user.uid);
          commit("UPDATE_MEMBER", { member, user });
        }
      })
    }
  }
});
