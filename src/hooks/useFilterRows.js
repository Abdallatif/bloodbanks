import { useMemo, useState } from "react";

function useFilterRows({ rows }) {
	/**
	 * Filtering
	 */
	const [filterFns, setFilterFns] = useState({});

	const filteredRows = useMemo(
		() => {
			const fns = Object.keys(filterFns).reduce((fns, key) => fns.concat(filterFns[key]), []);
			if (!fns.length) return rows;

			return fns.reduce((rows, fn) => fn(rows), rows);
		},
		[rows, filterFns]
	);

	const applyFilter = (fieldName, filterFn) => {
		console.log(fieldName, filterFn)
		setFilterFns({
			...filterFns,
			[fieldName]: filterFn,
		});
	};

	const clearFilter = fieldName => {
		const copy = { ...filterFns };
		delete copy[fieldName];
		setFilterFns(copy);
	};

	const resetFilters = () => {
		setFilterFns([]);
	};

	return { applyFilter, clearFilter, filteredRows, resetFilters };
}

export default useFilterRows;
