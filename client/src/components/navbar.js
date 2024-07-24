export default function Navbar() {
  return <nav className='nav'>
    <a href="/" className="HeroFit">HeroFit</a>
    <ul>
      <li>
        <a href="/login">login</a>
      </li>
      <li>
        <a href="/signup">signup</a>
      </li>
    </ul>
  </nav>
}