import { useEffect, useRef, useState } from 'react';
import { Mail, Terminal as TerminalIcon } from 'lucide-react';
import { profile, skills } from '../data/portfolio';

const commands = ['help', 'contact', 'linkedin', 'github', 'resume', 'email', 'skills', 'clear'];

export function CommandTerminal() {
  const [history, setHistory] = useState([
    { kind: 'system', text: `${profile.callsign} secure terminal` },
    { kind: 'system', text: 'Run help to list available commands.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [history]);

  const append = (items) => setHistory((current) => [...current, ...items]);

  const runCommand = (rawCommand) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    if (command === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = [{ kind: 'user', text: `> ${rawCommand}` }];

    if (command === 'help') output.push({ kind: 'system', text: commands.join('  /  ') });
    else if (command === 'contact') output.push({ kind: 'system', text: `Email ${profile.email}  |  Phone ${profile.phone}` });
    else if (command === 'email') {
      output.push({ kind: 'system', text: 'Opening mail relay...' });
      window.location.href = `mailto:${profile.email}`;
    } else if (command === 'linkedin') {
      output.push({ kind: 'system', text: 'Opening LinkedIn transmission...' });
      window.open(profile.linkedin, '_blank', 'noopener,noreferrer');
    } else if (command === 'github') {
      output.push({ kind: 'system', text: profile.github || 'GitHub route is not published in this dossier. Use email for repository access.' });
    } else if (command === 'resume') {
      output.push({ kind: 'system', text: profile.resume || 'Resume route is private. Send resume request through email command.' });
    } else if (command === 'skills') output.push({ kind: 'system', text: skills.map((skill) => skill.label).join('  |  ') });
    else output.push({ kind: 'error', text: `Unknown command: ${command}` });

    append(output);
    setInput('');
  };

  return (
    <div className="terminal" onMouseDown={(event) => event.stopPropagation()}>
      <div className="terminal__bar">
        <span><TerminalIcon size={15} /> root@{profile.callsign.toLowerCase()}</span>
        <Mail size={15} />
      </div>
      <div className="terminal__body" onClick={() => inputRef.current?.focus()}>
        {history.map((line, index) => (
          <div className={`terminal__line terminal__line--${line.kind}`} key={`${line.text}-${index}`}>
            {line.text}
          </div>
        ))}
        <label className="terminal__input">
          <span>_</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') runCommand(input);
            }}
            spellCheck="false"
            autoComplete="off"
            aria-label="Terminal command"
          />
        </label>
        <div ref={endRef} />
      </div>
    </div>
  );
}
