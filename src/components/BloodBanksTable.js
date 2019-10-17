import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const formatDate = (date) => {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      width: 1200,
    },
  }),
);

export default function BloodBanksTable({ rows }) {
    const classes = useStyles();
  
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Hospital</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Blood Type</TableCell>
              <TableCell>Available Quantity</TableCell>
              <TableCell>Expire</TableCell>
              {/* For Details button */}
              <TableCell></TableCell>
              {/* For Request button */}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.hospital}
                </TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.bloodType}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{formatDate(row.expire)}</TableCell>
                <TableCell><Button onClick={() => window.alert("show details")}>Show Details</Button></TableCell>
                <TableCell><Button onClick={() => window.alert("request")}>Request</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  