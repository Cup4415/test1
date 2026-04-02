const { useMemo, useState, useEffect, useRef } = React;

const API_BASE = "http://127.0.0.1:5175";

const LANGS = ["en", "fr", "es", "de", "it", "pt", "nl", "tr"];
const LANG_LABELS = {
  en: {
    en: "English",
    fr: "French",
    es: "Spanish",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    nl: "Dutch",
    tr: "Turkish",
  },
  fr: {
    en: "Anglais",
    fr: "Francais",
    es: "Espagnol",
    de: "Allemand",
    it: "Italien",
    pt: "Portugais",
    nl: "Neerlandais",
    tr: "Turc",
  },
  es: {
    en: "Ingles",
    fr: "Frances",
    es: "Espanol",
    de: "Aleman",
    it: "Italiano",
    pt: "Portugues",
    nl: "Neerlandes",
    tr: "Turco",
  },
  de: {
    en: "Englisch",
    fr: "Franzoesisch",
    es: "Spanisch",
    de: "Deutsch",
    it: "Italienisch",
    pt: "Portugiesisch",
    nl: "Niederlaendisch",
    tr: "Tuerkisch",
  },
  it: {
    en: "Inglese",
    fr: "Francese",
    es: "Spagnolo",
    de: "Tedesco",
    it: "Italiano",
    pt: "Portoghese",
    nl: "Olandese",
    tr: "Turco",
  },
  pt: {
    en: "Ingles",
    fr: "Frances",
    es: "Espanhol",
    de: "Alemao",
    it: "Italiano",
    pt: "Portugues",
    nl: "Neerlandes",
    tr: "Turco",
  },
  nl: {
    en: "Engels",
    fr: "Frans",
    es: "Spaans",
    de: "Duits",
    it: "Italiaans",
    pt: "Portugees",
    nl: "Nederlands",
    tr: "Turks",
  },
  tr: {
    en: "Ingilizce",
    fr: "Fransizca",
    es: "Ispanyolca",
    de: "Almanca",
    it: "Italyanca",
    pt: "Portekizce",
    nl: "Hollandaca",
    tr: "Turkce",
  },
};

