'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link
        href="/"
        className="flex flex-center gap-2"
      >
        <Image
          src="/assets/images/logo.svg"
          alt="Prompty Logo"
          width={30}
          height={30}
          className="object-contain"
        />

        <p className="logo_text">
          Prompty
        </p>
      </Link>

      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {/* need to know if a user is logged in so we know which buttons to show */}
        {session?.user ? ( // if session.user exists, show these buttons
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn"
            >
              Create Post
            </Link>

            <button
              type='button'
              onClick={signOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              {/* User Image */}
              <Image
                src={session?.user.image}
                alt="Profile Image"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => { }}
              />
            </Link>
          </div>
        ) : (
          <>
            {/* check if we have access to providers. If so, map and return a button */}
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {/* is user logged in */}
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="Profile Image"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {/* Dropdown */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="w-full mt-5 black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* check if we have access to providers. If so, map and return a button */}
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav

// to use Next Auth, we need to have access to Providers.
// to use them we need to make a useEffect hook