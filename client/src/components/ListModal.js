import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ListModal(props){
    const {open,createNewList,name,close} = props;
    //keypress
    return(
        <Dialog
            id = "listmodal"
            maxWidth='sm'
            open= {open}
            onClose={close}
            >
            <DialogTitle style = {{backgroundColor: "#d4d4f5"}}>
                <TextField
                        id="name"
                        fullWidth
                        variant="standard"
                        style = {{ background: "white"}}
                        defaultValue = {name}
                        // onKeyPress = {(event)=>{
                        //     KeyPress(event)
                        // }}
                    />
            </DialogTitle>
            <DialogContent id = "content-list-modal">
                <Box id="createitembox">
                    <div id="create-numbering">
                        <Box id = "bordermargin">
                        <div id="item-number-border"><Typography variant="h3">1.</Typography></div>
                        </Box>
                        <Box id = "bordermargin">
                        <div id="item-number-border"><Typography variant="h3">2.</Typography></div>
                        </Box>
                        <Box id = "bordermargin">
                        <div id="item-number-border"><Typography variant="h3">3.</Typography></div>
                        </Box>
                        <Box id = "bordermargin">
                        <div id="item-number-border"><Typography variant="h3">4.</Typography></div>
                        </Box>
                        <Box id = "bordermargin">
                        <div id="item-number-border"><Typography variant="h3">5.</Typography></div>
                        </Box>
                    </div>
                    <div id = "creat-items">
                        <TextField fullWidth id ="listitems" style = {{marginBottom: "5px", borderRadius: "0.5rem", overflow: "hidden"}}></TextField>
                        <TextField fullWidth id ="listitems" style = {{marginBottom: "5px", borderRadius: "0.5rem", overflow: "hidden"}}></TextField>
                        <TextField fullWidth id ="listitems" style = {{marginBottom: "5px", borderRadius: "0.5rem", overflow: "hidden"}}></TextField>
                        <TextField fullWidth id ="listitems" style = {{marginBottom: "5px", borderRadius: "0.5rem", overflow: "hidden"}}></TextField>
                        <TextField fullWidth id ="listitems" style = {{marginBottom: "5px", borderRadius: "0.5rem", overflow: "hidden"}}></TextField>
                    </div>
                    
                </Box>
            </DialogContent>
            <DialogActions id = "action-list-modal">
                    <Button 
                        onClick={createNewList}
                        style = {{backgroundColor: "#c4c4c4", color: "black", fontWeight: "bold"}}
                    >Save</Button>
                    <Button 
                        onClick={close}
                        style = {{backgroundColor: "#c4c4c4", color: "black", fontWeight: "bold"}}
                    >Publish</Button>
            </DialogActions>
        </Dialog>
    )
}