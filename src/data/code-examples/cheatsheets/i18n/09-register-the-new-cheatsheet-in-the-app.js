// 1. src/data/en/cheatsheets.json – add an entry to the topics array
{
  "id": 7,
  "key": "mytopic",
  "title": "My Topic",
  "description": "Short description shown on the home page card",
  "route": "/mytopic",
  "screenshot": "/images/mytopic.png",
  "difficulty": "beginner",
  "estimatedTime": "15 minutes"
}

// 2. src/data/sv/cheatsheets.json – same entry, translated
{
  "id": 7,
  "key": "mytopic",
  "title": "Mitt Ämne",
  "description": "Kort beskrivning som visas på startsidans kort",
  "route": "/mytopic",
  "screenshot": "/images/mytopic.png",
  "difficulty": "beginner",
  "estimatedTime": "15 minuter"
}

// 3. src/App.jsx – add the lazy import and Route
const MyTopic = lazy(() => import('./pages/cheatsheets/MyTopic'));
// … inside <Routes>:
<Route path="/mytopic" element={<MyTopic />} />
