const { useMemo, useState, useEffect } = React;

const LANGS = ["en", "fr", "es", "de", "it", "pt", "nl", "tr"];

const I18N = {
  en: {
    title: "Profile Accounts",
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
    exportTxt: "Export TXT",
    exportJson: "Export JSON",
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
    exportDone: "Export generated.",
    chooseLang: "Choose language",
  },
  fr: {
    title: "Comptes Profil",
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
    exportTxt: "Exporter TXT",
    exportJson: "Exporter JSON",
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
    exportDone: "Export genere.",
    chooseLang: "Choisir la langue",
  },
};

function t(lang, key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
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
  const [mode, setMode] = useState("create");
  const [msg, setMsg] = useState("");
  const [searchResult, setSearchResult] = useState(null);

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
  const [searchUsername, setSearchUsername] = useState("");
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    localStorage.setItem("accounts_web_v1", JSON.stringify(accounts));
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

  function exportTxt() {
    if (!currentAccount) return;
    const p = currentAccount.profile;
    const text = [
      `Username: ${p.username}`,
      `First Name: ${p.firstName}`,
      `Last Name: ${p.lastName}`,
      `Age: ${p.age}`,
      `Job: ${p.job}`,
      `Favorite Food: ${p.favoriteFood}`,
      `City: ${p.city}`,
      `Hobby: ${p.hobby}`,
      `Favorite Color: ${p.favoriteColor}`,
      `Dream Job: ${p.dreamJob}`,
      `${t(lang, "createdAt")}: ${currentAccount.created_at}`,
      `${t(lang, "lastLogin")}: ${currentAccount.last_login}`,
      `${t(lang, "lastEdit")}: ${currentAccount.last_edit}`,
    ].join("\n");
    downloadFile(`${p.username}_profile.txt`, text, "text/plain;charset=utf-8");
    setMsg(t(lang, "exportDone"));
  }

  function exportJson() {
    if (!currentAccount) return;
    const text = JSON.stringify(
      {
        profile: currentAccount.profile,
        stats: {
          created_at: currentAccount.created_at,
          last_login: currentAccount.last_login,
          last_edit: currentAccount.last_edit,
        },
      },
      null,
      2
    );
    downloadFile(`${currentAccount.profile.username}_profile.json`, text, "application/json");
    setMsg(t(lang, "exportDone"));
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
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!currentUser ? (
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
                <div className="field"><label>{t(lang, "password")}</label><input type="password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} /></div>
                <div className="field"><label>{t(lang, "confirmPassword")}</label><input type="password" value={createForm.confirmPassword} onChange={(e) => setCreateForm({ ...createForm, confirmPassword: e.target.value })} /></div>
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
              <div className="field"><label>{t(lang, "password")}</label><input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} /></div>
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
                      <div>{t(lang, "found")}</div>
                      <div className="line">{searchResult.account.profile.firstName} {searchResult.account.profile.lastName}</div>
                      <div className="line">{t(lang, "username")}: {searchResult.account.profile.username}</div>
                      <div className="line">{t(lang, "job")}: {searchResult.account.profile.job}</div>
                    </div>
                  )}
                </div>
              )}
            </form>
          )}
        </div>
      ) : (
        <div className="grid">
          <div className="card">
            <div className="actions">
              <button className={mode === "view" ? "active" : ""} onClick={() => setMode("view")}>{t(lang, "viewProfile")}</button>
              <button className={mode === "edit" ? "active" : ""} onClick={() => setMode("edit")}>{t(lang, "editProfile")}</button>
              <button className={mode === "search" ? "active" : ""} onClick={() => setMode("search")}>{t(lang, "search")}</button>
              <button onClick={exportTxt}>{t(lang, "exportTxt")}</button>
              <button onClick={exportJson}>{t(lang, "exportJson")}</button>
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
                      <div>{t(lang, "found")}</div>
                      <div className="line">{searchResult.account.profile.firstName} {searchResult.account.profile.lastName}</div>
                      <div className="line">{t(lang, "username")}: {searchResult.account.profile.username}</div>
                      <div className="line">{t(lang, "job")}: {searchResult.account.profile.job}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {msg && <div className="msg">{msg}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
