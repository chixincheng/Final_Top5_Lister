import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import CommunityIcon from '@mui/icons-material/Functions';
import List from '@mui/material/List';
import AuthContext from '../auth'
import Statusbar from './Statusbar'
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import Box from '@mui/material/Box';
import CreateListModal from './CreateListModal';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [messageopen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleClose (event){
        event.stopPropagation();
        setOpen(false);
    };
    function handleViewHomeList() {
        store.viewhomeList();
    }

    function handleViewAllList() {
        store.viewallList();
    }

    function handleViewUserList() {
        store.viewuserList();
    }

    function handleViewCommunityList() {
        store.viewcommunityList();
    }

    function handleSearchKeyWord (event){
        store.searchKey(event.target.value);
    }

    function handleCreateNewList(event) {
        event.stopPropagation();
        setOpen(true);
    }

    function handleMessageClose(){
        setMessageOpen(false);
    }

    function createListCallBack(payload){
        let create = true;
        for(let i =0; i<store.idNamePairs.length; i++){
            if(store.idNamePairs[i].name === payload.name){
                create = false;
            }
        }
        if(create){
            store.createNewList(payload);
            setOpen(false);
        }
        else{
            setMessage("User can not have two list with same name");
            setMessageOpen(true);
        }
    }

    function handleSortByNewestDate(){
        store.sortByNewest();
        setAnchorEl(null);
    }
    
    function handleSortByOldestDate(){
        store.sortByOldest();
        setAnchorEl(null);
    }

    function handleSortByViews(){
        store.sortByViews();
        setAnchorEl(null);
    }

    function handleSortByLikes(){
        store.sortByLikes();
        setAnchorEl(null);
    }

    function handleSortByDislikes(){
        store.sortByDislikes();
        setAnchorEl(null);
    }

    const menulist = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortByNewestDate}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortByOldestDate}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={handleSortByViews}>Views</MenuItem>
            <MenuItem onClick={handleSortByLikes}>Likes</MenuItem>
            <MenuItem onClick={handleSortByDislikes}>Dislikes</MenuItem>
        </Menu>
    );

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '98%', left: '1%', right: '1%', bgcolor: '#c4c4c4' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="home-selector">
            <div id="home-heading">
                { auth.guest ?
                    <IconButton 
                        color="inherit"
                        aria-label="home"
                        id="home-list-button"
                        size = "large"
                        disabled
                    >
                        <HomeIcon />
                    </IconButton>
                    :
                    <IconButton 
                        color="inherit"
                        aria-label="home"
                        id="home-list-button"
                        size = "large"
                        onClick={handleViewHomeList}
                    >
                        <HomeIcon />
                    </IconButton>
                }
                <IconButton 
                    color="inherit" 
                    aria-label="All"
                    id="All-list-button"
                    size = "large"
                    onClick={handleViewAllList}
                >
                    <GroupsIcon />
                </IconButton>
                <IconButton 
                    color="inherit" 
                    aria-label="User"
                    id="User-list-button"
                    size = "large"
                    onClick={handleViewUserList}
                >
                    <PersonIcon />
                </IconButton>
                <IconButton 
                    color="inherit" 
                    aria-label="Community"
                    id="Community-list-button"
                    size = "large"
                    onClick={handleViewCommunityList}
                >
                    <CommunityIcon />
                </IconButton>
                <Box style={{width: "40%"}}>
                    <TextField
                        fullWidth
                        id = "search-key"
                        label = "search"
                        margin = "none"
                        onChange = {handleSearchKeyWord}
                        style = {{ background: "white", top: "13%"}}
                    >
                    </TextField>
                </Box>
                <IconButton
                    color="inherit" 
                    aria-label="sortby"
                    id="sortby-list-button"
                    aria-label="sortby"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    size = "large"
                    onClick={handleProfileMenuOpen}
                >
                    SORT BY <SortIcon/>
                </IconButton>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            {auth.loginstatus () ?
                <div id="home-footing">
                    <IconButton 
                        color="inherit" 
                        aria-label="add"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </IconButton>
                    <Typography variant="h4">Your Lists</Typography>
                </div>
                :
                <Statusbar />
            }
            <CreateListModal 
            open = {open} 
            close = {handleClose} 
            createNewList =  {createListCallBack}
            />
            <Dialog
                id = "message-modal"
                maxWidth='sm'
                open= {messageopen}
                onClose={handleMessageClose}
                >
                <DialogTitle>
                    {message}
                    <DialogActions>
                        <Button onClick={handleMessageClose}>Okay</Button>
                    </DialogActions>
                </DialogTitle>
            </Dialog>
            {menulist}
        </div>)
}

export default HomeScreen;