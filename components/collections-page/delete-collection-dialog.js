import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteCollectionDialog({onClose, collectionName, agreeClick}) {

    return (
        <div>
            <Dialog
                open={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Delete Collection ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete the collection with name '{collectionName}'
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>No</Button>
                    <Button onClick={agreeClick}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}