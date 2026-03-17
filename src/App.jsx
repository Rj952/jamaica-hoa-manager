import { useState, useMemo, useEffect } from 'react';
import { Shield, DollarSign, AlertTriangle, Calendar, Bell, BookOpen, LogOut, Search, Check, X, Upload, Mail, Eye, EyeOff, ChevronDown, Plus, Trash2, Edit3, MessageSquare } from 'lucide-react';

const C = {
  green: '#1B5E20', greenLight: '#2E7D32', greenLighter: '#4CAF50',
  gold: '#F9A825', goldLight: '#FDD835', goldDark: '#F57F17',
  black: '#212121', gray: '#757575', grayLight: '#BDBDBD', grayLighter: '#F5F5F5',
  white: '#FFFFFF', red: '#D32F2F', amber: '#FF8F00', blue: '#1565C0'
};

const ADMINS = [
  { username: 'admin1', password: 'HOAJamaica2026!', name: 'Patricia Brown', email: 'patricia@jamaicahoa.com', role: 'admin' },
  { username: 'admin2', password: 'StrataAdmin2026!', name: 'Michael Thompson', email: 'michael@jamaicahoa.com', role: 'admin' },
  { username: 'admin3', password: 'HOAManager2026!', name: 'Sandra Williams', email: 'sandra@jamaicahoa.com', role: 'admin' }
];

const MEMBERS = [
  { username: 'john.b', password: 'Member2026!', name: 'John Brown', unit: 'Unit 1A', email: 'john.b@email.com' },
  { username: 'marie.c', password: 'Member2026!', name: 'Marie Campbell', unit: 'Unit 2B', email: 'marie.c@email.com' },
  { username: 'david.w', password: 'Member2026!', name: 'David Williams', unit: 'Unit 3C', email: 'david.w@email.com' },
  { username: 'lisa.h', password: 'Member2026!', name: 'Lisa Henry', unit: 'Unit 4D', email: 'lisa.h@email.com' },
  { username: 'andrew.s', password: 'Member2026!', name: 'Andrew Stewart', unit: 'Unit 5E', email: 'andrew.s@email.com' },
  { username: 'karen.j', password: 'Member2026!', name: 'Karen Johnson', unit: 'Unit 6F', email: 'karen.j@email.com' },
  { username: 'robert.m', password: 'Member2026!', name: 'Robert Martin', unit: 'Unit 7G', email: 'robert.m@email.com' },
  { username: 'grace.p', password: 'Member2026!', name: 'Grace Palmer', unit: 'Unit 8H', email: 'grace.p@email.com' }
];

const INIT_HOMEOWNERS = MEMBERS.map((m, i) => ({
  id: i + 1, name: m.name, unit: m.unit, email: m.email,
  payments: [
    { year: 2024, data: [
      { date: '2024-01-15', amount: i < 4 ? 15000 : 12000, method: 'Bank Transfer', verified: true, receipt: null },
      { date: '2024-06-20', amount: i < 6 ? 15000 : 10000, method: 'Cash', verified: true, receipt: null }
    ]},
    { year: 2025, data: [
      { date: '2025-01-10', amount: i < 5 ? 15000 : 8000, method: 'Bank Transfer', verified: true, receipt: null },
      { date: '2025-07-15', amount: i < 3 ? 15000 : 0, method: i < 3 ? 'Online' : '', verified: i < 3, receipt: null }
    ]},
    { year: 2026, data: [
      { date: '2026-01-12', amount: i < 4 ? 15000 : 5000, method: i < 4 ? 'Bank Transfer' : 'Cash', verified: i < 2, receipt: null }
    ]}
  ],
  violations: i % 3 === 0 ? [{ id: 1, date: '2025-08-15', type: 'Noise Complaint', status: 'Resolved', description: 'Loud music after 10pm', fine: 5000 }] : [],
  balance: i < 2 ? 0 : i < 4 ? 5000 : i < 6 ? 15000 : 25000
}));


const INIT_ROOMS = [
  { id: 1, name: 'Community Hall', capacity: 100, rate: 5000 },
  { id: 2, name: 'Meeting Room A', capacity: 20, rate: 2000 },
  { id: 3, name: 'Pool Area', capacity: 50, rate: 3000 },
  { id: 4, name: 'BBQ Pavilion', capacity: 30, rate: 2500 }
];

