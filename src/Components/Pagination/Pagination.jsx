import clsx from 'clsx';

const Pagination = ({ page, limit, total, onPageChange, }) => {
    const lastPage = Math.ceil(total / limit);

    const getPages = () => {
        if (lastPage <= 5) return [...Array(lastPage).keys()].map((n) => n + 1);
        const arr = [1, 2];
        if (page > 3) arr.push('…');
        const middle = Math.min(Math.max(page, 3), lastPage - 2);
        arr.push(middle);
        if (middle < lastPage - 2) arr.push('…');
        arr.push(lastPage);
        return arr;
    };

    const pages = getPages();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6">
            {/* caption */}
            <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                Showing&nbsp;
                {(page - 1) * limit + 1}‑{Math.min(page * limit, total)}&nbsp;
                of&nbsp;{total}
            </p>

            {/* pager */}
            <ul className="inline-flex items-center border rounded bg-white shadow-sm text-sm">
                {/* prev */}
                <li>
                    <button
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        className="px-2 py-1 disabled:text-gray-400"
                    >
                        ‹
                    </button>
                </li>

                {pages.map((p, i) =>
                    p === '…' ? (
                        <li key={i} className="px-2 py-1 text-gray-500">
                            …
                        </li>
                    ) : (
                        <li key={p}>
                            <button
                                onClick={() => onPageChange(p)}
                                className={clsx(
                                    'px-2 py-1 rounded',
                                    p === page
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'hover:bg-gray-100'
                                )}
                            >
                                {p}
                            </button>
                        </li>
                    )
                )}

                {/* next */}
                <li>
                    <button
                        disabled={page === lastPage}
                        onClick={() => onPageChange(page + 1)}
                        className="px-2 py-1 disabled:text-gray-400"
                    >
                        ›
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;