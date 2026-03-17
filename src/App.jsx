import React, { useState, useMemo, useEffect, useRef } from "react";
import { DollarSign, AlertTriangle, Calendar, Bell, BookOpen, Shield, Mail, Check, X, Search, ChevronDown, Paperclip, FileText, Download, Clock, Users } from "lucide-react";

const C = { green: "#009B3A", gold: "#FED100", black: "#181818" };
const ADMINS = [
  { username: "admin1", password: "Admin1Pass!", name: "Admin One", role: "admin" },
  { username: "admin2", password: "Admin2Pass!", name: "Admin Two", role: "admin" },
  { username: "admin3", password: "Admin3Pass!", name: "Admin Three", role: "admin" }
];
const MEMBERS = [
  { username: "owner1", password: "Owner1Pass!", name: "Devon Brown", unit: "1A", email: "devon@email.com", phone: "876-555-0101" },
  { username: "owner2", password: "Owner2Pass!", name: "Shanice Campbell", unit: "2B", email: "shanice@email.com", phone: "876-555-0102" },
  { username: "owner3", password: "Owner3Pass!", name: "Marcus Thompson", unit: "3C", email: "marcus@email.com", phone: "876-555-0103" },
  { username: "owner4", password: "Owner4Pass!", name: "Tanya Williams", unit: "4D", email: "tanya@email.com", phone: "876-555-0104" },
  { username: "owner5", password: "Owner5Pass!", name: "Andre Stewart", unit: "5E", email: "andre@email.com", phone: "876-555-0105" },
  { username: "owner6", password: "Owner6Pass!", name: "Keisha Morgan", unit: "6F", email: "keisha@email.com", phone: "876-555-0106" },
  { username: "owner7", password: "Owner7Pass!", name: "Ryan Edwards", unit: "7G", email: "ryan@email.com", phone: "876-555-0107" },
  { username: "owner8", password: "Owner8Pass!", name: "Camille Grant", unit: "8H", email: "camille@email.com", phone: "876-555-0108" }
];
const MONTHLY_FEE = 15000;
const ANNUAL_FEE = 180000;
const INIT_HOMEOWNERS = MEMBERS.map((m, i) => ({
  ...m, role: "member",
  balance: [0, 15000, 45000, 75000, 90000, 0, 15000, 30000][i],
  payments: {
    2024: [
      { id: "p24a"+i, date: "2024-01-15", amount: 15000, method: "Bank Transfer", verified: true, receipt: "receipt_jan24_"+i+".pdf", notes: "Q1 payment" },
      { id: "p24b"+i, date: "2024-04-10", amount: 15000, method: "Cash", verified: true, receipt: null, notes: "Q2 payment" },
      { id: "p24c"+i, date: "2024-07-20", amount: 15000, method: "Cheque", verified: i < 6, receipt: i < 4 ? "receipt_jul24_"+i+".pdf" : null, notes: "Q3 payment" },
      { id: "p24d"+i, date: "2024-10-05", amount: i < 3 ? 15000 : 0, method: i < 3 ? "Bank Transfer" : "", verified: i < 3, receipt: i < 3 ? "receipt_oct24_"+i+".pdf" : null, notes: i < 3 ? "Q4 payment" : "Missed" }
    ],
    2025: [
      { id: "p25a"+i, date: "2025-01-12", amount: 15000, method: "Bank Transfer", verified: true, receipt: "receipt_jan25_"+i+".pdf", notes: "Q1 payment" },
      { id: "p25b"+i, date: "2025-04-18", amount: i < 5 ? 15000 : 0, method: i < 5 ? "Online" : "", verified: i < 5, receipt: i < 5 ? "receipt_apr25_"+i+".pdf" : null, notes: i < 5 ? "Q2 payment" : "Missed" },
      { id: "p25c"+i, date: "2025-07-22", amount: i < 4 ? 15000 : 0, method: i < 4 ? "Bank Transfer" : "", verified: i < 4, receipt: null, notes: i < 4 ? "Q3 payment" : "Not paid" }
    ],
    2026: [
      { id: "p26a"+i, date: "2026-01-10", amount: i < 6 ? 15000 : 0, method: i < 6 ? "Bank Transfer" : "", verified: i < 4, receipt: i < 3 ? "receipt_jan26_"+i+".pdf" : null, notes: i < 6 ? "Q1 2026" : "Pending" }
    ]
  },
  violations: i === 2 ? [
    { id: "v1", date: "2024-03-15", type: "Noise", desc: "Excessive noise after 10pm", fine: 5000, status: "Resolved" },
    { id: "v2", date: "2025-01-20", type: "Parking", desc: "Unauthorized parking in visitor spot", fine: 3000, status: "Open" }
  ] : i === 5 ? [
    { id: "v3", date: "2024-08-10", type: "Property Damage", desc: "Damage to common area fence", fine: 15000, status: "Open" },
    { id: "v4", date: "2025-06-05", type: "Waste Disposal", desc: "Improper garbage disposal", fine: 2000, status: "Open" }
  ] : i === 7 ? [
    { id: "v5", date: "2025-11-01", type: "Unauthorized Construction", desc: "Unapproved patio extension", fine: 25000, status: "Open" }
  ] : []
}));
const INIT_ROOMS = [
  { name: "Community Hall", capacity: 100, bookings: [{ id: "b1", user: "Devon Brown", date: "2026-03-20", time: "14:00", purpose: "Birthday Party", status: "Confirmed" }] },
  { name: "Meeting Room A", capacity: 20, bookings: [{ id: "b2", user: "Shanice Campbell", date: "2026-03-22", time: "10:00", purpose: "Committee Meeting", status: "Confirmed" }] },
  { name: "Pool Area", capacity: 30, bookings: [] },
  { name: "BBQ Pavilion", capacity: 40, bookings: [{ id: "b3", user: "Andre Stewart", date: "2026-04-01", time: "16:00", purpose: "Community Cookout", status: "Confirmed" }] }
];
const INIT_NOTICES = [
  { id: "n1", title: "Annual General Meeting", body: "The AGM will be held on April 15, 2026 at 6:00 PM in the Community Hall. All homeowners are encouraged to attend.", date: "2026-03-01", author: "Admin One", priority: "Important" },
  { id: "n2", title: "Water Maintenance Schedule", body: "Water supply will be temporarily interrupted on March 25 from 8AM-12PM for pipe maintenance.", date: "2026-03-10", author: "Admin Two", priority: "Urgent" },
  { id: "n3", title: "New Security Measures", body: "Enhanced security patrols will begin next month. All residents must register vehicles by March 30.", date: "2026-03-05", author: "Admin One", priority: "Normal" },
  { id: "n4", title: "Outstanding Balance Reminder", body: "Homeowners with balances exceeding J$12,500 are reminded to settle accounts promptly to avoid service restrictions.", date: "2026-02-28", author: "Admin Three", priority: "Important" }
];
const RULES = [
  { title: "Maintenance Fees", text: "Monthly maintenance fees of J$15,000 are due by the 15th of each month. Late payments incur a 5% penalty after 30 days." },
  { title: "Noise Regulations", text: "Quiet hours are from 10:00 PM to 7:00 AM. Construction noise is permitted only between 8:00 AM and 5:00 PM on weekdays." },
  { title: "Parking Rules", text: "Each unit is allocated two parking spaces. Visitor parking is available on a first-come basis. No commercial vehicles overnight." },
  { title: "Pet Policy", text: "Maximum two pets per unit. Dogs must be leashed in common areas. Owners must clean up after their pets immediately." },
  { title: "Common Areas", text: "Common areas must be booked in advance. Users are responsible for cleanup. No alcohol in pool area without prior approval." },
  { title: "Exterior Modifications", text: "All exterior modifications require written approval from the HOA board. Unauthorized changes may result in fines." },
  { title: "Waste Disposal", text: "Garbage collection is every Tuesday and Friday. Recyclables should be separated. No dumping in common areas." },
  { title: "Guest Policy", text: "Overnight guests exceeding 7 days must be registered with management. Short-term rentals are not permitted." },
  { title: "Payment Methods", text: "Accepted payment methods: bank transfer, cheque, cash at office, or online payment. Always retain your receipt for verification." }
];

