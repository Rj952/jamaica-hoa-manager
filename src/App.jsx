import React from "react";
import { DollarSign, AlertTriangle, Calendar, Bell, BookOpen, Shield, Mail, Check, X, Search, ChevronDown, Paperclip, FileText, Download, Clock, Users } from "lucide-react";

const C = { green: "#009B3A", gold: "#FED100", black: "#181818" };

const ADMINS = [
  { username: "admin1", password: "Admin1Pass!", name: "Marcus Green", email: "marcus@jamaicahoa.com" },
  { username: "admin2", password: "Admin2Pass!", name: "Patricia Shaw", email: "patricia@jamaicahoa.com" },
  { username: "admin3", password: "Admin3Pass!", name: "Richard Cole", email: "richard@jamaicahoa.com" }
];

const MEMBERS = [
  { username: "owner1", password: "Owner1Pass!", name: "Devon Brown", unit: "A1", email: "devon@email.com", phone: "876-555-0101" },
  { username: "owner2", password: "Owner2Pass!", name: "Shanice Reid", unit: "A2", email: "shanice@email.com", phone: "876-555-0102" },
  { username: "owner3", password: "Owner3Pass!", name: "Andre Campbell", unit: "B1", email: "andre@email.com", phone: "876-555-0103" },
  { username: "owner4", password: "Owner4Pass!", name: "Keisha Morgan", unit: "B2", email: "keisha@email.com", phone: "876-555-0104" },
  { username: "owner5", password: "Owner5Pass!", name: "Omar Williams", unit: "C1", email: "omar@email.com", phone: "876-555-0105" },
  { username: "owner6", password: "Owner6Pass!", name: "Tanya Davis", unit: "C2", email: "tanya@email.com", phone: "876-555-0106" },
  { username: "owner7", password: "Owner7Pass!", name: "Michael Scott", unit: "D1", email: "michael@email.com", phone: "876-555-0107" },
  { username: "owner8", password: "Owner8Pass!", name: "Lisa Palmer", unit: "D2", email: "lisa@email.com", phone: "876-555-0108" }
];

const MONTHLY_FEE = 15000;
const ANNUAL_FEE = 180000;

const mkPay = (months, yr) => months.map(m => ({ month: m, year: yr, amount: MONTHLY_FEE, date: yr + "-" + String(m).padStart(2,"0") + "-05", method: ["Bank Transfer","Cash","Cheque"][Math.floor(Math.random()*3)], receipt: null, verified: true }));

const INIT_HOMEOWNERS = [
  { unit: "A1", name: "Devon Brown", email: "devon@email.com", phone: "876-555-0101", balance: 30000,
    payments: { 2024: mkPay([1,2,3,4,5,6,7,8,9,10],2024), 2025: mkPay([1,2,3,4,5,6,7,8,9,10,11,12],2025), 2026: mkPay([1],2026) },
    violations: [{ id: "v1", type: "Noise", description: "Loud music after 10pm", date: "2025-08-15", fine: 5000, status: "resolved" }] },
  { unit: "A2", name: "Shanice Reid", email: "shanice@email.com", phone: "876-555-0102", balance: 0,
    payments: { 2024: mkPay([1,2,3,4,5,6,7,8,9,10,11,12],2024), 2025: mkPay([1,2,3,4,5,6,7,8,9,10,11,12],2025), 2026: mkPay([1,2,3],2026) },
    violations: [] },
  { unit: "B1", name: "Andre Campbell", email: "andre@email.com", phone: "876-555-0103", balance: 45000,
    payments: { 2024: mkPay([1,2,3,4,5,6,7,8,9],2024), 2025: mkPay([1,2,3,4,5,6,7,8,9,10],2025), 2026: [] },
    violations: [{ id: "v2", type: "Parking", description: "Unauthorized vehicle in reserved spot", date: "2026-01-20", fine: 3000, status: "open" }] },
  { unit: "B2", name: "Keisha Morgan", email: "keisha@email.com", phone: "876-555-0104", balance: 15000,
    payments: { 2024: mkPay([1,2,3,4,5,6,7,8,9,10,11,12],2024), 2025: mkPay([1,2,3,4,5,6,7,8,9,10,11,12],2025), 2026: mkPay([1,2],2026) },
    violations: [] },
  { unit: "C1", name: "Omar Williams", email: "omar@email.com", phone: "876-555-0105", balance: 60000,
    payments: { 2024: mkPay([1,2,3,4,5,6,7,8],2024), 2025: mkPay([1,2,3,4,5,6],2025), 2026: [] },
    violations: [{ id: "v3", type: "Property", description: "Unapproved structure on balcony", date: "2025-11-01", fine: 10000, status: "open" },
      { id: "v4", type: "Noise", description: "Repeated late-night disturbances", date: "2026-02-10", fine: 7500, status: "open" }] },
  { unit: "C2", name: "Tanya Davis", email: "tanya@email.com", phone: "876-555-0106", balance: 0,
    payments: { 2024: mkPay([1,2,3,4,5,6,7,8,9,10,11,12],2024), 2025: mkPay([1,2,3,4,5,6,7,8,9,10,11,12],2025), 2026: mkPay([1,2,3],2026) },
    violations: [] },
  { unit: "D1", name: "Michael Scott", email: "michael@email.com", phone: "876-555-0107", balance: 90000,
    payments: { 2024: mkPay([1,2,3,4,5,6],2024), 2025: mkPay([1,2,3],2025), 2026: [] },
    violations: [{ id: "v5", type: "Maintenance", description: "Failure to maintain front lawn", date: "2025-06-15", fine: 2000, status: "resolved" }] },
  { unit: "D2", name: "Lisa Palmer", email: "lisa@email.com", phone: "876-555-0108", balance: 15000,
    payments: { 2024: mkPay([1,2,3,4,5,6,7,8,9,10,11,12],2024), 2025: mkPay([1,2,3,4,5,6,7,8,9,10,11,12],2025), 2026: mkPay([1,2],2026) },
    violations: [] }
];
const INIT_ROOMS = [
  { id: "r1", name: "Community Hall", capacity: 100, bookings: [
    { id: "bk1", resident: "Shanice Reid", unit: "A2", date: "2026-03-20", time: "2:00 PM - 6:00 PM", purpose: "Birthday Party", status: "confirmed" },
    { id: "bk2", resident: "Andre Campbell", unit: "B1", date: "2026-04-05", time: "10:00 AM - 2:00 PM", purpose: "Meeting", status: "pending" }
  ]},
  { id: "r2", name: "Pool Area", capacity: 30, bookings: [
    { id: "bk3", resident: "Devon Brown", unit: "A1", date: "2026-03-22", time: "12:00 PM - 4:00 PM", purpose: "Pool Party", status: "confirmed" }
  ]},
  { id: "r3", name: "BBQ Pavilion", capacity: 20, bookings: [
    { id: "bk4", resident: "Omar Williams", unit: "C1", date: "2026-03-25", time: "4:00 PM - 8:00 PM", purpose: "Family BBQ", status: "pending" }
  ]},
  { id: "r4", name: "Meeting Room", capacity: 15, bookings: [] }
];

