import React from 'react';

import { makeStyles, createStyles, Button, Popover, Typography, Modal, TextField } from '@material-ui/core';
import { formatDate } from '../utils';

const useStyles = makeStyles((theme) =>
    createStyles({
        popover: {
            position: 'absolute',
            width: 400,
            top: "calc(50% - 200px)",
            left: "calc(50% - 200px)",
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        textField: {
            display: "block",
            margin: 10,
        }
    }),
);

export default function RequestButton({ item }) {
    const { city, hospital, bloodType, quantity, expire } = item;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
        <Button aria-describedby={id} onClick={handleClick}>
            Request
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className={classes.popover}>
                <Typography >Request {bloodType} from {hospital}</Typography>
                <TextField className={classes.textField} type="number" placeholder="Amount To Request" />
                <Button variant="contained" onClick={handleClose}>Request</Button>
            </div>
        </Modal>
        </div>
    );
}