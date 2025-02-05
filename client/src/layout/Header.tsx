import { type FC } from "react";
import {
  Bell,
  Bookmark,
  ChartNoAxesColumnDecreasing,
  Moon,
  NotebookText,
  Search,
  SquarePen,
  Sun,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import medium from "@/assets/medium.png";
import mediumDark from "@/assets/medium-dark.png";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import { useArticleStore } from "@/store/articleStore";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";

const Header: FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const setSearchQuery = useArticleStore((state) => state.setSearchQuery);

  const { isDarkMode, toggleTheme } = useThemeStore();

  const handleNavigate = (name: string) => {
    navigate("/" + name);
  };

  const maskEmail = (email: string) => {
    const atIndex = email.indexOf("@");
    const maskedEmail =
      email.slice(0, 1) + "••••••••••••" + email.slice(atIndex);
    return maskedEmail;
  };

  return (
    <>
      <header className="w-full flex bg-white dark:bg-gray-900 dark:text-white z-50 justify-between items-center px-4 md:px-8 transition-all duration-200 h-20 border-b dark:border-sky-50 z-40">
        <div className="flex flex-row items-start md:items-center justify-center">
          <Link
            className="pt-1 pb-1 mr-4 text-lg whitespace-no-wrap animate animate-jump-in animate-duration-1000 animate-delay-300"
            to="/"
          >
            {isDarkMode ? (
              <img src={mediumDark} alt="logo" width={125} height={125} />
            ) : (
              <img src={medium} alt="logo" width={125} height={125} />
            )}
          </Link>
          <div className="hidden md:block">
            <SearchInput onSearch={setSearchQuery} />
          </div>
        </div>
        <nav id="navbar">
          <ul className="flex items-center justify-center transform transition duration-300 relative gap-x-4 z-50">
            <li className="relative block">
              <button
                className="px-1 py-1 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
                onClick={toggleTheme}
              >
                {isDarkMode ? (
                  <Sun size={16} className="dark:text-white" />
                ) : (
                  <Moon size={16} className="dark:text-white" />
                )}
              </button>
            </li>
            {user ? (
              <>
                <li className="relative block block">
                  <Link
                    className="flex items-center justify-center text-gray-800 dark:text-white hover:text-base py-2 px-2 no-underline"
                    to="/articles"
                  >
                    <SquarePen
                      size={20}
                      strokeWidth={1.5}
                      className="dark:text-white inline"
                    />
                    <div className="inline pl-1 hidden lg:block">Write</div>
                  </Link>
                </li>
                <li className="relative block md:hidden">
                  <Link
                    className="text-gray-800 dark:text-white hover:text-base py-2 px-2 no-underline"
                    to="/search"
                  >
                    <Search
                      size={20}
                      strokeWidth={1.5}
                      className="dark:text-white"
                    />
                  </Link>
                </li>
                <li className="relative block">
                  <Link
                    className="text-gray-800 dark:text-white hover:text-base py-2 px-2 no-underline"
                    to="/notifications"
                  >
                    <Bell
                      size={20}
                      strokeWidth={1.5}
                      className="dark:text-white"
                    />
                  </Link>
                </li>
                <li className="relative block">
                  <UserMenu>
                    <UserMenu.Trigger>
                      <Button className="user-menu-trigger px-1 py-1 flex items-center justify-center rounded-full bg-white">
                        {user?.photoURL ? (
                          <img
                            className="w-6 h-6 rounded-full"
                            src={user.photoURL}
                            alt={user?.displayName || "author"}
                          />
                        ) : (
                          <User size={16} strokeWidth={1.5} />
                        )}
                      </Button>
                    </UserMenu.Trigger>
                    <UserMenu.Content>
                      <div className="absolute top-[60px] right-0 bg-white dark:bg-gray-200 shadow-md rounded w-80 z-50 animate animate-fade-down animate-duration-1000 animate-delay-300">
                        <ul>
                          <li className="py-2 mx-2">
                            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Account
                            </h3>
                            <ul>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/me/profile"
                                  >
                                    <User
                                      size={20}
                                      strokeWidth={1.5}
                                      className="inline"
                                    />
                                    <div className="inline pl-1">Profile</div>
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/library"
                                  >
                                    <Bookmark
                                      size={20}
                                      strokeWidth={1.5}
                                      className="inline"
                                    />
                                    <div className="inline pl-1">Library</div>
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/stories"
                                  >
                                    <NotebookText
                                      size={20}
                                      strokeWidth={1.5}
                                      className="inline"
                                    />
                                    <div className="inline pl-1">Stories</div>
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/stats"
                                  >
                                    <ChartNoAxesColumnDecreasing
                                      size={20}
                                      strokeWidth={1.5}
                                      className="inline"
                                    />
                                    <div className="inline pl-1">Stats</div>
                                  </Link>
                                </UserMenu.Item>
                              </li>
                            </ul>
                          </li>
                          <li className="py-2 mx-2">
                            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Preferences
                            </h3>
                            <ul>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/settings"
                                  >
                                    Settings
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/me/following"
                                  >
                                    Refine recommendations
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/profile"
                                  >
                                    Manage publications
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/profile"
                                  >
                                    Help
                                  </Link>
                                </UserMenu.Item>
                              </li>
                            </ul>
                          </li>
                          <li className="py-2 mx-2">
                            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Preferences
                            </h3>
                            <ul>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/"
                                  >
                                    Become a Medium member
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/"
                                  >
                                    Create a Mastodon account
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/"
                                  >
                                    Apply for author verification
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/"
                                  >
                                    Apply to the Partner Program
                                  </Link>
                                </UserMenu.Item>
                              </li>
                              <li>
                                <UserMenu.Item onClick={() => {}}>
                                  <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    to="/"
                                  >
                                    Gift a membership
                                  </Link>
                                </UserMenu.Item>
                              </li>
                            </ul>
                          </li>
                          <li className="py-2 mx-2">
                            <button
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-left"
                              onClick={() => {
                                signOut();
                                navigate("/");
                              }}
                            >
                              Sign out
                              <div className="block">
                                {user?.email ? maskEmail(user.email) : ""}
                              </div>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </UserMenu.Content>
                  </UserMenu>
                </li>
              </>
            ) : (
              <>
                <li className="relative hidden md:block">
                  <button
                    onClick={() => handleNavigate("/")}
                    className="rounded-full bg-emerald-500 text-white hover:text-background py-0 px-2 no-underline"
                  >
                    Sign up
                  </button>
                </li>
                <li className="relative hidden md:block">
                  <Link
                    className="text-gray-800 dark:text-white hover:text-emerald-500 py-2 px-2 no-underline"
                    to="/sign-in"
                  >
                    Sign in
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