const INIT_NOTICES = [
  { id: "n1", title: "Annual General Meeting", content: "The AGM will be held on April 15, 2026 at 6:00 PM in the Community Hall. All homeowners are encouraged to attend.", date: "2026-03-01", author: "Marcus Green", priority: "high" },
  { id: "n2", title: "Water Maintenance Schedule", content: "Water supply will be temporarily interrupted on March 18 from 8:00 AM to 12:00 PM for pipe maintenance.", date: "2026-03-10", author: "Patricia Shaw", priority: "medium" },
  { id: "n3", title: "Security Update", content: "New security cameras have been installed at all entry points. Please collect your updated access cards from the office.", date: "2026-02-20", author: "Richard Cole", priority: "low" },
  { id: "n4", title: "Quarterly Dues Reminder", content: "Q1 2026 maintenance fees are now due. Please ensure timely payment to avoid late fees.", date: "2026-01-15", author: "Marcus Green", priority: "high" }
];

const RULES = [
  { id: 1, title: "Quiet Hours", desc: "Quiet hours are from 10:00 PM to 7:00 AM daily. Excessive noise during these hours will result in a JMD $5,000 fine." },
  { id: 2, title: "Parking", desc: "Each unit is assigned one parking spot. Visitor parking is available on a first-come basis. Unauthorized vehicles will be towed." },
  { id: 3, title: "Pets", desc: "Pets must be leashed in common areas. Owners must clean up after their pets. Maximum 2 pets per unit." },
  { id: 4, title: "Maintenance Fees", desc: "Monthly fees of JMD $15,000 are due by the 5th of each month. Late payments incur a 5% penalty." },
  { id: 5, title: "Common Areas", desc: "Common areas must be booked in advance through the HOA portal. Clean-up is the responsibility of the booking party." },
  { id: 6, title: "Renovations", desc: "All renovations require written HOA approval at least 30 days before work begins. Unapproved modifications may result in fines." },
  { id: 7, title: "Waste Disposal", desc: "Garbage must be placed in designated bins. Bulk waste pickup is available every first Saturday of the month." },
  { id: 8, title: "Guest Policy", desc: "Residents must register overnight guests at the security desk. Maximum stay for guests is 14 consecutive days." },
  { id: 9, title: "Insurance", desc: "All homeowners must maintain valid property insurance. Proof of insurance must be submitted to the HOA annually." }
];

