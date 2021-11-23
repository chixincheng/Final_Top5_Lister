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
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';

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

    let editItems =
            <List id="edit-items" sx={{bgcolor: 'darkblue' }}>
                {
                    idNamePair.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)+item}
                            text={item}
                            index={index}
                            color = '#d6b95e' 
                        />
                    ))
                }
            </List>;
    let commentList =
            <List id = "commentlistview"sx={{left: '1%', right: '1%', bgcolor: '#c4c4c4', height: "200px"}}>
            {
                idNamePair.comments.map((text) => (
                    <div id = "comments">
                        <TextField id = "Author">
                            ({text}[0])
                        </TextField>
                        <TextField>
                            ({text}[1])
                        </TextField>
                    </div>
                ))
            }
            </List>;
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
            setText(event.target.value);
            let id = event.target.id.substring("list-".length);
            store.addComment(id, text);
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
    function handleLike(event, id) {
        event.stopPropagation();
        store.likeList(id);
    }
    function handleDislike(event, id) {
        event.stopPropagation();
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
                            <span>    
                                <s id='edit'
                                    onClick={handleToggleEdit}
                                >Edit</s>
                            </span>
                        }
                        
                    </div>
                </Box>
                
                <Box sx={{ p: 1 }} style={{fontSize:'48pt'}}>
                    <div>
                        <IconButton onClick={(event) => {
                            handleLike(event, idNamePair._id)
                        }} aria-label='delete'>
                            <ThumbUpIcon style={{fontSize:'48pt'}} />
                        </IconButton>
                        {idNamePair.like}
                        <br/>
                        <span style = {{fontSize: '20pt'}}>    
                                View: <s id = 'viewnum'>{idNamePair.view}</s>
                        </span>
                    </div>
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
            <AccordionDetails id = "accordion">
                <Box id="itembox">
                    <div id="edit-numbering">
                        <div className="item-number"><Typography variant="h3">1.</Typography></div>
                        <div className="item-number"><Typography variant="h3">2.</Typography></div>
                        <div className="item-number"><Typography variant="h3">3.</Typography></div>
                        <div className="item-number"><Typography variant="h3">4.</Typography></div>
                        <div className="item-number"><Typography variant="h3">5.</Typography></div>
                    </div>
                    {editItems}
                </Box>
                <Box id = "commentbox">
                    {commentList}
                    <TextField
                        fullWidth
                        id = "add-comment"
                        label = "Add Comment"
                        margin = "none"
                        onKeyPress = {(event)=>{
                            handleKeyPress(event)
                        }}
                    >
                    </TextField>
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