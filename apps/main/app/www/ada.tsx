'use client';

import { useState } from 'react';

export default function Ada() {
  const [a, setA] = useState('ada');
  return <button onClick={() => setA('alkalsa')}>{a}</button>;
}
