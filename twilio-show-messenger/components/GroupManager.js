import { useState, useEffect } from 'react';

export default function GroupManager({ template }) {
  const [groupName, setGroupName] = useState('');
  const [numbers, setNumbers] = useState('');
  const [groups, setGroups] = useState({});
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('groups');
    if (saved) {
      setGroups(JSON.parse(saved));
    }
  }, []);

  function saveGroup() {
    const cleaned = numbers
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    const newGroups = { ...groups, [groupName]: cleaned };
    setGroups(newGroups);
    localStorage.setItem('groups', JSON.stringify(newGroups));
    setGroupName('');
    setNumbers('');
  }

  function handleSend() {
    if (!template || !selectedGroup) return;

    const recipients = groups[selectedGroup];

    if (template.type === 'sms') {
      fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, recipients }),
      });
    }

    if (template.type === 'call') {
      fetch('/api/make-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, recipients }),
      });
    }
  }

  return (
    <div>
      <h2>3. Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <br />
      <textarea
        rows={6}
        placeholder="Paste phone numbers here, one per line"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
      />
      <br />
      <button onClick={saveGroup}>Save Group</button>

      <h3>4. Choose Group to Send To</h3>
      <select onChange={(e) => setSelectedGroup(e.target.value)} value={selectedGroup}>
        <option value="">-- Select Group --</option>
        {Object.keys(groups).map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {template && selectedGroup && (
        <button onClick={handleSend} style={{ marginTop: '1rem' }}>
          Send {template.type.toUpperCase()} to {selectedGroup}
        </button>
      )}
    </div>
  );
}
