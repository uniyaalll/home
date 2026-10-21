type IconProps = {
  name: string;
  className?: string;
  size?: number;
};

export function Icon({ name, className = "h-5 w-5", size = 20 }: IconProps) {
  const common = {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    className,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "logo":
      return (
        <svg {...common}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 3H21V21H3V3ZM15.2489 6.89326L10.1067 17.7489L8.75113 17.1067L13.8933 6.25113L15.2489 6.89326Z"
          />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common}>
          <path
            d="M10 16L14 12L10 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <path
            d="M8 10L12 14L16 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path
            d="M2.75 3.75V19.25H21.25V6.75H12L10 3.75H2.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "folder-open":
      return (
        <svg {...common}>
          <path d="M10.4014 3H2V20H22V6H12.4014L10.4014 3Z" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path
            d="M12.75 2.75H4.75V21.25H19.25V9.25L12.75 2.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12.75 3.25464V9.25007H18.7501"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "odyssey":
      return (
        <svg {...common}>
          <path d="M2 12.75C5.38067 12.75 7.64363 13.496 9.07384 14.9262C10.504 16.3564 11.25 18.6193 11.25 22H12.75C12.75 18.6193 13.496 16.3564 14.9262 14.9262C16.3564 13.496 18.6193 12.75 22 12.75V11.25C18.6193 11.25 16.3564 10.504 14.9262 9.07384C13.496 7.64363 12.75 5.38067 12.75 2H11.25C11.25 5.38067 10.504 7.64363 9.07384 9.07384C7.64363 10.504 5.38067 11.25 2 11.25V12.75Z" />
        </svg>
      );
    case "deximal":
      return (
        <svg {...common}>
          <g fill="none">
            {[
              [5, 3.5],
              [5, 7.8],
              [5, 12.1],
              [5, 16.3],
              [5, 20.6],
              [9.6, 3.3],
              [9.6, 7.7],
              [9.6, 12.1],
              [9.6, 16.5],
              [9.6, 20.9],
              [13.6, 3.3],
              [13.6, 7.7],
              [13.6, 12.1],
              [13.6, 16.4],
              [13.6, 20.8],
              [17.5, 7.8],
              [17.5, 12.1],
              [17.5, 16.4],
              [17.5, 3.8],
              [20.9, 12.1],
              [20.9, 16.5],
              [20.9, 7.7],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={i < 15 ? 1.1 : 0.7}
                stroke="currentColor"
                strokeWidth="0.6"
              />
            ))}
          </g>
        </svg>
      );
    case "life":
      return (
        <svg {...common}>
          <g fill="none" stroke="currentColor">
            <rect x="10.1" y="2.5" width="3.8" height="3.75" rx="0.9" />
            <path d="M9.13 9.63H14.88C16.3 9.63 16.3 12.1 15.05 12.96C13.71 12.52 12.55 12.19 12 12.19C11.45 12.19 10.29 12.52 8.95 12.96C7.7 12.1 7.7 9.63 9.13 9.63Z" />
            <path d="M6.24 16.75H17.76C19.5 16.75 19.5 19.83 18.49 20.5C16.97 20.13 13.55 19.25 12 19.25C10.45 19.25 7.03 20.13 5.51 20.5C4.5 19.83 4.5 16.75 6.24 16.75Z" />
          </g>
        </svg>
      );
    case "siphon":
      return (
        <svg {...common}>
          <path
            d="M8.78 3.05C7.25 4.1 5.94 5.44 5.57 7.57C5.37 9.24 5.7 10.51 6.33 11.54C6.96 12.57 7.87 13.33 8.77 13.99C9.71 14.68 10.59 15.22 11.33 15.87C12.06 16.51 12.56 17.18 12.73 18.02C12.89 18.8 12.76 19.45 12.43 20.01C12.11 20.54 11.6 21.01 10.95 21.43C6.2 20.9 2.5 16.88 2.5 11.99C2.5 7.87 5.12 4.37 8.78 3.05ZM13.04 2.55C17.8 3.07 21.5 7.09 21.5 11.99C21.5 16.11 18.87 19.63 15.19 20.94C16.71 19.89 18 18.56 18.38 16.43C18.58 14.77 18.25 13.5 17.62 12.46C16.99 11.44 16.08 10.67 15.18 10.01C14.24 9.33 13.36 8.78 12.61 8.13C11.89 7.49 11.38 6.83 11.21 5.98C11.09 5.03 11.24 4.47 11.53 3.98C11.86 3.44 12.38 2.96 13.04 2.55Z"
            fill="none"
            stroke="currentColor"
          />
        </svg>
      );
    case "streamius":
      return (
        <svg {...common}>
          <g fill="none" stroke="currentColor">
            <path d="M12 2.5C16.5 2.5 20.5 5.8 21.3 10.2C18.5 8.2 14.8 7.6 12 7.3C9.2 7.6 5.5 8.2 2.7 10.2C3.5 5.8 7.5 2.5 12 2.5Z" />
            <path d="M12 21.5C7.5 21.5 3.5 18.2 2.7 13.8C5.5 15.8 9.2 16.4 12 16.7C14.8 16.4 18.5 15.8 21.3 13.8C20.5 18.2 16.5 21.5 12 21.5Z" />
            <circle cx="12" cy="12" r="2.2" />
          </g>
        </svg>
      );
    case "labs":
      return (
        <svg {...common}>
          <g fill="none">
            <path
              d="M8.75 11V6.75H15.25V11C16.43 12.47 18.3 14.11 19 16.07C19.16 16.51 19.25 16.96 19.25 17.42C19.25 19.53 17.53 21.25 15.42 21.25H8.58C6.47 21.25 4.75 19.53 4.75 17.42C4.75 16.96 4.84 16.51 5 16.07C5.7 14.11 7.57 12.47 8.75 11Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8.75 6.75H7.75M15.25 6.75H16.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
            <path
              d="M5 16.07C5 16.07 7.67 15.51 9.41 15.55C11.47 15.61 12.53 16.53 14.59 16.59C16.32 16.64 19 16.07 19 16.07"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
            <circle cx="13.5" cy="2.5" r="0.75" stroke="currentColor" strokeWidth="1.5" />
          </g>
        </svg>
      );
    case "aeons":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 7.5V16.5M7.5 12H16.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
    case "anti":
      return (
        <svg {...common}>
          <path
            d="M4 4L20 20M20 4L4 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "based":
      return (
        <svg {...common}>
          <path
            d="M7 4H14C17 4 19 6.5 19 9.5C19 12.5 17 15 14 15H10V20H7V4ZM10 7V12H13.5C14.9 12 16 10.9 16 9.5C16 8.1 14.9 7 13.5 7H10Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "checks":
      return (
        <svg {...common}>
          <path
            d="M12 1.75L8.925 4.825H4.825V8.925L1.75 12L4.825 15.075V19.175H8.925L12 22.25L15.075 19.175H19.175V15.075L22.25 12L19.175 8.925V4.825H15.075L12 1.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <path
            d="M8.68 13.09L10.91 15.06L14.82 9.44"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
    case "editions":
      return (
        <svg {...common}>
          <g fill="none">
            <path
              d="M12 1.75L14.53 4.2L18.02 3.71L18.63 7.18L21.75 8.83L20.2 12L21.75 15.17L18.63 16.82L18.02 20.29L14.53 19.8L12 22.25L9.46 19.8L5.97 20.29L5.36 16.82L2.25 15.17L3.8 12L2.25 8.83L5.36 7.18L5.97 3.71L9.46 4.2L12 1.75Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12 8L13.29 10.22L15.8 10.76L14.09 12.68L14.35 15.24L12 14.2L9.65 15.24L9.91 12.68L8.2 10.76L10.71 10.22L12 8Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      );
    case "record":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="0.75" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M17.5652 3.25H20.5319L14.0505 10.6628L21.6753 20.75H15.7052L11.0291 14.6322L5.67867 20.75H2.71017L9.64264 12.8212L2.32812 3.25H8.44986L12.6766 8.84192L17.5652 3.25ZM16.524 18.9731H18.1679L7.55662 4.93359H5.79256L16.524 18.9731Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.2" cy="6.8" r="1" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M12 1.95C17.525 1.95 22 6.426 22 11.951C21.9995 14.046 21.342 16.088 20.12 17.79C18.898 19.492 17.173 20.768 15.188 21.438C14.688 21.538 14.5 21.226 14.5 20.963C14.5 20.626 14.513 19.551 14.513 18.213C14.513 17.276 14.2 16.676 13.838 16.363C16.063 16.113 18.4 15.263 18.4 11.426C18.4 10.326 18.013 9.438 17.375 8.738C17.475 8.488 17.825 7.463 17.275 6.088C17.275 6.088 16.438 5.813 14.525 7.113C13.725 6.888 12.875 6.776 12.025 6.776C11.175 6.776 10.325 6.888 9.525 7.113C7.613 5.826 6.775 6.088 6.775 6.088C6.225 7.463 6.575 8.488 6.675 8.738C6.038 9.438 5.65 10.338 5.65 11.426C5.65 15.251 7.975 16.113 10.2 16.363C9.913 16.613 9.65 17.051 9.563 17.701C8.988 17.963 7.55 18.388 6.65 16.876C6.463 16.576 5.9 15.838 5.113 15.851C4.275 15.863 4.775 16.326 5.125 16.513C5.55 16.751 6.038 17.638 6.15 17.926C6.35 18.488 7 19.563 9.513 19.101C9.513 19.938 9.525 20.726 9.525 20.963C9.525 21.226 9.338 21.526 8.838 21.438C6.846 20.775 5.113 19.502 3.886 17.799C2.659 16.096 1.999 14.05 2 11.951C2 6.426 6.475 1.95 12 1.95Z" />
        </svg>
      );
    case "info":
      return (
        <svg {...common} className={`${className} size-[1.125rem]`}>
          <path d="M20.25 3.75H21V3H20.25V3.75ZM20.25 20.25V21H21V20.25H20.25ZM3.75 20.25H3V21H3.75V20.25ZM3.75 3.75V3H3V3.75H3.75ZM10.75 10.25H10V11.75H10.75V10.25ZM12 11L12.75 11L12.75 10.25H12V11ZM11.25 16.25L11.25 17L12.75 17L12.75 16.25L11.25 16.25ZM19.5 3.75V20.25H21V3.75H19.5ZM20.25 19.5H3.75V21H20.25V19.5ZM4.5 20.25V3.75H3V20.25H4.5ZM3.75 4.5H20.25V3H3.75V4.5ZM10.75 11.75H12V10.25H10.75V11.75ZM11.25 11L11.25 16.25L12.75 16.25L12.75 11L11.25 11Z" />
          <path
            d="M11.5 7.375H11.375V7.5V8.5V8.625H11.5H12.5H12.625V8.5V7.5V7.375H12.5H11.5Z"
            stroke="currentColor"
            strokeWidth="0.25"
          />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path
            d="M5.75 3.31131L20.5208 12L5.75 20.6887V3.31131Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "pause":
      return (
        <svg {...common}>
          <path
            d="M6 4.5H9.5V19.5H6V4.5ZM14.5 4.5H18V19.5H14.5V4.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "mute":
      return (
        <svg {...common}>
          <path
            d="M21.5 10L19.3787 12.1213M19.3787 12.1213L17.2574 14.2426M19.3787 12.1213L17.2574 10M19.3787 12.1213L21.5 14.2426M1.75 7.75H6L12.25 4.25V19.75L6 16.25H1.75V7.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
    case "unmute":
      return (
        <svg {...common}>
          <path
            d="M1.75 7.75H6L12.25 4.25V19.75L6 16.25H1.75V7.75ZM15.5 9.5C16.5 10.2 17.25 11.5 17.25 12C17.25 12.5 16.5 13.8 15.5 14.5M18.5 7C20.5 8.5 21.75 10.5 21.75 12C21.75 13.5 20.5 15.5 18.5 17"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 2.5V4.5M12 19.5V21.5M2.5 12H4.5M19.5 12H21.5M5.05 5.05L6.46 6.46M17.54 17.54L18.95 18.95M18.95 5.05L17.54 6.46M6.46 17.54L5.05 18.95"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path
            d="M19.5 13.5C18.3 17.2 14.7 19.75 10.65 19.1C6.6 18.45 3.7 14.95 3.7 10.85C3.7 7.35 5.7 4.3 8.7 3C7.9 7.8 11.3 12.4 16.2 13.05C17.4 13.2 18.5 13.3 19.5 13.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "menu":
      return (
        <svg {...common} className={`${className} size-3.5`}>
          <path d="M4 7H20V10H4Z" />
          <path d="M4 13H20V16H4Z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path
            d="M12 6.75V12M12 12V17.25M12 12H6.75M12 12H17.25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
  }
}
