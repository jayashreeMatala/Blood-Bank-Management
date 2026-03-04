import { useState } from "react";
import { useTransfers } from "../context/TransferContext";
import NewTransferModal from "../components/NewTransferModal";
import "./Transfers.css";

function Transfers() {

  const { transfers, receiveTransfer } = useTransfers();

  const [search,setSearch]=useState("");
  const [blood,setBlood]=useState("All");
  const [status,setStatus]=useState("All");
  const [showNew,setShowNew]=useState(false);

  const initiated = transfers.filter(t => t.status === "Initiated").length;
  const inTransit = transfers.filter(t => t.status === "In Transit").length;
  const received = transfers.filter(t => t.status === "Received").length;

  const issuedUnits = transfers.reduce((s,t)=>s+t.units,0);

  return(

<div className="transfers-page container-fluid">

{/* HEADER */}

<div className="transfer-header">

<div>
<h2>Blood Transfer & Issue</h2>
<p>Issue blood to hospitals · inter bank transfers · movement tracking</p>
</div>

<button
className="new-transfer-btn"
onClick={()=>setShowNew(true)}
>
+ New Transfer
</button>

</div>

{/* STATS */}

<div className="transfer-stats">

<div className="stat-card purple">
<div className="icon">💉</div>
<h3>{transfers.length}</h3>
<p>Total Transfers</p>
</div>

<div className="stat-card blue">
<div className="icon">🕒</div>
<h3>{initiated}</h3>
<p>Initiated</p>
</div>

<div className="stat-card violet">
<div className="icon">🚚</div>
<h3>{inTransit}</h3>
<p>In Transit</p>
</div>

<div className="stat-card green">
<div className="icon">✔</div>
<h3>{received}</h3>
<p>Received</p>
</div>

<div className="stat-card orange">
<div className="icon">📈</div>
<h3>{issuedUnits}</h3>
<p>Units Issued</p>
</div>

</div>

{/* LIVE STOCK */}

<div className="live-stock-card">

<div className="live-stock-header">

<div className="live-stock-title">
<span className="cube">📦</span>
Live Available Stock
</div>

<div className="before-transfer">
Before Transfer
</div>

</div>

<div className="stock-grid">

{[
["A+",0],
["A-",0],
["B+",0],
["B-",6],
["AB+",0],
["AB-",0],
["O+",0],
["O-",3],
].map((b,i)=>{

const units=b[1];

return(

<div key={i}
className={`stock-card2 ${b[0].replace("+","plus").replace("-","minus")}`}>

<div className="stock-head">{b[0]}</div>

<div className="stock-body">

<div className="stock-units">{units}</div>
<div className="stock-label">units</div>

<div className={`stock-status ${units===0?"empty":units<5?"low":"ok"}`}>
{units===0?"EMPTY":units<5?"LOW":"OK"}
</div>

</div>

</div>

)

})}

</div>

</div>

{/* FILTER */}

<div className="transfer-filters">

<input
placeholder="Search ID or location..."
value={search}
onChange={e=>setSearch(e.target.value)}
/>

<select onChange={e=>setBlood(e.target.value)}>
<option>All Blood Groups</option>
<option>A+</option>
<option>A-</option>
<option>B+</option>
<option>B-</option>
<option>AB+</option>
<option>AB-</option>
<option>O+</option>
<option>O-</option>
</select>

<select>
<option>All Types</option>
<option>Incoming</option>
<option>Outgoing</option>
</select>

<select onChange={e=>setStatus(e.target.value)}>
<option>All Status</option>
<option>Received</option>
<option>In Transit</option>
</select>

</div>
<div className="transfer-count">
{transfers.length} TRANSFERS FOUND
</div>

{/* TABLE */}

<div className="filters-card">

<div className="filters-title">
⚲ Filters
</div>

<div className="transfer-filters"></div>


<table>

<thead>

<tr>
<th>TRANSFER ID</th>
<th>TYPE</th>
<th>BLOOD GROUP</th>
<th>UNITS</th>
<th>ROUTE</th>
<th>DATE</th>
<th>STAFF</th>
<th>STATUS</th>
<th>ACTIONS</th>
</tr>

</thead>

<tbody>

{transfers.map(t=>(

<tr key={t.id}>

<td>{t.id}</td>

<td>
<span className={`type ${t.type==="Outgoing"?"out":"in"}`}>
{t.type}
</span>
</td>

<td>
<span className="blood-pill">{t.blood}</span>
</td>

<td className="units-cell">

{t.units} <span className="unit-text">u</span>

</td>

<td>

<span className="route-pill">{t.from}</span>

<span className="route-arrow">→</span>

<span className="route-pill purple">{t.to}</span>

</td>

<td>{t.date}</td>

<td>—</td>

<td>
<span className={`status ${t.status==="Received"?"received":"transit"}`}>
{t.status}
</span>
</td>

<td>

{t.status==="In Transit" &&(

<button
className="receive-btn"
onClick={()=>receiveTransfer(t.id)}
>
Receive
</button>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

{showNew && (
<NewTransferModal onClose={()=>setShowNew(false)}/>
)}

</div>

)

}



export default Transfers;