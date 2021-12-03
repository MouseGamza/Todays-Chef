import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chefId: -1,
  chefName: '',
  cuisine: '',
  chefImg: '',
  greeting: '',
  career: '',
  values: '',
  rating: '',
  chUserId: -1,
  courses: [],
};

export const chefSlice = createSlice({
  name: 'chef',
  initialState,
  reducers: {
    chefLogin: (state, action) => {
      state.chefId = action.payload.chefId;
    },
    chefMypage: (state, action) => {
      state.chefName = action.payload.chefName;
      state.cuisine = action.payload.cuisine;
      state.chefImg = action.payload.chefImg;
      state.greeting = action.payload.greeting;
      state.career = action.payload.career;
      state.values = action.payload.values;
      state.rating = action.payload.rating;
      state.chUserId = action.payload.chUserId;
    },
    chefLogout: (state) => {
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
    addCourse: (state, action) => {
      state.courses.push(action.payload.data);
    },
  },
});

export const { chefLogin, chefMypage, chefLogout, addCourse } =
  chefSlice.actions;
export const chefStatus = (state) => state.chef;
export default chefSlice.reducer;
