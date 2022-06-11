import "../style/Pagination.css"

export default function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  // // 페이지가 한 장이면 생략
  // if(numPages === 1)
  //   return <nav className="Pagination"></nav>;
  
  return (
    <nav className="Pagination"> {/* hidden={numPages === 1}> */}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </nav>
  );
}