import { createSlice } from '@reduxjs/toolkit'

const panelSlice = createSlice({
    name : 'panel',
    initialState : {
        showPanel :true
    },
    reducers : {
        setShowPanel : (state) =>{
            state.showPanel = !state.showPanel
        }
    }
})

export const {setShowPanel} = panelSlice.actions
export default panelSlice.reducer