const INIT_NOTICES = [
  { id: 1, date: '2026-03-01', title: 'Annual General Meeting', content: 'The AGM will be held on March 30, 2026 at 6:00 PM in the Community Hall. All homeowners are encouraged to attend.', author: 'Patricia Brown', priority: 'high' },
  { id: 2, date: '2026-02-15', title: 'Maintenance Schedule', content: 'Pool maintenance will be conducted every Tuesday from 8AM-12PM. Please plan accordingly.', author: 'Michael Thompson', priority: 'normal' },
  { id: 3, date: '2026-02-01', title: 'Security Update', content: 'New security protocols are in effect. All visitors must register at the guard house. Please inform your guests.', author: 'Sandra Williams', priority: 'normal' }
];

const RULES = [
  { id: 1, category: 'General', title: 'Quiet Hours', content: 'Quiet hours are from 10:00 PM to 7:00 AM daily. Excessive noise during these hours may result in a JMD $5,000 fine per the Strata Titles Act.' },
  { id: 2, category: 'General', title: 'Common Areas', content: 'Common areas must be kept clean after use. A cleaning deposit of JMD $3,000 is required for all bookings.' },
  { id: 3, category: 'Parking', title: 'Assigned Parking', content: 'Each unit is assigned one parking space. Unauthorized vehicles may be towed at owner expense.' },
  { id: 4, category: 'Parking', title: 'Visitor Parking', content: 'Visitor parking is available on a first-come basis. Visitors must register their vehicle at the guard house.' },
  { id: 5, category: 'Maintenance', title: 'Strata Fees', content: 'Monthly strata fees of JMD $15,000 are due by the 15th of each month. Late payments incur a 5% penalty as per the Strata Titles Act.' },
  { id: 6, category: 'Maintenance', title: 'Unit Modifications', content: 'All exterior modifications require written approval from the Strata Corporation. Submit requests to the management office.' },
  { id: 7, category: 'Pets', title: 'Pet Policy', content: 'Pets must be registered with management. Dogs must be leashed in common areas. Maximum 2 pets per unit.' },
  { id: 8, category: 'Security', title: 'Access Control', content: 'Gate access cards must not be shared. Lost cards must be reported immediately. Replacement fee: JMD $2,000.' }
];

const s = {
  flexCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: C.white, borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: 16 },
  btn: (bg, color) => ({ background: bg, color: color || C.white, border: 'none', borderRadius: 6, padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }),
  input: { width: '100%', padding: '10px 14px', borderRadius: 6, border: '1px solid ' + C.grayLight, fontSize: 14, boxSizing: 'border-box' },
  badge: (bg) => ({ background: bg, color: C.white, padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600 }),
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', textAlign: 'left', background: C.green, color: C.white, fontSize: 13, fontWeight: 600 },
  td: { padding: '10px 16px', borderBottom: '1px solid ' + C.grayLighter, fontSize: 13 }
};

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if (admin) return onLogin({ ...admin, role: 'admin' });
    const member = MEMBERS.find(m => m.username === username && m.password === password);
    if (member) return onLogin({ ...member, role: 'member' });
    setError('Invalid username or password');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, ' + C.green + ' 0%, ' + C.greenLight + ' 100%)', ...s.flexCenter }}>
      <div style={{ background: C.white, borderRadius: 16, padding: 40, width: 400, maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 80, height: 48, margin: '0 auto 16px', position: 'relative' }}>
            <svg viewBox="0 0 100 60" style={{ width: '100%', height: '100%' }}>
              <rect width="100" height="60" fill="#009B3A"/>
              <rect y="20" width="100" height="20" fill="#FED100"/>
              <path d="M0,0 L30,30 L0,60 Z" fill="#000"/>
            </svg>
          </div>
          <h1 style={{ color: C.green, fontSize: 24, margin: 0 }}>Community Management Portal</h1>
          <p style={{ color: C.gray, fontSize: 14, margin: '8px 0 0' }}>HOA Management System</p>
        </div>
        {error && <div style={{ background: '#FFEBEE', color: C.red, padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{error}</div>}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: C.black }}>Username</label>
          <input style={s.input} value={username} onChange={e => { setUsername(e.target.value); setError(''); }} placeholder="Enter username" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: C.black }}>Password</label>
          <div style={{ position: 'relative' }}>
            <input style={s.input} type={showPw ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="Enter password" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <button onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.gray }}>{showPw ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
          </div>
        </div>
        <button onClick={handleLogin} style={{ ...s.btn(C.green), width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 16 }}>Sign In</button>
        <p style={{ textAlign: 'center', color: C.gray, fontSize: 12, marginTop: 20 }}>Contact your HOA administrator if you need access</p>
      </div>
    </div>
  );
}

