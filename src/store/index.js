import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {emojiShown:false, typing:false,backDrop:false,fileAttached:false}

const emojiSlice = createSlice({
    name:'emoji',
    initialState,
    reducers:{
        toggleEmoji(state,action){
            state.emojiShown = !state.emojiShown

        },
        toggleTyping(state,action){
            state.typing = action.payload

        },
        backDropToggle(state,action){
            state.backDrop = action.payload
        },
        toggleFileAttachment(state,action){
            state.fileAttached = action.payload
        }


    }
});



const store = configureStore({
    reducer:emojiSlice.reducer
})

export const emojiActions = emojiSlice.actions
export default store;

