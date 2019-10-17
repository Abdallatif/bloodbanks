import React from 'react';

import { makeStyles, createStyles, Button, Popover, Typography } from '@material-ui/core';
import { formatDate } from '../utils';

const useStyles = makeStyles((theme) =>
    createStyles({
        popover: {
            padding: theme.spacing(3),
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
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.popover}>
                    <Typography >City: {city}</Typography>
                    <Typography >Hospital: {hospital}</Typography>
                    <Typography >Blood Type: {bloodType}</Typography>
                    <Typography >Available Quantity: {quantity}</Typography>
                    <Typography >Expire: {formatDate(expire)}</Typography>
                </div>
            </Popover>
        </div>
    );
}