const I18N = {
  en: {
    title: "MENU",
    subtitle: "Create, login, search, edit, export",
    create: "Create account",
    login: "Login",
    search: "Search user",
    language: "Language",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm password",
    firstName: "First name",
    lastName: "Last name",
    age: "Age",
    job: "Job",
    favoriteFood: "Favorite food",
    city: "City",
    hobby: "Hobby",
    favoriteColor: "Favorite color",
    dreamJob: "Dream job",
    submitCreate: "Create",
    submitLogin: "Login",
    logout: "Logout",
    viewProfile: "View profile",
    editProfile: "Edit profile",
    deleteAccount: "Delete account",
    saveChanges: "Save changes",
    accountExists: "Username already exists.",
    required: "Username and password cannot be empty.",
    badCreds: "Wrong username or password.",
    loginOk: "Login successful.",
    updated: "Profile updated.",
    deleted: "Account deleted.",
    notFound: "User not found.",
    found: "User found.",
    itsYou: "It's you.",
    searchPlaceholder: "Search username...",
    confirmDelete: "Delete this account permanently?",
    stats: "Stats",
    createdAt: "Created at",
    lastLogin: "Last login",
    lastEdit: "Last edit",
    chooseLang: "Choose language",
    showPassword: "Show",
    hidePassword: "Hide",
    myNameIs: "My name is",
    myUsernameIs: "My username is",
    myAgeIs: "My age is",
    iWorkIn: "I work in",
    myFavoriteFoodIs: "My favorite food is",
    myCityIs: "My city is",
    myHobbyIs: "My hobby is",
    myFavoriteColorIs: "My favorite color is",
    myDreamJobIs: "My dream job is",
    myAccountCreatedAt: "My account was created at",
    myLastLoginWas: "My last login was",
    myLastEditWas: "My last edit was",
    enterAccounts: "Enter accounts",
    hideProfile: "Hide profile",
    accountManager: "Gestionnaire de comptes",
  },
  fr: {
    title: "MENU",
    subtitle: "Creer, connecter, rechercher, modifier, exporter",
    create: "Creer un compte",
    login: "Se connecter",
    search: "Rechercher un utilisateur",
    language: "Langue",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    firstName: "Prenom",
    lastName: "Nom",
    age: "Age",
    job: "Metier",
    favoriteFood: "Plat prefere",
    city: "Ville",
    hobby: "Loisir",
    favoriteColor: "Couleur preferee",
    dreamJob: "Metier de reve",
    submitCreate: "Creer",
    submitLogin: "Connexion",
    logout: "Deconnexion",
    viewProfile: "Voir profil",
    editProfile: "Modifier profil",
    deleteAccount: "Supprimer compte",
    saveChanges: "Enregistrer",
    accountExists: "Nom d'utilisateur deja utilise.",
    required: "Nom d'utilisateur et mot de passe obligatoires.",
    badCreds: "Nom d'utilisateur ou mot de passe incorrect.",
    loginOk: "Connexion reussie.",
    updated: "Profil mis a jour.",
    deleted: "Compte supprime.",
    notFound: "Utilisateur introuvable.",
    found: "Utilisateur trouve.",
    itsYou: "C'est vous.",
    searchPlaceholder: "Rechercher un nom d'utilisateur...",
    confirmDelete: "Supprimer ce compte definitivement ?",
    stats: "Statistiques",
    createdAt: "Cree le",
    lastLogin: "Derniere connexion",
    lastEdit: "Derniere modification",
    chooseLang: "Choisir la langue",
    showPassword: "Afficher",
    hidePassword: "Masquer",
    myNameIs: "Mon nom est",
    myUsernameIs: "Mon nom d'utilisateur est",
    myAgeIs: "Mon age est",
    iWorkIn: "Je travaille en",
    myFavoriteFoodIs: "Mon plat prefere est",
    myCityIs: "Ma ville est",
    myHobbyIs: "Mon loisir est",
    myFavoriteColorIs: "Ma couleur preferee est",
    myDreamJobIs: "Mon metier de reve est",
    myAccountCreatedAt: "Mon compte a ete cree le",
    myLastLoginWas: "Ma derniere connexion etait",
    myLastEditWas: "Ma derniere modification etait",
  },
  es: {
    title: "MENU",
    subtitle: "Crear, iniciar sesion, buscar, editar, exportar",
    create: "Crear cuenta",
    login: "Iniciar sesion",
    search: "Buscar usuario",
    language: "Idioma",
    username: "Nombre de usuario",
    password: "Contrasena",
    confirmPassword: "Confirmar contrasena",
    firstName: "Nombre",
    lastName: "Apellido",
    age: "Edad",
    job: "Trabajo",
    favoriteFood: "Comida favorita",
    city: "Ciudad",
    hobby: "Pasatiempo",
    favoriteColor: "Color favorito",
    dreamJob: "Trabajo sonado",
    submitCreate: "Crear",
    submitLogin: "Entrar",
    logout: "Cerrar sesion",
    viewProfile: "Ver perfil",
    editProfile: "Editar perfil",
    deleteAccount: "Eliminar cuenta",
    saveChanges: "Guardar cambios",
    accountExists: "El nombre de usuario ya existe.",
    required: "Usuario y contrasena no pueden estar vacios.",
    badCreds: "Usuario o contrasena incorrectos.",
    loginOk: "Inicio de sesion correcto.",
    updated: "Perfil actualizado.",
    deleted: "Cuenta eliminada.",
    notFound: "Usuario no encontrado.",
    found: "Usuario encontrado.",
    itsYou: "Eres tu.",
    searchPlaceholder: "Buscar usuario...",
    confirmDelete: "Eliminar esta cuenta permanentemente?",
    stats: "Estadisticas",
    createdAt: "Creado",
    lastLogin: "Ultimo acceso",
    lastEdit: "Ultima edicion",
    chooseLang: "Elegir idioma",
    showPassword: "Mostrar",
    hidePassword: "Ocultar",
    myNameIs: "Mi nombre es",
    myUsernameIs: "Mi usuario es",
    myAgeIs: "Mi edad es",
    iWorkIn: "Trabajo en",
    myFavoriteFoodIs: "Mi comida favorita es",
    myCityIs: "Mi ciudad es",
    myHobbyIs: "Mi pasatiempo es",
    myFavoriteColorIs: "Mi color favorito es",
    myDreamJobIs: "Mi trabajo sonado es",
    myAccountCreatedAt: "Mi cuenta fue creada el",
    myLastLoginWas: "Mi ultimo acceso fue",
    myLastEditWas: "Mi ultima edicion fue",
  },
  de: {
    title: "MENU",
    subtitle: "Erstellen, anmelden, suchen, bearbeiten, exportieren",
    create: "Konto erstellen",
    login: "Anmelden",
    search: "Benutzer suchen",
    language: "Sprache",
    username: "Benutzername",
    password: "Passwort",
    confirmPassword: "Passwort bestaetigen",
    firstName: "Vorname",
    lastName: "Nachname",
    age: "Alter",
    job: "Beruf",
    favoriteFood: "Lieblingsessen",
    city: "Stadt",
    hobby: "Hobby",
    favoriteColor: "Lieblingsfarbe",
    dreamJob: "Traumberuf",
    submitCreate: "Erstellen",
    submitLogin: "Login",
    logout: "Abmelden",
    viewProfile: "Profil anzeigen",
    editProfile: "Profil bearbeiten",
    deleteAccount: "Konto loeschen",
    saveChanges: "Aenderungen speichern",
    accountExists: "Benutzername existiert bereits.",
    required: "Benutzername und Passwort duerfen nicht leer sein.",
    badCreds: "Benutzername oder Passwort falsch.",
    loginOk: "Anmeldung erfolgreich.",
    updated: "Profil aktualisiert.",
    deleted: "Konto geloescht.",
    notFound: "Benutzer nicht gefunden.",
    found: "Benutzer gefunden.",
    itsYou: "Das bist du.",
    searchPlaceholder: "Benutzer suchen...",
    confirmDelete: "Dieses Konto dauerhaft loeschen?",
    stats: "Statistik",
    createdAt: "Erstellt",
    lastLogin: "Letzter Login",
    lastEdit: "Letzte Bearbeitung",
    chooseLang: "Sprache waehlen",
    showPassword: "Anzeigen",
    hidePassword: "Verbergen",
    myNameIs: "Mein Name ist",
    myUsernameIs: "Mein Benutzername ist",
    myAgeIs: "Mein Alter ist",
    iWorkIn: "Ich arbeite in",
    myFavoriteFoodIs: "Mein Lieblingsessen ist",
    myCityIs: "Meine Stadt ist",
    myHobbyIs: "Mein Hobby ist",
    myFavoriteColorIs: "Meine Lieblingsfarbe ist",
    myDreamJobIs: "Mein Traumberuf ist",
    myAccountCreatedAt: "Mein Konto wurde erstellt am",
    myLastLoginWas: "Mein letzter Login war",
    myLastEditWas: "Meine letzte Bearbeitung war",
  },
  it: {
    title: "MENU",
    subtitle: "Crea, accedi, cerca, modifica, esporta",
    create: "Crea account",
    login: "Accedi",
    search: "Cerca utente",
    language: "Lingua",
    username: "Nome utente",
    password: "Password",
    confirmPassword: "Conferma password",
    firstName: "Nome",
    lastName: "Cognome",
    age: "Eta",
    job: "Lavoro",
    favoriteFood: "Cibo preferito",
    city: "Citta",
    hobby: "Hobby",
    favoriteColor: "Colore preferito",
    dreamJob: "Lavoro dei sogni",
    submitCreate: "Crea",
    submitLogin: "Accedi",
    logout: "Disconnetti",
    viewProfile: "Vedi profilo",
    editProfile: "Modifica profilo",
    deleteAccount: "Elimina account",
    saveChanges: "Salva modifiche",
    accountExists: "Nome utente gia esistente.",
    required: "Nome utente e password non possono essere vuoti.",
    badCreds: "Nome utente o password errati.",
    loginOk: "Accesso riuscito.",
    updated: "Profilo aggiornato.",
    deleted: "Account eliminato.",
    notFound: "Utente non trovato.",
    found: "Utente trovato.",
    itsYou: "Sei tu.",
    searchPlaceholder: "Cerca utente...",
    confirmDelete: "Eliminare questo account definitivamente?",
    stats: "Statistiche",
    createdAt: "Creato",
    lastLogin: "Ultimo accesso",
    lastEdit: "Ultima modifica",
    chooseLang: "Scegli lingua",
    showPassword: "Mostra",
    hidePassword: "Nascondi",
    myNameIs: "Il mio nome e",
    myUsernameIs: "Il mio nome utente e",
    myAgeIs: "La mia eta e",
    iWorkIn: "Lavoro in",
    myFavoriteFoodIs: "Il mio cibo preferito e",
    myCityIs: "La mia citta e",
    myHobbyIs: "Il mio hobby e",
    myFavoriteColorIs: "Il mio colore preferito e",
    myDreamJobIs: "Il mio lavoro dei sogni e",
    myAccountCreatedAt: "Il mio account e stato creato il",
    myLastLoginWas: "Il mio ultimo accesso e stato",
    myLastEditWas: "La mia ultima modifica e stata",
  },
  pt: {
    title: "MENU",
    subtitle: "Criar, entrar, pesquisar, editar, exportar",
    create: "Criar conta",
    login: "Entrar",
    search: "Pesquisar usuario",
    language: "Idioma",
    username: "Nome de usuario",
    password: "Senha",
    confirmPassword: "Confirmar senha",
    firstName: "Primeiro nome",
    lastName: "Sobrenome",
    age: "Idade",
    job: "Profissao",
    favoriteFood: "Comida favorita",
    city: "Cidade",
    hobby: "Hobby",
    favoriteColor: "Cor favorita",
    dreamJob: "Profissao dos sonhos",
    submitCreate: "Criar",
    submitLogin: "Entrar",
    logout: "Sair",
    viewProfile: "Ver perfil",
    editProfile: "Editar perfil",
    deleteAccount: "Excluir conta",
    saveChanges: "Salvar alteracoes",
    accountExists: "Nome de usuario ja existe.",
    required: "Usuario e senha nao podem ficar vazios.",
    badCreds: "Usuario ou senha incorretos.",
    loginOk: "Login realizado.",
    updated: "Perfil atualizado.",
    deleted: "Conta excluida.",
    notFound: "Usuario nao encontrado.",
    found: "Usuario encontrado.",
    itsYou: "E voce.",
    searchPlaceholder: "Pesquisar usuario...",
    confirmDelete: "Excluir esta conta permanentemente?",
    stats: "Estatisticas",
    createdAt: "Criado em",
    lastLogin: "Ultimo login",
    lastEdit: "Ultima edicao",
    chooseLang: "Escolher idioma",
    showPassword: "Mostrar",
    hidePassword: "Ocultar",
    myNameIs: "Meu nome e",
    myUsernameIs: "Meu nome de usuario e",
    myAgeIs: "Minha idade e",
    iWorkIn: "Eu trabalho em",
    myFavoriteFoodIs: "Minha comida favorita e",
    myCityIs: "Minha cidade e",
    myHobbyIs: "Meu hobby e",
    myFavoriteColorIs: "Minha cor favorita e",
    myDreamJobIs: "Minha profissao dos sonhos e",
    myAccountCreatedAt: "Minha conta foi criada em",
    myLastLoginWas: "Meu ultimo login foi",
    myLastEditWas: "Minha ultima edicao foi",
  },
  nl: {
    title: "MENU",
    subtitle: "Maken, inloggen, zoeken, bewerken, exporteren",
    create: "Account maken",
    login: "Inloggen",
    search: "Gebruiker zoeken",
    language: "Taal",
    username: "Gebruikersnaam",
    password: "Wachtwoord",
    confirmPassword: "Bevestig wachtwoord",
    firstName: "Voornaam",
    lastName: "Achternaam",
    age: "Leeftijd",
    job: "Beroep",
    favoriteFood: "Favoriet eten",
    city: "Stad",
    hobby: "Hobby",
    favoriteColor: "Favoriete kleur",
    dreamJob: "Droombaan",
    submitCreate: "Maken",
    submitLogin: "Inloggen",
    logout: "Uitloggen",
    viewProfile: "Profiel bekijken",
    editProfile: "Profiel bewerken",
    deleteAccount: "Account verwijderen",
    saveChanges: "Wijzigingen opslaan",
    accountExists: "Gebruikersnaam bestaat al.",
    required: "Gebruikersnaam en wachtwoord mogen niet leeg zijn.",
    badCreds: "Gebruikersnaam of wachtwoord onjuist.",
    loginOk: "Succesvol ingelogd.",
    updated: "Profiel bijgewerkt.",
    deleted: "Account verwijderd.",
    notFound: "Gebruiker niet gevonden.",
    found: "Gebruiker gevonden.",
    itsYou: "Jij bent het.",
    searchPlaceholder: "Zoek gebruiker...",
    confirmDelete: "Dit account permanent verwijderen?",
    stats: "Statistieken",
    createdAt: "Aangemaakt op",
    lastLogin: "Laatste login",
    lastEdit: "Laatst bewerkt",
    chooseLang: "Kies taal",
    showPassword: "Tonen",
    hidePassword: "Verbergen",
    myNameIs: "Mijn naam is",
    myUsernameIs: "Mijn gebruikersnaam is",
    myAgeIs: "Mijn leeftijd is",
    iWorkIn: "Ik werk in",
    myFavoriteFoodIs: "Mijn favoriete eten is",
    myCityIs: "Mijn stad is",
    myHobbyIs: "Mijn hobby is",
    myFavoriteColorIs: "Mijn favoriete kleur is",
    myDreamJobIs: "Mijn droombaan is",
    myAccountCreatedAt: "Mijn account is aangemaakt op",
    myLastLoginWas: "Mijn laatste login was",
    myLastEditWas: "Mijn laatste bewerking was",
  },
  tr: {
    title: "MENU",
    subtitle: "Olustur, giris yap, ara, duzenle, disa aktar",
    create: "Hesap olustur",
    login: "Giris yap",
    search: "Kullanici ara",
    language: "Dil",
    username: "Kullanici adi",
    password: "Sifre",
    confirmPassword: "Sifreyi dogrula",
    firstName: "Ad",
    lastName: "Soyad",
    age: "Yas",
    job: "Meslek",
    favoriteFood: "Favori yemek",
    city: "Sehir",
    hobby: "Hobi",
    favoriteColor: "Favori renk",
    dreamJob: "Hayal meslek",
    submitCreate: "Olustur",
    submitLogin: "Giris",
    logout: "Cikis",
    viewProfile: "Profili gor",
    editProfile: "Profili duzenle",
    deleteAccount: "Hesabi sil",
    saveChanges: "Degisiklikleri kaydet",
    accountExists: "Kullanici adi zaten var.",
    required: "Kullanici adi ve sifre bos olamaz.",
    badCreds: "Kullanici adi veya sifre hatali.",
    loginOk: "Giris basarili.",
    updated: "Profil guncellendi.",
    deleted: "Hesap silindi.",
    notFound: "Kullanici bulunamadi.",
    found: "Kullanici bulundu.",
    itsYou: "Bu sensin.",
    searchPlaceholder: "Kullanici ara...",
    confirmDelete: "Bu hesabi kalici olarak silmek istiyor musun?",
    stats: "Istatistik",
    createdAt: "Olusturma",
    lastLogin: "Son giris",
    lastEdit: "Son duzenleme",
    chooseLang: "Dil sec",
    showPassword: "Goster",
    hidePassword: "Gizle",
    myNameIs: "Benim adim",
    myUsernameIs: "Kullanici adim",
    myAgeIs: "Yasim",
    iWorkIn: "Su alanda calisiyorum",
    myFavoriteFoodIs: "Favori yemegim",
    myCityIs: "Sehrim",
    myHobbyIs: "Hobim",
    myFavoriteColorIs: "Favori rengim",
    myDreamJobIs: "Hayal meslegim",
    myAccountCreatedAt: "Hesabim su tarihte olusturuldu",
    myLastLoginWas: "Son girisim",
    myLastEditWas: "Son duzenlemem",
  },
};

