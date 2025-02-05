import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface UserMenuContextProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const UserMenuContext = createContext<UserMenuContextProps | undefined>(
  undefined
);

const useUserMenu = () => {
  const context = useContext(UserMenuContext);
  if (!context) {
    throw new Error("useUserMenu must be used within a UserMenuProvider");
  }
  return context;
};

interface UserMenuProviderProps {
  children: ReactNode;
}

const UserMenuProvider: React.FC<UserMenuProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <UserMenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </UserMenuContext.Provider>
  );
};

const UserMenu: React.FC<{ children: ReactNode }> & {
  Trigger: React.FC<{ children: ReactNode }>;
  Content: React.FC<{ children: ReactNode }>;
  Item: React.FC<{ children: ReactNode; onClick: () => void }>;
} = ({ children }) => {
  return <UserMenuProvider>{children}</UserMenuProvider>;
};

const Trigger: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toggleMenu } = useUserMenu();
  return <div onClick={toggleMenu}>{children}</div>;
};

const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen } = useUserMenu();
  return isOpen ? <div className="menu-content">{children}</div> : null;
};

const Item: React.FC<{ children: ReactNode; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  const { toggleMenu } = useUserMenu();
  const handleClick = () => {
    onClick();
    toggleMenu();
  };
  return <div onClick={handleClick}>{children}</div>;
};

UserMenu.Trigger = Trigger;
UserMenu.Content = Content;
UserMenu.Item = Item;

export default UserMenu;
