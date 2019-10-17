import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import { TableSortLabel, makeStyles, createStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
          },        
    }),
);

export default function TableHeadCell({ children, id, sortDirection, onApplySort, onApplyFilter, onClearFilter, compareFn, withFilter,filterReducer }) {
    const classes = useStyles();
    const [filter, setFilter] = React.useState("");
    const handleChange = ({target: {value}}) => {
        setFilter(value);
        if (!value) {
            onClearFilter(id);
        } else {
            onApplyFilter(id, filterReducer(value));
        }

    }
    return (
        <TableCell
            sortDirection={sortDirection}
        >
            <TableSortLabel
                active={!!sortDirection}
                direction={sortDirection === "asc" ? "asc" : "desc"}
                onClick={() => onApplySort(id, compareFn)}
            >
                {children}
                {sortDirection ? (
                    <span className={classes.visuallyHidden}>
                        {sortDirection === "desc" ? "sorted descending" : "sorted ascending"}
                    </span>
                ) : null}
            </TableSortLabel>
            {withFilter && <TextField placeholder="search" inputProps={{size: 10}} value={filter} onChange={handleChange} />}
        </TableCell>
    )
}