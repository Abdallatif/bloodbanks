import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TablePagination } from '@material-ui/core';
import useTableDataController from '../hooks/useTableController';
import TableHeadCell from './TableHeadCell';

const formatDate = (date) => {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

const stringCompare = (getter) => (a, b) => getter(a).localeCompare(getter(b), undefined, { sensitivity: "base" }   );
const numberCompare = (getter) => (a, b) => getter(a) - getter(b);
const dateCompare = (getter) => (a, b) => getter(a) - getter(b);
const filterReducer = getter => value => rows => rows.filter(row => getter(row).toLowerCase().includes(value.toLowerCase()))
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            overflowX: 'auto',
            width: 1200,
            margin: theme.spacing(3),
        },
        table: {
        },
    }),
);

export default function BloodBanksTable({ rows }) {
    const classes = useStyles();
    const {
        clearSort,
        applySort,
        applyFilter,
        clearFilter,
        rows: rowsToRender,
        getFieldSortDirection,
        materialPaginationProps,
    } = useTableDataController(rows);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableHeadCell
                            id="hospital"
                            withFilter
                            onApplySort={applySort}
                            compareFn={stringCompare(row => row.hospital)}
                            onApplyFilter={applyFilter}
                            onClearFilter={clearFilter}
                            filterReducer={filterReducer(row => row.hospital)}
                            sortDirection={getFieldSortDirection("hospital")}
                        >
                            Hospital
                        </TableHeadCell>
                        <TableHeadCell
                            id="city"
                            withFilter
                            onApplySort={applySort}
                            compareFn={stringCompare(row => row.city)}
                            onApplyFilter={applyFilter}
                            onClearFilter={clearFilter}
                            filterReducer={filterReducer(row => row.city)}
                            sortDirection={getFieldSortDirection("city")}
                        >
                            City
                        </TableHeadCell>
                        <TableHeadCell
                            id="bloodType"
                            withFilter
                            onApplySort={applySort}
                            compareFn={stringCompare(row => row.bloodType)}
                            onApplyFilter={applyFilter}
                            onClearFilter={clearFilter}
                            filterReducer={filterReducer(row => row.bloodType)}
                           sortDirection={getFieldSortDirection("bloodType")}
                        >
                            Blood Type
                        </TableHeadCell>
                        <TableHeadCell
                            id="quantity"
                            onApplySort={applySort}
                            compareFn={numberCompare(row => row.quantity)}
                            sortDirection={getFieldSortDirection("quantity")}
                        >
                            Available Quantity
                        </TableHeadCell>
                        <TableHeadCell
                            id="expire"
                            onApplySort={applySort}
                            compareFn={dateCompare(row => row.expire)}
                            sortDirection={getFieldSortDirection("expire")}
                        >
                            Expire
                        </TableHeadCell>
                        {/* For Details button */}
                        <TableCell></TableCell>
                        {/* For Request button */}
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsToRender.map(row => (
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
                <TablePagination {...materialPaginationProps} />
            </Table>
        </Paper>
    );
}