const s = {
  btn: { border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" },
  card: { background: "#fff", borderRadius: 12, padding: "1.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  input: { padding: "0.6rem 0.8rem", borderRadius: 8, border: "1px solid #ddd", fontSize: "0.9rem", width: "100%" },
  badge: (bg) => ({ display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600, background: bg, color: "#fff" }),
  statCard: (border) => ({ ...{ background: "#fff", borderRadius: 12, padding: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }, borderLeft: "4px solid " + border })
};

const LoginScreen = ({ onLogin, allUsers }) => {
  const [u, setU] = React.useState("");
  const [p, setP] = React.useState("");
  const [err, setErr] = React.useState("");
  const handle = () => {
    const found = allUsers.find(x => x.username === u && x.password === p);
    if (found) onLogin(found);
    else setErr("Invalid username or password");
  };
  return React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, " + C.green + " 0%, " + C.black + " 100%)" } },
    React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: "2.5rem", width: "100%", maxWidth: 400, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" } },
      React.createElement("div", { style: { textAlign: "center", marginBottom: "1.5rem" } },
        React.createElement(Shield, { size: 48, color: C.green }),
        React.createElement("h1", { style: { color: C.black, margin: "0.5rem 0 0.25rem", fontSize: "1.5rem" } }, "Jamaica HOA Manager"),
        React.createElement("p", { style: { color: "#666", margin: 0, fontSize: "0.9rem" } }, "Sign in to your account")
      ),
      err && React.createElement("div", { style: { background: "#fee", color: "#c00", padding: "0.5rem", borderRadius: 8, marginBottom: "1rem", fontSize: "0.85rem", textAlign: "center" }, role: "alert" }, err),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" } },
        React.createElement("input", { style: s.input, placeholder: "Username", value: u, onChange: e => { setU(e.target.value); setErr(""); }, "aria-label": "Username" }),
        React.createElement("input", { style: s.input, placeholder: "Password", type: "password", value: p, onChange: e => { setP(e.target.value); setErr(""); }, "aria-label": "Password", onKeyDown: e => e.key === "Enter" && handle() }),
        React.createElement("button", { onClick: handle, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.75rem", fontSize: "1rem" } }, "Sign In")
      )
    )
  );
};
const PaymentsTab = ({ user, homeowners, setHomeowners }) => {
  const isAdmin = user.role === "admin";
  const [year, setYear] = React.useState(2026);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [showAdd, setShowAdd] = React.useState(false);
  const [addForm, setAddForm] = React.useState({ unit: "", month: "", amount: MONTHLY_FEE, method: "Bank Transfer" });

  const myUnit = !isAdmin ? user.unit : null;
  const displayOwners = isAdmin ? homeowners : homeowners.filter(h => h.unit === myUnit);
  const filtered = displayOwners.filter(h => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.unit.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "overdue") return h.balance > 12500;
    if (filter === "clear") return h.balance === 0;
    if (filter === "pending") return (h.payments[year] || []).some(p => !p.verified);
    return true;
  });

  const totalCollected = homeowners.reduce((s, h) => s + (h.payments[year] || []).filter(p => p.verified).reduce((a, p) => a + p.amount, 0), 0);
  const totalOutstanding = homeowners.reduce((s, h) => s + h.balance, 0);
  const overdue = homeowners.filter(h => h.balance > 12500).length;
  const pendingV = homeowners.reduce((s, h) => s + (h.payments[year] || []).filter(p => !p.verified).length, 0);

  const handleReceipt = (unit, payIdx) => {
    const fn = "receipt_" + unit + "_" + Date.now() + ".pdf";
    setHomeowners(prev => prev.map(h => h.unit === unit ? { ...h, payments: { ...h.payments, [year]: h.payments[year].map((p, i) => i === payIdx ? { ...p, receipt: fn } : p) } } : h));
  };

  const handleVerify = (unit, payIdx) => {
    setHomeowners(prev => prev.map(h => h.unit === unit ? { ...h, payments: { ...h.payments, [year]: h.payments[year].map((p, i) => i === payIdx ? { ...p, verified: true } : p) } } : h));
  };

  const handleAdd = () => {
    if (!addForm.unit || !addForm.month) return;
    const mo = parseInt(addForm.month);
    const newPay = { month: mo, year, amount: parseInt(addForm.amount), date: year + "-" + String(mo).padStart(2, "0") + "-" + String(new Date().getDate()).padStart(2, "0"), method: addForm.method, receipt: null, verified: false };
    setHomeowners(prev => prev.map(h => h.unit === addForm.unit ? { ...h, balance: Math.max(0, h.balance - newPay.amount), payments: { ...h.payments, [year]: [...(h.payments[year] || []), newPay] } } : h));
    setAddForm({ unit: "", month: "", amount: MONTHLY_FEE, method: "Bank Transfer" });
    setShowAdd(false);
  };

  const mths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" } },
      React.createElement("h2", { style: { margin: 0, color: C.black } }, isAdmin ? "Payment Management" : "My Payments"),
      React.createElement("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" } },
        [2024, 2025, 2026].map(y => React.createElement("button", { key: y, onClick: () => setYear(y), style: { ...s.btn, padding: "0.4rem 0.8rem", background: year === y ? C.green : "#e0e0e0", color: year === y ? "#fff" : "#333", fontSize: "0.85rem" } }, y))
      )
    ),
    isAdmin && React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard(C.green) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Collected (" + year + ")"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, "J$" + totalCollected.toLocaleString())
      ),
      React.createElement("div", { style: s.statCard(C.gold) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Outstanding"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, "J$" + totalOutstanding.toLocaleString())
      ),
      React.createElement("div", { style: s.statCard("#dc3545") },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Overdue (>J$12,500)"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#dc3545" } }, overdue + " units")
      ),
      React.createElement("div", { style: s.statCard("#6f42c1") },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Pending Verification"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#6f42c1" } }, pendingV)
      )
    ),
    !isAdmin && React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard(C.green) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Paid (" + year + ")"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, "J$" + (displayOwners[0] ? (displayOwners[0].payments[year] || []).filter(p => p.verified).reduce((a, p) => a + p.amount, 0) : 0).toLocaleString())
      ),
      React.createElement("div", { style: s.statCard(displayOwners[0] && displayOwners[0].balance > 0 ? "#dc3545" : C.green) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "My Balance"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: displayOwners[0] && displayOwners[0].balance > 0 ? "#dc3545" : C.green } }, "J$" + (displayOwners[0] ? displayOwners[0].balance.toLocaleString() : "0"))
      ),
      React.createElement("div", { style: s.statCard("#6f42c1") },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Pending Verification"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#6f42c1" } }, displayOwners[0] ? (displayOwners[0].payments[year] || []).filter(p => !p.verified).length : 0)
      )
    ),
    isAdmin && React.createElement("div", { style: { display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" } },
      React.createElement("div", { style: { position: "relative", flex: 1, minWidth: 200 } },
        React.createElement(Search, { size: 16, style: { position: "absolute", left: 10, top: 11, color: "#999" } }),
        React.createElement("input", { style: { ...s.input, paddingLeft: "2rem" }, placeholder: "Search by name or unit...", value: search, onChange: e => setSearch(e.target.value) })
      ),
      ["all","overdue","pending","clear"].map(f => React.createElement("button", { key: f, onClick: () => setFilter(f), style: { ...s.btn, padding: "0.4rem 0.8rem", background: filter === f ? C.green : "#e0e0e0", color: filter === f ? "#fff" : "#333", fontSize: "0.8rem", textTransform: "capitalize" } }, f)),
      React.createElement("button", { onClick: () => setShowAdd(!showAdd), style: { ...s.btn, background: C.gold, color: C.black, padding: "0.4rem 1rem", fontSize: "0.85rem" } }, "+ Add Payment")
    ),
    showAdd && isAdmin && React.createElement("div", { style: { ...s.card, marginBottom: "1rem", border: "2px solid " + C.gold } },
      React.createElement("h3", { style: { margin: "0 0 0.75rem", fontSize: "1rem" } }, "Record Payment"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" } },
        React.createElement("select", { style: s.input, value: addForm.unit, onChange: e => setAddForm({ ...addForm, unit: e.target.value }) },
          React.createElement("option", { value: "" }, "Select Unit"),
          homeowners.map(h => React.createElement("option", { key: h.unit, value: h.unit }, h.unit + " - " + h.name))
        ),
        React.createElement("select", { style: s.input, value: addForm.month, onChange: e => setAddForm({ ...addForm, month: e.target.value }) },
          React.createElement("option", { value: "" }, "Month"),
          mths.map((m, i) => React.createElement("option", { key: i, value: i + 1 }, m))
        ),
        React.createElement("input", { style: s.input, type: "number", value: addForm.amount, onChange: e => setAddForm({ ...addForm, amount: e.target.value }) }),
        React.createElement("select", { style: s.input, value: addForm.method, onChange: e => setAddForm({ ...addForm, method: e.target.value }) },
          ["Bank Transfer", "Cash", "Cheque"].map(m => React.createElement("option", { key: m, value: m }, m))
        ),
        React.createElement("button", { onClick: handleAdd, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.6rem" } }, "Save Payment")
      )
    ),
    filtered.map(h => React.createElement("div", { key: h.unit, style: { ...s.card, marginBottom: "1rem", borderLeft: "4px solid " + (h.balance > 12500 ? "#dc3545" : h.balance > 0 ? C.gold : C.green) } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" } },
        React.createElement("div", null,
          React.createElement("strong", { style: { fontSize: "1.05rem" } }, isAdmin ? h.name + " - Unit " + h.unit : "Unit " + h.unit),
          isAdmin && React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, h.email + " | " + h.phone)
        ),
        React.createElement("div", { style: { textAlign: "right" } },
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Balance"),
          React.createElement("div", { style: { fontSize: "1.1rem", fontWeight: 700, color: h.balance > 0 ? "#dc3545" : C.green } }, "J$" + h.balance.toLocaleString()),
          h.balance > 12500 && React.createElement("span", { style: s.badge("#dc3545") }, "OVERDUE")
        )
      ),
      React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" } },
        React.createElement("thead", null,
          React.createElement("tr", { style: { borderBottom: "2px solid #eee" } },
            ["Month", "Amount", "Date", "Method", "Receipt", "Status", isAdmin ? "Action" : null].filter(Boolean).map(col =>
              React.createElement("th", { key: col, style: { textAlign: "left", padding: "0.5rem", color: "#666", fontWeight: 600 } }, col)
            )
          )
        ),
        React.createElement("tbody", null,
          (h.payments[year] || []).map((p, i) =>
            React.createElement("tr", { key: i, style: { borderBottom: "1px solid #f0f0f0" } },
              React.createElement("td", { style: { padding: "0.5rem" } }, mths[p.month - 1]),
              React.createElement("td", { style: { padding: "0.5rem" } }, "J$" + p.amount.toLocaleString()),
              React.createElement("td", { style: { padding: "0.5rem" } }, p.date),
              React.createElement("td", { style: { padding: "0.5rem" } }, p.method),
              React.createElement("td", { style: { padding: "0.5rem" } },
                p.receipt ? React.createElement("span", { style: { color: C.green, display: "flex", alignItems: "center", gap: 4 } }, React.createElement(FileText, { size: 14 }), "Uploaded")
                : !isAdmin ? React.createElement("button", { onClick: () => handleReceipt(h.unit, i), style: { ...s.btn, background: "#e8f5e9", color: C.green, padding: "0.25rem 0.5rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 4 } }, React.createElement(Paperclip, { size: 14 }), "Upload")
                : React.createElement("span", { style: { color: "#999" } }, "None")
              ),
              React.createElement("td", { style: { padding: "0.5rem" } },
                p.verified ? React.createElement("span", { style: s.badge(C.green) }, "Verified") : React.createElement("span", { style: s.badge("#6f42c1") }, "Pending")
              ),
              isAdmin && React.createElement("td", { style: { padding: "0.5rem" } },
                !p.verified && React.createElement("button", { onClick: () => handleVerify(h.unit, i), style: { ...s.btn, background: C.green, color: "#fff", padding: "0.25rem 0.6rem", fontSize: "0.8rem" } }, React.createElement(Check, { size: 14 }), " Verify")
              )
            )
          ),
          (h.payments[year] || []).length === 0 && React.createElement("tr", null, React.createElement("td", { colSpan: 7, style: { padding: "1rem", textAlign: "center", color: "#999" } }, "No payments recorded for " + year))
        )
      )
    ))
  );
};
const ViolationsTab = ({ user, homeowners, setHomeowners }) => {
  const isAdmin = user.role === "admin";
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [showAdd, setShowAdd] = React.useState(false);
  const [addForm, setAddForm] = React.useState({ unit: "", type: "Noise", description: "", fine: 5000 });

  const myUnit = !isAdmin ? user.unit : null;
  const displayOwners = isAdmin ? homeowners : homeowners.filter(h => h.unit === myUnit);

  const allViolations = displayOwners.flatMap(h => (h.violations || []).map(v => ({ ...v, unit: h.unit, name: h.name })));
  const filteredV = allViolations.filter(v => {
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.unit.toLowerCase().includes(search.toLowerCase()) && !v.type.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "open") return v.status === "open";
    if (filter === "resolved") return v.status === "resolved";
    return true;
  });

  const totalFines = allViolations.filter(v => v.status === "open").reduce((s, v) => s + v.fine, 0);

  const handleAdd = () => {
    if (!addForm.unit || !addForm.description) return;
    const newV = { id: "v" + Date.now(), type: addForm.type, description: addForm.description, date: new Date().toISOString().split("T")[0], fine: parseInt(addForm.fine), status: "open" };
    setHomeowners(prev => prev.map(h => h.unit === addForm.unit ? { ...h, violations: [...(h.violations || []), newV] } : h));
    setAddForm({ unit: "", type: "Noise", description: "", fine: 5000 });
    setShowAdd(false);
  };

  const handleResolve = (unit, vId) => {
    setHomeowners(prev => prev.map(h => h.unit === unit ? { ...h, violations: h.violations.map(v => v.id === vId ? { ...v, status: "resolved" } : v) } : h));
  };

  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" } },
      React.createElement("h2", { style: { margin: 0, color: C.black } }, isAdmin ? "Violation Management" : "My Violations"),
      isAdmin && React.createElement("button", { onClick: () => setShowAdd(!showAdd), style: { ...s.btn, background: C.gold, color: C.black, padding: "0.5rem 1rem", fontSize: "0.85rem" } }, "+ Add Violation")
    ),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard("#dc3545") },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, isAdmin ? "Open Violations" : "My Open Violations"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#dc3545" } }, allViolations.filter(v => v.status === "open").length)
      ),
      React.createElement("div", { style: s.statCard(C.green) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Resolved"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, allViolations.filter(v => v.status === "resolved").length)
      ),
      React.createElement("div", { style: s.statCard(C.gold) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Outstanding Fines"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, "J$" + totalFines.toLocaleString())
      )
    ),
    React.createElement("div", { style: { display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" } },
      isAdmin && React.createElement("div", { style: { position: "relative", flex: 1, minWidth: 200 } },
        React.createElement(Search, { size: 16, style: { position: "absolute", left: 10, top: 11, color: "#999" } }),
        React.createElement("input", { style: { ...s.input, paddingLeft: "2rem" }, placeholder: "Search violations...", value: search, onChange: e => setSearch(e.target.value) })
      ),
      ["all", "open", "resolved"].map(f => React.createElement("button", { key: f, onClick: () => setFilter(f), style: { ...s.btn, padding: "0.4rem 0.8rem", background: filter === f ? C.green : "#e0e0e0", color: filter === f ? "#fff" : "#333", fontSize: "0.8rem", textTransform: "capitalize" } }, f))
    ),
    showAdd && isAdmin && React.createElement("div", { style: { ...s.card, marginBottom: "1rem", border: "2px solid " + C.gold } },
      React.createElement("h3", { style: { margin: "0 0 0.75rem", fontSize: "1rem" } }, "Add Violation"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" } },
        React.createElement("select", { style: s.input, value: addForm.unit, onChange: e => setAddForm({ ...addForm, unit: e.target.value }) },
          React.createElement("option", { value: "" }, "Select Unit"),
          homeowners.map(h => React.createElement("option", { key: h.unit, value: h.unit }, h.unit + " - " + h.name))
        ),
        React.createElement("select", { style: s.input, value: addForm.type, onChange: e => setAddForm({ ...addForm, type: e.target.value }) },
          ["Noise", "Parking", "Property", "Maintenance", "Pets", "Other"].map(t => React.createElement("option", { key: t, value: t }, t))
        ),
        React.createElement("input", { style: s.input, placeholder: "Description", value: addForm.description, onChange: e => setAddForm({ ...addForm, description: e.target.value }) }),
        React.createElement("input", { style: s.input, type: "number", placeholder: "Fine (JMD)", value: addForm.fine, onChange: e => setAddForm({ ...addForm, fine: e.target.value }) }),
        React.createElement("button", { onClick: handleAdd, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.6rem" } }, "Save Violation")
      )
    ),
    filteredV.length === 0 && React.createElement("div", { style: { ...s.card, textAlign: "center", color: "#999", padding: "2rem" } }, isAdmin ? "No violations found." : "You have no violations. Keep up the good work!"),
    filteredV.map(v => React.createElement("div", { key: v.id, style: { ...s.card, marginBottom: "0.75rem", borderLeft: "4px solid " + (v.status === "open" ? "#dc3545" : C.green) } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" } },
        React.createElement("div", null,
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" } },
            React.createElement("strong", null, v.type),
            React.createElement("span", { style: s.badge(v.status === "open" ? "#dc3545" : C.green) }, v.status.toUpperCase()),
            isAdmin && React.createElement("span", { style: { fontSize: "0.8rem", color: "#666" } }, "Unit " + v.unit + " - " + v.name)
          ),
          React.createElement("p", { style: { margin: "0.25rem 0", color: "#555", fontSize: "0.9rem" } }, v.description),
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#999" } }, "Date: " + v.date + " | Fine: J$" + v.fine.toLocaleString())
        ),
        v.status === "open" && isAdmin && React.createElement("button", { onClick: () => handleResolve(v.unit, v.id), style: { ...s.btn, background: C.green, color: "#fff", padding: "0.4rem 0.8rem", fontSize: "0.85rem" } }, React.createElement(Check, { size: 14 }), " Resolve")
      )
    ))
  );
};
const BookingsTab = ({ user, rooms, setRooms }) => {
  const isAdmin = user.role === "admin";
  const [showBook, setShowBook] = React.useState(false);
  const [bookForm, setBookForm] = React.useState({ room: "", date: "", time: "", purpose: "" });

  const myUnit = !isAdmin ? user.unit : null;

  const handleBook = () => {
    if (!bookForm.room || !bookForm.date || !bookForm.time || !bookForm.purpose) return;
    const newB = { id: "bk" + Date.now(), resident: user.name, unit: user.unit || "Admin", date: bookForm.date, time: bookForm.time, purpose: bookForm.purpose, status: "pending" };
    setRooms(prev => prev.map(r => r.id === bookForm.room ? { ...r, bookings: [...r.bookings, newB] } : r));
    setBookForm({ room: "", date: "", time: "", purpose: "" });
    setShowBook(false);
  };

  const handleConfirm = (roomId, bkId) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, bookings: r.bookings.map(b => b.id === bkId ? { ...b, status: "confirmed" } : b) } : r));
  };

  const handleReject = (roomId, bkId) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, bookings: r.bookings.map(b => b.id === bkId ? { ...b, status: "rejected" } : b) } : r));
  };

  const handleCancel = (roomId, bkId) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, bookings: r.bookings.filter(b => b.id !== bkId) } : r));
  };

  const pendingCount = rooms.reduce((s, r) => s + r.bookings.filter(b => b.status === "pending").length, 0);
  const myBookings = !isAdmin ? rooms.flatMap(r => r.bookings.filter(b => b.unit === myUnit).map(b => ({ ...b, roomName: r.name, roomId: r.id }))) : [];

  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" } },
      React.createElement("h2", { style: { margin: 0, color: C.black } }, isAdmin ? "Booking Management" : "My Bookings"),
      React.createElement("button", { onClick: () => setShowBook(!showBook), style: { ...s.btn, background: C.gold, color: C.black, padding: "0.5rem 1rem", fontSize: "0.85rem" } }, "+ Request Booking")
    ),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard(C.green) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Available Rooms"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, rooms.length)
      ),
      isAdmin && React.createElement("div", { style: s.statCard(C.gold) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Pending Requests"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, pendingCount)
      ),
      !isAdmin && React.createElement("div", { style: s.statCard(C.gold) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "My Bookings"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, myBookings.length)
      )
    ),
    showBook && React.createElement("div", { style: { ...s.card, marginBottom: "1rem", border: "2px solid " + C.gold } },
      React.createElement("h3", { style: { margin: "0 0 0.75rem", fontSize: "1rem" } }, "Request a Booking"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" } },
        React.createElement("select", { style: s.input, value: bookForm.room, onChange: e => setBookForm({ ...bookForm, room: e.target.value }) },
          React.createElement("option", { value: "" }, "Select Room"),
          rooms.map(r => React.createElement("option", { key: r.id, value: r.id }, r.name + " (Cap: " + r.capacity + ")"))
        ),
        React.createElement("input", { style: s.input, type: "date", value: bookForm.date, onChange: e => setBookForm({ ...bookForm, date: e.target.value }) }),
        React.createElement("input", { style: s.input, placeholder: "Time (e.g. 2:00 PM - 6:00 PM)", value: bookForm.time, onChange: e => setBookForm({ ...bookForm, time: e.target.value }) }),
        React.createElement("input", { style: s.input, placeholder: "Purpose", value: bookForm.purpose, onChange: e => setBookForm({ ...bookForm, purpose: e.target.value }) }),
        React.createElement("button", { onClick: handleBook, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.6rem" } }, "Submit Request")
      )
    ),
    !isAdmin && React.createElement("div", null,
      React.createElement("h3", { style: { fontSize: "1rem", color: C.black, marginBottom: "0.75rem" } }, "Your Booking Requests"),
      myBookings.length === 0 && React.createElement("div", { style: { ...s.card, textAlign: "center", color: "#999", padding: "2rem" } }, "You have no bookings yet. Click '+ Request Booking' to reserve a space."),
      myBookings.map(b => React.createElement("div", { key: b.id, style: { ...s.card, marginBottom: "0.75rem", borderLeft: "4px solid " + (b.status === "confirmed" ? C.green : b.status === "pending" ? C.gold : "#dc3545") } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" } },
          React.createElement("div", null,
            React.createElement("strong", null, b.roomName),
            React.createElement("div", { style: { fontSize: "0.85rem", color: "#555" } }, b.date + " | " + b.time),
            React.createElement("div", { style: { fontSize: "0.85rem", color: "#666" } }, "Purpose: " + b.purpose)
          ),
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
            React.createElement("span", { style: s.badge(b.status === "confirmed" ? C.green : b.status === "pending" ? "#b8860b" : "#dc3545") }, b.status.toUpperCase()),
            b.status === "pending" && React.createElement("button", { onClick: () => handleCancel(b.roomId, b.id), style: { ...s.btn, background: "#fee", color: "#dc3545", padding: "0.3rem 0.6rem", fontSize: "0.8rem" } }, "Cancel")
          )
        )
      ))
    ),
    isAdmin && rooms.map(r => React.createElement("div", { key: r.id, style: { ...s.card, marginBottom: "1rem" } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" } },
        React.createElement("div", null,
          React.createElement("strong", { style: { fontSize: "1.05rem" } }, r.name),
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Capacity: " + r.capacity)
        )
      ),
      r.bookings.length === 0 && React.createElement("p", { style: { color: "#999", fontSize: "0.85rem" } }, "No bookings for this room."),
      r.bookings.map(b => React.createElement("div", { key: b.id, style: { padding: "0.6rem", borderRadius: 8, marginBottom: "0.5rem", background: b.status === "pending" ? "#fff8e1" : b.status === "confirmed" ? "#e8f5e9" : "#ffebee", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" } },
        React.createElement("div", null,
          React.createElement("div", { style: { fontWeight: 600, fontSize: "0.9rem" } }, b.resident + " (Unit " + b.unit + ")"),
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#555" } }, b.date + " | " + b.time + " | " + b.purpose)
        ),
        React.createElement("div", { style: { display: "flex", gap: "0.4rem", alignItems: "center" } },
          React.createElement("span", { style: s.badge(b.status === "confirmed" ? C.green : b.status === "pending" ? "#b8860b" : "#dc3545") }, b.status.toUpperCase()),
          b.status === "pending" && React.createElement("button", { onClick: () => handleConfirm(r.id, b.id), style: { ...s.btn, background: C.green, color: "#fff", padding: "0.3rem 0.6rem", fontSize: "0.8rem" } }, React.createElement(Check, { size: 14 }), " Confirm"),
          b.status === "pending" && React.createElement("button", { onClick: () => handleReject(r.id, b.id), style: { ...s.btn, background: "#dc3545", color: "#fff", padding: "0.3rem 0.6rem", fontSize: "0.8rem" } }, React.createElement(X, { size: 14 }), " Reject")
        )
      ))
    ))
  );
};

const NoticeBoard = ({ user, notices, setNotices }) => {
  const isAdmin = user.role === "admin";
  const [showAdd, setShowAdd] = React.useState(false);
  const [form, setForm] = React.useState({ title: "", content: "", priority: "medium" });

  const handleAdd = () => {
    if (!form.title || !form.content) return;
    setNotices(prev => [{ id: "n" + Date.now(), title: form.title, content: form.content, date: new Date().toISOString().split("T")[0], author: user.name, priority: form.priority }, ...prev]);
    setForm({ title: "", content: "", priority: "medium" });
    setShowAdd(false);
  };

  const priColor = { high: "#dc3545", medium: C.gold, low: C.green };

  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" } },
      React.createElement("h2", { style: { margin: 0, color: C.black } }, "Notice Board"),
      isAdmin && React.createElement("button", { onClick: () => setShowAdd(!showAdd), style: { ...s.btn, background: C.gold, color: C.black, padding: "0.5rem 1rem", fontSize: "0.85rem" } }, "+ Post Notice")
    ),
    showAdd && React.createElement("div", { style: { ...s.card, marginBottom: "1rem", border: "2px solid " + C.gold } },
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.75rem" } },
        React.createElement("input", { style: s.input, placeholder: "Notice Title", value: form.title, onChange: e => setForm({ ...form, title: e.target.value }) }),
        React.createElement("textarea", { style: { ...s.input, minHeight: 80, resize: "vertical" }, placeholder: "Notice Content", value: form.content, onChange: e => setForm({ ...form, content: e.target.value }) }),
        React.createElement("select", { style: s.input, value: form.priority, onChange: e => setForm({ ...form, priority: e.target.value }) },
          ["high", "medium", "low"].map(p => React.createElement("option", { key: p, value: p }, p.charAt(0).toUpperCase() + p.slice(1) + " Priority"))
        ),
        React.createElement("button", { onClick: handleAdd, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.6rem" } }, "Post Notice")
      )
    ),
    notices.map(n => React.createElement("div", { key: n.id, style: { ...s.card, marginBottom: "0.75rem", borderLeft: "4px solid " + (priColor[n.priority] || C.green) } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" } },
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" } },
            React.createElement("strong", { style: { fontSize: "1rem" } }, n.title),
            React.createElement("span", { style: s.badge(priColor[n.priority] || C.green) }, n.priority.toUpperCase())
          ),
          React.createElement("p", { style: { margin: "0.25rem 0", color: "#555", fontSize: "0.9rem" } }, n.content),
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#999" } }, "Posted by " + n.author + " on " + n.date)
        ),
        isAdmin && React.createElement("button", { onClick: () => setNotices(prev => prev.filter(x => x.id !== n.id)), style: { ...s.btn, background: "#fee", color: "#dc3545", padding: "0.3rem 0.6rem", fontSize: "0.8rem" } }, React.createElement(X, { size: 14 }))
      )
    ))
  );
};

