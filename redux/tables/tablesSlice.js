import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
    name: 'table',
    initialState: {
        list: [],
        tableNumber: '',
        chairsNumber: '',
    },
    reducers: {
        addTable: (state, action) => {
            state.list.push(action.payload);
        },
        editTable: (state, action) => {
            const { id, tableNumber, chairsNumber } = action.payload;
            const tableToEdit = state.list.find((table) => table.id === id);
            if ( tableToEdit )  {
                tableToEdit.tableNumber = tableNumber;
                tableToEdit.chairsNumber = chairsNumber;
            }
        },
        deleteTable: (state, action) => {
            state.list = state.list.filter((table) => table.id !== action.payload);
        },        
        setTableNumber: (state, action) => {
            state.tableNumber = action.payload;
        },
        setChairsNumber: (state, action) => {
            state.chairsNumber = action.payload;
        },
    },
});


export const {addTable, editTable, deleteTable, setChairsNumber, setTableNumber} = tableSlice.actions;
export default tableSlice.reducer;