function PaymentsTab({ homeowners, setHomeowners, user, selectedYear }) {
  const [search, setSearch] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({ date: '', amount: '', method: 'Bank Transfer' });
  const isAdmin = user.role === 'admin';
  const filtered = isAdmin ? homeowners.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.unit.toLowerCase().includes(search.toLowerCase())) : homeowners.filter(h => h.email === user.email);
  const getYearPayments = (owner) => { const yearData = owner.payments.find(p => p.year === selectedYear); return yearData ? yearData.data : []; };
  const getYearTotal = (owner) => getYearPayments(owner).reduce((sum, p) => sum + p.amount, 0);
  const handleVerify = (ownerId, paymentIdx) => { setHomeowners(prev => prev.map(h => { if (h.id !== ownerId) return h; const payments = h.payments.map(yp => { if (yp.year !== selectedYear) return yp; return { ...yp, data: yp.data.map((p, i) => i === paymentIdx ? { ...p, verified: true } : p) }; }); return { ...h, payments }; })); };
  const handleAddPayment = (ownerId) => { if (!newPayment.date || !newPayment.amount) return; setHomeowners(prev => prev.map(h => { if (h.id !== ownerId) return h; const newP = { ...newPayment, amount: parseFloat(newPayment.amount), verified: false, receipt: null }; const payments = h.payments.map(yp => { if (yp.year !== selectedYear) return yp; return { ...yp, data: [...yp.data, newP] }; }); if (!h.payments.some(yp => yp.year === selectedYear)) payments.push({ year: selectedYear, data: [newP] }); return { ...h, payments, balance: Math.max(0, h.balance - parseFloat(newPayment.amount)) }; })); setNewPayment({ date: '', amount: '', method: 'Bank Transfer' }); setShowAddPayment(false); };
  return (<div>
    <div style={{...s.card, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
      <h2 style={{margin:0, color:C.green}}>{isAdmin ? 'All Payments' : 'My Payments'} - {selectedYear}</h2>
      {isAdmin && <div style={{position:'relative'}}><Search size={16} style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:C.gray}}/><input style={{...s.input, paddingLeft:36, width:250}} placeholder="Search homeowner..." value={search} onChange={e => setSearch(e.target.value)}/></div>}
    </div>
    {filtered.map(owner => (<div key={owner.id} style={s.card}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, flexWrap:'wrap', gap:8}}>
        <div><h3 style={{margin:0, color:C.black}}>{owner.name}</h3><p style={{margin:'4px 0 0', color:C.gray, fontSize:13}}>{owner.unit} | {owner.email}</p></div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}><span style={s.badge(owner.balance > 12500 ? C.red : owner.balance > 0 ? C.amber : C.greenLighter)}>Balance: JMD ${owner.balance.toLocaleString()}</span>
        {isAdmin && <button onClick={() => {setSelectedOwner(selectedOwner===owner.id?null:owner.id); setShowAddPayment(false);}} style={s.btn(C.blue)}><ChevronDown size={14}/> Details</button>}</div>
      </div>
      {(selectedOwner===owner.id || !isAdmin) && (<div>
        <table style={s.table}><thead><tr><th style={s.th}>Date</th><th style={s.th}>Amount (JMD)</th><th style={s.th}>Method</th><th style={s.th}>Status</th>{isAdmin && <th style={s.th}>Action</th>}</tr></thead><tbody>
        {getYearPayments(owner).map((p,i) => (<tr key={i}><td style={s.td}>{p.date}</td><td style={s.td}>${p.amount.toLocaleString()}</td><td style={s.td}>{p.method}</td><td style={s.td}><span style={s.badge(p.verified?C.greenLighter:C.amber)}>{p.verified?'Verified':'Pending'}</span></td>{isAdmin && <td style={s.td}>{!p.verified && <button onClick={()=>handleVerify(owner.id,i)} style={s.btn(C.greenLighter)}><Check size={14}/> Verify</button>}</td>}</tr>))}
        </tbody></table>
        <div style={{marginTop:12, padding:'12px 16px', background:C.grayLighter, borderRadius:6, fontWeight:600}}>Year Total: JMD ${getYearTotal(owner).toLocaleString()}</div>
        {isAdmin && <div style={{marginTop:12}}>{!showAddPayment ? <button onClick={()=>setShowAddPayment(true)} style={s.btn(C.gold,C.black)}><Plus size={14}/> Record Payment</button> : <div style={{display:'flex', gap:8, flexWrap:'wrap', alignItems:'end'}}><input type="date" style={{...s.input, width:160}} value={newPayment.date} onChange={e=>setNewPayment({...newPayment, date:e.target.value})}/><input type="number" style={{...s.input, width:140}} placeholder="Amount" value={newPayment.amount} onChange={e=>setNewPayment({...newPayment, amount:e.target.value})}/><select style={{...s.input, width:160}} value={newPayment.method} onChange={e=>setNewPayment({...newPayment, method:e.target.value})}><option>Bank Transfer</option><option>Cash</option><option>Online</option><option>Cheque</option></select><button onClick={()=>handleAddPayment(owner.id)} style={s.btn(C.green)}><Check size={14}/> Save</button><button onClick={()=>setShowAddPayment(false)} style={s.btn(C.gray)}><X size={14}/> Cancel</button></div>}</div>}
      </div>)}
    </div>))}
  </div>);
}
function ViolationsTab({ homeowners, setHomeowners, user, selectedYear }) {
  const isAdmin = user.role === 'admin';
  const [newViolation, setNewViolation] = useState({ ownerId: '', type: '', description: '', fine: 0 });
  const [showAdd, setShowAdd] = useState(false);
  const allViolations = homeowners.flatMap(h => h.violations.map(v => ({...v, ownerName: h.name, unit: h.unit, ownerId: h.id})));
  const handleAdd = () => { if(!newViolation.ownerId || !newViolation.type) return; setHomeowners(prev => prev.map(h => { if(h.id !== parseInt(newViolation.ownerId)) return h; return {...h, violations: [...h.violations, {id: Date.now(), date: new Date().toISOString().split('T')[0], type: newViolation.type, description: newViolation.description, status: 'Open', fine: parseFloat(newViolation.fine)||0}]}; })); setNewViolation({ownerId:'',type:'',description:'',fine:0}); setShowAdd(false); };
  const handleResolve = (ownerId, violationId) => { setHomeowners(prev => prev.map(h => { if(h.id!==ownerId) return h; return {...h, violations: h.violations.map(v => v.id===violationId ? {...v, status:'Resolved'} : v)}; })); };
  return (<div><div style={s.card}><div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><h2 style={{margin:0, color:C.green}}>Violations</h2>{isAdmin && <button onClick={()=>setShowAdd(!showAdd)} style={s.btn(C.red)}><AlertTriangle size={14}/> Report Violation</button>}</div></div>
    {isAdmin && showAdd && <div style={s.card}><h3 style={{marginTop:0}}>New Violation</h3><div style={{display:'flex', gap:8, flexWrap:'wrap'}}><select style={{...s.input, width:200}} value={newViolation.ownerId} onChange={e=>setNewViolation({...newViolation,ownerId:e.target.value})}><option value="">Select Homeowner</option>{homeowners.map(h=><option key={h.id} value={h.id}>{h.name} - {h.unit}</option>)}</select><input style={{...s.input, width:200}} placeholder="Type" value={newViolation.type} onChange={e=>setNewViolation({...newViolation,type:e.target.value})}/><input style={{...s.input, width:300}} placeholder="Description" value={newViolation.description} onChange={e=>setNewViolation({...newViolation,description:e.target.value})}/><input type="number" style={{...s.input, width:120}} placeholder="Fine" value={newViolation.fine} onChange={e=>setNewViolation({...newViolation,fine:e.target.value})}/><button onClick={handleAdd} style={s.btn(C.green)}><Check size={14}/> Submit</button></div></div>}
    <div style={s.card}><table style={s.table}><thead><tr><th style={s.th}>Date</th><th style={s.th}>Homeowner</th><th style={s.th}>Unit</th><th style={s.th}>Type</th><th style={s.th}>Fine (JMD)</th><th style={s.th}>Status</th>{isAdmin&&<th style={s.th}>Action</th>}</tr></thead><tbody>{allViolations.map(v=>(<tr key={v.id}><td style={s.td}>{v.date}</td><td style={s.td}>{v.ownerName}</td><td style={s.td}>{v.unit}</td><td style={s.td}>{v.type}</td><td style={s.td}>${(v.fine||0).toLocaleString()}</td><td style={s.td}><span style={s.badge(v.status==='Resolved'?C.greenLighter:C.red)}>{v.status}</span></td>{isAdmin&&<td style={s.td}>{v.status!=='Resolved'&&<button onClick={()=>handleResolve(v.ownerId,v.id)} style={s.btn(C.greenLighter)}><Check size={14}/> Resolve</button>}</td>}</tr>))}</tbody></table></div>
  </div>);
}
function BookingsTab({ rooms, user }) {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ roomId: '', date: '', time: '', duration: '2' });
  const handleBook = () => { if(!newBooking.roomId||!newBooking.date||!newBooking.time) return; const room = rooms.find(r=>r.id===parseInt(newBooking.roomId)); setBookings([...bookings, {id:Date.now(), room:room.name, date:newBooking.date, time:newBooking.time, duration:newBooking.duration, bookedBy:user.name, status:'Confirmed'}]); setNewBooking({roomId:'',date:'',time:'',duration:'2'}); };
  return (<div><div style={s.card}><h2 style={{margin:0, color:C.green}}>Book Rooms</h2></div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:16, marginBottom:16}}>{rooms.map(r=>(<div key={r.id} style={{...s.card, border:'2px solid '+C.grayLight}}><h3 style={{margin:'0 0 8px', color:C.green}}>{r.name}</h3><p style={{margin:0, color:C.gray, fontSize:13}}>Capacity: {r.capacity} | Rate: JMD ${r.rate.toLocaleString()}/session</p></div>))}</div>
    <div style={s.card}><h3 style={{marginTop:0}}>New Booking</h3><div style={{display:'flex', gap:8, flexWrap:'wrap', alignItems:'end'}}><select style={{...s.input, width:200}} value={newBooking.roomId} onChange={e=>setNewBooking({...newBooking,roomId:e.target.value})}><option value="">Select Room</option>{rooms.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select><input type="date" style={{...s.input, width:160}} value={newBooking.date} onChange={e=>setNewBooking({...newBooking,date:e.target.value})}/><input type="time" style={{...s.input, width:140}} value={newBooking.time} onChange={e=>setNewBooking({...newBooking,time:e.target.value})}/><select style={{...s.input, width:120}} value={newBooking.duration} onChange={e=>setNewBooking({...newBooking,duration:e.target.value})}><option value="1">1 hr</option><option value="2">2 hrs</option><option value="3">3 hrs</option><option value="4">4 hrs</option></select><button onClick={handleBook} style={s.btn(C.green)}><Calendar size={14}/> Book</button></div></div>
    {bookings.length>0 && <div style={s.card}><h3 style={{marginTop:0}}>My Bookings</h3><table style={s.table}><thead><tr><th style={s.th}>Room</th><th style={s.th}>Date</th><th style={s.th}>Time</th><th style={s.th}>Duration</th><th style={s.th}>Status</th></tr></thead><tbody>{bookings.map(b=>(<tr key={b.id}><td style={s.td}>{b.room}</td><td style={s.td}>{b.date}</td><td style={s.td}>{b.time}</td><td style={s.td}>{b.duration} hrs</td><td style={s.td}><span style={s.badge(C.greenLighter)}>{b.status}</span></td></tr>))}</tbody></table></div>}
  </div>);
}

