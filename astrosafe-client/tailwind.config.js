/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: 'var(--brand-black)',
          white: 'var(--brand-white)',
          blue: 'var(--brand-blue)',
          blueHover: 'var(--brand-blue-hover)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          secondary: 'var(--background-secondary)',
          hover: 'var(--surface-hover)',
          elevated: 'var(--surface-elevated)',
        },
        text: {
          primary: 'var(--text-primary)',
          body: 'var(--text-body)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        status: {
          success: 'var(--success)',
          warning: 'var(--warning)',
          danger: 'var(--danger)',
          info: 'var(--info)',
        },
        statusBg: {
          success: 'var(--success-bg)',
          warning: 'var(--warning-bg)',
          danger: 'var(--danger-bg)',
          info: 'var(--info-bg)',
        },
        diagnostic: {
          ip: 'var(--diagnostic-ip)',
          dns: 'var(--diagnostic-dns)',
          webrtc: 'var(--diagnostic-webrtc)',
          fingerprint: 'var(--diagnostic-fingerprint)',
          trackers: 'var(--diagnostic-trackers)',
          certificate: 'var(--diagnostic-certificate)',
        }
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.pixel-corners': {
          'clip-path': 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        },
        '.blueprint-bg': {
          'background-size': '40px 40px',
          'background-image': 'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}