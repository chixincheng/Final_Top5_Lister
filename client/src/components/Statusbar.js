import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store} = useContext(GlobalStoreContext);

    let text ="";
    if (store.viewalllist || store.viewuserlist){
        if(store.searchkey !== ""){
            text = store.searchkey+" Lists";
        }
    }
    else if (store.viewcommunitylist){
        text = "Community Lists"
    }

    return (
        <div 
            id="top5-statusbar"
        >
            <Typography variant="h4">{text}</Typography>
        </div>
    );
}

export default Statusbar;