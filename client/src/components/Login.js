import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="login-button">LOG IN</button>
        </form>
        <div className="signup-link">
          No account? <a href="/signup">CREATE ONE</a>
        </div>
      </div>
    </div>
  );
}

export default Login;