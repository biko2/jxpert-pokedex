export const Favourite: React.FC<{
  isChecked: boolean;
  onClick: (isChecked: boolean) => void;
}> = ({ isChecked, onClick }) => {
  const label = isChecked ? "Remove from favourites" : "Add to favourites";

  return (
    <button
      className={`card__favourite`}
      aria-label={label}
      aria-selected={isChecked}
      onClick={() => onClick(!isChecked)}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.00561 13.9372L4.06109 16.5L5.00561 11.0719L1 7.22816L6.52774 6.4384L9 1.5L11.4723 6.4384L17 7.22816L12.9944 11.0719L13.9389 16.5L9.00561 13.9372Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="white"
          strokeOpacity={isChecked ? 1 : 0.6}
          {...(isChecked && { fill: "white" })}
        />
      </svg>
    </button>
  );
};
