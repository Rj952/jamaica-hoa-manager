import React from "react";
import { DollarSign, AlertTriangle, Calendar, Bell, BookOpen, Shield, Mail, Check, X, Search, ChevronDown, Paperclip, FileText, Download, Clock, Users, UserPlus } from "lucide-react";

const C = { green: "#009B3A", gold: "#FED100", black: "#181818" };
const MONTHLY_FEE = 15000;

const DEFAULT_ADMINS = [
  { username: "admin1", password: "Admin1Pass!", name: "Marcus Green", email: "marcus@jamaicahoa.com", role: "admin" },
  { username: "admin2", password: "Admin2Pass!", name: "Patricia Shaw", email: "patricia@jamaicahoa.com", role: "admin" },
  { username: "admin3", password: "Admin3Pass!", name: "Richard Cole", email: "richard@jamaicahoa.com", role: "admin" }
];

const INIT_NOTICES = [
  { id: "n1", title: "Annual General Meeting", content: "The AGM will be held on April 15, 2026 at 6:00 PM in the Community Hall. All homeowners are encouraged to attend.", date: "2026-03-01", author: "Marcus Green", priority: "high" },
  { id: "n2", title: "Water Maintenance Schedule", content: "Water supply will be temporarily interrupted on March 18 from 8:00 AM to 12:00 PM for pipe maintenance.", date: "2026-03-10", author: "Patricia Shaw", priority: "medium" },
  { id: "n3", title: "Security Update", content: "New security cameras have been installed at all entry points. Please collect your updated access cards from the office.", date: "2026-02-20", author: "Richard Cole", priority: "low" },
  { id: "n4", title: "Registration Open", content: "All 500+ unit owners can now register their accounts. Please sign up with your lot number and house number.", date: "2026-03-15", author: "Marcus Green", priority: "high" }
];

const INIT_ROOMS = [
  { id: "r1", name: "Community Hall", capacity: 100, bookings: [] },
  { id: "r2", name: "Pool Area", capacity: 30, bookings: [] },
  { id: "r3", name: "BBQ Pavilion", capacity: 20, bookings: [] },
  { id: "r4", name: "Meeting Room", capacity: 15, bookings: [] }
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
  statCard: (border) => ({ background: "#fff", borderRadius: 12, padding: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderLeft: "4px solid " + border })
};

const SignUpScreen = ({ onSignUp, onBack, allUsers }) => {
  const [form, setForm] = React.useState({ lotNumber: "", houseNumber: "", ownerNames: "", email: "", phone: "", username: "", password: "", confirmPassword: "" });
  const [err, setErr] = React.useState("");

  const handle = () => {
    if (!form.lotNumber || !form.houseNumber || !form.ownerNames || !form.username || !form.password) {
      setErr("Please fill in all required fields"); return;
    }
    if (form.password !== form.confirmPassword) {
      setErr("Passwords do not match"); return;
    }
    if (form.password.length < 6) {
      setErr("Password must be at least 6 characters"); return;
    }
    if (allUsers.find(u => u.username === form.username)) {
      setErr("Username already taken"); return;
    }
    if (allUsers.find(u => u.lotNumber === form.lotNumber && u.houseNumber === form.houseNumber)) {
      setErr("This lot/house number is already registered"); return;
    }
    const newUser = {
      username: form.username, password: form.password, name: form.ownerNames,
      lotNumber: form.lotNumber, houseNumber: form.houseNumber,
      unit: "Lot " + form.lotNumber + " #" + form.houseNumber,
      email: form.email, phone: form.phone, role: "member",
      balance: 0, payments: { 2024: [], 2025: [], 2026: [] }, violations: []
    };
    onSignUp(newUser);
  };

  const f = (label, key, type, required) => React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.25rem" } },
    React.createElement("label", { style: { fontSize: "0.8rem", fontWeight: 600, color: "#444" } }, label + (required ? " *" : "")),
    React.createElement("input", { style: s.input, type: type || "text", placeholder: label, value: form[key],
      onChange: e => { setForm({ ...form, [key]: e.target.value }); setErr(""); },
      "aria-label": label, "aria-required": required })
  );

  return React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, " + C.green + " 0%, " + C.black + " 100%)", padding: "1rem" } },
    React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 500, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" } },
      React.createElement("div", { style: { textAlign: "center", marginBottom: "1.25rem" } },
        React.createElement(UserPlus, { size: 40, color: C.green }),
        React.createElement("h1", { style: { color: C.black, margin: "0.5rem 0 0.25rem", fontSize: "1.4rem" } }, "Register Your Unit"),
        React.createElement("p", { style: { color: "#666", margin: 0, fontSize: "0.85rem" } }, "Create your homeowner account")
      ),
      err && React.createElement("div", { style: { background: "#fee", color: "#c00", padding: "0.5rem", borderRadius: 8, marginBottom: "0.75rem", fontSize: "0.85rem", textAlign: "center" }, role: "alert" }, err),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" } },
        f("Lot Number", "lotNumber", "text", true),
        f("House Number", "houseNumber", "text", true),
        React.createElement("div", { style: { gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "0.25rem" } },
          React.createElement("label", { style: { fontSize: "0.8rem", fontWeight: 600, color: "#444" } }, "Owner Name(s) *"),
          React.createElement("input", { style: s.input, placeholder: "e.g. John & Jane Smith", value: form.ownerNames,
            onChange: e => { setForm({ ...form, ownerNames: e.target.value }); setErr(""); }, "aria-label": "Owner Names" })
        ),
        f("Email", "email", "email", false),
        f("Phone", "phone", "tel", false),
        f("Username", "username", "text", true),
        f("Password", "password", "password", true),
        React.createElement("div", { style: { gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "0.25rem" } },
          React.createElement("label", { style: { fontSize: "0.8rem", fontWeight: 600, color: "#444" } }, "Confirm Password *"),
          React.createElement("input", { style: s.input, type: "password", placeholder: "Confirm Password", value: form.confirmPassword,
            onChange: e => { setForm({ ...form, confirmPassword: e.target.value }); setErr(""); },
            onKeyDown: e => e.key === "Enter" && handle(), "aria-label": "Confirm Password" })
        )
      ),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" } },
        React.createElement("button", { onClick: handle, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.7rem", fontSize: "1rem", width: "100%" } }, "Create Account"),
        React.createElement("button", { onClick: onBack, style: { ...s.btn, background: "none", color: C.green, padding: "0.5rem", fontSize: "0.9rem", width: "100%", textDecoration: "underline" } }, "Already have an account? Sign In")
      )
    )
  );
};