function NoticeBoard({ notices, setNotices, user }) {
  const isAdmin = user.role === 'admin';
  const [showAdd, setShowAdd] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', priority: 'normal' });
  const handleAdd = () => { if(!newNotice.title||!newNotice.content) return; setNotices([{id:Date.now(), date:new Date().toISOString().split('T')[0], ...newNotice, author:user.name}, ...notices]); setNewNotice({title:'',content:'',priority:'normal'}); setShowAdd(false); };
  return (<div><div style={{...s.card, display:'flex', justifyContent:'space-between', alignItems:'center'}}><h2 style={{margin:0, color:C.green}}>Notice Board</h2>{isAdmin && <button onClick={()=>setShowAdd(!showAdd)} style={s.btn(C.gold, C.black)}><Bell size={14}/> Post Notice</button>}</div>
    {isAdmin && showAdd && <div style={s.card}><h3 style={{marginTop:0}}>New Notice</h3><input style={{...s.input, marginBottom:8}} placeholder="Title" value={newNotice.title} onChange={e=>setNewNotice({...newNotice,title:e.target.value})}/><textarea style={{...s.input, minHeight:80, marginBottom:8}} placeholder="Content" value={newNotice.content} onChange={e=>setNewNotice({...newNotice,content:e.target.value})}/><div style={{display:'flex', gap:8}}><select style={{...s.input, width:150}} value={newNotice.priority} onChange={e=>setNewNotice({...newNotice,priority:e.target.value})}><option value="normal">Normal</option><option value="high">High Priority</option></select><button onClick={handleAdd} style={s.btn(C.green)}><Check size={14}/> Post</button></div></div>}
    {notices.map(n=>(<div key={n.id} style={{...s.card, borderLeft:'4px solid '+(n.priority==='high'?C.red:C.green)}}><div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}><h3 style={{margin:0, color:C.black}}>{n.title}</h3><div style={{display:'flex', gap:8, alignItems:'center'}}>{n.priority==='high' && <span style={s.badge(C.red)}>Urgent</span>}<span style={{color:C.gray, fontSize:12}}>{n.date}</span></div></div><p style={{margin:'0 0 8px', color:C.black, fontSize:14, lineHeight:1.6}}>{n.content}</p><p style={{margin:0, color:C.gray, fontSize:12}}>Posted by: {n.author}</p></div>))}
  </div>);
}

