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
import ListModal from './ListModal';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    const [open, setOpen] = useState(false);

    function handleClose (event){
        event.stopPropagation();
        setOpen(false);
    };

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleViewHomeList() {

    }

    function handleViewAllList() {

    }

    function handleViewUserList() {

    }

    function handleViewCommunityList() {

    }

    function handleSortBy(){

    }

    function handleCreateNewList(event) {
        event.stopPropagation();
        setOpen(true);
        //store.createNewList();
    }

    let listCard = "";
    if (store) {
        console.log(store.idNamePairs)
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
                <IconButton 
                    color="inherit"
                    aria-label="home"
                    id="home-list-button"
                    size = "large"
                    onClick={handleViewHomeList}
                >
                    <HomeIcon />
                </IconButton>
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
                        style = {{ background: "white", top: "13%"}}
                    >
                    </TextField>
                </Box>
                <IconButton
                    color="inherit" 
                    aria-label="sortby"
                    id="sortby-list-button"
                    size = "large"
                    onClick={handleSortBy}
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
            <ListModal open = {open} close = {handleClose} name = "?"/>
        </div>)
}

export default HomeScreen;