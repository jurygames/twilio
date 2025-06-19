import { useState } from 'react';

const TEMPLATE_DATA = [
  {
    name: "I'm so sorry...",
    type: "sms",
    message:
      "I’m so sorry to reach out like this, but I have information about the Scott Davies case. Please email me at knockknock502@gmail.com\nIt’s about Reggie and Mel",
    from: "+447723453049",
    show: "Scott Davies",
  },
  {
    name: 'TI Sally Call',
    type: 'call',
    mp3: '/audio/sally-call.mp3',
    from: '+447723453049',
    show: 'Scott Davies',
  },
  {
    name: 'JD Call 1',
    type: 'call',
    mp3: '/audio/jd-call-1.mp3',
    from: '+447723453049',
    show: 'Harry Briggs',
  },
  {
    name: 'JD Call 2',
    type: 'call',
    mp3: '/audio/jd-call-2.mp3',
    from: '+447480780992',
    show: 'Harry Briggs',
  },
];

export default function TemplateSelector({ onSelect }) {
  const [selectedShow, setSelectedShow] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const shows = [...new Set(TEMPLATE_DATA.map((t) => t.show))];

  const templates = selectedShow
    ? TEMPLATE_DATA.filter((t) => t.show === selectedShow)
    : [];

  function handleTemplateChange(e) {
    const template = templates.find((t) => t.name === e.target.value);
    setSelectedTemplate(template);
    onSelect(template);
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>1. Select Show</h2>
      <select value={selectedShow} onChange={(e) => setSelectedShow(e.target.value)}>
        <option value="">-- Select Show --</option>
        {shows.map((show) => (
          <option key={show} value={show}>
            {show}
          </option>
        ))}
      </select>

      {templates.length > 0 && (
        <>
          <h3>2. Select Template</h3>
          <select onChange={handleTemplateChange} value={selectedTemplate?.name || ''}>
            <option value="">-- Choose Template --</option>
            {templates.map((template) => (
              <option key={template.name} value={template.name}>
                {template.name} ({template.type})
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
