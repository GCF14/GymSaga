import Link from 'next/link';

function navbar() {
  return (
    <header>
      <img className="logo" src="/images/Logo.png" alt="logo" />
      <ul className="nav_links">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="#">Find Gym</Link>
        </li>
      </ul>
      <a className="headerButton" href="#">Log out</a>
    </header>
  );
}

export default navbar;