function RulesTab() {
  const [search, setSearch] = useState('');
  const [selCat, setSelCat] = useState('All');
  const cats = ['All', ...new Set(RULES.map(r=>r.category))];
  const filtered = RULES.filter(r => (selCat==='All'||r.category===selCat) && (r.title.toLowerCase().includes(search.toLowerCase())||r.content.toLowerCase().includes(search.toLowerCase())));
  return (<div><div style={{...s.card, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}><h2 style={{margin:0, color:C.green}}>HOA Rules & Regulations</h2><div style={{position:'relative'}}><Search size={16} style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:C.gray}}/><input style={{...s.input, paddingLeft:36, width:250}} placeholder="Search rules..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
    <div style={{display:'flex', gap:8, marginBottom:16, flexWrap:'wrap'}}>{cats.map(c=>(<button key={c} onClick={()=>setSelCat(c)} style={{...s.btn(selCat===c?C.green:C.grayLighter, selCat===c?C.white:C.black), fontSize:13}}>{c}</button>))}</div>
    {filtered.map(r=>(<div key={r.id} style={s.card}><div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}><h3 style={{margin:0, color:C.green}}>{r.title}</h3><span style={s.badge(C.blue)}>{r.category}</span></div><p style={{margin:0, color:C.black, fontSize:14, lineHeight:1.6}}>{r.content}</p></div>))}
    <div style={{...s.card, background:C.grayLighter, borderLeft:'4px solid '+C.gold}}><p style={{margin:0, fontSize:13, color:C.gray}}><strong>Legal Reference:</strong> All rules are enforced in accordance with the Jamaica Strata Titles Act and the registered Strata Corporation by-laws. Disputes may be referred to the Strata Tribunal.</p></div>
  </div>);
}
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [homeowners, setHomeowners] = useState(INIT_HOMEOWNERS);
  const [notices, setNotices] = useState(INIT_NOTICES);
  const [emailLog, setEmailLog] = useState([]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      const overdue = homeowners.filter(h => h.balance >= 12500);
      if (overdue.length > 0) {
        const newEmails = overdue.map(h => ({
          id: Date.now() + Math.random(),
          to: h.email,
          subject: 'Outstanding Balance Reminder',
          body: 'Dear ' + h.name + ', your HOA balance of JMD $' + h.balance.toLocaleString() + ' is overdue. Please arrange payment immediately.',
          sent: new Date().toISOString(),
          ownerName: h.name
        }));
        setEmailLog(newEmails);
      }
    }
  }, [user]);

  if (!user) return <LoginScreen onLogin={setUser} />;

  const isAdmin = user.role === 'admin';
  const adminTabs = ['Payments', 'Violations', 'Book Rooms', 'Notice Board', 'HOA Rules'];
  const memberTabs = ['My Payments', 'Book Rooms', 'Notice Board', 'HOA Rules'];
  const tabs = isAdmin ? adminTabs : memberTabs;
  const tabIcons = isAdmin ? [DollarSign, AlertTriangle, Calendar, Bell, BookOpen] : [DollarSign, Calendar, Bell, BookOpen];

  const renderTab = () => {
    if (isAdmin) {
      switch(tab) {
        case 0: return <PaymentsTab homeowners={homeowners} setHomeowners={setHomeowners} user={user} selectedYear={selectedYear}/>;
        case 1: return <ViolationsTab homeowners={homeowners} setHomeowners={setHomeowners} user={user} selectedYear={selectedYear}/>;
        case 2: return <BookingsTab rooms={INIT_ROOMS} user={user}/>;
        case 3: return <NoticeBoard notices={notices} setNotices={setNotices} user={user}/>;
        case 4: return <RulesTab/>;
        default: return null;
      }
    } else {
      switch(tab) {
        case 0: return <PaymentsTab homeowners={homeowners} setHomeowners={setHomeowners} user={user} selectedYear={selectedYear}/>;
        case 1: return <BookingsTab rooms={INIT_ROOMS} user={user}/>;
        case 2: return <NoticeBoard notices={notices} setNotices={setNotices} user={user}/>;
        case 3: return <RulesTab/>;
        default: return null;
      }
    }
  };

  return (
    <div style={{minHeight:'100vh', background:C.grayLighter}}>
      <header style={{background:C.green, color:C.white, padding:'0 24px', display:'flex', justifyContent:'space-between', alignItems:'center', height:64, boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <Shield size={28} color={C.gold}/>
          <div><h1 style={{margin:0, fontSize:18}}>Community Management Portal</h1><p style={{margin:0, fontSize:11, opacity:0.8}}>HOA Management System</p></div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:16}}>
          <select value={selectedYear} onChange={e=>setSelectedYear(parseInt(e.target.value))} style={{background:'rgba(255,255,255,0.2)', color:C.white, border:'1px solid rgba(255,255,255,0.3)', borderRadius:6, padding:'6px 12px', fontSize:13}}><option value={2024} style={{color:C.black}}>2024</option><option value={2025} style={{color:C.black}}>2025</option><option value={2026} style={{color:C.black}}>2026</option></select>
          <div style={{textAlign:'right'}}><p style={{margin:0, fontSize:13, fontWeight:600}}>{user.name}</p><p style={{margin:0, fontSize:11, opacity:0.8}}>{isAdmin?'Administrator':user.unit}</p></div>
          <button onClick={()=>{setUser(null);setTab(0);setEmailLog([]);}} style={{background:'rgba(255,255,255,0.15)', border:'none', color:C.white, borderRadius:6, padding:'8px 12px', cursor:'pointer', display:'flex', alignItems:'center', gap:6}}><LogOut size={16}/></button>
        </div>
      </header>
      <nav style={{background:C.white, borderBottom:'2px solid '+C.gold, display:'flex', overflowX:'auto', padding:'0 24px'}}>
        {tabs.map((t,i)=>{const Icon=tabIcons[i]; return <button key={t} onClick={()=>setTab(i)} style={{display:'flex', alignItems:'center', gap:8, padding:'14px 20px', border:'none', background:tab===i?C.grayLighter:'transparent', borderBottom:tab===i?'3px solid '+C.green:'3px solid transparent', color:tab===i?C.green:C.gray, fontWeight:tab===i?700:400, cursor:'pointer', fontSize:14, whiteSpace:'nowrap'}}><Icon size={16}/>{t}</button>;})}
      </nav>
      {emailLog.length > 0 && isAdmin && <div style={{background:'#FFF3E0', padding:'12px 24px', display:'flex', alignItems:'center', gap:8, fontSize:13}}><Mail size={16} color={C.amber}/><strong>Auto-Email Sent:</strong> {emailLog.length} reminder(s) sent to homeowners with balances over JMD $12,500</div>}
      <main style={{padding:24, maxWidth:1200, margin:'0 auto'}}>{renderTab()}</main>
      <footer style={{textAlign:'center', padding:'20px 24px', color:C.gray, fontSize:12, borderTop:'1px solid '+C.grayLight}}>
        <p style={{margin:0}}>Jamaica HOA Manager | Governed by the Strata Titles Act of Jamaica</p>
      </footer>
    </div>
  );
}
