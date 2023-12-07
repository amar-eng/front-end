const Shared = ({ children }) => {
  const backgroundImage = '/assets/photos/heroOption4.jpg';
  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
      ></div>
      {children}
    </div>
  );
};

export default Shared;
