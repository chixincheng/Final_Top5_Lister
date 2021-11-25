import React, { useContext, useState } from 'react'
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

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    let payload = {
        name : "Untitled" + store.newListCounter,
        items: ["", "", "", "", ""],
        comments: [],
        like: 0,
        dislike: 0,
        view: 0,
        publish: false,
        createdate: new Date(),
        viewing: false,
        publishdate: null,
        commentItems: [],
        isCommunityList: false,
        updateDate: new Date()
    };

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

    function createListCallBack(payload){
        store.createNewList(payload);
        setOpen(false);
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
            {store.viewhomelist ?
                <div id="home-footing">
                    {store.viewhomelist?
                        <IconButton 
                            color="inherit" 
                            aria-label="add"
                            id="add-list-button"
                            onClick={handleCreateNewList}
                        >
                            <AddIcon />
                            <Typography variant="h4">Your Lists</Typography>
                        </IconButton>
                        :
                        <IconButton 
                            color="inherit" 
                            aria-label="add"
                            id="add-list-button"
                            disabled
                        >
                            <AddIcon />
                            <Typography variant="h4">Your Lists</Typography>
                        </IconButton>
                    }
                </div>
                :
                <Statusbar />
            }
            <CreateListModal 
            open = {open} 
            close = {handleClose} 
            createNewList =  {createListCallBack}
            payload = {payload}
            />
            {menulist}
        </div>)
}

export default HomeScreen;