import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import NarenSJImage from '../assets/NarenSJ.jpeg';
import NisargaKShetty from '../assets/NisargaKShetty.jpeg';
interface ContributorsPageProps {
  onBack: () => void;
}

const contributors = [
  {
    name: 'Naren S J',
    role: 'Developer',
    description: 'Full-stack developer and Prompt Engineer',
    bgColor: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    shadowColor: 'rgba(59, 130, 246, 0.5)',
    shadowColorBright: 'rgba(59, 130, 246, 0.8)',
  },
  {
    name: 'Nisarga K Shetty',
    role: 'Developer',
    description: 'Developer and Ml engineer',
    bgColor: 'linear-gradient(135deg, #ec4899, #a855f7)',
    shadowColor: 'rgba(244, 114, 182, 0.5)',
    shadowColorBright: 'rgba(244, 114, 182, 0.8)',
  },
];

const containerStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f0a1f, #2d1b4e, #1a0f3a)',
  overflow: 'auto',
};

const backgroundDotsContainerStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
};

const mainContentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '1rem',
};

const maxWidthContainerStyle: React.CSSProperties = {
  maxWidth: '80rem',
  width: '100%',
  margin: '0 auto',
};

const titleContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '4rem',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(2.5rem, 8vw, 4rem)',
  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #fcd34d, #fca5a5, #06b6d4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '1rem',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  color: 'rgba(255, 255, 255, 0.7)',
};

const backButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '2rem',
  left: '2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.75rem 1.5rem',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(12px)',
  borderRadius: '0.75rem',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '1rem',
  fontWeight: '500',
  zIndex: 50,
};

const contributorsLayoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '3rem',
  marginBottom: '3rem',
};

const contributorCardStyle = (bgColor: string, isMobile: boolean): React.CSSProperties => ({
  background: bgColor,
  padding: '2px',
  borderRadius: '1rem',
  width: isMobile ? '100%' : 'calc(50% - 1.5rem)',
  minHeight: isMobile ? '450px' : '500px',
});

const contributorInnerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #0f0a1f, #2d1b4e, #1a0f3a)',
  borderRadius: '1rem',
  padding: '2.5rem 2rem',
  backdropFilter: 'blur(4px)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const contributorTextCenterStyle: React.CSSProperties = {
  textAlign: 'center',
};

const avatarStyle = (bgGradient: string): React.CSSProperties => ({
  width: '8rem',
  height: '8rem',
  borderRadius: '50%',
  background: bgGradient,
  margin: '0 auto 1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

const profileImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
};

const avatarTextStyle: React.CSSProperties = {
  fontSize: '2.25rem',
  fontWeight: 'bold',
  color: 'white',
};

const nameStyle: React.CSSProperties = {
  fontSize: '1.875rem',
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '0.75rem',
  marginTop: '1rem',
};

const roleStyle = (bgGradient: string): React.CSSProperties => ({
  fontSize: '1rem',
  background: bgGradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: '600',
  marginBottom: '1.25rem',
});

const descriptionStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: '1rem',
  lineHeight: '1.6',
  letterSpacing: '0.5px',
};

const footerStyle: React.CSSProperties = {
  marginTop: '4rem',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
};

const footerTextStyle: React.CSSProperties = {
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.6)',
};

export function ContributorsPage({ onBack }: ContributorsPageProps) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsiveContributorsLayoutStyle: React.CSSProperties = {
    ...contributorsLayoutStyle,
    flexDirection: isMobile ? 'column' : 'row',
  };
  return (
    <div style={containerStyle}>
      {/* Animated background */}
      <div style={backgroundDotsContainerStyle}>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              background: `hsl(${Math.random() * 360}, 100%, 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 20px hsl(${Math.random() * 360}, 100%, 70%)`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div style={mainContentStyle}>
        {/* Back button */}
        <motion.button
          onClick={onBack}
          style={backButtonStyle}
          whileHover={{ scale: 1.08, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium transition-all backdrop-blur-xl fixed top-6 left-6 z-50 md:top-8 md:left-8"
        >
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </motion.button>

        <div style={maxWidthContainerStyle}>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={titleContainerStyle}
          >
            <h1 style={titleStyle}>Contributors</h1>
            <p style={subtitleStyle}>Meet the people behind this project</p>
          </motion.div>

          {/* Contributors layout - one on left, one on right */}
          <div style={responsiveContributorsLayoutStyle}>
            {/* Left Contributor - Naren S J */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              style={contributorCardStyle(contributors[0].bgColor, isMobile)}
            >
              <div style={contributorInnerStyle}>
                <div style={contributorTextCenterStyle}>
                  <motion.div
                    style={avatarStyle(contributors[0].bgColor)}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        `0 0 20px ${contributors[0].shadowColor}`,
                        `0 0 40px ${contributors[0].shadowColorBright}`,
                        `0 0 20px ${contributors[0].shadowColor}`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <img src={NarenSJImage} alt={contributors[0].name} style={profileImageStyle} />
                  </motion.div>
                  <h2 style={nameStyle}>{contributors[0].name}</h2>
                  <p style={roleStyle(contributors[0].bgColor)}>{contributors[0].role}</p>
                  <p style={descriptionStyle}>{contributors[0].description}</p>
                </div>
              </div>
            </motion.div>

            {/* Right Contributor - Nisarga K Shetty */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={contributorCardStyle(contributors[1].bgColor, isMobile)}
            >
              <div style={contributorInnerStyle}>
                <div style={contributorTextCenterStyle}>
                  <motion.div
                    style={avatarStyle(contributors[1].bgColor)}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        `0 0 20px ${contributors[1].shadowColor}`,
                        `0 0 40px ${contributors[1].shadowColorBright}`,
                        `0 0 20px ${contributors[1].shadowColor}`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <img src={NisargaKShetty} alt={contributors[1].name} style={profileImageStyle} />
                  </motion.div>
                  <h2 style={nameStyle}>{contributors[1].name}</h2>
                  <p style={roleStyle(contributors[1].bgColor)}>{contributors[1].role}</p>
                  <p style={descriptionStyle}>{contributors[1].description}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={footerStyle}
          >
            <div style={footerTextStyle}>
              <p style={{ marginBottom: '1rem' }}> Happy New Year 2026</p>
              <p style={{ fontSize: '0.875rem' }}>© 2026 </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
