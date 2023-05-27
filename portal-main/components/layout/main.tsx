import LayoutDefaultHeader from './header';
import { LayoutDefaultProvider, useLayoutDefaultContext } from './context';
import LayoutDefaultFooter from './footer';

export default function LayoutDefaultMain({ children }) {
  const layoutData = useLayoutDefaultContext();
  return (
    <LayoutDefaultProvider>
      <LayoutDefaultHeader />
      {children}
      <LayoutDefaultFooter />
    </LayoutDefaultProvider>
  );
}
