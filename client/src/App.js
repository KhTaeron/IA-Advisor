import React, { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/data') // Grâce au proxy, pas besoin de mettre l'URL complète
            .then((response) => response.json())
            .then((result) => setData(result.data));
    }, []);

    return (
        <div>
            <h1>React Frontend</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
