import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">OP.GG</div>
        <nav className="header-nav">
          <a href="/">홈</a>
          <a href="/">챔피언</a>
          <a href="/">랭킹</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
