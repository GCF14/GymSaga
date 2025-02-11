import React from 'react';

const GymSagaSquare: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background rectangle scaled from 1000×1000 to 40×40 with rx scaled to 6 */}
    <rect width="40" height="40" rx="6" fill="hsl(var(--foreground))" />

    {/* First mask (all numbers multiplied by 0.04) */}
    <mask
      id="mask0_13_279"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="19.80"
      y="21.48"
      width="15.20"
      height="6.12"
    >
      <rect
        x="35.00"
        y="27.58"
        width="15.18"
        height="6.07"
        transform="rotate(180 35 27.58)"
        fill="hsl(var(--background))"
      />
    </mask>
    <g mask="url(#mask0_13_279)">
      <path
        d="M21.19 24.35 C22.12 25.67 23.44 26.66 24.97 27.18 C26.50 27.70 28.15 27.72 29.69 27.23 C31.23 26.75 32.58 25.78 33.53 24.48 C34.49 23.18 35.00 21.61 35.00 20.00 L27.41 20.00 L21.19 24.35 Z"
        fill="hsl(var(--background))"
      />
    </g>

    {/* Second mask */}
    <mask
      id="mask1_13_279"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="19.80"
      y="12.40"
      width="15.20"
      height="6.08"
    >
      <rect x="19.82" y="12.40" width="15.18" height="6.07" fill="white" />
    </mask>
    <g mask="url(#mask1_13_279)">
      <path
        d="M33.63 15.64 C32.70 14.31 31.38 13.32 29.85 12.80 C28.32 12.28 26.66 12.27 25.13 12.75 C23.59 13.24 22.24 14.20 21.29 15.50 C20.33 16.80 19.82 18.38 19.82 20.00 L27.41 20.00 L33.63 15.64 Z"
        fill="hsl(var(--background))"
      />
    </g>

    {/* The small connecting shape */}
    <path
      d="M12.59 18.47 H20 L20.12 19.23 L20.18 20.00 L20.12 20.75 L20 21.51 H12.59 V18.47 Z"
      fill="hsl(var(--background))"
    />

    {/* The long detailed path, with all coordinates scaled by 0.04 */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.17 22.81 C16.80 22.01 17.15 21.01 17.15 20.00 H18.18 H19.15 H20.18 C20.18 20.67 20.09 21.34 19.91 22.00 C19.65 22.97 19.19 23.89 18.55 24.69 C17.50 26.03 16.02 26.97 14.36 27.37 C12.71 27.77 10.96 27.60 9.41 26.88 C7.86 26.17 6.60 24.96 5.83 23.44 C5.51 22.82 5.29 22.18 5.15 21.51 H8.30 C8.36 21.70 8.44 21.88 8.53 22.06 C9.00 22.97 9.76 23.70 10.68 24.13 C11.61 24.56 12.66 24.66 13.65 24.42 C14.65 24.18 15.53 23.61 16.17 22.81 Z
      
      M9.63 16.53 C9.02 17.05 8.56 17.72 8.30 18.47 H5.15 C5.49 16.82 6.37 15.32 7.66 14.22 C8.96 13.11 10.59 12.47 12.29 12.41 C13.32 12.37 14.33 12.53 15.28 12.89 C15.91 13.13 16.50 13.45 17.05 13.85 L16.44 14.69 L15.88 15.47 L15.27 16.31 C14.44 15.71 13.43 15.40 12.41 15.44 C11.39 15.48 10.41 15.86 9.63 16.53 Z
      
      M5.00 19.97 C5.00 19.99 5.00 20.00 5.00 20.01 V19.97 Z"
      fill="hsl(var(--background))"
    />
  </svg>
);

export default GymSagaSquare;
