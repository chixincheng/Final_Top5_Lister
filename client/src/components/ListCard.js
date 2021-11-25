import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import List from '@mui/material/List';
import EditListModal from './EditListModal.js';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { idNamePair } = props;
    const [deleteopen, setDeleteOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);

    const backgroundColor = idNamePair.publish?"#d4d4f5":"white";

    let editItems =
            <List id="edit-items">
                {
                    idNamePair.items.map((item, index) => (
                        <Typography 
                            key={'top5-item-' + (index+1)+item}
                            variant = "h3"
                        >
                            {item}
                        </Typography>
                    ))
                }
            </List>;
    let commentList =
            <List id = "commentlistview"sx={{left: '1%', right: '1%', height: "200px"}}>
            {
                idNamePair.comments.map((text, index) => (
                    <div id = "comments" key = {"comment-list "+index} 
                        style ={{color: "black", height: "25%", width: "100%", backgroundColor: "#d4af37"}}
                    >
                        <s  id = 'Author' style ={{fontSize: "14pt"}}
                        >{text[0]}</s>
                        <br/>
                        <s style = {{fontSize: "24pt", textDecoration: "none"}}
                        >{text[1]}</s>
                    </div>
                ))
            }
            </List>;
    function handleDeleteClose (event){
        event.stopPropagation();
        setDeleteOpen(false);
        store.unmarkListForDeletion();
    };

    function handleEditClose (event){
        event.stopPropagation();
        setEditOpen(false);
    };

    function EditListCallBack(payload){
        store.editList(payload,idNamePair._id);
        setEditOpen(false);
    }

    function handleCloseConfirm(event){
        event.stopPropagation();
        setDeleteOpen(false);
        store.deleteMarkedList();
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        //make delete modal pop up
        setDeleteOpen(true);
        store.markListForDeletion(id);
    }
    

    function handleToggleEdit(event) {
        event.stopPropagation();
        setEditOpen(true);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let text = event.target.value;
            store.addComment(idNamePair._id, text);
            event.target.value = "";
        }
    }
    
    function handleLike(event, id) {
        event.stopPropagation();
        store.likeList(id);
    }

    function handleDislike(event, id) {
        event.stopPropagation();
        store.disLikeList(id);
    }
    
    function handleUpdateView(id){
        store.increaseview(id);
    }

    function datestring(){
        if(idNamePair.publish){
            let d = new Date(idNamePair.publishdate);
            let month = d.toLocaleString('default', {month: 'short'});
            let date = d.getDate();
            let year = d.getFullYear();
            return month+" "+date+","+year;
        }
    }
    
    
    let cardElement =
        <Accordion id = "accordion"
            style = {{backgroundColor: backgroundColor, borderRadius: "1rem", position: "unset"}}
        >
            <AccordionSummary
                id={idNamePair._id}
                key={idNamePair._id}
                expandIcon = {<ExpandMoreIcon/>}
                onClick = {()=>{handleUpdateView(idNamePair._id)}}
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
                            <span>
                            Published:   <s id = 'published-date' style = {{textDecoration: "none", color: "green"}}
                            >{datestring()}</s>
                            </span>
                            :
                            <s id='edit'
                            onClick={handleToggleEdit}
                            >Edit</s>
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
            <AccordionDetails id = "accordion-detail">
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
                        style = {{backgroundColor: "white", borderRadius: "0.5rem"}}
                        onKeyPress = {handleKeyPress}
                    >
                    </TextField>
                </Box>
                
            </AccordionDetails>
                <DeleteModal open = {deleteopen} close = {handleDeleteClose} name = {idNamePair.name} confirm = {handleCloseConfirm}/>
                <EditListModal open = {editopen} close = {handleEditClose} EditList =  {EditListCallBack} payload = {idNamePair}/>
        </Accordion>
    return (
        cardElement
    );
}

export default ListCard;