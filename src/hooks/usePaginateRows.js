// import {} from "";
import React, { useMemo, useState } from "react";

function usePaginateRows({
	rows: data = [],
	initialPage = 0,
	pageSize = 10,
}) {
	const [rowsPerPage, setRowsPerPage] = useState(pageSize);
	const [page, setPage] = useState(initialPage);
	const count = data.length;
	const pagesCount = Math.ceil(count / rowsPerPage);

	const goToPage = p => {
		if (typeof p !== "number" || p < 0 || p > pagesCount) return;
		setPage(p);
	};

	const changePageSize = size => {
		if (!size) return;
		if (size > count) setRowsPerPage(count);
		if (size < 3) setRowsPerPage(3);
		else setRowsPerPage(size);
	};

	const rows = useMemo(
		() => {
			return data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
		},
		[data, page, rowsPerPage]
	);

	React.useEffect(() => {
		setPage(0)
	}, [data.length])

	return {
		rows,
		goToPage,
		rowsPerPage,
		pagesCount,
		count,
		page,
		changePageSize,
	};
}

export default usePaginateRows;
