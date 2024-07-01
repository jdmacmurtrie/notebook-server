import { useEffect, useState } from 'react';
import './SidePanel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentPage, setPageList } from '../pageSlice';
import { Page } from '../types';

const SidePanel = () => {
  const pages = useSelector((state: RootState) => state.page.pages)
  const dispatch = useDispatch()

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:5000/get_pages')
        .then(response => response.json())
        .then(data => dispatch(setPageList(data)))
    }
  }, [isOpen]);

  const handlePageSelect = (pageId: Page['id']) => {
    dispatch(setCurrentPage(pageId))
    setOpen(false)
  }

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
        {pages.map(page => <div
          key={page.id}
          className='panel-list-item'
          onClick={() => handlePageSelect(page.id)}
        >
          {page.title}
        </div>)}
      </div>
    </div>
  );
};

export default SidePanel;
