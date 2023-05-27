import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

const Context = createContext<{
  currentMenu: any;
  mobileMenuShow: boolean;
  setCurrentMenu?: Dispatch<SetStateAction<any>>;
  setMobileMenuShow?: Dispatch<SetStateAction<any>>;
  menuList?: any;
  settings?: any;
}>({
  mobileMenuShow: false,
  currentMenu: null,
  menuList: [],
  settings: {},
});
export function LayoutDefaultProvider({ children }) {
  const [currentMenu, setCurrentMenu] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [mobileMenuShow, setMobileMenuShow] = useState(false);
  const [settings, setSettings] = useState({});
  useEffect(() => {
    fetch('/api/sitemaps').then(async (r) => {
      setMenuList(await r.json());
    });
    fetch('/api/settings').then(async (r) => {
      setSettings(await r.json());
    });
  }, []);
  return (
    <Context.Provider
      value={{
        currentMenu,
        setCurrentMenu,
        settings,
        menuList,
        mobileMenuShow,
        setMobileMenuShow,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useLayoutDefaultContext() {
  return useContext(Context);
}