function t(lang, key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

function normalizeProfile(profile) {
  if (!profile) return {};
  return {
    username: profile.username ?? profile.userName ?? profile.user_name ?? "",
    firstName: profile.firstName ?? profile.first_name ?? "",
    lastName: profile.lastName ?? profile.last_name ?? "",
    age: profile.age ?? "",
    job: profile.job ?? "",
    favoriteFood: profile.favoriteFood ?? profile.favorite_food ?? "",
    city: profile.city ?? "",
    hobby: profile.hobby ?? "",
    favoriteColor: profile.favoriteColor ?? profile.favorite_color ?? "",
    dreamJob: profile.dreamJob ?? profile.dream_job ?? "",
  };
}

async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function nowText() {
  return new Date().toLocaleString();
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

function App() {
  const [accounts, setAccounts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("accounts_web_v1")) || {};
    } catch {
      return {};
    }
  });
  const [lang, setLang] = useState("en");
  const [currentUser, setCurrentUser] = useState(null);
  const [mode, setMode] = useState("home");
  const [msg, setMsg] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const accountsRef = useRef(null);

  const [createForm, setCreateForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    age: "",
    job: "",
    favoriteFood: "",
    city: "",
    hobby: "",
    favoriteColor: "",
    dreamJob: "",
  });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showCreateConfirm, setShowCreateConfirm] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [searchUsername, setSearchUsername] = useState("");
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    accountsRef.current = accounts;
    localStorage.setItem("accounts_web_v1", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/accounts`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data || typeof data !== "object") return;
        const localAccounts = accountsRef.current || {};
        if (Object.keys(data).length === 0 && Object.keys(localAccounts).length > 0) {
          fetch(`${API_BASE}/accounts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(localAccounts),
          }).catch(() => {});
          return;
        }
        setAccounts(data);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      fetch(`${API_BASE}/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accounts),
      }).catch(() => {});
    }, 400);
    return () => clearTimeout(id);
  }, [accounts]);

  useEffect(() => {
    if (currentUser && accounts[currentUser]) {
      setEditForm(accounts[currentUser].profile);
    } else {
      setEditForm(null);
    }
  }, [currentUser, accounts]);


  const currentAccount = useMemo(
    () => (currentUser && accounts[currentUser] ? accounts[currentUser] : null),
    [accounts, currentUser]
  );
  const isAdmin = useMemo(() => {
    if (!currentAccount) return false;
    if (currentAccount.is_admin) return true;
    const name = (currentAccount.profile && currentAccount.profile.username) || currentUser || "";
    return ["ADMIN", "ADMIN2"].includes(name);
  }, [currentAccount, currentUser]);

  async function handleCreate(e) {
    e.preventDefault();
    const u = createForm.username.trim();
    const p = createForm.password.trim();
    if (!u || !p) return setMsg(t(lang, "required"));
    if (p !== createForm.confirmPassword) return setMsg(t(lang, "badCreds"));
    if (accounts[u]) return setMsg(t(lang, "accountExists"));

    const profile = {
      username: u,
      firstName: createForm.firstName.trim(),
      lastName: createForm.lastName.trim(),
      age: createForm.age.trim(),
      job: createForm.job.trim(),
      favoriteFood: createForm.favoriteFood.trim(),
      city: createForm.city.trim(),
      hobby: createForm.hobby.trim(),
      favoriteColor: createForm.favoriteColor.trim(),
      dreamJob: createForm.dreamJob.trim(),
    };
    const created = nowText();
    const newAccounts = {
      ...accounts,
      [u]: {
        password_hash: await sha256(p),
        profile,
        created_at: created,
        last_login: created,
        last_edit: null,
      },
    };
    setAccounts(newAccounts);
    setCurrentUser(u);
    setMode("view");
    setMsg(`${t(lang, "loginOk")}`);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const u = loginForm.username.trim();
    const p = loginForm.password.trim();
    if (!u || !p) return setMsg(t(lang, "required"));
    const acc = accounts[u];
    if (!acc) return setMsg(t(lang, "badCreds"));
    const hash = await sha256(p);
    if (hash !== acc.password_hash) return setMsg(t(lang, "badCreds"));
    setAccounts({ ...accounts, [u]: { ...acc, last_login: nowText() } });
    setCurrentUser(u);
    setMode("view");
    setMsg(t(lang, "loginOk"));
  }

  function handleSearch(e) {
    e.preventDefault();
    const u = searchUsername.trim();
    if (!u) return;
    if (!accounts[u]) return setSearchResult({ type: "none" });
    if (currentUser && u === currentUser) return setSearchResult({ type: "you" });
    setSearchResult({ type: "found", account: accounts[u] });
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    if (!currentUser || !editForm) return;
    const u = editForm.username.trim();
    if (!u) return setMsg(t(lang, "required"));
    if (u !== currentUser && accounts[u]) return setMsg(t(lang, "accountExists"));

    const old = accounts[currentUser];
    const updated = { ...old, profile: { ...editForm, username: u }, last_edit: nowText() };
    const copy = { ...accounts };
    delete copy[currentUser];
    copy[u] = updated;
    setAccounts(copy);
    setCurrentUser(u);
    setMsg(t(lang, "updated"));
  }

  async function handleDelete() {
    if (!currentUser) return;
    if (!confirm(t(lang, "confirmDelete"))) return;
    const pwd = prompt(`${t(lang, "password")}:`) || "";
    const hash = await sha256(pwd.trim());
    if (hash !== currentAccount.password_hash) return setMsg(t(lang, "badCreds"));
    const copy = { ...accounts };
    delete copy[currentUser];
    setAccounts(copy);
    setCurrentUser(null);
    setMode("login");
    setMsg(t(lang, "deleted"));
  }


  return (
    <div className="app">
      <div className="header">
        <div>
          <h1>{t(lang, "title")}</h1>
          <div className="sub">{t(lang, "subtitle")}</div>
        </div>
        <div className="card">
          <div className="field">
            <label>{t(lang, "chooseLang")}</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              {LANGS.map((l) => (
                <option key={l} value={l}>
                  {((LANG_LABELS[lang] && LANG_LABELS[lang][l]) ||
                    (LANG_LABELS.en && LANG_LABELS.en[l]) ||
                    l)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card hero">
        <div>
          <div className="eyebrow">Quick actions</div>
          <h2>Account access</h2>
          <div className="sub">Jump into accounts or sign out in one click.</div>
        </div>
        <div className="hero-actions">
          <button
            className="primary"
            onClick={() => setMode(currentUser ? "view" : "login")}
          >
            {t(lang, "enterAccounts")}
          </button>
          <button onClick={() => setMode(currentUser ? "edit" : "create")}>
            {t(lang, "accountManager")}
          </button>
        </div>
      </div>

      {!currentUser ? (
        mode === "home" ? null : (
          <div className="card">
            <div className="tabs">
              <button className={mode === "create" ? "active" : ""} onClick={() => setMode("create")}>
                {t(lang, "create")}
              </button>
              <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
                {t(lang, "login")}
              </button>
              <button className={mode === "search" ? "active" : ""} onClick={() => setMode("search")}>
                {t(lang, "search")}
              </button>
            </div>

            {mode === "create" && (
              <form onSubmit={handleCreate}>
                <div className="row">
                  <div className="field"><label>{t(lang, "username")}</label><input value={createForm.username} onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "age")}</label><input value={createForm.age} onChange={(e) => setCreateForm({ ...createForm, age: e.target.value })} /></div>
                </div>
                <div className="row">
                  <div className="field">
                    <label>{t(lang, "password")}</label>
                    <div className="password-input">
                      <input
                        type={showCreatePassword ? "text" : "password"}
                        value={createForm.password}
                        onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="ghost"
                        onClick={() => setShowCreatePassword((v) => !v)}
                      >
                        {t(lang, showCreatePassword ? "hidePassword" : "showPassword")}
                      </button>
                    </div>
                  </div>
                  <div className="field">
                    <label>{t(lang, "confirmPassword")}</label>
                    <div className="password-input">
                      <input
                        type={showCreateConfirm ? "text" : "password"}
                        value={createForm.confirmPassword}
                        onChange={(e) => setCreateForm({ ...createForm, confirmPassword: e.target.value })}
                      />
                      <button
                        type="button"
                        className="ghost"
                        onClick={() => setShowCreateConfirm((v) => !v)}
                      >
                        {t(lang, showCreateConfirm ? "hidePassword" : "showPassword")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="field"><label>{t(lang, "firstName")}</label><input value={createForm.firstName} onChange={(e) => setCreateForm({ ...createForm, firstName: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "lastName")}</label><input value={createForm.lastName} onChange={(e) => setCreateForm({ ...createForm, lastName: e.target.value })} /></div>
                </div>
                <div className="row">
                  <div className="field"><label>{t(lang, "job")}</label><input value={createForm.job} onChange={(e) => setCreateForm({ ...createForm, job: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "favoriteFood")}</label><input value={createForm.favoriteFood} onChange={(e) => setCreateForm({ ...createForm, favoriteFood: e.target.value })} /></div>
                </div>
                <div className="row">
                  <div className="field"><label>{t(lang, "city")}</label><input value={createForm.city} onChange={(e) => setCreateForm({ ...createForm, city: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "hobby")}</label><input value={createForm.hobby} onChange={(e) => setCreateForm({ ...createForm, hobby: e.target.value })} /></div>
                </div>
                <div className="row">
                  <div className="field"><label>{t(lang, "favoriteColor")}</label><input value={createForm.favoriteColor} onChange={(e) => setCreateForm({ ...createForm, favoriteColor: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "dreamJob")}</label><input value={createForm.dreamJob} onChange={(e) => setCreateForm({ ...createForm, dreamJob: e.target.value })} /></div>
                </div>
                <button>{t(lang, "submitCreate")}</button>
              </form>
            )}

            {mode === "login" && (
              <form onSubmit={handleLogin}>
                <div className="field"><label>{t(lang, "username")}</label><input value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} /></div>
                <div className="field">
                  <label>{t(lang, "password")}</label>
                  <div className="password-input">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => setShowLoginPassword((v) => !v)}
                    >
                      {t(lang, showLoginPassword ? "hidePassword" : "showPassword")}
                    </button>
                  </div>
                </div>
                <button>{t(lang, "submitLogin")}</button>
              </form>
            )}

            {mode === "search" && (
              <form onSubmit={handleSearch}>
                <div className="field"><label>{t(lang, "search")}</label><input placeholder={t(lang, "searchPlaceholder")} value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)} /></div>
                <button>{t(lang, "search")}</button>
                {searchResult && (
                  <div className="profile" style={{ marginTop: 10 }}>
                    {searchResult.type === "none" && <div>{t(lang, "notFound")}</div>}
                    {searchResult.type === "you" && (
                      <div>
                        <div>{t(lang, "found")}</div>
                        <div>{t(lang, "itsYou")}</div>
                      </div>
                    )}
                    {searchResult.type === "found" && (
                      <div>
                        {(() => {
                          const p = normalizeProfile(searchResult.account.profile);
                          const displayName = [p.firstName, p.lastName].filter(Boolean).join(" ") || p.username;
                          const val = (v) => (v || v === 0 ? v : "?");
                          const parts = [
                            `${t(lang, "myNameIs")} ${val(displayName)}`,
                            `${t(lang, "myUsernameIs")} ${val(p.username)}`,
                            `${t(lang, "myAgeIs")} ${val(p.age)}`,
                            `${t(lang, "iWorkIn")} ${val(p.job)}`,
                            `${t(lang, "myFavoriteFoodIs")} ${val(p.favoriteFood)}`,
                            `${t(lang, "myCityIs")} ${val(p.city)}`,
                            `${t(lang, "myHobbyIs")} ${val(p.hobby)}`,
                            `${t(lang, "myFavoriteColorIs")} ${val(p.favoriteColor)}`,
                            `${t(lang, "myDreamJobIs")} ${val(p.dreamJob)}`,
                            `${t(lang, "myAccountCreatedAt")} ${val(searchResult.account.created_at)}`,
                            `${t(lang, "myLastLoginWas")} ${val(searchResult.account.last_login)}`,
                            `${t(lang, "myLastEditWas")} ${val(searchResult.account.last_edit)}`,
                          ];
                          return (
                            <>
                        <div>{t(lang, "found")}</div>
                        <div className="line">{parts.join(". ")}.</div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>
        )
      ) : (
        mode === "home" ? null : (
          <div className="grid">
            <div className="card">
              <div className="actions">
                <button className={mode === "view" ? "active" : ""} onClick={() => setMode("view")}>{t(lang, "viewProfile")}</button>
                <button className={mode === "edit" ? "active" : ""} onClick={() => setMode("edit")}>{t(lang, "editProfile")}</button>
                <button className={mode === "search" ? "active" : ""} onClick={() => setMode("search")}>{t(lang, "search")}</button>
                <button onClick={() => setMode("home")}>{t(lang, "hideProfile")}</button>
                <button className="danger" onClick={handleDelete}>{t(lang, "deleteAccount")}</button>
                <button className="logout" onClick={() => { setCurrentUser(null); setMode("login"); setMsg(t(lang, "logout")); }}>
                  {t(lang, "logout")}
                </button>
              </div>
            </div>

            {mode === "view" && currentAccount && (
              <div className="card profile">
                <div className="line"><strong>{currentAccount.profile.firstName} {currentAccount.profile.lastName}</strong></div>
                <div className="line">{t(lang, "username")}: {currentAccount.profile.username}</div>
                <div className="line">{t(lang, "age")}: {currentAccount.profile.age}</div>
                <div className="line">{t(lang, "job")}: {currentAccount.profile.job}</div>
                <div className="line">{t(lang, "favoriteFood")}: {currentAccount.profile.favoriteFood}</div>
                <div className="line">{t(lang, "city")}: {currentAccount.profile.city}</div>
                <div className="line">{t(lang, "hobby")}: {currentAccount.profile.hobby}</div>
                <div className="line">{t(lang, "favoriteColor")}: {currentAccount.profile.favoriteColor}</div>
                <div className="line">{t(lang, "dreamJob")}: {currentAccount.profile.dreamJob}</div>
                <div className="stats">
                  <div>{t(lang, "stats")}:</div>
                  <div>{t(lang, "createdAt")}: {currentAccount.created_at}</div>
                  <div>{t(lang, "lastLogin")}: {currentAccount.last_login}</div>
                  <div>{t(lang, "lastEdit")}: {currentAccount.last_edit}</div>
                </div>
              </div>
            )}

            {mode === "edit" && editForm && (
              <form className="card" onSubmit={handleSaveEdit}>
                <div className="row">
                  <div className="field"><label>{t(lang, "username")}</label><input value={editForm.username || ""} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "age")}</label><input value={editForm.age || ""} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })} /></div>
                </div>
                <div className="row">
                  <div className="field"><label>{t(lang, "firstName")}</label><input value={editForm.firstName || ""} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "lastName")}</label><input value={editForm.lastName || ""} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} /></div>
                </div>
                <div className="row">
                  <div className="field"><label>{t(lang, "job")}</label><input value={editForm.job || ""} onChange={(e) => setEditForm({ ...editForm, job: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "favoriteFood")}</label><input value={editForm.favoriteFood || ""} onChange={(e) => setEditForm({ ...editForm, favoriteFood: e.target.value })} /></div>
                </div>
                <div className="row">
                  <div className="field"><label>{t(lang, "city")}</label><input value={editForm.city || ""} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "hobby")}</label><input value={editForm.hobby || ""} onChange={(e) => setEditForm({ ...editForm, hobby: e.target.value })} /></div>
                </div>
                <div className="row">
                  <div className="field"><label>{t(lang, "favoriteColor")}</label><input value={editForm.favoriteColor || ""} onChange={(e) => setEditForm({ ...editForm, favoriteColor: e.target.value })} /></div>
                  <div className="field"><label>{t(lang, "dreamJob")}</label><input value={editForm.dreamJob || ""} onChange={(e) => setEditForm({ ...editForm, dreamJob: e.target.value })} /></div>
                </div>
                <button>{t(lang, "saveChanges")}</button>
              </form>
            )}

            {mode === "search" && (
              <div className="card">
                <form onSubmit={handleSearch}>
                  <div className="field"><label>{t(lang, "search")}</label><input placeholder={t(lang, "searchPlaceholder")} value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)} /></div>
                  <button>{t(lang, "search")}</button>
                </form>
                {searchResult && (
                  <div className="profile" style={{ marginTop: 10 }}>
                    {searchResult.type === "none" && <div>{t(lang, "notFound")}</div>}
                    {searchResult.type === "you" && (
                      <div>
                        <div>{t(lang, "found")}</div>
                        <div>{t(lang, "itsYou")}</div>
                      </div>
                    )}
                    {searchResult.type === "found" && (
                      <div>
                        {(() => {
                          const p = normalizeProfile(searchResult.account.profile);
                          const displayName = [p.firstName, p.lastName].filter(Boolean).join(" ") || p.username;
                          const val = (v) => (v || v === 0 ? v : "?");
                          const parts = [
                            `${t(lang, "myNameIs")} ${val(displayName)}`,
                            `${t(lang, "myUsernameIs")} ${val(p.username)}`,
                            `${t(lang, "myAgeIs")} ${val(p.age)}`,
                            `${t(lang, "iWorkIn")} ${val(p.job)}`,
                            `${t(lang, "myFavoriteFoodIs")} ${val(p.favoriteFood)}`,
                            `${t(lang, "myCityIs")} ${val(p.city)}`,
                            `${t(lang, "myHobbyIs")} ${val(p.hobby)}`,
                            `${t(lang, "myFavoriteColorIs")} ${val(p.favoriteColor)}`,
                            `${t(lang, "myDreamJobIs")} ${val(p.dreamJob)}`,
                            `${t(lang, "myAccountCreatedAt")} ${val(searchResult.account.created_at)}`,
                            `${t(lang, "myLastLoginWas")} ${val(searchResult.account.last_login)}`,
                            `${t(lang, "myLastEditWas")} ${val(searchResult.account.last_edit)}`,
                          ];
                          return (
                            <>
                              <div>{t(lang, "found")}</div>
                              <div className="line">{parts.join(". ")}.</div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      )}

      {msg && <div className="msg">{msg}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
