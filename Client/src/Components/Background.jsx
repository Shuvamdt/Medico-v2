const Background = () => {
  return (
    <div className="blur z-[-10]">
      <div className="grad-1 backdrop-blur-lg"></div>
      <div className="grad-clip">
        <div className="grad-2 backdrop-blur-lg"></div>
      </div>
      <div className="grad-clip">
        <div className="grad-3 backdrop-blur-lg"></div>
      </div>
    </div>
  );
};

export default Background;
