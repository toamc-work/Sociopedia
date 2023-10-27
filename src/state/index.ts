import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export namespace IStateAuth {
    export interface IFriend {
        _id:string;
        firstName:string;
        lastName:string;
        email:string;
        location:string;
        occupations:string;
    };
    
    export interface IUser {
        _id:string;
        firstName:string;
        lastName:string;
        email:string;
        friends: IFriend[];
        location:string;
        occupations:string;
        picturePath:string;
        viewedProfile:string;
        impressions:string;
        createdAt: Date;
        updatedAt: Date;
    };
    
    export interface IPost {
        _id: string;
        userId: string;
        firstName: string;
        lastName: string;
        location: string;
        description: string;
        picturePath: string;
        userPicturePath: string;
        likes: {
            [key:string]: boolean
        };
        __v?: number,
        createdAt: Date,
        updatedAt: Date,
    };
    
    export interface IInitialState {
        mode: 'light' | 'dark';
        user: null | IUser
        token: null | string;
        posts: IPost[]
    };
    
    export const initialState:IInitialState = {
        mode: "light",
        user: null,
        token: null,
        posts: [],
    };
};

export const authSlice = createSlice({
    name: 'auth',
    initialState:IStateAuth.initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        setLogin: (state, action: PayloadAction<{user:IStateAuth.IUser, token:string}>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        setFriends: (state, action:PayloadAction<{friends:IStateAuth.IFriend[]}>) => {
            if(state.user != null)
            {
                state.user.friends = action.payload.friends;
            };
        },

        setPosts: (state, action: PayloadAction<{posts:IStateAuth.IPost[]}>) => {
            state.posts = action.payload.posts;
        },

        setPost: (state, action: PayloadAction<{post:IStateAuth.IPost}>) => {
            const updatePosts = state.posts.map(post => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });

            state.posts = updatePosts;
        },
    },
});

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;

export default authSlice.reducer;