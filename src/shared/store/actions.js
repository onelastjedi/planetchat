import socket from "@/shared/utils/socket.io";
import lib from "@/shared/utils/lib";
/* eslint-disable */

export default {
  /**
   * Performs initial app loading
   */
  init: () => {
    /* Get current user groups (and chats) */
    socket.emit("getGroupAll", {});

    /* Get current user info */
    socket.emit("getOtherInfo", {
      user_id: lib.currentUserUID(),
      tag: "currentUser"
    });

    socket.emit("getPrivacy", {});

    /* Get current user contacts */
    socket.emit("getContacts", {});
  },

  addGroup: ({ commit }, group) => {
    commit("ADD_GROUP", group);
    socket.emit("getGroupInfo", { group_id: group.gid });
    socket.emit("getGroupMembersById", { group_id: group.gid });
    if (group.mmx) socket.emit("getMessageById", { message_id: group.mmx });
  },

  /**
   * Groups
   *
   */
  getGroupAll: async ({ getters: { isGroupExist }, dispatch }, { groups }) => {
    groups.forEach(group => {
      if (!isGroupExist(group)) {
        dispatch("addGroup", {
          ...group,
          members: [],
          messages: []
        });
      }
    });
  },

  getGroupInfo: async ({ commit }, payload) => {
    if (payload.group_photo_id)
      payload.group_photo_id = await lib.getRotatedPhotoAsBase64String(
        payload.group_photo_id
      );

    commit("UPDATE_GROUP", payload);
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

      // else commit("UPDATE_MEMBER", { gid, member });

      socket.emit("getOtherInfo", { user_id: member.uid, tag: gid });
    });
  },

  postGroup: ({ commit, getters: { isGroupExist }, dispatch }, group) => {
    group = {
      ...group,
      members: [],
      messages: [],
      gid: group.group_id
    };

    if (!isGroupExist(group)) dispatch("addGroup", group);
  },

  deleteGroupById: ({ commit }, payload) => {
    commit("REMOVE_GROUP", payload);
  },

  /**
   * Notifications
   *
   */
  notification: async (
    {
      commit,
      state: { currentUser },
      getters: {
        getGroupById,
        isGroupExist,
        isMemberExistInGroup,
        getGroupMemberByUID
      },
      dispatch
    },
    payload
  ) => {
    /* TODO: Refactor that shame below */

    /* Messages */
    if (payload.tp === "m") {
      if (payload.in === "cr") {
        if (payload.uid !== lib.currentUserUID()) {
          const group = getGroupById(payload.gid);

          if (group) commit("INCREMENT_NEW_COUNT", group);
        }

        if (isGroupExist({ gid: payload.gid }))
          socket.emit("getMessageById", { message_id: payload.mid });
      }
    }

    /* Typing */
    if (payload.tp === "t") {
      /* Start */
      if (payload.in === "sta") {
        commit("UPDATE_MEMBER", {
          gid: payload.gid,
          user: {
            uid: payload.uid,
            typing: true
          }
        });
      }

      /* Stop */
      if (payload.in === "stp") {
        commit("UPDATE_MEMBER", {
          gid: payload.gid,
          user: {
            uid: payload.uid,
            typing: false
          }
        });
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
      if (payload.in === "gdl") dispatch("deleteGroupById", payload);

      /* Add user to the group */
      if (payload.in === "mad") {
        if (!isGroupExist({ gid })) {
          dispatch("addGroup", {
            members: uid === currentUser.uid ? [{ uid: currentUser.uid }] : [],
            messages: [],
            gid
          });
        }

        if (!isMemberExistInGroup({ gid, uid })) {
          commit("ADD_MEMBER", {
            gid,
            member: {
              isAdmin: false,
              uid
            }
          });

          socket.emit("getOtherInfo", { user_id: uid });
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
          dispatch("deleteGroupById", { gid });
        }
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
    if (m.pid) m.pid = await lib.getRotatedPhotoAsBase64String(m.pid);

    // Saving
    if (!isMessageExist(group, m))
      commit("SET_LAST_MESSAGE", { messages: group.messages, m });
  },

  getBefore: async (
    { commit, getters: { getGroupById, isMessageExist } },
    { gid, m }
  ) => {
    /* TODO: Refactor for fast loading */
    const pArray = m.map(async mes => {
      return {
        ...mes,
        pid: mes.pid ? await lib.getRotatedPhotoAsBase64String(mes.pid) : null
      };
    });

    const messages = await Promise.all(pArray);
    const group = getGroupById(gid);

    messages.forEach(obj => {
      if (!isMessageExist(group, obj)) commit("ADD_MESSAGE", { group, obj });
    });

    commit("SET_LOADING_STATE", false);
  },

  /**
   * User
   *
   */
  getContacts: ({ commit }, { contacts }) => {
    contacts.forEach(contact => {
      socket.emit("getOtherInfo", {
        user_id: contact,
        tag: "contacts"
      });

      commit("ADD_CONTACT", { uid: contact });
    });
  },

  searchByName: ({ commit }, user) => {
    commit("SET_USERS_RETURNED_BY_SEARCH", user);
  },

  getPrivacy: ({ commit }, privacy) => {
    commit("SET_CURRENT_USER_PRIVACY", privacy);
  },

  /**
   * Send data to correct mutation, based on tag
   */
  getOtherInfo: async ({ commit }, { user, tag }) => {
    /* TODO: Convert to decorator */
    if (user.pid) user.pid = await lib.getRotatedPhotoAsBase64String(user.pid);

    switch (tag) {
      /* Updates current user info */
      case "currentUser":
        commit("SET_CURRENT_USER", user);
        break;

      /* Updates current user contacts */
      case "contacts":
        commit("UPDATE_CONTACT", user);
        break;
    }

    /* Updates group members info */
    if (typeof tag === "number") {
      commit("UPDATE_MEMBER", { user, gid: tag });
    }
  }
};
