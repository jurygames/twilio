import { useState } from 'react';
import GroupManager from '../components/GroupManager';
import TemplateSelector from '../components/TemplateSelector';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Twilio Show Messenger</h1>
      <TemplateSelector onSelect={setSelectedTemplate} />
      <GroupManager template={selectedTemplate} />
    </div>
  );
}
