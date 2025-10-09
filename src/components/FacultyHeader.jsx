// components/FacultyHeader.jsx
export default function FacultyHeader({ onLogout }) {
  return (
    <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:60,padding:"0 24px",background:"#f7fafd",boxShadow:"0 2px 8px rgba(0,0,0,.03)"}}>
      <div style={{fontWeight:800}}>EduPortpolia</div>
      <button onClick={onLogout} style={{border:"2px solid #1c5ef4",background:"#fff",color:"#1c5ef4",borderRadius:20,padding:"8px 20px"}}>Logout</button>
    </header>
  );
}
