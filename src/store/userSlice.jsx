import { createSlice } from '@reduxjs/toolkit';
import cookie from 'react-cookies';

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, isLogin: false },
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
            state.isLogin = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLogin = false;
            cookie.remove('accessKey');
        }
    }
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice;
