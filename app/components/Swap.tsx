const Swap = ({ onClick }: any) => {
  return (
    <button
      className="bg-white rounded-md p-2 flex justify-center items-center w-16 h-12"
      type="button"
      name="swap"
      onClick={onClick}
      data-testid="swap-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#708092"
        className="w-5 h-5"
        data-testid="swap-icon"
      >
        <path
          fillRule="evenodd"
          d="M13.2 2.24a.75.75 0 00.04 1.06l2.1 1.95H6.75a.75.75 0 000 1.5h8.59l-2.1 1.95a.75.75 0 101.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 00-1.06.04zm-6.4 8a.75.75 0 00-1.06-.04l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 101.02-1.1l-2.1-1.95h8.59a.75.75 0 000-1.5H4.66l2.1-1.95a.75.75 0 00.04-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default Swap;
