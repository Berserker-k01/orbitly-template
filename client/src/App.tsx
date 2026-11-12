import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useLocation, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Approach from "./pages/Approach";
import Technology from "./pages/Technology";
import Performance from "./pages/Performance";
import Contact from "./pages/Contact";
import LegalMentions from "./pages/LegalMentions";
import Privacy from "./pages/Privacy";
import RiskWarnings from "./pages/RiskWarnings";
import Parrainage from "./pages/Parrainage";
import Calculator from "./pages/Calculator";

const LANGS = ['fr', 'en', 'de'] as const;

function RootRedirect() {
  const [, setLocation] = useLocation();
  const savedLang = (() => {
    try { const l = localStorage.getItem('summit-lang'); return l && (LANGS as readonly string[]).includes(l) ? l : 'fr'; }
    catch { return 'fr'; }
  })();
  if (typeof window !== 'undefined') {
    setLocation(`/${savedLang}/`);
  }
  return null;
}

function HomeRedirect() {
  const [, setLocation] = useLocation();
  const savedLang = (() => {
    try { const l = localStorage.getItem('summit-lang'); return l && (LANGS as readonly string[]).includes(l) ? l : 'fr'; }
    catch { return 'fr'; }
  })();
  if (typeof window !== 'undefined') {
    const match = window.location.pathname.match(/^\/(fr|en|de)\//);
    setLocation(`/${match?.[1] ?? savedLang}/`);
  }
  return null;
}

function Router() {
  return (
    <>
    <ScrollToTop />
    <Switch>
      {/* FR */}
      <Route path="/fr/" component={Home} />
      <Route path="/fr/approche" component={Approach} />
      <Route path="/fr/technologie" component={Technology} />
      <Route path="/fr/performances" component={Performance} />
      <Route path="/fr/contact" component={Contact} />
      <Route path="/fr/mentions-legales" component={LegalMentions} />
      <Route path="/fr/confidentialite" component={Privacy} />
      <Route path="/fr/risques" component={RiskWarnings} />
      <Route path="/fr/parrainage" component={Parrainage} />
      <Route path="/fr/calculatrice" component={Calculator} />
      <Route path="/fr/processus" component={HomeRedirect} />
      <Route path="/fr/ecosysteme" component={HomeRedirect} />
      <Route path="/fr/ecosystem" component={HomeRedirect} />
      {/* EN */}
      <Route path="/en/" component={Home} />
      <Route path="/en/approche" component={Approach} />
      <Route path="/en/technologie" component={Technology} />
      <Route path="/en/performances" component={Performance} />
      <Route path="/en/contact" component={Contact} />
      <Route path="/en/mentions-legales" component={LegalMentions} />
      <Route path="/en/confidentialite" component={Privacy} />
      <Route path="/en/risques" component={RiskWarnings} />
      <Route path="/en/parrainage" component={Parrainage} />
      <Route path="/en/calculatrice" component={Calculator} />
      <Route path="/en/processus" component={HomeRedirect} />
      <Route path="/en/ecosysteme" component={HomeRedirect} />
      <Route path="/en/ecosystem" component={HomeRedirect} />
      {/* DE */}
      <Route path="/de/" component={Home} />
      <Route path="/de/approche" component={Approach} />
      <Route path="/de/technologie" component={Technology} />
      <Route path="/de/performances" component={Performance} />
      <Route path="/de/contact" component={Contact} />
      <Route path="/de/mentions-legales" component={LegalMentions} />
      <Route path="/de/confidentialite" component={Privacy} />
      <Route path="/de/risques" component={RiskWarnings} />
      <Route path="/de/parrainage" component={Parrainage} />
      <Route path="/de/calculatrice" component={Calculator} />
      <Route path="/de/processus" component={HomeRedirect} />
      <Route path="/de/ecosysteme" component={HomeRedirect} />
      <Route path="/de/ecosystem" component={HomeRedirect} />
      {/* Root */}
      <Route path="/" component={RootRedirect} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <I18nProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
