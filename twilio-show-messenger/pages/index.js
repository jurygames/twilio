import GroupManager from '../components/GroupManager';
import TemplateSelector from '../components/TemplateSelector';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Twilio Show Messenger</h1>
      <TemplateSelector />
      <GroupManager />
    </div>
  );
}
