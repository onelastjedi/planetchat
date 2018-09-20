import moment from "moment";
import lib from "@/shared/utils/lib";

/* eslint-disable */

export default {
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
    groups
      .find(group => group.gid === gid)
      .members.some(obj => obj.uid === uid),

  isMessageExist: state => (group, message) =>
    group.messages.some(obj => obj.mid === message.mid),

  getMembersByGroupId: ({ groups }, { getGroupById }) => id => {
    const group = getGroupById(id);
    if (group && group.members) return group.members;
  },

  getTypingUsers: state => id => {
    const group = state.groups.find(obj => obj.gid === id);
    return group.members.filter(
      obj => obj.typing === true && obj.uid !== lib.currentUserUID()
    );
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
};
