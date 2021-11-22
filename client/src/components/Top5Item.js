import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);
    const [text, setText] = useState(props.text);

    function handleDragStart(event, targetId) {
        event.dataTransfer.setData("item", targetId);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);
        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function handleToggleEdit(event){
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.addUpdateItemTransaction(index,event.target.value);
            toggleEdit();
        }
        handleUpdateText(event);
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleBlur(event){
        store.addUpdateItemTransaction(index,event.target.value);
        toggleEdit();
        handleUpdateText(event);
    }

    let { index} = props;

    
    let itemelement = 
            <ListItem >
            <Box sx={{ p: 1, flexGrow: 1 }}>{text}</Box>
        </ListItem>
    if (editActive) {
        itemelement =
            <TextField
                margin="normal"
                required
                id={'item-' + (index+1)}
                label="ItemName"
                className='top5-item'
                defaultValue={text}
            />
    }
    return (
        itemelement
    )
}

export default Top5Item;