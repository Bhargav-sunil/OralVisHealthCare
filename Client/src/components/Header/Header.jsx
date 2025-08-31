import { Link, useNavigate } from "react-router-dom";
import { getAuth, useLogout } from "../../utils/auth";
import "./Header.css";

const Header = () => {
  const { user } = getAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="brand">
          <div className="logo">OV</div>
          <div className="brand-text">
            <div className="brand-name">OralVis Healthcare</div>
            <div className="brand-sub">Dental scan management</div>
          </div>
        </Link>

        <nav className="nav">
          {user ? (
            <>
              <div className="user-info">
                Signed in as <span>{user.email}</span>
              </div>
              <button
                onClick={logout}
                className="btn btn-primary"
                aria-label="Log out"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline"
            >
              Log in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
