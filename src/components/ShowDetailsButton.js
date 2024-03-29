import React from 'react';

import { makeStyles, createStyles, Button, Popover, Typography, Modal } from '@material-ui/core';
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
        }
    }),
);

export default function ShowDetailsButton({ item }) {
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
            Show Details
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className={classes.popover}>
                <Typography variant="h5">{city} / {hospital}</Typography>
                <Typography >Blood Type: {bloodType}</Typography>
                <Typography >Available Quantity: {quantity}</Typography>
                <Typography >Expires: {formatDate(expire)}</Typography>
            </div>
        </Modal>
        </div>
    );
}