const LoginScreen = ({ onLogin, onSignUp, allUsers }) => {
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
        React.createElement("button", { onClick: handle, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.75rem", fontSize: "1rem" } }, "Sign In"),
        React.createElement("div", { style: { textAlign: "center", borderTop: "1px solid #eee", paddingTop: "1rem" } },
          React.createElement("p", { style: { color: "#666", fontSize: "0.85rem", margin: "0 0 0.5rem" } }, "New homeowner?"),
          React.createElement("button", { onClick: onSignUp, style: { ...s.btn, background: C.gold, color: C.black, padding: "0.6rem 1.5rem", fontSize: "0.9rem" } },
            React.createElement(UserPlus, { size: 16, style: { marginRight: 6, verticalAlign: "middle" } }), "Register Your Unit")
        )
      )
    )
  );
};

const PaymentsTab = ({ user, allUsers, setAllUsers }) => {
  const isAdmin = user.role === "admin";
  const [year, setYear] = React.useState(2026);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [showAdd, setShowAdd] = React.useState(false);
  const [addForm, setAddForm] = React.useState({ unit: "", month: "", amount: MONTHLY_FEE, method: "Bank Transfer" });

  const members = allUsers.filter(u => u.role === "member");
  const displayMembers = isAdmin ? members : members.filter(m => m.username === user.username);
  const filtered = displayMembers.filter(h => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !(h.unit||"").toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "overdue") return (h.balance||0) > 12500;
    if (filter === "clear") return (h.balance||0) === 0;
    if (filter === "pending") return ((h.payments||{})[year] || []).some(p => !p.verified);
    return true;
  });

  const totalCollected = members.reduce((s, h) => s + ((h.payments||{})[year] || []).filter(p => p.verified).reduce((a, p) => a + p.amount, 0), 0);
  const totalOutstanding = members.reduce((s, h) => s + (h.balance || 0), 0);
  const overdue = members.filter(h => (h.balance||0) > 12500).length;
  const pendingV = members.reduce((s, h) => s + ((h.payments||{})[year] || []).filter(p => !p.verified).length, 0);

  const handleReceipt = (username, payIdx) => {
    const fn = "receipt_" + Date.now() + ".pdf";
    setAllUsers(prev => prev.map(u => u.username === username ? { ...u, payments: { ...u.payments, [year]: (u.payments[year]||[]).map((p, i) => i === payIdx ? { ...p, receipt: fn } : p) } } : u));
  };

  const handleVerify = (username, payIdx) => {
    setAllUsers(prev => prev.map(u => u.username === username ? { ...u, payments: { ...u.payments, [year]: (u.payments[year]||[]).map((p, i) => i === payIdx ? { ...p, verified: true } : p) } } : u));
  };

  const handleAdd = () => {
    if (!addForm.unit || !addForm.month) return;
    const mo = parseInt(addForm.month);
    const newPay = { month: mo, year, amount: parseInt(addForm.amount), date: year + "-" + String(mo).padStart(2,"0") + "-" + String(new Date().getDate()).padStart(2,"0"), method: addForm.method, receipt: null, verified: false };
    setAllUsers(prev => prev.map(u => u.username === addForm.unit ? { ...u, balance: Math.max(0, (u.balance||0) - newPay.amount), payments: { ...u.payments, [year]: [...((u.payments||{})[year] || []), newPay] } } : u));
    setAddForm({ unit: "", month: "", amount: MONTHLY_FEE, method: "Bank Transfer" });
    setShowAdd(false);
  };

  const mths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" } },
      React.createElement("h2", { style: { margin: 0, color: C.black } }, isAdmin ? "Payment Management" : "My Payments"),
      React.createElement("div", { style: { display: "flex", gap: "0.5rem" } },
        [2024, 2025, 2026].map(y => React.createElement("button", { key: y, onClick: () => setYear(y), style: { ...s.btn, padding: "0.4rem 0.8rem", background: year === y ? C.green : "#e0e0e0", color: year === y ? "#fff" : "#333", fontSize: "0.85rem" } }, y))
      )
    ),
    isAdmin && React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard(C.green) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Collected (" + year + ")"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, "J$" + totalCollected.toLocaleString())),
      React.createElement("div", { style: s.statCard(C.gold) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Outstanding"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, "J$" + totalOutstanding.toLocaleString())),
      React.createElement("div", { style: s.statCard("#dc3545") }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Overdue (>J$12,500)"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#dc3545" } }, overdue + " units")),
      React.createElement("div", { style: s.statCard("#6f42c1") }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Pending Verification"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#6f42c1" } }, pendingV))
    ),
    !isAdmin && React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard(C.green) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Paid (" + year + ")"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, "J$" + (displayMembers[0] ? ((displayMembers[0].payments||{})[year] || []).filter(p => p.verified).reduce((a,p) => a+p.amount, 0) : 0).toLocaleString())),
      React.createElement("div", { style: s.statCard(displayMembers[0] && (displayMembers[0].balance||0) > 0 ? "#dc3545" : C.green) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "My Balance"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: displayMembers[0] && (displayMembers[0].balance||0) > 0 ? "#dc3545" : C.green } }, "J$" + (displayMembers[0] ? (displayMembers[0].balance||0).toLocaleString() : "0"))),
      React.createElement("div", { style: s.statCard("#6f42c1") }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Pending Verification"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#6f42c1" } }, displayMembers[0] ? ((displayMembers[0].payments||{})[year]||[]).filter(p=>!p.verified).length : 0))
    ),
    isAdmin && React.createElement("div", { style: { display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" } },
      React.createElement("div", { style: { position: "relative", flex: 1, minWidth: 200 } },
        React.createElement(Search, { size: 16, style: { position: "absolute", left: 10, top: 11, color: "#999" } }),
        React.createElement("input", { style: { ...s.input, paddingLeft: "2rem" }, placeholder: "Search by name or lot...", value: search, onChange: e => setSearch(e.target.value) })
      ),
      ["all","overdue","pending","clear"].map(f => React.createElement("button", { key: f, onClick: () => setFilter(f), style: { ...s.btn, padding: "0.4rem 0.8rem", background: filter === f ? C.green : "#e0e0e0", color: filter === f ? "#fff" : "#333", fontSize: "0.8rem", textTransform: "capitalize" } }, f)),
      React.createElement("button", { onClick: () => setShowAdd(!showAdd), style: { ...s.btn, background: C.gold, color: C.black, padding: "0.4rem 1rem", fontSize: "0.85rem" } }, "+ Add Payment")
    ),
    showAdd && isAdmin && React.createElement("div", { style: { ...s.card, marginBottom: "1rem", border: "2px solid " + C.gold } },
      React.createElement("h3", { style: { margin: "0 0 0.75rem", fontSize: "1rem" } }, "Record Payment"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" } },
        React.createElement("select", { style: s.input, value: addForm.unit, onChange: e => setAddForm({ ...addForm, unit: e.target.value }) },
          React.createElement("option", { value: "" }, "Select Homeowner"),
          members.map(h => React.createElement("option", { key: h.username, value: h.username }, (h.unit||"") + " - " + h.name))
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
    filtered.length === 0 && React.createElement("div", { style: { ...s.card, textAlign: "center", color: "#999", padding: "2rem" } }, isAdmin ? "No homeowners found." : "No payment data yet."),
    filtered.map(h => React.createElement("div", { key: h.username, style: { ...s.card, marginBottom: "1rem", borderLeft: "4px solid " + ((h.balance||0) > 12500 ? "#dc3545" : (h.balance||0) > 0 ? C.gold : C.green) } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" } },
        React.createElement("div", null,
          React.createElement("strong", { style: { fontSize: "1.05rem" } }, h.name + " - " + (h.unit||"")),
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, (h.lotNumber ? "Lot: " + h.lotNumber + " | House: " + h.houseNumber + " | " : "") + (h.email||"") + (h.phone ? " | " + h.phone : ""))
        ),
        React.createElement("div", { style: { textAlign: "right" } },
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Balance"),
          React.createElement("div", { style: { fontSize: "1.1rem", fontWeight: 700, color: (h.balance||0) > 0 ? "#dc3545" : C.green } }, "J$" + (h.balance||0).toLocaleString()),
          (h.balance||0) > 12500 && React.createElement("span", { style: s.badge("#dc3545") }, "OVERDUE")
        )
      ),
      React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" } },
        React.createElement("thead", null,
          React.createElement("tr", { style: { borderBottom: "2px solid #eee" } },
            ["Month","Amount","Date","Method","Receipt","Status", isAdmin ? "Action" : null].filter(Boolean).map(col =>
              React.createElement("th", { key: col, style: { textAlign: "left", padding: "0.5rem", color: "#666", fontWeight: 600 } }, col))
          )
        ),
        React.createElement("tbody", null,
          ((h.payments||{})[year] || []).map((p, i) =>
            React.createElement("tr", { key: i, style: { borderBottom: "1px solid #f0f0f0" } },
              React.createElement("td", { style: { padding: "0.5rem" } }, mths[p.month - 1]),
              React.createElement("td", { style: { padding: "0.5rem" } }, "J$" + p.amount.toLocaleString()),
              React.createElement("td", { style: { padding: "0.5rem" } }, p.date),
              React.createElement("td", { style: { padding: "0.5rem" } }, p.method),
              React.createElement("td", { style: { padding: "0.5rem" } },
                p.receipt ? React.createElement("span", { style: { color: C.green, display: "flex", alignItems: "center", gap: 4 } }, React.createElement(FileText, { size: 14 }), "Uploaded")
                : !isAdmin ? React.createElement("button", { onClick: () => handleReceipt(h.username, i), style: { ...s.btn, background: "#e8f5e9", color: C.green, padding: "0.25rem 0.5rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 4 } }, React.createElement(Paperclip, { size: 14 }), "Upload Receipt")
                : React.createElement("span", { style: { color: "#999" } }, "None")
              ),
              React.createElement("td", { style: { padding: "0.5rem" } },
                p.verified ? React.createElement("span", { style: s.badge(C.green) }, "Verified") : React.createElement("span", { style: s.badge("#6f42c1") }, "Pending")
              ),
              isAdmin && React.createElement("td", { style: { padding: "0.5rem" } },
                !p.verified && React.createElement("button", { onClick: () => handleVerify(h.username, i), style: { ...s.btn, background: C.green, color: "#fff", padding: "0.25rem 0.6rem", fontSize: "0.8rem" } }, React.createElement(Check, { size: 14 }), " Verify")
              )
            )
          ),
          ((h.payments||{})[year] || []).length === 0 && React.createElement("tr", null, React.createElement("td", { colSpan: 7, style: { padding: "1rem", textAlign: "center", color: "#999" } }, "No payments recorded for " + year))
        )
      )
    ))
  );
};

const ViolationsTab = ({ user, allUsers, setAllUsers }) => {
  const isAdmin = user.role === "admin";
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [showAdd, setShowAdd] = React.useState(false);
  const [addForm, setAddForm] = React.useState({ username: "", type: "Noise", description: "", fine: 5000 });

  const members = allUsers.filter(u => u.role === "member");
  const displayMembers = isAdmin ? members : members.filter(m => m.username === user.username);

  const allViolations = displayMembers.flatMap(h => ((h.violations||[]).map(v => ({ ...v, username: h.username, unit: h.unit, ownerName: h.name }))));
  const filteredV = allViolations.filter(v => {
    if (search && !v.ownerName.toLowerCase().includes(search.toLowerCase()) && !(v.unit||"").toLowerCase().includes(search.toLowerCase()) && !v.type.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "open") return v.status === "open";
    if (filter === "resolved") return v.status === "resolved";
    return true;
  });

  const totalFines = allViolations.filter(v => v.status === "open").reduce((s, v) => s + v.fine, 0);

  const handleAdd = () => {
    if (!addForm.username || !addForm.description) return;
    const newV = { id: "v" + Date.now(), type: addForm.type, description: addForm.description, date: new Date().toISOString().split("T")[0], fine: parseInt(addForm.fine), status: "open" };
    setAllUsers(prev => prev.map(u => u.username === addForm.username ? { ...u, violations: [...(u.violations || []), newV] } : u));
    setAddForm({ username: "", type: "Noise", description: "", fine: 5000 });
    setShowAdd(false);
  };

  const handleResolve = (username, vId) => {
    setAllUsers(prev => prev.map(u => u.username === username ? { ...u, violations: (u.violations||[]).map(v => v.id === vId ? { ...v, status: "resolved" } : v) } : u));
  };

  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" } },
      React.createElement("h2", { style: { margin: 0, color: C.black } }, isAdmin ? "Violation Management" : "My Violations"),
      isAdmin && React.createElement("button", { onClick: () => setShowAdd(!showAdd), style: { ...s.btn, background: C.gold, color: C.black, padding: "0.5rem 1rem", fontSize: "0.85rem" } }, "+ Add Violation")
    ),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard("#dc3545") }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Open"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#dc3545" } }, allViolations.filter(v=>v.status==="open").length)),
      React.createElement("div", { style: s.statCard(C.green) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Resolved"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, allViolations.filter(v=>v.status==="resolved").length)),
      React.createElement("div", { style: s.statCard(C.gold) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Outstanding Fines"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, "J$" + totalFines.toLocaleString()))
    ),
    React.createElement("div", { style: { display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" } },
      isAdmin && React.createElement("div", { style: { position: "relative", flex: 1, minWidth: 200 } },
        React.createElement(Search, { size: 16, style: { position: "absolute", left: 10, top: 11, color: "#999" } }),
        React.createElement("input", { style: { ...s.input, paddingLeft: "2rem" }, placeholder: "Search...", value: search, onChange: e => setSearch(e.target.value) })
      ),
      ["all","open","resolved"].map(f => React.createElement("button", { key: f, onClick: () => setFilter(f), style: { ...s.btn, padding: "0.4rem 0.8rem", background: filter === f ? C.green : "#e0e0e0", color: filter === f ? "#fff" : "#333", fontSize: "0.8rem", textTransform: "capitalize" } }, f))
    ),
    showAdd && isAdmin && React.createElement("div", { style: { ...s.card, marginBottom: "1rem", border: "2px solid " + C.gold } },
      React.createElement("h3", { style: { margin: "0 0 0.75rem", fontSize: "1rem" } }, "Add Violation"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" } },
        React.createElement("select", { style: s.input, value: addForm.username, onChange: e => setAddForm({ ...addForm, username: e.target.value }) },
          React.createElement("option", { value: "" }, "Select Homeowner"),
          members.map(h => React.createElement("option", { key: h.username, value: h.username }, (h.unit||"") + " - " + h.name))
        ),
        React.createElement("select", { style: s.input, value: addForm.type, onChange: e => setAddForm({ ...addForm, type: e.target.value }) },
          ["Noise","Parking","Property","Maintenance","Pets","Other"].map(t => React.createElement("option", { key: t, value: t }, t))
        ),
        React.createElement("input", { style: s.input, placeholder: "Description", value: addForm.description, onChange: e => setAddForm({ ...addForm, description: e.target.value }) }),
        React.createElement("input", { style: s.input, type: "number", placeholder: "Fine (JMD)", value: addForm.fine, onChange: e => setAddForm({ ...addForm, fine: e.target.value }) }),
        React.createElement("button", { onClick: handleAdd, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.6rem" } }, "Save")
      )
    ),
    filteredV.length === 0 && React.createElement("div", { style: { ...s.card, textAlign: "center", color: "#999", padding: "2rem" } }, isAdmin ? "No violations found." : "No violations on your record!"),
    filteredV.map(v => React.createElement("div", { key: v.id, style: { ...s.card, marginBottom: "0.75rem", borderLeft: "4px solid " + (v.status === "open" ? "#dc3545" : C.green) } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" } },
        React.createElement("div", null,
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" } },
            React.createElement("strong", null, v.type),
            React.createElement("span", { style: s.badge(v.status === "open" ? "#dc3545" : C.green) }, v.status.toUpperCase()),
            isAdmin && React.createElement("span", { style: { fontSize: "0.8rem", color: "#666" } }, (v.unit||"") + " - " + v.ownerName)
          ),
          React.createElement("p", { style: { margin: "0.25rem 0", color: "#555", fontSize: "0.9rem" } }, v.description),
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#999" } }, "Date: " + v.date + " | Fine: J$" + v.fine.toLocaleString())
        ),
        v.status === "open" && isAdmin && React.createElement("button", { onClick: () => handleResolve(v.username, v.id), style: { ...s.btn, background: C.green, color: "#fff", padding: "0.4rem 0.8rem", fontSize: "0.85rem" } }, React.createElement(Check, { size: 14 }), " Resolve")
      )
    ))
  );
};

const BookingsTab = ({ user, rooms, setRooms }) => {
  const isAdmin = user.role === "admin";
  const [showBook, setShowBook] = React.useState(false);
  const [bookForm, setBookForm] = React.useState({ room: "", date: "", time: "", purpose: "" });

  const handleBook = () => {
    if (!bookForm.room || !bookForm.date || !bookForm.time || !bookForm.purpose) return;
    const newB = { id: "bk" + Date.now(), resident: user.name, unit: user.unit || "Admin", date: bookForm.date, time: bookForm.time, purpose: bookForm.purpose, status: "pending" };
    setRooms(prev => prev.map(r => r.id === bookForm.room ? { ...r, bookings: [...r.bookings, newB] } : r));
    setBookForm({ room: "", date: "", time: "", purpose: "" });
    setShowBook(false);
  };
  const handleConfirm = (rId, bId) => setRooms(prev => prev.map(r => r.id === rId ? { ...r, bookings: r.bookings.map(b => b.id === bId ? { ...b, status: "confirmed" } : b) } : r));
  const handleReject = (rId, bId) => setRooms(prev => prev.map(r => r.id === rId ? { ...r, bookings: r.bookings.map(b => b.id === bId ? { ...b, status: "rejected" } : b) } : r));
  const handleCancel = (rId, bId) => setRooms(prev => prev.map(r => r.id === rId ? { ...r, bookings: r.bookings.filter(b => b.id !== bId) } : r));

  const pendingCount = rooms.reduce((s, r) => s + r.bookings.filter(b => b.status === "pending").length, 0);
  const myBookings = !isAdmin ? rooms.flatMap(r => r.bookings.filter(b => b.unit === user.unit).map(b => ({ ...b, roomName: r.name, roomId: r.id }))) : [];

  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" } },
      React.createElement("h2", { style: { margin: 0, color: C.black } }, isAdmin ? "Booking Management" : "My Bookings"),
      React.createElement("button", { onClick: () => setShowBook(!showBook), style: { ...s.btn, background: C.gold, color: C.black, padding: "0.5rem 1rem", fontSize: "0.85rem" } }, "+ Request Booking")
    ),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard(C.green) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Available Rooms"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, rooms.length)),
      isAdmin ? React.createElement("div", { style: s.statCard(C.gold) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Pending Requests"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, pendingCount))
      : React.createElement("div", { style: s.statCard(C.gold) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "My Bookings"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, myBookings.length))
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
      myBookings.length === 0 && React.createElement("div", { style: { ...s.card, textAlign: "center", color: "#999", padding: "2rem" } }, "No bookings yet. Click '+ Request Booking' to reserve a space."),
      myBookings.map(b => React.createElement("div", { key: b.id, style: { ...s.card, marginBottom: "0.75rem", borderLeft: "4px solid " + (b.status === "confirmed" ? C.green : b.status === "pending" ? C.gold : "#dc3545") } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" } },
          React.createElement("div", null, React.createElement("strong", null, b.roomName), React.createElement("div", { style: { fontSize: "0.85rem", color: "#555" } }, b.date + " | " + b.time), React.createElement("div", { style: { fontSize: "0.85rem", color: "#666" } }, "Purpose: " + b.purpose)),
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
            React.createElement("span", { style: s.badge(b.status === "confirmed" ? C.green : b.status === "pending" ? "#b8860b" : "#dc3545") }, b.status.toUpperCase()),
            b.status === "pending" && React.createElement("button", { onClick: () => handleCancel(b.roomId, b.id), style: { ...s.btn, background: "#fee", color: "#dc3545", padding: "0.3rem 0.6rem", fontSize: "0.8rem" } }, "Cancel")
          )
        )
      ))
    ),
    isAdmin && rooms.map(r => React.createElement("div", { key: r.id, style: { ...s.card, marginBottom: "1rem" } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" } },
        React.createElement("div", null, React.createElement("strong", { style: { fontSize: "1.05rem" } }, r.name), React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Capacity: " + r.capacity))
      ),
      r.bookings.length === 0 && React.createElement("p", { style: { color: "#999", fontSize: "0.85rem" } }, "No bookings."),
      r.bookings.map(b => React.createElement("div", { key: b.id, style: { padding: "0.6rem", borderRadius: 8, marginBottom: "0.5rem", background: b.status === "pending" ? "#fff8e1" : b.status === "confirmed" ? "#e8f5e9" : "#ffebee", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" } },
        React.createElement("div", null, React.createElement("div", { style: { fontWeight: 600, fontSize: "0.9rem" } }, b.resident + " (" + b.unit + ")"), React.createElement("div", { style: { fontSize: "0.8rem", color: "#555" } }, b.date + " | " + b.time + " | " + b.purpose)),
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
    setForm({ title: "", content: "", priority: "medium" }); setShowAdd(false);
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
        React.createElement("textarea", { style: { ...s.input, minHeight: 80, resize: "vertical" }, placeholder: "Content", value: form.content, onChange: e => setForm({ ...form, content: e.target.value }) }),
        React.createElement("select", { style: s.input, value: form.priority, onChange: e => setForm({ ...form, priority: e.target.value }) },
          ["high","medium","low"].map(p => React.createElement("option", { key: p, value: p }, p.charAt(0).toUpperCase()+p.slice(1)+" Priority"))
        ),
        React.createElement("button", { onClick: handleAdd, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.6rem" } }, "Post Notice")
      )
    ),
    notices.map(n => React.createElement("div", { key: n.id, style: { ...s.card, marginBottom: "0.75rem", borderLeft: "4px solid " + (priColor[n.priority]||C.green) } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" } },
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" } }, React.createElement("strong", null, n.title), React.createElement("span", { style: s.badge(priColor[n.priority]||C.green) }, n.priority.toUpperCase())),
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
  const [form, setForm] = React.useState({ username: "", password: "", name: "", role: "member", lotNumber: "", houseNumber: "", email: "", phone: "" });

  const filtered = allUsers.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || (u.unit||"").toLowerCase().includes(q) || (u.lotNumber||"").toLowerCase().includes(q);
  });

  const admins = allUsers.filter(u => u.role === "admin");
  const members = allUsers.filter(u => u.role === "member");

  const toggleRole = (username) => setAllUsers(prev => prev.map(u => u.username === username ? { ...u, role: u.role === "admin" ? "member" : "admin" } : u));
  const removeUser = (username) => { if (username === user.username) return; setAllUsers(prev => prev.filter(u => u.username !== username)); };

  const addUser = () => {
    if (!form.username || !form.password || !form.name) return;
    if (allUsers.find(u => u.username === form.username)) return;
    const unit = form.lotNumber ? "Lot " + form.lotNumber + " #" + form.houseNumber : "";
    setAllUsers(prev => [...prev, { ...form, unit, balance: 0, payments: { 2024: [], 2025: [], 2026: [] }, violations: [] }]);
    setForm({ username: "", password: "", name: "", role: "member", lotNumber: "", houseNumber: "", email: "", phone: "" });
    setShowAdd(false);
  };

  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" } },
      React.createElement("h2", { style: { margin: 0, color: C.black } }, "User Management (" + allUsers.length + " users)"),
      React.createElement("button", { onClick: () => setShowAdd(!showAdd), style: { ...s.btn, background: C.gold, color: C.black, padding: "0.5rem 1rem", fontSize: "0.85rem" } }, "+ Add User")
    ),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" } },
      React.createElement("div", { style: s.statCard(C.green) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Total Users"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.green } }, allUsers.length)),
      React.createElement("div", { style: s.statCard(C.gold) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Admins"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: "#b8860b" } }, admins.length)),
      React.createElement("div", { style: s.statCard(C.black) }, React.createElement("div", { style: { fontSize: "0.8rem", color: "#666" } }, "Registered Homeowners"), React.createElement("div", { style: { fontSize: "1.4rem", fontWeight: 700, color: C.black } }, members.length))
    ),
    React.createElement("div", { style: { position: "relative", marginBottom: "1rem", maxWidth: 400 } },
      React.createElement(Search, { size: 16, style: { position: "absolute", left: 10, top: 11, color: "#999" } }),
      React.createElement("input", { style: { ...s.input, paddingLeft: "2rem" }, placeholder: "Search users by name, lot, unit...", value: search, onChange: e => setSearch(e.target.value) })
    ),
    showAdd && React.createElement("div", { style: { ...s.card, marginBottom: "1rem", border: "2px solid " + C.gold } },
      React.createElement("h3", { style: { margin: "0 0 0.75rem", fontSize: "1rem" } }, "Add New User"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" } },
        React.createElement("input", { style: s.input, placeholder: "Username *", value: form.username, onChange: e => setForm({ ...form, username: e.target.value }) }),
        React.createElement("input", { style: s.input, placeholder: "Password *", value: form.password, onChange: e => setForm({ ...form, password: e.target.value }) }),
        React.createElement("input", { style: s.input, placeholder: "Full Name *", value: form.name, onChange: e => setForm({ ...form, name: e.target.value }) }),
        React.createElement("select", { style: s.input, value: form.role, onChange: e => setForm({ ...form, role: e.target.value }) },
          React.createElement("option", { value: "member" }, "Member"), React.createElement("option", { value: "admin" }, "Admin")
        ),
        React.createElement("input", { style: s.input, placeholder: "Lot Number", value: form.lotNumber, onChange: e => setForm({ ...form, lotNumber: e.target.value }) }),
        React.createElement("input", { style: s.input, placeholder: "House Number", value: form.houseNumber, onChange: e => setForm({ ...form, houseNumber: e.target.value }) }),
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
          React.createElement("div", { style: { fontSize: "0.8rem", color: "#666", marginTop: 2 } }, "@" + u.username + (u.lotNumber ? " | Lot " + u.lotNumber + " #" + u.houseNumber : "") + (u.unit ? " | " + u.unit : "") + (u.email ? " | " + u.email : ""))
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
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [rooms, setRooms] = React.useState(INIT_ROOMS);
  const [notices, setNotices] = React.useState(INIT_NOTICES);
  const [allUsers, setAllUsers] = React.useState([...DEFAULT_ADMINS]);

  const handleSignUp = (newUser) => {
    setAllUsers(prev => [...prev, newUser]);
    setUser(newUser);
    setShowSignUp(false);
  };

  if (!user && showSignUp) return React.createElement(SignUpScreen, { onSignUp: handleSignUp, onBack: () => setShowSignUp(false), allUsers });
  if (!user) return React.createElement(LoginScreen, { onLogin: setUser, onSignUp: () => setShowSignUp(true), allUsers });

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
        React.createElement("span", { style: { fontSize: "0.85rem", color: "#ccc" } }, user.name + (isAdmin ? " (Admin)" : " - " + (user.unit||""))),
        React.createElement("button", { onClick: () => { setUser(null); setTab("payments"); setShowSignUp(false); }, style: { ...s.btn, background: C.green, color: "#fff", padding: "0.35rem 1rem", fontSize: "0.85rem" } }, "Logout")
      )
    ),
    React.createElement("nav", { style: { background: "#fff", borderBottom: "2px solid " + C.gold, display: "flex", overflowX: "auto", padding: "0 1rem" }, role: "tablist" },
      TABS.map(t => {
        const Icon = iconMap[t.icon];
        return React.createElement("button", { key: t.id, role: "tab", "aria-selected": tab === t.id, onClick: () => setTab(t.id),
          style: { display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.75rem 1.2rem", background: "none", border: "none",
            borderBottom: tab === t.id ? "3px solid " + C.green : "3px solid transparent",
            color: tab === t.id ? C.green : "#666", fontWeight: tab === t.id ? 700 : 400,
            cursor: "pointer", whiteSpace: "nowrap", fontSize: "0.9rem", transition: "all 0.2s" }
        }, Icon ? React.createElement(Icon, { size: 18 }) : null, t.label);
      })
    ),
    React.createElement("main", { style: { maxWidth: 1200, margin: "0 auto", padding: "1.5rem 1rem" } },
      tab === "payments" && React.createElement(PaymentsTab, { user, allUsers, setAllUsers }),
      tab === "violations" && React.createElement(ViolationsTab, { user, allUsers, setAllUsers }),
      tab === "bookings" && React.createElement(BookingsTab, { user, rooms, setRooms }),
      tab === "notices" && React.createElement(NoticeBoard, { user, notices, setNotices }),
      tab === "rules" && React.createElement(RulesTab, null),
      tab === "users" && isAdmin && React.createElement(UsersTab, { user, allUsers, setAllUsers })
    ),
    React.createElement("footer", { style: { textAlign: "center", padding: "1.5rem", color: "#999", fontSize: "0.8rem", borderTop: "1px solid #e0e0e0", marginTop: "2rem" } },
      "\u00A9 2024-2026 Jamaica HOA Manager. Built with ", React.createElement("span", { style: { color: C.green } }, "pride"), " for Jamaican communities.")
  );
};

export default App;
