export default {
  /* Socket related */
  isSocketConnected: false,

  /* Groups related */
  groups: [],
  searchedUsers: [],

  /* Users related */
  currentUser: {
    contacts: [],
    privacy: {}
  },

  /* UI related */
  isDataLoading: false,

  popups: {
    AddNewContact: false,
    Weather: false,
    CreateGroup: false,
    EditGroup: false,
    AddGroupMembers: false,
    UserAdded: false,
    FullScreenImage: false,
    SatelliteDeviceInfo: false,
    SatelliteChoosePlan: false,
    SatellitePaymentDetails: false
  },

  /* Plans */
  plans: [],

  /* Errors related */
  errors: []
};
