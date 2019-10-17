import useFilterRows from "./useFilterRows";
import useSortRows from "./useSortRows";
import React from "react";
import usePaginateRows from "./usePaginateRows";


export function toMuiPaginationProps(state) {
	const { goToPage, rowsPerPage, page, count, changePageSize } = state;
	const onChangePage = (e, page) => goToPage(page);
	const onChangeRowsPerPage = e => changePageSize(Number(e.target.value));
	return {
		page,
		count,
		rowsPerPage,
		onChangePage,
		onChangeRowsPerPage,
	};
}

function useTableDataController(data, pagingOptions = {}) {
	const { applyFilter, clearFilter, filteredRows } = useFilterRows({
		rows: data,
	});
	const { clearSort, applySort, sortedRows, getFieldSortDirection } = useSortRows({ rows: filteredRows });
	const pagination = usePaginateRows({ rows: sortedRows, ...pagingOptions });
	const rows = pagination.rows;
	const materialPaginationProps = toMuiPaginationProps(pagination);
	return {
		pagination,
		filteredRows: filteredRows,
		sortedRows: sortedRows,
		rows,
		applyFilter,
		clearFilter,
		clearSort,
		applySort,
		materialPaginationProps,
		getFieldSortDirection,
	};
}

export default useTableDataController;
