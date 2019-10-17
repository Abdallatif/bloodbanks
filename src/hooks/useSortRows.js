import React, { useState } from "react";

const defaultGetNextSortDir = (dir) => {
	if (dir === "asc") return false;
	if (dir === "desc") return "asc";
	return "desc";
};

/**
 * Sorting table rows by applying sorting functions
 */
export default function useSortRows({ rows, getNextSortDir = defaultGetNextSortDir, maxSortFns }) {
	const [sortFns, setSortFns] = useState([]);

	/**
	 * Sort the rows using the applied sort compare functions
	 */
	const sortedRows = React.useMemo(
		() => {
			const rowsToSort = [...rows];
			sortFns.forEach(({ compareFn, dir }) => {
				const compare = dir === "asc" ? compareFn : (rowA, rowB) => -compareFn(rowA, rowB);
				rowsToSort.sort(compare);
			});
			return rowsToSort;
		},
		[sortFns, rows]
	);

	/**
	 * Apply a new sort compare function to sort by
	 */
	const applySort = (id, compareFn, dir = "desc") => {
		const index = sortFns.findIndex(s => s.id === id);
		const fns = sortFns.slice();
		if (index > -1) {
			dir = getNextSortDir(sortFns[index].dir);
			fns.splice(index, 1);
		}
		dir && fns.push({ id, compareFn, dir });
		setSortFns(fns.length ? [fns[fns.length - 1]] : []);
	};

	/**
	 * Clear an existing sort compare function by it's id
	 */
	const clearSort = (id) => {
		const index = sortFns.findIndex(s => s.id === id);
		if (index > -1) {
			const newSorts = sortFns.slice().splice(index, 1);
			setSortFns(newSorts);
		}
	};

	const getFieldSortDirection = (fieldId) => {
		const item = sortFns.find(s => s.id === fieldId);
		if (!item) return false;
		return item.dir;
	};

	return {
		getFieldSortDirection,
		sortedRows,
		applySort,
		clearSort,
	};
}
