import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: -1,
  nickname: '',
  userImg: '',
  email: '',
  isChef: false,
  isOauth: false,
  isSubmit: false,
  isAdmin: false,
  accessToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.id;
      state.nickname = action.payload.nickname;
      state.userImg = action.payload.userImg;
      state.email = action.payload.email;
      state.isChef = action.payload.isChef;
      state.isOauth = action.payload.isOauth;
      state.isSubmit = action.payload.isSubmit;
      state.isAdmin = action.payload.isAdmin;
      state.accessToken = action.payload.accessToken;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    sumbitBechef: (state) => {
      state.isSubmit = true;
    },
    updateUserImg: (state, action) => {
      state.userImg = action.payload.userImg;
    },
    editUserNickname: (state, action) => {
      state.nickname = action.payload.nickname;
    },
    logout: (state) => {
      state.userId = -1;
      state.nickname = '';
      state.userImg = '';
      state.email = '';
      state.isChef = false;
      state.isOauth = false;
      state.isSubmit = false;
      state.isAdmin = false;
      state.accessToken = null;
    },
  },
});

export const {
  login,
  logout,
  updateAccessToken,
  sumbitBechef,
  editUserNickname,
  updateUserImg,
} = userSlice.actions;
export const userStatus = (state) => state.user;
export default userSlice.reducer;