const RulesTab = () => {
  const [search, setSearch] = React.useState("");
  const filtered = RULES.filter(r => !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase()));
  return React.createElement("div", null,
    React.createElement("h2", { style: { margin: "0 0 1rem", color: C.black } }, "Community Rules & Regulations"),
    React.createElement("div", { style: { position: "relative", marginBottom: "1rem", maxWidth: 400 } },
      React.createElement(Search, { size: 16, style: { position: "absolute", left: 10, top: 11, color: "#999" } }),
      React.createElement("input", { style: { ...s.input, paddingLeft: "2rem" }, placeholder: "Search rules...", value: search, onChange: e => setSearch(e.target.value) })
    ),
    filtered.map(r => React.createElement("div", { key: r.id, style: { ...s.card, marginBottom: "0.75rem", borderLeft: "4px solid " + C.green } },
      React.createElement("strong", { style: { fontSize: "1rem", color: C.black } }, r.id + ". " + r.title),
      React.createElement("p", { style: { margin: "0.25rem 0 0", color: "#555", fontSize: "0.9rem" } }, r.desc)
    ))
  );
};
const UsersTab = ({ user, allUsers, setAllUsers }) => {
  const [search, setSearch] = React.useState("");
  const [showAdd, setShowAdd] = React.useState(false);
  const [form, setForm] = React.useState({ username: "", password: "", name: "", role: "member", unit: "", email: "", phone: "" });

  const filtered = allUsers.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || (u.unit || "").toLowerCase().includes(q);
  });

  const admins = allUsers.filter(u => u.role === "admin");
  const members = allUsers.filter(u => u.role === "member");

  const toggleRole = (username) => {
    setAllUsers(prev => prev.map(u => u.username === username ? { ...u, role: u.role === "admin" ? "member" : "admin" } : u));
  };

  const removeUser = (username) => {
    if (username === user.username) return;
    setAllUsers(prev => prev.filter(u => u.username !== username));
  };

  const addUser = () => {
    if (!form.username || !form.password || !form.name) return;
    if (allUsers.find(u => u.username === form.username)) return;
    setAllUsers(prev => [...prev, { ...form }]);
    setForm({ username: "", password: "", name: "", role: "member", unit: "", email: "", phone: "" });
    setShowAdd(false);
  };

  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" } },
      React.createElement("h2", { style: { margin: 0, color: C.black } }, "User Management"),
      React.createElement("button", { onClick: () => setShowAdd(!showAdd), style: { ...s.btn, background: C.gold, color: C.black, padding: "0.5rem 1rem", fontSize: "0.85rem" } }, "+ Add User")
    ),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard(C.green) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Total Users"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, allUsers.length)
      ),
      React.createElement("div", { style: s.statCard(C.gold) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Admins"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, admins.length)
      ),
      React.createElement("div", { style: s.statCard(C.black) },
        React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Members"),
        React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.black } }, members.length)
      )
    ),
    React.createElement("div", { style: { position: "relative", marginBottom: "1rem", maxWidth: 400 } },
      React.createElement(Search, { size: 16, style: { position: "absolute", left: 10, top: 11, color: "#999" } }),
      React.createElement("input", { style: { ...s.input, paddingLeft: "2rem" }, placeholder: "Search users...", value: search, onChange: e => setSearch(e.target.value) })
    ),
    showAdd && React.createElement("div", { style: { ...s.card, marginBottom: "1rem", border: "2px solid " + C.gold } },
      React.createElement("h3", { style: { margin: "0 0 0.75rem", fontSize: "1rem" } }, "Add New User"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" } },
        React.createElement("input", { style: s.input, placeholder: "Username", value: form.username, onChange: e => setForm({ ...form, username: e.target.value }) }),
        React.createElement("input", { style: s.input, placeholder: "Password", value: form.password, onChange: e => setForm({ ...form, password: e.target.value }) }),
        React.createElement("input", { style: s.input, placeholder: "Full Name", value: form.name, onChange: e => setForm({ ...form, name: e.target.value }) }),
        React.createElement("select", { style: s.input, value: form.role, onChange: e => setForm({ ...form, role: e.target.value }) },
          React.createElement("option", { value: "member" }, "Member"),
          React.createElement("option", { value: "admin" }, "Admin")
        ),
        React.createElement("input", { style: s.input, placeholder: "Unit (e.g. A1)", value: form.unit, onChange: e => setForm({ ...form, unit: e.target.value }) }),
        React.createElement("input", { style: s.input, placeholder: "Email", value: form.email, onChange: e => setForm({ ...form, email: e.target.value }) }),
        React.createElement("input", { style: s.input, placeholder: "Phone", value: form.phone, onChange: e => setForm({ ...form, phone: e.target.value }) }),
        React.createElement("button", { onClick: addUser, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.6rem" } }, "Add User")
      )
    ),
    filtered.map(u => React.createElement("div", { key: u.username, style: { ...s.card, marginBottom: "0.75rem", borderLeft: "4px solid " + (u.role === "admin" ? C.gold : C.green) } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" } },
        React.createElement("div", null,
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
            React.createElement("strong", null, u.name),
            React.createElement("span", { style: s.badge(u.role === "admin" ? "#b8860b" : C.green) }, u.role.toUpperCase())
          ),
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#666", marginTop: 2 } }, "@" + u.username + (u.unit ? " | Unit " + u.unit : "") + (u.email ? " | " + u.email : ""))
        ),
        React.createElement("div", { style: { display: "flex", gap: "0.4rem" } },
          React.createElement("button", { onClick: () => toggleRole(u.username), style: { ...s.btn, padding: "0.35rem 0.7rem", fontSize: "0.8rem", background: u.role === "admin" ? "#fff3cd" : "#d4edda", color: u.role === "admin" ? "#856404" : "#155724" } }, u.role === "admin" ? "Demote" : "Promote"),
          u.username !== user.username && React.createElement("button", { onClick: () => removeUser(u.username), style: { ...s.btn, padding: "0.35rem 0.7rem", fontSize: "0.8rem", background: "#fee", color: "#dc3545" } }, "Remove")
        )
      )
    ))
  );
};
const App = () => {
  const [user, setUser] = React.useState(null);
  const [tab, setTab] = React.useState("payments");
  const [homeowners, setHomeowners] = React.useState(INIT_HOMEOWNERS);
  const [rooms, setRooms] = React.useState(INIT_ROOMS);
  const [notices, setNotices] = React.useState(INIT_NOTICES);
  const [allUsers, setAllUsers] = React.useState([...ADMINS.map(a => ({...a, role:"admin"})), ...MEMBERS.map(m => ({...m, role:"member"}))]);

  if (!user) return React.createElement(LoginScreen, { onLogin: setUser, allUsers });

  const isAdmin = user.role === "admin";
  const TABS = [
    { id: "payments", label: "Payments", icon: "DollarSign" },
    { id: "violations", label: "Violations", icon: "AlertTriangle" },
    { id: "bookings", label: "Bookings", icon: "Calendar" },
    { id: "notices", label: "Notices", icon: "Bell" },
    { id: "rules", label: "Rules", icon: "BookOpen" },
    ...(isAdmin ? [{ id: "users", label: "Users", icon: "Users" }] : [])
  ];

  const iconMap = { DollarSign, AlertTriangle, Calendar, Bell, BookOpen, Shield, Users };

  return React.createElement("div", { style: { minHeight: "100vh", background: "#f0f2f5" } },
    React.createElement("header", { style: { background: C.black, color: C.gold, padding: "0.7rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.7rem" } },
        React.createElement(Shield, { size: 28, color: C.green, "aria-hidden": "true" }),
        React.createElement("h1", { style: { fontSize: "1.25rem", margin: 0, fontWeight: 700 } }, "Jamaica HOA Manager")
      ),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" } },
        React.createElement("span", { style: { fontSize: "0.85rem", color: "#ccc" } }, user.name + (isAdmin ? " (Admin)" : " - Unit " + user.unit)),
        React.createElement("button", {
          onClick: () => { setUser(null); setTab("payments"); },
          style: { ...s.btn, background: C.green, color: "#fff", padding: "0.35rem 1rem", fontSize: "0.85rem" },
          "aria-label": "Log out"
        }, "Logout")
      )
    ),
    React.createElement("nav", { style: { background: "#fff", borderBottom: "2px solid " + C.gold, display: "flex", overflowX: "auto", padding: "0 1rem" }, role: "tablist", "aria-label": "Main navigation" },
      TABS.map(t => {
        const Icon = iconMap[t.icon];
        return React.createElement("button", {
          key: t.id,
          role: "tab",
          "aria-selected": tab === t.id,
          onClick: () => setTab(t.id),
          style: {
            display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.75rem 1.2rem",
            background: "none", border: "none", borderBottom: tab === t.id ? "3px solid " + C.green : "3px solid transparent",
            color: tab === t.id ? C.green : "#666", fontWeight: tab === t.id ? 700 : 400,
            cursor: "pointer", whiteSpace: "nowrap", fontSize: "0.9rem", transition: "all 0.2s"
          }
        }, Icon ? React.createElement(Icon, { size: 18, "aria-hidden": "true" }) : null, t.label);
      })
    ),
    React.createElement("main", { style: { maxWidth: 1200, margin: "0 auto", padding: "1.5rem 1rem" }, role: "main" },
      tab === "payments" && React.createElement(PaymentsTab, { user, homeowners, setHomeowners }),
      tab === "violations" && React.createElement(ViolationsTab, { user, homeowners, setHomeowners }),
      tab === "bookings" && React.createElement(BookingsTab, { user, rooms, setRooms }),
      tab === "notices" && React.createElement(NoticeBoard, { user, notices, setNotices }),
      tab === "rules" && React.createElement(RulesTab, null),
      tab === "users" && isAdmin && React.createElement(UsersTab, { user, allUsers, setAllUsers })
    ),
    React.createElement("footer", { style: { textAlign: "center", padding: "1.5rem", color: "#999", fontSize: "0.8rem", borderTop: "1px solid #e0e0e0", marginTop: "2rem" } },
      "\u00A9 2024-2026 Jamaica HOA Manager. Built with ", React.createElement("span", { style: { color: C.green } }, "pride"), " for Jamaican communities."
    )
  );
};

export default App;
