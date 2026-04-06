// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarIcon from '../../assets/dark/Sidebar.svg';
import CheckCircle from '../../assets/dark/Check_circle.svg';
import FileText from '../../assets/dark/File_text.svg';
import Archive from '../../assets/dark/Archive.svg';
import Settings from '../../assets/dark/Settings.svg';
import Headphones from '../../assets/dark/Headphones.svg';
import Sun from '../../assets/dark/Sun.svg';
import Moon from '../../assets/dark/Moon.svg';
import ChevronRight from '../../assets/dark/Chevron right.svg';

// Support-specific icons from assets/dark/support/
import MailIcon from '../../assets/dark/support/Mail.svg';
import RefreshIcon from '../../assets/dark/support/Refresh cw.svg';
import LinkIcon from '../../assets/dark/support/Link.svg';
import LockIcon from '../../assets/dark/support/Lock.svg';
import Edit2Icon from '../../assets/dark/support/Edit 2.svg';
import CheckIcon from '../../assets/dark/support/Check.svg';
import TrashIcon from '../../assets/dark/support/Trash 2.svg';
import FileMinus from '../../assets/dark/support/File minus.svg';
import FileSupportText from '../../assets/dark/support/Award.svg';
import ArchiveSupport from '../../assets/dark/support/Download.svg';
import BellIcon from '../../assets/dark/support/Bell.svg';
import EditIcon from '../../assets/dark/support/Edit 2.svg';
import EditIcon2 from '../../assets/dark/support/Edit.svg';
import Edit4Icon from '../../assets/dark/support/Edit 4.svg';
import PlusIcon from '../../assets/dark/support/Plus.svg';
import EditIcon3 from '../../assets/dark/support/Edit 3.svg';

import '../HomePage/HomePageDark.css';
import './SupportPage.css';

type FaqItem = {
  icon: string;
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    icon: FileMinus,
    question: 'Kas ma saan kustutada ainult teatud osa oma profiilist?',
    answer:
      'Kontoseadetes on eraldi prügikasti ikoonid, millega saate kustutada sisu jaotiste kaupa: "Minu profiil", "Minu failikogu", "Minu oskused" või "Minu lemmikud".',
  },
  {
    icon: FileSupportText,
    question: 'Digitaalsed tõendid',
    answer:
      'Siia ilmuvad teie kinnitatud kursused ja sertifikaadid',
  },
  {
    icon: ArchiveSupport,
    question: 'Kuidas andmeid importida?',
    answer:
      'Saate laadida üles olemasoleva Europassi faili, et väljad automaatselt täita.',
  },
  {
    icon: BellIcon,
    question: 'Milliseid teavitusi ma saan e-posti teel tellida?',
    answer:
      'Teil on võimalik sisse lülitada teavitused jagatud linkide aegumise kohta ning saada info otse oma e-posti aadressile.',
  },
  {
    icon: EditIcon3,
    question: 'Kas ma pean muudatuste jõustumiseks midagi tegema?',
    answer:
      'Pärast kõikide valikute tegemist vajutage kindlasti lehe allosas olevat nuppu "Salvesta muudatused"',
  },
  {
    icon: EditIcon2,
    question: 'Kust saab muuta oma CV-d?',
    answer:
      'Oma CV-d saab muuta jaotises "Pass", kus iga andmeploki juures on pliiatsi ikoon ja uusi kogemusi saab mugavalt lohistada otse külgmenüüst.',
  },
  {
    icon: Edit4Icon,
    question: 'Kuidas ma saan muuta töölaual kuvatavaid kaarte?',
    answer:
      'Töölaua seadistuste alt saate lülitite abil valida, millised moodulid (nt Olulised andmed, Toiming, Teie võimalused või Täida profiil) on teie vaates nähtavad.',
  },
  {
    icon: EditIcon2,
    question: 'Mida teha, kui ma ei saa oma CV-d muuta?',
    answer:
      'Veendu, et oled jaotises "Pass" ning klõpsanud vastava andmeploki nurgas olevale pliiatsi ikoonile.',
  },
];

