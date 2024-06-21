import { useState } from 'react';
import './SidePanel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const SidePanel = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={clsx('panel', {
        'panel-open': isOpen,
        'panel-closed': !isOpen,
      })}
    >
      <div className="icon">
        <FontAwesomeIcon
          onClick={() => setOpen(!isOpen)}
          icon={faBars}
          className="fa-2xl"
        />
      </div>
      <div className={isOpen ? 'panel-open-text' : 'panel-closed-text'}>
        here is some text
      </div>
    </div>
  );
};

export default SidePanel;