const s = {
  card: { background: "#fff", borderRadius: 10, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  btn: { border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 14 },
  input: { border: "1px solid #ddd", borderRadius: 6, padding: "8px 12px", fontSize: 14, outline: "none" },
  statCard: (color) => ({ background: color + "11", border: "1px solid " + color + "33", borderRadius: 10, padding: "16px 20px", minWidth: 140, flex: 1 })
};

const LoginScreen = ({ onLogin }) => {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [showPw, setShowPw] = useState(false);
  const tryLogin = () => {
    const admin = ADMINS.find(a => a.username === u && a.password === p);
    if (admin) return onLogin(admin);
    const member = MEMBERS.find(m => m.username === u && m.password === p);
    if (member) return onLogin({ ...member, role: "member" });
    setErr("Invalid credentials");
  };
  return React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, " + C.green + ", " + C.black + ")" } },
    React.createElement("div", { style: { ...s.card, width: 380, maxWidth: "90vw", padding: 32 } },
      React.createElement("div", { style: { textAlign: "center", marginBottom: 24 } },
        React.createElement("div", { style: { width: 60, height: 40, margin: "0 auto 12px", position: "relative", borderRadius: 4, overflow: "hidden" } },
          React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: "33.3%", background: C.green } }),
          React.createElement("div", { style: { position: "absolute", top: "33.3%", left: 0, right: 0, height: "33.3%", background: C.gold } }),
          React.createElement("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: "33.3%", background: C.black } })
        ),
        React.createElement("h1", { style: { margin: 0, color: C.green, fontSize: 22 } }, "Jamaica HOA Manager"),
        React.createElement("p", { style: { color: "#666", fontSize: 13, margin: "4px 0 0" } }, "Community Management Portal")
      ),
      err && React.createElement("div", { style: { background: "#ffebee", color: "#c62828", padding: 10, borderRadius: 6, marginBottom: 12, fontSize: 13 } }, err),
      React.createElement("input", { placeholder: "Username", value: u, onChange: e => { setU(e.target.value); setErr(""); }, style: { ...s.input, width: "100%", boxSizing: "border-box", marginBottom: 10 }, "aria-label": "Username" }),
      React.createElement("div", { style: { position: "relative", marginBottom: 16 } },
        React.createElement("input", { type: showPw ? "text" : "password", placeholder: "Password", value: p, onChange: e => { setP(e.target.value); setErr(""); }, onKeyDown: e => e.key === "Enter" && tryLogin(), style: { ...s.input, width: "100%", boxSizing: "border-box" }, "aria-label": "Password" }),
        React.createElement("button", { onClick: () => setShowPw(!showPw), style: { position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 12 }, "aria-label": "Toggle password" }, showPw ? "Hide" : "Show")
      ),
      React.createElement("button", { onClick: tryLogin, style: { ...s.btn, width: "100%", background: C.green, color: "#fff", padding: 12, fontSize: 16 } }, "Sign In")
    )
  );
};
const PaymentsTab = ({ user, homeowners, setHomeowners, year }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [addingPayment, setAddingPayment] = useState(null);
  const [pForm, setPForm] = useState({ date: "", amount: 15000, method: "Bank Transfer", notes: "" });
  const data = user.role === "admin" ? homeowners : homeowners.filter(h => h.unit === user.unit);
  const filtered = data.filter(h => {
    const yPay = h.payments[year] || [];
    const totalPaid = yPay.reduce((s, p) => s + p.amount, 0);
    const balance = ANNUAL_FEE - totalPaid;
    const matchSearch = !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.unit.toLowerCase().includes(search.toLowerCase());
    if (filter === "Outstanding") return matchSearch && balance > 0;
    if (filter === "Overdue") return matchSearch && balance > 12500;
    if (filter === "Current") return matchSearch && balance <= 0;
    return matchSearch;
  });
  const totalCollected = homeowners.reduce((s, h) => s + (h.payments[year] || []).reduce((a, p) => a + p.amount, 0), 0);
  const totalOutstanding = homeowners.reduce((s, h) => { const paid = (h.payments[year] || []).reduce((a, p) => a + p.amount, 0); return s + Math.max(0, ANNUAL_FEE - paid); }, 0);
  const overdueCount = homeowners.filter(h => { const paid = (h.payments[year] || []).reduce((a, p) => a + p.amount, 0); return (ANNUAL_FEE - paid) > 12500; }).length;
  const pendingVerify = homeowners.reduce((s, h) => s + (h.payments[year] || []).filter(p => !p.verified && p.amount > 0).length, 0);
  const addPayment = (unit) => {
    if (!pForm.date || !pForm.amount) return;
    const updated = homeowners.map(h => {
      if (h.unit === unit) {
        const newP = { id: "p" + Date.now(), date: pForm.date, amount: Number(pForm.amount), method: pForm.method, verified: false, receipt: null, notes: pForm.notes };
        const yPay = h.payments[year] || [];
        return { ...h, payments: { ...h.payments, [year]: [...yPay, newP] } };
      }
      return h;
    });
    setHomeowners(updated);
    setAddingPayment(null);
    setPForm({ date: "", amount: 15000, method: "Bank Transfer", notes: "" });
  };
  const verifyPayment = (unit, payId) => {
    const updated = homeowners.map(h => {
      if (h.unit === unit) {
        return { ...h, payments: { ...h.payments, [year]: (h.payments[year] || []).map(p => p.id === payId ? { ...p, verified: true } : p) } };
      }
      return h;
    });
    setHomeowners(updated);
  };
  const handleReceiptUpload = (unit, payId) => {
    const fname = "receipt_" + year + "_" + unit + "_" + Date.now() + ".pdf";
    const updated = homeowners.map(h => {
      if (h.unit === unit) {
        return { ...h, payments: { ...h.payments, [year]: (h.payments[year] || []).map(p => p.id === payId ? { ...p, receipt: fname } : p) } };
      }
      return h;
    });
    setHomeowners(updated);
  };
  return React.createElement("div", null,
    user.role === "admin" && React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 } },
      React.createElement("div", { style: s.statCard(C.green) },
        React.createElement("div", { style: { fontSize: 13, opacity: 0.8 } }, "Collected"),
        React.createElement("div", { style: { fontSize: 28, fontWeight: 700 } }, "J$" + totalCollected.toLocaleString())),
      React.createElement("div", { style: s.statCard(C.gold) },
        React.createElement("div", { style: { fontSize: 13, opacity: 0.8 } }, "Outstanding"),
        React.createElement("div", { style: { fontSize: 28, fontWeight: 700 } }, "J$" + totalOutstanding.toLocaleString())),
      React.createElement("div", { style: s.statCard("#d32f2f") },
        React.createElement("div", { style: { fontSize: 13, opacity: 0.8 } }, "Overdue (>$12.5K)"),
        React.createElement("div", { style: { fontSize: 28, fontWeight: 700 } }, overdueCount)),
      React.createElement("div", { style: s.statCard("#666") },
        React.createElement("div", { style: { fontSize: 13, opacity: 0.8 } }, "Pending Verification"),
        React.createElement("div", { style: { fontSize: 28, fontWeight: 700 } }, pendingVerify))),
    React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" } },
      React.createElement("input", { placeholder: "Search by name or unit...", value: search, onChange: e => setSearch(e.target.value), style: { ...s.input, flex: 1, minWidth: 200 } }),
      ["All", "Outstanding", "Overdue", "Current"].map(f =>
        React.createElement("button", { key: f, onClick: () => setFilter(f), style: { ...s.btn, background: filter === f ? C.green : "#e0e0e0", color: filter === f ? "#fff" : "#333" } }, f))),
    filtered.length === 0 ? React.createElement("p", { style: { textAlign: "center", color: "#888", padding: 40 } }, "No records found.") :
    filtered.map(h => {
      const yPay = h.payments[year] || [];
      const totalPaid = yPay.reduce((sum, p) => sum + p.amount, 0);
      const balance = ANNUAL_FEE - totalPaid;
      const borderColor = balance > 12500 ? "#d32f2f" : balance > 0 ? C.gold : C.green;
      return React.createElement("div", { key: h.unit, style: { ...s.card, marginBottom: 16, borderLeft: "4px solid " + borderColor } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 } },
          React.createElement("div", null,
            React.createElement("h3", { style: { margin: 0, color: C.green } }, h.name),
            React.createElement("div", { style: { fontSize: 13, color: "#666" } }, "Unit " + h.unit + " | " + (h.email || "") + " | " + (h.phone || ""))),
          React.createElement("div", { style: { textAlign: "right" } },
            React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: balance > 0 ? "#d32f2f" : C.green } }, "J$" + balance.toLocaleString()),
            React.createElement("div", { style: { fontSize: 12, color: "#888" } }, balance > 0 ? "Outstanding" : "Current"))),
        React.createElement("div", { style: { fontSize: 13, color: "#555", marginBottom: 8, padding: "6px 10px", background: "#f5f5f5", borderRadius: 6 } },
          "Paid: J$" + totalPaid.toLocaleString() + " of J$" + ANNUAL_FEE.toLocaleString() + " | Shortfall: J$" + Math.max(0, balance).toLocaleString()),
        React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 } },
          React.createElement("thead", null,
            React.createElement("tr", { style: { background: "#f9f9f9" } },
              React.createElement("th", { style: { padding: 6, textAlign: "left" } }, "Date"),
              React.createElement("th", { style: { padding: 6, textAlign: "right" } }, "Amount"),
              React.createElement("th", { style: { padding: 6, textAlign: "left" } }, "Method"),
              React.createElement("th", { style: { padding: 6, textAlign: "center" } }, "Receipt"),
              React.createElement("th", { style: { padding: 6, textAlign: "center" } }, "Status"),
              React.createElement("th", { style: { padding: 6, textAlign: "left" } }, "Notes"))),
          React.createElement("tbody", null,
            yPay.map(p =>
              React.createElement("tr", { key: p.id, style: { borderBottom: "1px solid #eee" } },
                React.createElement("td", { style: { padding: 6 } }, p.date),
                React.createElement("td", { style: { padding: 6, textAlign: "right", fontWeight: 600 } }, "J$" + p.amount.toLocaleString()),
                React.createElement("td", { style: { padding: 6 } }, p.method || "-"),
                React.createElement("td", { style: { padding: 6, textAlign: "center" } },
                  p.receipt ? React.createElement("span", { style: { color: C.green, fontSize: 12 } }, React.createElement(Paperclip, { size: 12 }), " " + p.receipt) :
                  (user.role === "member" || user.role === "admin") && p.amount > 0 ? React.createElement("button", { onClick: () => handleReceiptUpload(h.unit, p.id), style: { ...s.btn, fontSize: 11, padding: "2px 8px", background: "#e3f2fd", color: "#1565c0" } }, "Upload") : "-"),
                React.createElement("td", { style: { padding: 6, textAlign: "center" } },
                  p.verified ? React.createElement("span", { style: { color: C.green } }, React.createElement(Check, { size: 14 })) :
                  user.role === "admin" && p.amount > 0 ? React.createElement("button", { onClick: () => verifyPayment(h.unit, p.id), style: { ...s.btn, fontSize: 11, padding: "2px 8px", background: C.gold, color: C.black } }, "Verify") :
                  React.createElement("span", { style: { color: "#888" } }, React.createElement(Clock, { size: 14 }))),
                React.createElement("td", { style: { padding: 6, fontSize: 12, color: "#666" } }, p.notes || ""))))),
        (user.role === "admin") && addingPayment === h.unit ? React.createElement("div", { style: { marginTop: 12, padding: 12, background: "#fffde7", borderRadius: 6 } },
          React.createElement("h4", { style: { margin: "0 0 8px", color: C.green } }, "Record Payment for " + h.name),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
            React.createElement("input", { type: "date", value: pForm.date, onChange: e => setPForm({ ...pForm, date: e.target.value }), style: s.input }),
            React.createElement("input", { type: "number", placeholder: "Amount", value: pForm.amount, onChange: e => setPForm({ ...pForm, amount: e.target.value }), style: s.input }),
            React.createElement("select", { value: pForm.method, onChange: e => setPForm({ ...pForm, method: e.target.value }), style: s.input },
              ["Bank Transfer", "Cash", "Cheque", "Online"].map(m => React.createElement("option", { key: m, value: m }, m))),
            React.createElement("input", { placeholder: "Notes", value: pForm.notes, onChange: e => setPForm({ ...pForm, notes: e.target.value }), style: s.input })),
          React.createElement("div", { style: { marginTop: 8, display: "flex", gap: 8 } },
            React.createElement("button", { onClick: () => addPayment(h.unit), style: { ...s.btn, background: C.green, color: "#fff" } }, "Save Payment"),
            React.createElement("button", { onClick: () => setAddingPayment(null), style: { ...s.btn, background: "#e0e0e0" } }, "Cancel")))
        : user.role === "admin" && React.createElement("button", { onClick: () => setAddingPayment(h.unit), style: { ...s.btn, background: C.green, color: "#fff", marginTop: 10, fontSize: 12 } }, "+ Add Payment"));
    }));
};
const ViolationsTab = ({ user, homeowners, setHomeowners, year }) => {
  const [showForm, setShowForm] = useState(false);
  const [vForm, setVForm] = useState({ homeowner: "", type: "Noise", desc: "", fine: 5000, status: "Open" });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const VTYPES = ["Noise", "Parking", "Property Damage", "Unauthorized Construction", "Pet Policy", "Waste Disposal", "Landscaping", "Other"];
  const allViolations = homeowners.flatMap(h => (h.violations || []).map(v => ({ ...v, homeowner: h.name, unit: h.unit })));
  const myViolations = user.role === "admin" ? allViolations : allViolations.filter(v => v.unit === user.unit);
  const filtered = myViolations.filter(v => {
    const matchSearch = !search || v.homeowner.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase()) || (v.desc || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || v.status === filterStatus;
    return matchSearch && matchStatus;
  });
  const openCount = allViolations.filter(v => v.status === "Open").length;
  const resolvedCount = allViolations.filter(v => v.status === "Resolved").length;
  const totalFines = allViolations.reduce((s, v) => s + (v.fine || 0), 0);
  const addViolation = () => {
    if (!vForm.homeowner || !vForm.desc) return;
    const updated = homeowners.map(h => {
      if (h.name === vForm.homeowner) {
        const newV = { id: "v" + Date.now(), date: new Date().toISOString().split("T")[0], type: vForm.type, desc: vForm.desc, fine: Number(vForm.fine), status: vForm.status };
        return { ...h, violations: [...(h.violations || []), newV] };
      }
      return h;
    });
    setHomeowners(updated);
    setVForm({ homeowner: "", type: "Noise", desc: "", fine: 5000, status: "Open" });
    setShowForm(false);
  };
  const updateViolationStatus = (unit, violationId, newStatus) => {
    const updated = homeowners.map(h => {
      if (h.unit === unit) { return { ...h, violations: (h.violations || []).map(v => v.id === violationId ? { ...v, status: newStatus } : v) }; }
      return h;
    });
    setHomeowners(updated);
  };
  return React.createElement("div", null,
    user.role === "admin" && React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 } },
      React.createElement("div", { style: s.statCard(C.green) }, React.createElement("div", { style: { fontSize: 13, opacity: 0.8 } }, "Total Violations"), React.createElement("div", { style: { fontSize: 28, fontWeight: 700 } }, allViolations.length)),
      React.createElement("div", { style: s.statCard(C.gold) }, React.createElement("div", { style: { fontSize: 13, opacity: 0.8 } }, "Open"), React.createElement("div", { style: { fontSize: 28, fontWeight: 700 } }, openCount)),
      React.createElement("div", { style: s.statCard("#666") }, React.createElement("div", { style: { fontSize: 13, opacity: 0.8 } }, "Resolved"), React.createElement("div", { style: { fontSize: 28, fontWeight: 700 } }, resolvedCount)),
      React.createElement("div", { style: s.statCard(C.black) }, React.createElement("div", { style: { fontSize: 13, opacity: 0.8 } }, "Total Fines"), React.createElement("div", { style: { fontSize: 28, fontWeight: 700 } }, "J$" + totalFines.toLocaleString()))),
    React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" } },
      React.createElement("input", { placeholder: "Search violations...", value: search, onChange: e => setSearch(e.target.value), style: { ...s.input, flex: 1, minWidth: 200 } }),
      ["All", "Open", "Resolved"].map(st => React.createElement("button", { key: st, onClick: () => setFilterStatus(st), style: { ...s.btn, background: filterStatus === st ? C.green : "#e0e0e0", color: filterStatus === st ? "#fff" : "#333" } }, st)),
      user.role === "admin" && React.createElement("button", { onClick: () => setShowForm(!showForm), style: { ...s.btn, background: C.gold, color: C.black } }, showForm ? "Cancel" : "+ Add Violation")),
    showForm && user.role === "admin" && React.createElement("div", { style: { ...s.card, marginBottom: 20, background: "#fffde7" } },
      React.createElement("h3", { style: { margin: "0 0 12px", color: C.green } }, "Record New Violation"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
        React.createElement("select", { value: vForm.homeowner, onChange: e => setVForm({ ...vForm, homeowner: e.target.value }), style: s.input },
          React.createElement("option", { value: "" }, "Select Homeowner"), homeowners.map(h => React.createElement("option", { key: h.unit, value: h.name }, h.name + " (" + h.unit + ")"))),
        React.createElement("select", { value: vForm.type, onChange: e => setVForm({ ...vForm, type: e.target.value }), style: s.input }, VTYPES.map(t => React.createElement("option", { key: t, value: t }, t))),
        React.createElement("input", { placeholder: "Description", value: vForm.desc, onChange: e => setVForm({ ...vForm, desc: e.target.value }), style: { ...s.input, gridColumn: "1 / -1" } }),
        React.createElement("input", { type: "number", placeholder: "Fine (JMD)", value: vForm.fine, onChange: e => setVForm({ ...vForm, fine: e.target.value }), style: s.input }),
        React.createElement("select", { value: vForm.status, onChange: e => setVForm({ ...vForm, status: e.target.value }), style: s.input }, React.createElement("option", { value: "Open" }, "Open"), React.createElement("option", { value: "Resolved" }, "Resolved"))),
      React.createElement("button", { onClick: addViolation, style: { ...s.btn, background: C.green, color: "#fff", marginTop: 12 } }, "Add Violation")),
    filtered.length === 0 ? React.createElement("p", { style: { textAlign: "center", color: "#888", padding: 40 } }, "No violations found.") :
    filtered.map((v, i) => React.createElement("div", { key: v.id || i, style: { ...s.card, marginBottom: 12, borderLeft: "4px solid " + (v.status === "Open" ? C.gold : C.green) } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 } },
        React.createElement("div", null, React.createElement("strong", { style: { color: C.green } }, v.type), React.createElement("span", { style: { marginLeft: 12, fontSize: 13, color: "#666" } }, v.date)),
        React.createElement("span", { style: { padding: "2px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600, background: v.status === "Open" ? "#fff3e0" : "#e8f5e9", color: v.status === "Open" ? "#e65100" : "#2e7d32" } }, v.status)),
      React.createElement("p", { style: { margin: "8px 0 4px", fontSize: 14 } }, v.desc || "No description"),
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginTop: 8 } },
        React.createElement("span", { style: { fontSize: 13, color: "#666" } }, "Unit: " + v.unit + " | " + v.homeowner),
        React.createElement("span", { style: { fontWeight: 600 } }, "Fine: J$" + (v.fine || 0).toLocaleString()),
        user.role === "admin" && v.status === "Open" && React.createElement("button", { onClick: () => updateViolationStatus(v.unit, v.id, "Resolved"), style: { ...s.btn, background: C.green, color: "#fff", fontSize: 12, padding: "4px 12px" } }, "Mark Resolved")))));
};
const BookingsTab = ({ user, rooms, setRooms }) => {
  const [bForm, setBForm] = useState({ room: "", date: "", time: "", purpose: "" });
  const bookRoom = () => {
    if (!bForm.room || !bForm.date || !bForm.time || !bForm.purpose) return;
    const updated = rooms.map(r => { if (r.name === bForm.room) { return { ...r, bookings: [...r.bookings, { id: "b" + Date.now(), user: user.name, date: bForm.date, time: bForm.time, purpose: bForm.purpose, status: "Confirmed" }] }; } return r; });
    setRooms(updated); setBForm({ room: "", date: "", time: "", purpose: "" });
  };
  const cancelBooking = (roomName, bookingId) => {
    setRooms(rooms.map(r => r.name === roomName ? { ...r, bookings: r.bookings.filter(b => b.id !== bookingId) } : r));
  };
  return React.createElement("div", null,
    React.createElement("div", { style: { ...s.card, marginBottom: 20, background: "#fffde7" } },
      React.createElement("h3", { style: { margin: "0 0 12px", color: C.green } }, "Book a Room"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
        React.createElement("select", { value: bForm.room, onChange: e => setBForm({ ...bForm, room: e.target.value }), style: s.input }, React.createElement("option", { value: "" }, "Select Room"), rooms.map(r => React.createElement("option", { key: r.name, value: r.name }, r.name + " (Cap: " + r.capacity + ")"))),
        React.createElement("input", { type: "date", value: bForm.date, onChange: e => setBForm({ ...bForm, date: e.target.value }), style: s.input }),
        React.createElement("input", { type: "time", value: bForm.time, onChange: e => setBForm({ ...bForm, time: e.target.value }), style: s.input }),
        React.createElement("input", { placeholder: "Purpose", value: bForm.purpose, onChange: e => setBForm({ ...bForm, purpose: e.target.value }), style: s.input })),
      React.createElement("button", { onClick: bookRoom, style: { ...s.btn, background: C.green, color: "#fff", marginTop: 12 } }, "Book Room")),
    rooms.map(r => React.createElement("div", { key: r.name, style: { ...s.card, marginBottom: 16 } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 } },
        React.createElement("h3", { style: { margin: 0, color: C.green } }, r.name),
        React.createElement("span", { style: { fontSize: 13, color: "#666" } }, "Capacity: " + r.capacity)),
      r.bookings.length === 0 ? React.createElement("p", { style: { color: "#888", fontSize: 14 } }, "No bookings yet") :
      r.bookings.map(b => React.createElement("div", { key: b.id, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #eee", flexWrap: "wrap", gap: 8 } },
        React.createElement("div", null, React.createElement("strong", null, b.purpose), React.createElement("div", { style: { fontSize: 13, color: "#666" } }, b.date + " at " + b.time + " | " + b.user)),
        (user.role === "admin" || b.user === user.name) && React.createElement("button", { onClick: () => cancelBooking(r.name, b.id), style: { ...s.btn, background: "#ef5350", color: "#fff", fontSize: 12, padding: "4px 10px" } }, "Cancel"))))));
};
const NoticeBoard = ({ user, notices, setNotices }) => {
  const [showForm, setShowForm] = useState(false);
  const [nForm, setNForm] = useState({ title: "", body: "", priority: "Normal" });
  const addNotice = () => {
    if (!nForm.title || !nForm.body) return;
    setNotices([{ id: "n" + Date.now(), ...nForm, date: new Date().toISOString().split("T")[0], author: user.name }, ...notices]);
    setNForm({ title: "", body: "", priority: "Normal" }); setShowForm(false);
  };
  const removeNotice = (id) => setNotices(notices.filter(n => n.id !== id));
  const pColor = { Urgent: "#d32f2f", Important: C.gold, Normal: C.green };
  return React.createElement("div", null,
    user.role === "admin" && React.createElement("div", { style: { marginBottom: 16 } },
      React.createElement("button", { onClick: () => setShowForm(!showForm), style: { ...s.btn, background: C.gold, color: C.black } }, showForm ? "Cancel" : "+ Post Notice")),
    showForm && React.createElement("div", { style: { ...s.card, marginBottom: 20, background: "#fffde7" } },
      React.createElement("h3", { style: { margin: "0 0 12px", color: C.green } }, "New Notice"),
      React.createElement("input", { placeholder: "Title", value: nForm.title, onChange: e => setNForm({ ...nForm, title: e.target.value }), style: { ...s.input, marginBottom: 8, width: "100%", boxSizing: "border-box" } }),
      React.createElement("textarea", { placeholder: "Notice body...", value: nForm.body, onChange: e => setNForm({ ...nForm, body: e.target.value }), rows: 4, style: { ...s.input, width: "100%", boxSizing: "border-box", resize: "vertical", marginBottom: 8 } }),
      React.createElement("select", { value: nForm.priority, onChange: e => setNForm({ ...nForm, priority: e.target.value }), style: { ...s.input, marginBottom: 8 } },
        ["Normal", "Important", "Urgent"].map(p => React.createElement("option", { key: p, value: p }, p))),
      React.createElement("button", { onClick: addNotice, style: { ...s.btn, background: C.green, color: "#fff" } }, "Post Notice")),
    notices.map(n => React.createElement("div", { key: n.id, style: { ...s.card, marginBottom: 12, borderLeft: "4px solid " + (pColor[n.priority] || C.green) } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
        React.createElement("div", null,
          React.createElement("h3", { style: { margin: "0 0 4px", color: C.green } }, n.title),
          React.createElement("span", { style: { fontSize: 12, padding: "2px 8px", borderRadius: 10, background: (pColor[n.priority] || C.green) + "22", color: pColor[n.priority] || C.green, fontWeight: 600 } }, n.priority)),
        user.role === "admin" && React.createElement("button", { onClick: () => removeNotice(n.id), style: { ...s.btn, background: "#ef5350", color: "#fff", fontSize: 12, padding: "4px 10px" } }, "Remove")),
      React.createElement("p", { style: { margin: "10px 0 6px", fontSize: 14, lineHeight: 1.5 } }, n.body),
      React.createElement("div", { style: { fontSize: 12, color: "#888" } }, n.date + " | " + n.author))));
};
const RulesTab = ({ rules }) => {
  const [search, setSearch] = useState("");
  const filtered = rules.filter(r => !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.text.toLowerCase().includes(search.toLowerCase()));
  return React.createElement("div", null,
    React.createElement("input", { placeholder: "Search rules...", value: search, onChange: e => setSearch(e.target.value), style: { ...s.input, width: "100%", boxSizing: "border-box", marginBottom: 16 } }),
    filtered.map((r, i) => React.createElement("div", { key: i, style: { ...s.card, marginBottom: 12, borderLeft: "4px solid " + C.gold } },
      React.createElement("h3", { style: { margin: "0 0 6px", color: C.green } }, (i + 1) + ". " + r.title),
      React.createElement("p", { style: { margin: 0, fontSize: 14, lineHeight: 1.5, color: "#444" } }, r.text))));
};
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("payments");
  const [year, setYear] = useState(2026);
  const [homeowners, setHomeowners] = useState(INIT_HOMEOWNERS);
  const [rooms, setRooms] = useState(INIT_ROOMS);
  const [notices, setNotices] = useState(INIT_NOTICES);
  const [emailLog, setEmailLog] = useState([]);
  const [showEmailLog, setShowEmailLog] = useState(false);
  const TABS = user && user.role === "admin"
    ? [{ id: "payments", label: "Payments", icon: "DollarSign" }, { id: "violations", label: "Violations", icon: "AlertTriangle" }, { id: "bookings", label: "Bookings", icon: "Calendar" }, { id: "notices", label: "Notices", icon: "Bell" }, { id: "rules", label: "Rules", icon: "BookOpen" }]
    : [{ id: "payments", label: "My Account", icon: "DollarSign" }, { id: "violations", label: "My Violations", icon: "AlertTriangle" }, { id: "bookings", label: "Bookings", icon: "Calendar" }, { id: "notices", label: "Notices", icon: "Bell" }, { id: "rules", label: "Rules", icon: "BookOpen" }];
  const iconMap = { DollarSign, AlertTriangle, Calendar, Bell, BookOpen };
  useEffect(() => {
    if (!user || user.role !== "admin") return;
    const overdue = homeowners.filter(h => {
      const yData = h.payments[year];
      if (!yData) return false;
      const totalPaid = yData.reduce((s, p) => s + p.amount, 0);
      return (ANNUAL_FEE - totalPaid) > 12500;
    });
    if (overdue.length > 0) {
      setEmailLog(overdue.map(h => ({
        to: h.email, name: h.name, unit: h.unit,
        balance: ANNUAL_FEE - (h.payments[year] || []).reduce((s, p) => s + p.amount, 0),
        date: new Date().toISOString().split("T")[0], year: year
      })));
    } else { setEmailLog([]); }
  }, [user, year, homeowners]);
  if (!user) return React.createElement(LoginScreen, { onLogin: setUser });
  return React.createElement("div", { style: { minHeight: "100vh", background: "#f5f5f5" } },
    React.createElement("header", { style: { background: "linear-gradient(135deg, " + C.green + ", " + C.black + ")", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
        React.createElement("div", { style: { width: 40, height: 26, position: "relative", borderRadius: 3, overflow: "hidden", flexShrink: 0 } },
          React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: "33.3%", background: C.green } }),
          React.createElement("div", { style: { position: "absolute", top: "33.3%", left: 0, right: 0, height: "33.3%", background: C.gold } }),
          React.createElement("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: "33.3%", background: C.black } })),
        React.createElement("h1", { style: { margin: 0, color: C.gold, fontSize: 20 } }, "Jamaica HOA Manager")),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
        React.createElement("span", { style: { color: "#fff", fontSize: 14 } }, user.name + " (" + (user.role === "admin" ? "Admin" : "Member") + ")"),
        React.createElement("select", { value: year, onChange: e => setYear(Number(e.target.value)), style: { ...s.input, padding: "4px 8px", fontSize: 13 }, "aria-label": "Select year" },
          [2024, 2025, 2026].map(y => React.createElement("option", { key: y, value: y }, y))),
        user.role === "admin" && React.createElement("button", {
          onClick: () => setShowEmailLog(!showEmailLog),
          style: { ...s.btn, background: emailLog.length > 0 ? "#ef5350" : "#666", color: "#fff", fontSize: 12, padding: "4px 10px", position: "relative" }
        }, React.createElement(Mail, { size: 16 }),
          emailLog.length > 0 && React.createElement("span", { style: { position: "absolute", top: -6, right: -6, background: C.gold, color: C.black, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 } }, emailLog.length)),
        React.createElement("button", { onClick: () => setUser(null), style: { ...s.btn, background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 13 } }, "Logout"))),
    React.createElement("nav", { style: { display: "flex", background: "#fff", borderBottom: "2px solid " + C.gold, overflowX: "auto" } },
      TABS.map(t => {
        const Icon = iconMap[t.icon];
        return React.createElement("button", { key: t.id, onClick: () => setTab(t.id), style: { display: "flex", alignItems: "center", gap: 6, padding: "12px 20px", border: "none", cursor: "pointer", background: tab === t.id ? C.green : "transparent", color: tab === t.id ? "#fff" : "#333", fontWeight: tab === t.id ? 600 : 400, fontSize: 14, borderBottom: tab === t.id ? "3px solid " + C.gold : "3px solid transparent", whiteSpace: "nowrap" } },
          Icon && React.createElement(Icon, { size: 16 }), t.label);
      })),
    showEmailLog && emailLog.length > 0 && React.createElement("div", { style: { background: "#fff3e0", padding: 16, borderBottom: "1px solid " + C.gold } },
      React.createElement("h3", { style: { margin: "0 0 8px", color: "#e65100" } }, "Automated Email Alerts (Balance > J$12,500)"),
      emailLog.map((e, i) => React.createElement("div", { key: i, style: { padding: "6px 0", borderBottom: "1px solid #ffe0b2", fontSize: 13 } },
        React.createElement("strong", null, e.name), " (" + e.unit + ") - Balance: J$" + e.balance.toLocaleString() + " - Email: " + e.to))),
    React.createElement("main", { style: { maxWidth: 1100, margin: "0 auto", padding: 24 } },
      React.createElement("h2", { style: { margin: "0 0 20px", color: C.green, borderBottom: "2px solid " + C.gold, paddingBottom: 8 } },
        TABS.find(t => t.id === tab) ? TABS.find(t => t.id === tab).label + " - " + year : ""),
      tab === "payments" && React.createElement(PaymentsTab, { user: user, homeowners: homeowners, setHomeowners: setHomeowners, year: year }),
      tab === "violations" && React.createElement(ViolationsTab, { user: user, homeowners: homeowners, setHomeowners: setHomeowners, year: year }),
      tab === "bookings" && React.createElement(BookingsTab, { user: user, rooms: rooms, setRooms: setRooms }),
      tab === "notices" && React.createElement(NoticeBoard, { user: user, notices: notices, setNotices: setNotices }),
      tab === "rules" && React.createElement(RulesTab, { rules: RULES })),
    React.createElement("footer", { style: { background: C.black, color: "#fff", textAlign: "center", padding: 16, fontSize: 13 } },
      React.createElement("p", { style: { margin: 0 } }, "Jamaica HOA Manager | Built with React | Jamaican Community Management"),
      React.createElement("p", { style: { margin: "4px 0 0", color: C.gold, fontSize: 11 } }, "Out of Many, One People")));
}