const shortcuts = [
  { icon: MailIcon, label: 'Puuduv kinnitusmeil', color: '#ADA7FF' },
  { icon: RefreshIcon, label: 'Töölaua lähtestamine', color: '#DB7C00' },
  { icon: LinkIcon, label: 'Profiili jagamine', color: '#129E05' },
  { icon: LockIcon, label: 'Unustatud parool', color: '#ADA7FF' },
  { icon: Edit2Icon, label: 'PIN-koodi muutmine', color: '#129E05' },
  { icon: CheckIcon, label: 'Teadete seaded', color: '#DB7C00' },
  { icon: TrashIcon, label: 'Konto kustutamine', color: '#ADA7FF' },
];

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={`home-page ${
        isSidebarOpen ? 'home-page--sidebar-open' : 'home-page--sidebar-closed'
      }`}
    >
      <div className="home-layout">
        {isSidebarOpen && (
          <aside className="home-sidebar">
            <div className="home-sidebar-header">
              <div className="home-logo-row">
                <div className="home-logo">Ettevõtlikkuse Pass</div>
                <button
                  type="button"
                  className="home-sidebar-toggle"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Sulge külgriba"
                >
                  <img src={SidebarIcon} alt="" />
                </button>
              </div>
            </div>

            <div className="home-sidebar-section-label">Ülevaade</div>

            <nav className="home-nav" aria-label="Põhinavigatsioon">
              <button
                type="button"
                className="home-nav-item"
                onClick={() => navigate('/home_dark')}
              >
                <img src={CheckCircle} alt="" className="home-nav-icon-img" aria-hidden="true" />
                <span className="home-nav-label">Töölaud</span>
              </button>
              <button type="button" className="home-nav-item" onClick={() => navigate('/pass')}>
                <img src={FileText} alt="" className="home-nav-icon-img" aria-hidden="true" />
                <span className="home-nav-label">Pass</span>
              </button>
              <button type="button" className="home-nav-item">
                <img src={Archive} alt="" className="home-nav-icon-img" aria-hidden="true" />
                <span className="home-nav-label">Kogemused</span>
              </button>
            </nav>

            <div className="home-sidebar-spacer" />

            <div className="home-sidebar-bottom">
              <button type="button" className="home-sidebar-link support-sidebar-link">
                <img src={Settings} alt="" className="home-sidebar-icon-img" aria-hidden="true" />
                <span>Settings</span>
              </button>
              <button
                type="button"
                className="home-sidebar-link support-sidebar-link home-sidebar-link--active"
                onClick={() => navigate('/support')}
              >
                <img src={Headphones} alt="" className="home-sidebar-icon-img" aria-hidden="true" />
                <span>Support</span>
              </button>

              <div className="home-user-card">
                <div className="home-user-avatar" aria-hidden="true" />
                <div className="home-user-text">
                  <div className="home-user-name">Karoliine Tamm</div>
                  <div className="home-user-email">KaroliineT@gmail.com</div>
                </div>
                <img
                  src={ChevronRight}
                  alt=""
                  className="home-user-chevron-img"
                  aria-hidden="true"
                />
              </div>

              <div className="home-theme-toggle" aria-label="Välimuse valik">
                <button type="button" className="home-theme-pill home-theme-pill--active">
                  <span className="home-theme-icon" aria-hidden="true">
                    <img src={Sun} alt="" />
                  </span>
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  className="home-theme-pill home-theme-pill--muted"
                  onClick={() => navigate('/home_dark')}
                >
                  <span className="home-theme-icon" aria-hidden="true">
                    <img src={Moon} alt="" />
                  </span>
                  <span>Dark</span>
                </button>
              </div>
            </div>
          </aside>
        )}

        {!isSidebarOpen && (
          <button
            type="button"
            className="home-sidebar-toggle-floating"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Ava külgriba"
          >
            <img src={SidebarIcon} alt="" />
          </button>
        )}

        <main className="home-main support-main">
          <div className="support-panel">
            {/* Panel header */}
            <div className="support-panel-header">
              <span className="support-panel-title">Support</span>
              <div className="support-header-divider" />
            </div>

            {/* Shortcut buttons row */}
            <div className="support-shortcuts-row" role="list" aria-label="Kiirabi teemad">
              {shortcuts.map((shortcut) => (
                <button
                  key={shortcut.label}
                  type="button"
                  className="support-shortcut"
                  style={{ borderColor: shortcut.color }}
                  role="listitem"
                >
                  <img
                    src={shortcut.icon}
                    alt=""
                    className="support-shortcut-icon"
                    aria-hidden="true"
                  />
                  <span className="support-shortcut-label" style={{ color: shortcut.color }}>
                    {shortcut.label}
                  </span>
                </button>
              ))}
            </div>

            {/* FAQ accordion */}
            <div className="support-faq" aria-label="Korduma kippuvad küsimused">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`support-faq-item ${openFaq === index ? 'support-faq-item--open' : ''}`}
                >
                  <button
                    type="button"
                    className="support-faq-row"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className="support-faq-icon"
                      aria-hidden="true"
                    />
                    <span className="support-faq-question">{item.question}</span>
                    <span className="support-faq-toggle" aria-hidden="true">
                      {openFaq === index ? (
                        <span className="support-faq-minus" />
                      ) : (
                        <img src={PlusIcon} alt="" className="support-faq-plus-icon" />
                      )}
                    </span>
                  </button>
                  <div className="support-faq-drawer">
                    <p className="support-faq-answer">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact box */}
            <div className="support-contact-box">
              <p className="support-contact-main">
                Lisa küsimuste põhjal võta meiega ühendust. Kirjuta meie e-mailile ----
              </p>
              <p className="support-contact-sub">(Vastame 3 tööpäeva jooksul)</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportPage;
