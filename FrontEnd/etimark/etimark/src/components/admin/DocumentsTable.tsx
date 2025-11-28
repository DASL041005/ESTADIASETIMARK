import React, { useMemo, useState } from "react";
import "./DocumentsTable.css";


type Doc = { name: string; type: string; category: string; owner: string; status: string };


const sampleData: Doc[] = Array.from({ length: 68 }).map((_, i) => ({
name: `Documento_${i + 1}`,
type: i % 3 === 0 ? "PDF" : i % 3 === 1 ? "XLSX" : "DOCX",
category: ["Planning", "Reports", "Invoices"][i % 3],
owner: ["Andrea Luna", "Oscar Méndez", "Laura"][i % 3],
status: i % 2 === 0 ? "APPROVED" : "IN PROGRESS",
}));


const DocumentsTable: React.FC = () => {
const [query, setQuery] = useState("");
const [page, setPage] = useState(1);
const perPage = 10;


const filtered = useMemo(() => {
const q = query.trim().toLowerCase();
if (!q) return sampleData;
return sampleData.filter(
(d) =>
d.name.toLowerCase().includes(q) ||
d.type.toLowerCase().includes(q) ||
d.category.toLowerCase().includes(q) ||
d.owner.toLowerCase().includes(q) ||
d.status.toLowerCase().includes(q)
);
}, [query]);


const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
const paginated = filtered.slice((page - 1) * perPage, page * perPage);


function goto(newPage: number) {
setPage(Math.max(1, Math.min(totalPages, newPage)));
}


return (
<div>
<div className="docs-controls">
<input
placeholder="Buscar documentos..."
value={query}
onChange={(e) => { setQuery(e.target.value); setPage(1); }}
/>
<div className="docs-info">{filtered.length} resultados</div>
</div>


<table className="docs-table">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Category</th>
<th>Owner</th>
<th>Status</th>
</tr>
</thead>
<tbody>
{paginated.map((r, i) => (
<tr key={i}>
<td>{r.name}</td>
<td>{r.type}</td>
<td>{r.category}</td>
<td>{r.owner}</td>
<td>{r.status}</td>
</tr>
))}
</tbody>
</table>
<div className="docs-pagination">
<button onClick={() => goto(page - 1)} disabled={page === 1}>
Anterior
</button>
<span>Página {page} de {totalPages}</span>
<button onClick={() => goto(page + 1)} disabled={page === totalPages}>
Siguiente
</button>
</div>  
</div>
);
};
export default DocumentsTable;
