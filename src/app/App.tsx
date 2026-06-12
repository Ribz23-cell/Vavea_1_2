import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { Menu, X, ChevronDown, Anchor, Users, Leaf, Heart, MapPin, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logoVavea from '../imports/logovavea-removebg-preview-1.png';
import pirogueVezo from '../imports/Pirogue_Vezo.jpg';
import pirogueVezoMorombe from '../imports/Pirogue_vezo_a_morombe.jpg';
import pirogueNumber from '../imports/639722322073906621.jpg';
import localVezoFishers from '../imports/Local_vezo_fishers_out_on_their_pirogues_in_.jpg';
import sloPirogue from '../imports/S_lo_con_ver_partir_a_primera_hora_de_la_ma_ana_a_.jpg';
import elenaHeatherwick from '../imports/Elena_Heatherwick_on_Instagram___Vezo_fishermen_.jpg';
import veztival from '../imports/Vez_tival.jpg';
import president from '../imports/Pr_sident.jpg';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const navListRef = useRef<HTMLUListElement>(null);

  const NAV_IDS = ['vezo', 'mission', 'projet', 'actualites', 'galerie', 'contact'];

  const movePillTo = (id: string) => {
    const btn = navRefs.current[id];
    const list = navListRef.current;
    if (!btn || !list) return;
    const listRect = list.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPillStyle({ left: btnRect.left - listRect.left, width: btnRect.width, opacity: 1 });
  };

  const activateNav = (id: string) => {
    setActiveNav(id);
    movePillTo(id);
  };

  // Scroll spy — détecte la section la plus visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) activateNav(id);
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-calcule la position du pill si la fenêtre est redimensionnée
  useEffect(() => {
    if (!activeNav) return;
    const onResize = () => movePillTo(activeNav);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeNav]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    activateNav(id);
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-6xl mx-auto rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'bg-[#040f18]/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/[0.07]'
              : 'bg-white/[0.04] backdrop-blur-md border border-white/[0.08]'
          }`}
        >
          <div className="flex items-center justify-between px-5 h-16">

            {/* LOGO */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(circle, rgba(200,135,58,0.18) 0%, transparent 70%)' }}
                />
                <ImageWithFallback
                  src={logoVavea}
                  alt="VAVEA"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="flex flex-col leading-none gap-[5px] mx-[-2px] my-[13px] pl-[19px] pr-[0px] py-[0px]">
                <span style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '0.45em',
                  color: 'white',
                  lineHeight: 1,
                }}>VAVEA</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C8873A]/50 to-transparent" style={{ width: '16px' }} />
                  <span style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: '7.5px',
                    fontWeight: 400,
                    letterSpacing: '0.25em',
                    color: 'rgba(200,135,58,0.65)',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}>Vahatse ty Vezo Aharo</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#C8873A]/50 to-transparent" style={{ width: '16px' }} />
                </div>
              </div>
            </button>

            {/* LIENS DESKTOP */}
            <ul ref={navListRef} className="hidden md:flex items-center relative">
              {/* Pill glissant */}
              <div
                className="absolute top-1/2 -translate-y-1/2 rounded-lg pointer-events-none"
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                  height: '32px',
                  opacity: pillStyle.opacity,
                  background: 'linear-gradient(135deg, #C8873A 0%, #E8A85A 100%)',
                  transition: 'left 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease',
                  boxShadow: '0 0 16px rgba(200,135,58,0.35)',
                }}
              />

              {[
                { label: 'Les Vezo', id: 'vezo' },
                { label: 'Mission', id: 'mission' },
                { label: 'Projets', id: 'projet' },
                { label: 'Actualités', id: 'actualites' },
                { label: 'Galerie', id: 'galerie' },
                { label: 'Contact', id: 'contact' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    ref={el => { navRefs.current[id] = el; }}
                    onClick={() => scrollToSection(id)}
                    className="relative px-3.5 py-2 z-10"
                  >
                    <span style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontSize: '10.5px',
                      fontWeight: activeNav === id ? 600 : 400,
                      letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                      color: activeNav === id ? '#0D1F2D' : 'rgba(255,255,255,0.5)',
                      transition: 'color 0.25s, font-weight 0.25s',
                    }}>{label}</span>
                  </button>
                </li>
              ))}

              <li className="ml-3">
                <button
                  onClick={() => scrollToSection('soutenir')}
                  className="relative overflow-hidden group"
                  style={{
                    padding: '9px 20px',
                    borderRadius: '10px',
                    background: activeNav === null
                      ? 'linear-gradient(135deg, #C8873A 0%, #E8A85A 100%)'
                      : 'rgba(255,255,255,0.08)',
                    border: activeNav === null ? 'none' : '1px solid rgba(255,255,255,0.12)',
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: activeNav === null ? '#0D1F2D' : 'rgba(255,255,255,0.6)',
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(200,135,58,0.35)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <span className="relative z-10">Nous Soutenir</span>
                </button>
              </li>
            </ul>

            {/* BURGER MOBILE */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label="Menu"
            >
              <span className={`block h-px bg-white transition-all duration-300 ${isMenuOpen ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5'}`} />
              <span className={`block h-px bg-white/60 transition-all duration-300 ${isMenuOpen ? 'w-0 opacity-0' : 'w-3.5'}`} />
              <span className={`block h-px bg-white transition-all duration-300 ${isMenuOpen ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-5'}`} />
            </button>
          </div>

          {/* MENU MOBILE */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-white/[0.08] px-5 pb-5 pt-3 space-y-1"
            >
              {[
                { label: 'Les Vezo', id: 'vezo' },
                { label: 'Mission', id: 'mission' },
                { label: 'Projets', id: 'projet' },
                { label: 'Actualités', id: 'actualites' },
                { label: 'Galerie', id: 'galerie' },
                { label: 'Contact', id: 'contact' },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left py-2.5 border-b border-white/[0.05] text-white/50 hover:text-white transition-colors"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
                >
                  {label}
                </button>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => scrollToSection('soutenir')}
                  className="w-full py-3 rounded-xl text-[#0D1F2D] font-semibold"
                  style={{ background: 'linear-gradient(135deg, #C8873A, #E8A85A)', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase' }}
                >
                  Nous Soutenir
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={pirogueVezo}
            alt="Pirogue Vezo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D5C]/60 via-[#0A3D5C]/30 to-[#0D1F2D]/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-[#C8873A]/90 text-white text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Association Nationale — Madagascar
            </span>
            <h2 className="font-clash text-5xl md:text-7xl text-white mb-6 leading-tight">
              Racine des<br />
              <span className="text-[#E8A85A]">Vezo Unis</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/85 mb-10 leading-relaxed">
              VAVEA soutient les pêcheurs Vezo de Madagascar — nomades de la mer — en préservant leur culture ancestrale et en défendant leurs intérêts face aux défis modernes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('vezo')}
                className="bg-[#C8873A] hover:bg-[#E8A85A] text-white px-8 py-4 rounded-md font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center gap-2"
              >
                Découvrir les Vezo
                <ChevronDown className="animate-bounce" size={20} />
              </button>
              <button
                onClick={() => scrollToSection('soutenir')}
                className="border border-white/50 hover:border-white text-white px-8 py-4 rounded-md font-semibold text-lg transition-all hover:bg-white/10"
              >
                Nous soutenir
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="relative overflow-hidden bg-[#061c2a] py-2">
        {/* Filet top ocre */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8873A]/50 to-transparent" />
        {/* Filet bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        {/* Lueur centrale ambiante */}
        

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {(() => {
              const stats = [
                { numeric: 500, suffix: ' km', label: 'de côte surveillée', isNumeric: true },
                { numeric: 20000, suffix: '', prefix: '~', label: 'Vezo en Madagascar', isNumeric: true },
                { numeric: 1000, suffix: '+', label: 'familles soutenues', isNumeric: true },
                { numeric: null, text: 'Toliara', label: 'capitale historique Vezo', isNumeric: false },
              ];
              return stats.map(({ numeric, suffix, prefix, text, label, isNumeric }, i) => {
                const StatCell = () => {
                  const ref = useRef<HTMLDivElement>(null);
                  const numRef = useRef<HTMLSpanElement>(null);
                  const lineRef = useRef<HTMLDivElement>(null);
                  const inView = useInView(ref, { once: true, margin: '-60px' });

                  useEffect(() => {
                    if (!inView) return;
                    // Animate count-up for numeric values
                    if (isNumeric && numRef.current && numeric !== null) {
                      const el = numRef.current;
                      const ctrl = animate(0, numeric, {
                        duration: 1.6,
                        delay: i * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                        onUpdate(v) {
                          el.textContent = (prefix ?? '') + Math.round(v).toLocaleString('fr-FR') + (suffix ?? '');
                        },
                      });
                      return () => ctrl.stop();
                    }
                  }, [inView]);

                  return (
                    <motion.div
                      ref={ref}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className={`group relative flex flex-col items-center justify-center text-center px-6 py-10
                        ${i < 3 ? 'md:border-r border-white/[0.05]' : ''}
                        ${i < 2 ? 'border-b md:border-b-0 border-white/[0.05]' : ''}
                      `}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(200,135,58,0.07) 0%, transparent 70%)' }} />

                      {/* Numéro animé */}
                      <div className="mb-3 overflow-hidden">
                        <motion.div
                          initial={{ y: '100%' }}
                          animate={inView ? { y: 0 } : {}}
                          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {isNumeric ? (
                            <span
                              ref={numRef}
                              style={{
                                fontFamily: "'Clash Display', sans-serif",
                                fontSize: '42px',
                                fontWeight: 600,
                                letterSpacing: '-0.01em',
                                background: 'linear-gradient(160deg, #EDD08A 0%, #C8873A 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                lineHeight: 1,
                                display: 'block',
                              }}
                            >
                              {prefix ?? ''}{(0).toLocaleString('fr-FR')}{suffix ?? ''}
                            </span>
                          ) : (
                            <span style={{
                              fontFamily: "'Clash Display', sans-serif",
                              fontSize: '42px',
                              fontWeight: 600,
                              letterSpacing: '-0.01em',
                              background: 'linear-gradient(160deg, #EDD08A 0%, #C8873A 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              lineHeight: 1,
                              display: 'block',
                            }}>
                              {text}
                            </span>
                          )}
                        </motion.div>
                      </div>

                      {/* Ligne animée */}
                      <motion.div
                        ref={lineRef}
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.12 + 0.3, ease: 'easeOut' }}
                        className="h-px w-8 mb-3 origin-left"
                        style={{ background: 'linear-gradient(90deg, #C8873A, transparent)' }}
                      />

                      {/* Label */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.12 + 0.4 }}
                        style={{
                          fontFamily: "'Cabinet Grotesk', sans-serif",
                          fontSize: '10px',
                          fontWeight: 400,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.35)',
                        }}
                      >
                        {label}
                      </motion.p>
                    </motion.div>
                  );
                };
                return <StatCell key={label} />;
              });
            })()}
          </div>
        </div>
      </section>

      {/* Qui sont les Vezo */}
      <section id="vezo" className="py-24 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Colonne gauche — titre + image + citation */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:sticky md:top-28"
            >
              <span className="inline-block text-[#C8873A] uppercase tracking-[0.2em] mb-4"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '11px', fontWeight: 500 }}>
                Peuple de la mer
              </span>
              <h3 className="font-clash text-4xl md:text-5xl text-[#0A3D5C] mb-5 leading-tight">
                Qui sont<br />les Vezo ?
              </h3>
              <div className="w-12 h-0.5 bg-[#C8873A] mb-6"></div>
              <p className="text-[#4A6070] leading-relaxed mb-8">
                Surnommés les <em>« nomades de la mer »</em>, les Vezo sont un peuple de pêcheurs semi-nomades localisés sur la côte sud-ouest de Madagascar, entre Morombe et Toliara. Leur nom signifie littéralement <strong>« ceux qui rament »</strong>.
              </p>

              <div className="relative">
                <ImageWithFallback
                  src={elenaHeatherwick}
                  alt="Pêcheurs Vezo traditionnels"
                  className="w-full h-[360px] object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#0D1F2D]/80 backdrop-blur-sm text-white p-4 rounded-xl">
                  <p className="font-clash text-base leading-snug text-white/90 font-[Anonymous_Pro] italic">
                    « Ils vivent au rythme des marées et des saisons de pêche »
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Colonne droite — cartes */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              {[
                {
                  icon: <Anchor size={18} />,
                  title: 'Navigation traditionnelle',
                  text: "Ils utilisent des pirogues à balancier (lakana) gréées d'une voile carrée, fabriquées dans du bois léger. Ces embarcations sont le symbole même de leur identité.",
                },
                {
                  icon: <BookOpen size={18} />,
                  title: 'Culture & Croyances',
                  text: 'Profondément animistes, les Vezo respectent de nombreux fady (tabous) et croient que les esprits des ancêtres veillent sur la mer. La modération est centrale : ils ne prélèvent que ce dont ils ont besoin.',
                },
                {
                  icon: <Users size={18} />,
                  title: 'Rôles sociaux',
                  text: 'Les hommes pêchent au large (poissons, requins), tandis que les femmes collectent les poulpes, oursins et coquillages à marée basse sur le platier corallien.',
                },
                {
                  icon: <Leaf size={18} />,
                  title: 'Défis actuels',
                  text: 'Le mode de vie Vezo est menacé par la surpêche industrielle, la dégradation des récifs coralliens et le changement climatique. VAVEA est là pour les accompagner.',
                  highlight: true,
                },
              ].map(({ icon, title, text, highlight }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className={`flex gap-4 p-5 rounded-xl border transition-shadow hover:shadow-md ${
                    highlight
                      ? 'bg-[#0A3D5C]/[0.04] border-[#0A3D5C]/15'
                      : 'bg-white border-[#E8E4DF]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ background: highlight ? '#0A3D5C' : '#1A7FA3' }}>
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A3D5C] mb-1 text-sm">{title}</h4>
                    <p className="text-[#4A6070] text-sm leading-relaxed">{text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-clash text-4xl md:text-5xl text-[#0A3D5C] mb-6">
              Notre Mission
            </h3>
            <div className="w-24 h-1 bg-[#C8873A] mx-auto mb-8"></div>
            <p className="text-lg text-[#4A6070] max-w-3xl mx-auto leading-relaxed">
              VAVEA — <em>Vahatse ty Vezo Aharo</em>, « Racine des Vezo Unis » — est l'association nationale regroupant la communauté Vezo à Madagascar. Elle agit comme un pont entre les traditions ancestrales et les défis modernes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                color: '#1A7FA3',
                icon: <Heart size={28} />,
                title: 'Solidarité & Entraide',
                text: "L'association soutient les Vezo installés dans les grandes villes (comme Antananarivo) pour leurs études, leur recherche d'emploi et leurs soins médicaux.",
              },
              {
                color: '#C8873A',
                icon: <BookOpen size={28} />,
                title: 'Préservation Culturelle',
                text: "Lors de ses assemblées, les traditions sont mises à l'honneur : maniement de la pagaie traditionnelle, tenues des chefs spirituels (Hazomanga) et chants rituels.",
              },
              {
                color: '#3DB4D8',
                icon: <MapPin size={28} />,
                title: 'Développement Régional',
                text: "VAVEA participe à des projets d'infrastructure à Toliara, capitale historique de la région Vezo, et soutient l'algoculture et les nouvelles activités durables.",
              },
            ].map(({ color, icon, title, text }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#F5F2ED] p-8 rounded-xl hover:shadow-xl transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto text-white"
                  style={{ backgroundColor: color }}
                >
                  {icon}
                </div>
                <h4 className="font-clash text-xl text-[#0A3D5C] mb-4 text-center">{title}</h4>
                <p className="text-[#4A6070] text-center leading-relaxed text-sm">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Toliara highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[#0A3D5C] to-[#1A7FA3] rounded-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-14">
                <span className="text-[#E8A85A] text-xs uppercase tracking-widest font-medium">Siège social</span>
                <h4 className="font-clash text-3xl text-white mt-2 mb-4">
                  Toliara, la Cité du Soleil
                </h4>
                <p className="text-white/80 leading-relaxed mb-6">
                  Capitale du Sud-Ouest malgache et cœur battant de la culture Vezo, Toliara abrite le siège de VAVEA. L'association y mène ses projets d'infrastructure et ses rencontres annuelles qui rassemblent la communauté Vezo de toute l'île.
                </p>
                <div className="flex items-center gap-2 text-[#3DB4D8] text-sm">
                  <MapPin size={16} />
                  <span>Côte sud-ouest de Madagascar — entre Morombe et Toliara</span>
                </div>
              </div>
              <div className="h-64 md:h-full min-h-[280px]">
                <ImageWithFallback
                  src={pirogueVezoMorombe}
                  alt="Pirogue Vezo à Morombe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projet Section */}
      <section id="projet" className="py-24 bg-[#0A3D5C]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-clash text-4xl md:text-5xl text-white mb-6">
              Nos Projets
            </h3>
            <div className="w-24 h-1 bg-[#C8873A] mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos initiatives concrètes pour un avenir durable des communautés Vezo et de leur environnement marin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                image: localVezoFishers,
                alt: 'Pêcheurs Vezo',
                title: 'Équipement des pêcheurs',
                text: 'Fourniture de matériel de pêche durable et sécurisé pour améliorer les conditions de travail et les revenus des familles Vezo.',
                tag: 'En cours',
              },
              {
                image: sloPirogue,
                alt: 'Départ matinal',
                title: 'Formation & Éducation',
                text: "Ateliers sur la pêche durable, la conservation marine et le développement de nouvelles activités comme l'algoculture pour les nouvelles générations.",
                tag: 'En cours',
              },
              {
                image: pirogueNumber,
                alt: 'Pirogue numérotée',
                title: 'Zones Marines Protégées',
                text: 'Création et gestion de zones de protection pour permettre la régénération des récifs coralliens et la reconstitution des stocks de poissons.',
                tag: 'Planifié',
              },
            ].map(({ image, alt, title, text, tag }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/8 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/12 transition-colors"
              >
                <div className="h-52 overflow-hidden">
                  <ImageWithFallback
                    src={image}
                    alt={alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-[#C8873A] uppercase tracking-widest font-medium">{tag}</span>
                  <h4 className="font-clash text-xl text-white mt-2 mb-3">{title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Actualités Section */}
      <section id="actualites" className="py-24 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3
              className="text-4xl md:text-5xl text-[#0A3D5C] mb-6"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Actualités
            </h3>
            <div className="w-24 h-1 bg-[#C8873A] mx-auto mb-8"></div>
            <p className="text-lg text-[#4A6070] max-w-2xl mx-auto leading-relaxed">
              Suivez la vie de l'association et de la communauté Vezo.
            </p>
          </motion.div>

          {/* Actu 1 — élection présidentielle */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden mb-10 grid md:grid-cols-5"
          >
            <div className="md:col-span-2 h-64 md:h-auto overflow-hidden">
              <ImageWithFallback
                src={president}
                alt="Élection du président VAVEA"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#C8873A] text-xs uppercase tracking-widest font-medium mb-4">
                <Calendar size={13} />
                <span>Février 2026 — Élection</span>
              </div>
              <h4
                className="text-2xl md:text-3xl text-[#0A3D5C] mb-4 leading-snug"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                René John Walson élu à la tête de VAVEA
              </h4>
              <p className="text-[#4A6070] text-sm leading-relaxed mb-4">
                Sans surprise, René John Walson est élu président de l'association nationale regroupant les natifs de l'ethnie Vezo. Lors du scrutin, il a obtenu <strong>354 voix</strong> sur 471 électeurs. Julien Mandrano, qui avait déclaré forfait la veille, a quand même obtenu 38 voix, tandis que 21 électeurs se sont prononcés pour le troisième candidat, Lahiniriko Sébastien Tsaboahake.
              </p>
              <p className="text-[#4A6070] text-sm leading-relaxed mb-6">
                Malgré une contestation interne sur la liste des grands électeurs et des déclarations de nullité sur les réseaux sociaux, l'élection s'est tenue et le président élu a été officiellement déclaré. La date de son installation officielle est attendue prochainement.
              </p>
              <div className="flex items-center gap-2 text-[#1A7FA3] text-sm font-medium cursor-pointer hover:text-[#C8873A] transition-colors">
                <span>Lire l'article complet</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </motion.article>

          {/* Actu 2 & 3 — side by side */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Actu 2 — section Antananarivo */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              <div className="h-52 overflow-hidden bg-[#0A3D5C]/10 flex items-center justify-center relative">
                <ImageWithFallback
                  src={pirogueNumber}
                  alt="Section Antananarivo VAVEA"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D5C]/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-xs uppercase tracking-widest opacity-80">Antananarivo</span>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[#C8873A] text-xs uppercase tracking-widest font-medium mb-3">
                  <Calendar size={13} />
                  <span>Fin 2023 — Section capitale</span>
                </div>
                <h4
                  className="text-xl text-[#0A3D5C] mb-3 leading-snug"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  VAVEA Antananarivo : une plateforme d'entraide pour les Vezo de la capitale
                </h4>
                <p className="text-[#4A6070] text-sm leading-relaxed flex-1">
                  Présidée par le général Jean Hubert Zipa, la branche Antananarivo de VAVEA s'est officiellement présentée au restaurant Mon Goûter. Elle se positionne comme plateforme d'entraide pour tout Vezo ayant rejoint la Ville des Mille — pour des études, trouver un emploi ou se soigner.
                </p>
                <p className="text-[#4A6070] text-xs mt-3 italic">Par Maminirina Rado</p>
              </div>
            </motion.article>

            {/* Actu 3 — Vez'tival */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              <div className="h-52 overflow-hidden">
                <ImageWithFallback
                  src={veztival}
                  alt="Vez'tival — festival culturel Vezo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[#C8873A] text-xs uppercase tracking-widest font-medium mb-3">
                  <Calendar size={13} />
                  <span>Toliara — Festival culturel</span>
                </div>
                <h4
                  className="text-xl text-[#0A3D5C] mb-3 leading-snug"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  9ème édition du Vez'tival : trois jours de culture Vezo à Toliara
                </h4>
                <p className="text-[#4A6070] text-sm leading-relaxed flex-1">
                  L'association a organisé la 9ème édition de son grand festival culturel à Toliara. Pendant trois jours, le Vez'tival a célébré les traditions Vezo — danses, chants rituels, maniement de la pagaie — et le sport de contact traditionnel : le <em>moraingy</em>.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-[#0A3D5C]/8 text-[#0A3D5C] text-xs px-3 py-1 rounded-full">
                    Culture & Traditions
                  </span>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Galerie Section */}
      <section id="galerie" className="py-24 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-clash text-4xl md:text-5xl text-[#0A3D5C] mb-6">
              Le Peuple Vezo
            </h3>
            <div className="w-24 h-1 bg-[#C8873A] mx-auto mb-8"></div>
            <p className="text-lg text-[#4A6070] max-w-3xl mx-auto leading-relaxed">
              Immersion dans le quotidien des pêcheurs Vezo, gardiens ancestraux de l'océan Indien.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { src: localVezoFishers, alt: 'Pêcheurs Vezo sur leurs pirogues', caption: 'Sortie en mer au lever du soleil' },
              { src: sloPirogue, alt: 'Départ matinal des pirogues', caption: "Départ à l'aube, tradition immuable" },
              { src: elenaHeatherwick, alt: 'Pêcheurs Vezo traditionnels', caption: 'Les lakana, symboles de leur identité' },
              { src: pirogueNumber, alt: 'Pirogue Vezo numérotée', caption: 'Immatriculation des embarcations' },
              { src: pirogueVezoMorombe, alt: 'Pirogue Vezo à Morombe', caption: 'Les eaux de Morombe', span: 'lg:col-span-2' },
            ].map(({ src, alt, caption, span }) => (
              <motion.div
                key={alt}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`overflow-hidden rounded-xl shadow-lg group relative ${span ?? ''}`}
              >
                <ImageWithFallback
                  src={src}
                  alt={alt}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0D1F2D]/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm">{caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-clash text-4xl md:text-5xl text-[#0A3D5C] mb-6">
              Nous Contacter
            </h3>
            <div className="w-24 h-1 bg-[#C8873A] mx-auto mb-8"></div>
            <p className="text-lg text-[#4A6070] max-w-3xl mx-auto leading-relaxed">
              Vous souhaitez en savoir plus sur nos actions, rejoindre notre mission ou proposer un partenariat ? N'hésitez pas à nous écrire.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h4 className="font-clash text-xl text-[#0A3D5C] mb-3">Association VAVEA</h4>
                <p className="text-[#4A6070] text-sm leading-relaxed">
                  Vahatse ty Vezo Aharo<br />
                  Siège social — Toliara, Madagascar
                </p>
              </div>
              <div className="space-y-3 text-sm text-[#4A6070]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1A7FA3]/10 rounded-full flex items-center justify-center">
                    <MapPin size={14} className="text-[#1A7FA3]" />
                  </div>
                  <span>Toliara (Tuléar), Madagascar</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#C8873A]/10 rounded-full flex items-center justify-center">
                    <Users size={14} className="text-[#C8873A]" />
                  </div>
                  <span>Association nationale des Vezo</span>
                </div>
              </div>
              <div className="bg-[#F5F2ED] rounded-xl p-5">
                <p className="text-[#0A3D5C] text-sm italic leading-relaxed">
                  « Dans le dialecte Masikoro, <em>vavea</em> désigne un partisan au service d'une cause juste. »
                </p>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-3 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nom" className="block text-[#0A3D5C] font-medium mb-2 text-sm">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="nom"
                    className="w-full px-4 py-3 border border-[#4A6070]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7FA3] focus:border-transparent bg-white text-sm"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#0A3D5C] font-medium mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-[#4A6070]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7FA3] focus:border-transparent bg-white text-sm"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sujet" className="block text-[#0A3D5C] font-medium mb-2 text-sm">
                  Sujet
                </label>
                <select
                  id="sujet"
                  className="w-full px-4 py-3 border border-[#4A6070]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7FA3] focus:border-transparent bg-white text-sm text-[#4A6070]"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option>Don & soutien financier</option>
                  <option>Partenariat institutionnel</option>
                  <option>Bénévolat sur le terrain</option>
                  <option>Presse & médias</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[#0A3D5C] font-medium mb-2 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-[#4A6070]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7FA3] focus:border-transparent resize-none bg-white text-sm"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C8873A] hover:bg-[#E8A85A] text-white px-8 py-4 rounded-lg font-semibold text-base transition-all transform hover:scale-105"
              >
                Envoyer le message
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Soutenir Section */}
      <section id="soutenir" className="py-24 bg-gradient-to-br from-[#0A3D5C] to-[#1A7FA3]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h3 className="font-clash text-4xl md:text-5xl text-white mb-6">
              Soutenez Notre Mission
            </h3>
            <div className="w-24 h-1 bg-[#C8873A] mx-auto mb-8"></div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Votre soutien nous permet de continuer notre travail auprès des communautés Vezo et de protéger les océans pour les générations futures.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🌊',
                title: 'Don Unique',
                text: 'Faites un don ponctuel pour soutenir directement nos projets en cours à Toliara et dans les villages côtiers.',
                cta: 'Faire un don',
                featured: false,
              },
              {
                emoji: '🤝',
                title: 'Partenariat',
                text: 'Engagez votre organisation à nos côtés pour des projets à long terme en faveur des communautés Vezo.',
                cta: 'Devenir partenaire',
                featured: true,
              },
              {
                emoji: '👥',
                title: 'Bénévolat',
                text: "Rejoignez notre équipe de bénévoles sur le terrain et participez directement à la vie de l'association.",
                cta: 'S\'engager',
                featured: false,
              },
            ].map(({ emoji, title, text, cta, featured }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`p-8 rounded-xl flex flex-col ${
                  featured
                    ? 'bg-white text-[#0A3D5C] shadow-2xl scale-105'
                    : 'bg-white/10 backdrop-blur-sm text-white'
                }`}
              >
                <div className="text-5xl mb-5">{emoji}</div>
                <h4 className={`font-clash text-2xl mb-3 ${featured ? 'text-[#0A3D5C]' : 'text-white'}`}>
                  {title}
                </h4>
                <p className={`mb-8 leading-relaxed text-sm flex-1 ${featured ? 'text-[#4A6070]' : 'text-white/80'}`}>
                  {text}
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    featured
                      ? 'bg-[#C8873A] hover:bg-[#E8A85A] text-white'
                      : 'border border-white/50 hover:border-white hover:bg-white/10 text-white'
                  }`}
                >
                  {cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1F2D] text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <ImageWithFallback
                  src={logoVavea}
                  alt="VAVEA Logo"
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-clash text-xl">VAVEA</h4>
                  <p className="text-[#3DB4D8] text-xs uppercase tracking-widest">
                    Vahatse ty Vezo Aharo
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Association nationale regroupant la communauté Vezo de Madagascar. Ensemble pour la préservation de leur culture et la protection de leur océan.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h5>
              <ul className="space-y-2 text-white/60 text-sm">
                {[
                  { label: 'Les Vezo', id: 'vezo' },
                  { label: 'Notre Mission', id: 'mission' },
                  { label: 'Nos Projets', id: 'projet' },
                  { label: 'Actualités', id: 'actualites' },
                  { label: 'Galerie', id: 'galerie' },
                  { label: 'Contact', id: 'contact' },
                ].map(({ label, id }) => (
                  <li key={id}>
                    <button onClick={() => scrollToSection(id)} className="hover:text-[#C8873A] transition-colors">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h5>
              <p className="text-white/60 text-sm mb-4">
                Recevez nos actualités et l'avancement de nos projets.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8873A] text-sm"
                />
                <button className="bg-[#C8873A] hover:bg-[#E8A85A] px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
            <p>© 2026 VAVEA — Vahatse ty Vezo Aharo. Tous droits réservés.</p>
            <p>Toliara, Madagascar</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
