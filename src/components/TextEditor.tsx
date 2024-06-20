import { useState } from 'react';

const TextEditor = () => {
  const [input, setInput] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <textarea rows={30} cols={70} value={input} onChange={handleInput} />
      <div>
        <button onClick={() => setInput('')}>Clear All</button>
        <button>Save</button>
      </div>
    </div>
  );
};

export default TextEditor;
