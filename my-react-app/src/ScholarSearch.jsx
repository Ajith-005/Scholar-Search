import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScholarSearch() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get('http://localhost:8080/api/scholarsearch', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h1>ScholarSearch</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
export default ScholarSearch;
