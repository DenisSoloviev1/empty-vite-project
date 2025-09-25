import { FC, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const LockIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
};

export const LogoutIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m16 17 5-5-5-5"></path>
      <path d="M21 12H9"></path>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    </svg>
  );
};

export const ServerIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
      <line x1="6" x2="6.01" y1="6" y2="6"></line>
      <line x1="6" x2="6.01" y1="18" y2="18"></line>
    </svg>
  );
};

export const TerminalIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  );
};

export const SwitchIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18.36 6.64A9 9 0 0 1 20.77 15"></path>
      <path d="M6.16 6.16a9 9 0 1 0 12.68 12.68"></path>
      <path d="M12 2v4"></path>
      <path d="m2 2 20 20"></path>
    </svg>
  );
};

export const SwitchCrossIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v10"></path>
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>
    </svg>
  );
};

export const ClockIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 6v6l4 2"></path>
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  );
};

export const ClockLoadingIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 17 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M15.1667 7.99999C15.1667 11.6819 12.1819 14.6667 8.50004 14.6667C4.81814 14.6667 1.83337 11.6819 1.83337 7.99999C1.83337 4.3181 4.81814 1.33333 8.50004 1.33333C12.1819 1.33333 15.1667 4.3181 15.1667 7.99999Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="0.5 3.5"
      />
      <path
        d="M15.1666 7.99999C15.1666 4.3181 12.1819 1.33333 8.49996 1.33333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.5 6V8.66667H11.1667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const WarningIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
      <path d="M12 9v4"></path>
      <path d="M12 17h.01"></path>
    </svg>
  );
};

export const SearchIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m21 21-4.34-4.34"></path>
      <circle cx="11" cy="11" r="8"></circle>
    </svg>
  );
};

export const UpdateIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
      <path d="M8 16H3v5"></path>
    </svg>
  );
};

export const PlanetIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
      <path d="M2 12h20"></path>
    </svg>
  );
};

export const NetworkIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M12.761 3.33334C13.9398 4.53584 14.6667 6.18304 14.6667 8.00001C14.6667 9.83855 13.9224 11.5033 12.7188 12.7093M3.33334 12.761C2.0991 11.551 1.33334 9.86494 1.33334 8.00001C1.33334 6.15665 2.08149 4.48804 3.2907 3.28123"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8566 5.36264C11.5639 6.03917 12 6.96589 12 7.98813C12 9.0225 11.5535 9.95908 10.8313 10.6376M5.2 10.6667C4.45946 9.98594 4 9.03735 4 7.98813C4 6.95105 4.44889 6.01228 5.17441 5.33333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="7.99999"
        cy="8"
        r="1.33333"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const VersionIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <g clip-path="url(#clip0_277_4690)">
        <path
          d="M8.86264 4.78027L7.99991 8.00003L7.13718 11.2198"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="8.00001"
          cy="7.99999"
          r="6.66667"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_277_4690">
          <rect width="16" height="16" rx="5" fill="none" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const UserIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <g clip-path="url(#clip0_277_4956)">
        <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle
          cx="7.99999"
          cy="7.99999"
          r="6.66667"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M11.9795 13.3333C11.8734 11.4057 11.2832 10 8 10C4.71684 10 4.12664 11.4057 4.02054 13.3333"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_277_4956">
          <rect width="16" height="16" fill="none" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TrashIcon: FC<IconSvgProps> = ({
  width,
  height,
  size = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.07041 5.00191C6.22867 3.57757 7.4326 2.5 8.86571 2.5H11.1343C12.5674 2.5 13.7713 3.57757 13.9296 5.00191L13.9988 5.625H16.25V7.5H15.4278L15.4277 7.50109L14.6106 15.2626C14.4767 16.535 13.4038 17.5009 12.1244 17.5009H7.87567C6.59627 17.5009 5.52333 16.535 5.3894 15.2626L4.57244 7.50109L4.57233 7.5H3.75V5.625H6.00117L6.07041 5.00191ZM12.0661 5.20897L12.1123 5.625H7.88771L7.93394 5.20897C7.98669 4.73419 8.388 4.375 8.86571 4.375H11.1343C11.612 4.375 12.0133 4.73419 12.0661 5.20897ZM7.2541 15.0663L6.4578 7.50109H13.5423L12.7459 15.0663C12.7124 15.3844 12.4442 15.6259 12.1244 15.6259H7.87567C7.55582 15.6259 7.28758 15.3844 7.2541 15.0663Z"
        fill="currentColor"
      />
    </svg>
  );
};
