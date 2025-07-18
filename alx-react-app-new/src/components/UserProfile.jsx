const UserProfile = (props) => {
  return (
    <div style={{ border: '1px solid gray', borderRadius: '8px', padding: '15px', margin: '15px', backgroundColor: '#fafafa' }}>
      <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>{props.name}</h2>
      <p style={{ fontSize: '18px' }}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p style={{ fontSize: '16px', color: '#333' }}>{props.bio}</p>
    </div>
  );
};

export default UserProfile;
