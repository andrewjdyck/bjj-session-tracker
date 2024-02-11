import React, { useState, useEffect } from 'react';

interface SessionData {
  date: string;
  time: string;
  duration: number; // Duration in minutes
  type: 'No-Gi' | 'Gi';
}

interface AggregateStats {
  totalDuration: number;
  averagePerWeek: number;
  giSessions: number;
  noGiSessions: number;
}

const App: React.FC = () => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  // Simulate fetching a BJJ image from Unsplash
  // Unsplash API key: 'useSCy5tG72KGXv46sTZd7kpP4CveVYB9CTYMzlltAA'
  // image: https://unsplash.com/photos/a-man-on-the-ground-in-a-black-and-white-photo-Z3fu-8gV66Q
  useEffect(() => {
    setBackgroundImage('https://source.unsplash.com/a-man-on-the-ground-in-a-black-and-white-photo-Z3fu-8gV66Q?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'); // Placeholder image
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSession: SessionData = {
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      duration: Number(formData.get('duration')),
      type: formData.get('type') as 'Gi' | 'No-Gi',
    };
    setSessions([...sessions, newSession]);
  };

  const calculateStats = (): AggregateStats => {
    const totalDuration = sessions.reduce((acc, session) => acc + session.duration, 0);
    const giSessions = sessions.filter(session => session.type === 'Gi').length;
    const noGiSessions = sessions.filter(session => session.type === 'No-Gi').length;
    // Assuming each entry is a week for simplification
    const averagePerWeek = sessions.length > 0 ? totalDuration / sessions.length : 0;

    return { totalDuration, averagePerWeek, giSessions, noGiSessions };
  };

  const stats = calculateStats();

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      height: '100vh',
      width: '100vw',
      color: 'white',
      textShadow: '0px 0px 3px black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <input type="date" name="date" required style={{ color: 'black', margin: '5px' }} />
          <input type="time" name="time" required style={{ color: 'black', margin: '5px' }} />
          <input type="number" name="duration" placeholder="Duration (min)" required style={{ color: 'black', margin: '5px' }} />
          <select name="type" required style={{ color: 'black', margin: '5px' }}>
            <option value="Gi">Gi</option>
            <option value="No-Gi">No-Gi</option>
          </select>
        </div>
        <button type="submit" style={{ color: 'black', margin: '5px' }}>Add Session</button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
        <div>Total Duration: {stats.totalDuration} mins</div>
        <div>Average per Week: {stats.averagePerWeek.toFixed(2)} mins</div>
        <div>Gi Sessions: {stats.giSessions}</div>
        <div>No-Gi Sessions: {stats.noGiSessions}</div>
      </div>
    </div>
  );
};

export default App;

