import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const [open, setOpen] = useState(false);

    function handleClose (event){
        event.stopPropagation();
        setOpen(false);
        store.unmarkListForDeletion();
    };

    function handleCloseConfirm(event){
        event.stopPropagation();
        setOpen(false);
        store.deleteMarkedList();
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        //make delete modal pop up
        setOpen(true);
        store.markListForDeletion(id);
    }
    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }

    function handleBlur(event){
        let id = event.target.id.substring("list-".length);
        store.changeListName(id, text);
        toggleEdit();
    }
    
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleLike(event) {
        let id = event.target.id.substring("list-".length);
        store.likeList(id);
    }
    function handleDislike(event) {
        let id = event.target.id.substring("list-".length);
        store.disLikeList(id);
    }
    let cardElement =
        <Accordion>
            <AccordionSummary
                id={idNamePair._id}
                key={idNamePair._id}
                expandIcon = {<ExpandMoreIcon/>}
                sx={{ marginTop: '15px', display: 'flex', p: 1 }}
                style={{
                    width: '100%'
                }}
            >   
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    <div>
                        <span style = {{fontSize: '36pt'}}>    
                            {idNamePair.name}
                        </span>
                        <br/>
                        <br/>
                        <span style = {{fontSize: '20pt'}}>    
                            By: <s id = 'Author'>{idNamePair.Author}</s>
                        </span>
                        <br/>
                        <br/>
                        {idNamePair.publish ?
                            <span style = {{fontSize: '20pt'}}>    
                                Published: {}
                            </span>
                            :
                            <span style = {{fontSize: '20pt', color: 'red', textDecoration: 'underline'}}>    
                                Edit
                            </span>
                        }
                        
                    </div>
                </Box>
                <Box sx={{ p: 1 }} style={{fontSize:'48pt'}}>
                    <IconButton onClick={(event) => {
                        handleLike(event, idNamePair._id)
                    }} aria-label='delete'>
                        <ThumbUpIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                    {idNamePair.like}
                </Box>
                <Box sx={{ p: 1 }} style={{fontSize:'48pt'}}>
                    <IconButton onClick={(event) => {
                        handleDislike(event, idNamePair._id)
                    }} aria-label='delete'>
                        <ThumbDownAltIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                    {idNamePair.dislike}
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                
            </AccordionDetails>
                <DeleteModal open = {open} close = {handleClose} name = {idNamePair.name} confirm = {handleCloseConfirm}/>
        </Accordion>
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onBlur = {handleBlur}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;