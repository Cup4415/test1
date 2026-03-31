import getpass
import hashlib
import json
import random
from datetime import datetime
from pathlib import Path

ACCOUNTS_FILE = Path("accounts.json")
OLD_ACCOUNT_FILE = Path("account.json")


EXTRA_TRANSLATIONS = {
    "es": {
        "This field cannot be empty.": "Este campo no puede estar vacio.",
        "Password cannot be empty.": "La contrasena no puede estar vacia.",
        "Enter your age: ": "Introduce tu edad: ",
        "Please enter a valid positive age.": "Introduce una edad valida y positiva.",
        "Enter your first name: ": "Introduce tu nombre: ",
        "Enter your last name: ": "Introduce tu apellido: ",
        "Enter your job: ": "Introduce tu trabajo: ",
        "Enter your favorite food: ": "Introduce tu comida favorita: ",
        "Enter your city: ": "Introduce tu ciudad: ",
        "Enter your hobby: ": "Introduce tu pasatiempo: ",
        "Enter your favorite color: ": "Introduce tu color favorito: ",
        "Enter your dream job: ": "Introduce tu trabajo sonado: ",
        "Press Enter to keep current value.": "Pulsa Enter para mantener el valor actual.",
        "1) Create account": "1) Crear cuenta",
        "2) Login": "2) Iniciar sesion",
        "3) Search user": "3) Buscar usuario",
        "4) Change language": "4) Cambiar idioma",
        "0) Quit": "0) Salir",
        "1) View profile": "1) Ver perfil",
        "2) Edit profile": "2) Editar perfil",
        "3) Delete account": "3) Eliminar cuenta",
        "5) Export profile to TXT": "5) Exportar perfil a TXT",
        "6) Export profile to JSON": "6) Exportar perfil a JSON",
        "7) Change language": "7) Cambiar idioma",
        "8) Logout": "8) Cerrar sesion",
        "Choose an option: ": "Elige una opcion: ",
        "Choose your username: ": "Elige tu nombre de usuario: ",
        "Username already exists.": "El nombre de usuario ya existe.",
        "Choose your password: ": "Elige tu contrasena: ",
        "Confirm your password: ": "Confirma tu contrasena: ",
        "Passwords do not match.": "Las contrasenas no coinciden.",
        "Username: ": "Nombre de usuario: ",
        "Password: ": "Contrasena: ",
        "Login successful.": "Inicio de sesion correcto.",
        "Wrong username or password.": "Usuario o contrasena incorrectos.",
        "Search username: ": "Buscar nombre de usuario: ",
        "User found:": "Usuario encontrado:",
        "User not found.": "Usuario no encontrado.",
        "Goodbye.": "Adios.",
        "Invalid option.": "Opcion invalida.",
        "Change password? (y/n): ": "Cambiar contrasena? (y/n): ",
        "New password: ": "Nueva contrasena: ",
        "Confirm new password: ": "Confirma la nueva contrasena: ",
        "Profile updated and saved.": "Perfil actualizado y guardado.",
        "Delete account permanently? (y/n): ": "Eliminar la cuenta permanentemente? (y/n): ",
        "Enter your password: ": "Introduce tu contrasena: ",
        "Account deleted.": "Cuenta eliminada.",
        "Wrong password.": "Contrasena incorrecta.",
        "Logged out. You can login again.": "Sesion cerrada. Puedes volver a iniciar sesion.",
        "It's you.": "Eres tu.",
    },
    "de": {
        "This field cannot be empty.": "Dieses Feld darf nicht leer sein.",
        "Password cannot be empty.": "Das Passwort darf nicht leer sein.",
        "Enter your age: ": "Gib dein Alter ein: ",
        "Please enter a valid positive age.": "Bitte gib ein gueltiges positives Alter ein.",
        "Enter your first name: ": "Gib deinen Vornamen ein: ",
        "Enter your last name: ": "Gib deinen Nachnamen ein: ",
        "Enter your job: ": "Gib deinen Beruf ein: ",
        "Enter your favorite food: ": "Gib dein Lieblingsessen ein: ",
        "Enter your city: ": "Gib deine Stadt ein: ",
        "Enter your hobby: ": "Gib dein Hobby ein: ",
        "Enter your favorite color: ": "Gib deine Lieblingsfarbe ein: ",
        "Enter your dream job: ": "Gib deinen Traumberuf ein: ",
        "Press Enter to keep current value.": "Druecke Enter, um den aktuellen Wert zu behalten.",
        "1) Create account": "1) Konto erstellen",
        "2) Login": "2) Anmelden",
        "3) Search user": "3) Benutzer suchen",
        "4) Change language": "4) Sprache aendern",
        "0) Quit": "0) Beenden",
        "1) View profile": "1) Profil anzeigen",
        "2) Edit profile": "2) Profil bearbeiten",
        "3) Delete account": "3) Konto loeschen",
        "5) Export profile to TXT": "5) Profil als TXT exportieren",
        "6) Export profile to JSON": "6) Profil als JSON exportieren",
        "7) Change language": "7) Sprache aendern",
        "8) Logout": "8) Abmelden",
        "Choose an option: ": "Waehle eine Option: ",
        "Choose your username: ": "Waehle deinen Benutzernamen: ",
        "Username already exists.": "Benutzername existiert bereits.",
        "Choose your password: ": "Waehle dein Passwort: ",
        "Confirm your password: ": "Bestaetige dein Passwort: ",
        "Passwords do not match.": "Passwoerter stimmen nicht ueberein.",
        "Username: ": "Benutzername: ",
        "Password: ": "Passwort: ",
        "Login successful.": "Anmeldung erfolgreich.",
        "Wrong username or password.": "Falscher Benutzername oder Passwort.",
        "Search username: ": "Benutzernamen suchen: ",
        "User found:": "Benutzer gefunden:",
        "User not found.": "Benutzer nicht gefunden.",
        "Goodbye.": "Auf Wiedersehen.",
        "Invalid option.": "Ungueltige Option.",
        "Change password? (y/n): ": "Passwort aendern? (y/n): ",
        "New password: ": "Neues Passwort: ",
        "Confirm new password: ": "Neues Passwort bestaetigen: ",
        "Profile updated and saved.": "Profil aktualisiert und gespeichert.",
        "Delete account permanently? (y/n): ": "Konto dauerhaft loeschen? (y/n): ",
        "Enter your password: ": "Gib dein Passwort ein: ",
        "Account deleted.": "Konto geloescht.",
        "Wrong password.": "Falsches Passwort.",
        "Logged out. You can login again.": "Abgemeldet. Du kannst dich wieder anmelden.",
        "It's you.": "Das bist du.",
    },
    "it": {
        "This field cannot be empty.": "Questo campo non puo essere vuoto.",
        "Password cannot be empty.": "La password non puo essere vuota.",
        "Enter your age: ": "Inserisci la tua eta: ",
        "Please enter a valid positive age.": "Inserisci un'eta valida e positiva.",
        "Enter your first name: ": "Inserisci il tuo nome: ",
        "Enter your last name: ": "Inserisci il tuo cognome: ",
        "Enter your job: ": "Inserisci il tuo lavoro: ",
        "Enter your favorite food: ": "Inserisci il tuo cibo preferito: ",
        "Enter your city: ": "Inserisci la tua citta: ",
        "Enter your hobby: ": "Inserisci il tuo hobby: ",
        "Enter your favorite color: ": "Inserisci il tuo colore preferito: ",
        "Enter your dream job: ": "Inserisci il lavoro dei tuoi sogni: ",
        "Press Enter to keep current value.": "Premi Invio per mantenere il valore corrente.",
        "1) Create account": "1) Crea account",
        "2) Login": "2) Accesso",
        "3) Search user": "3) Cerca utente",
        "4) Change language": "4) Cambia lingua",
        "0) Quit": "0) Esci",
        "1) View profile": "1) Visualizza profilo",
        "2) Edit profile": "2) Modifica profilo",
        "3) Delete account": "3) Elimina account",
        "5) Export profile to TXT": "5) Esporta profilo in TXT",
        "6) Export profile to JSON": "6) Esporta profilo in JSON",
        "7) Change language": "7) Cambia lingua",
        "8) Logout": "8) Disconnetti",
        "Choose an option: ": "Scegli un'opzione: ",
        "Choose your username: ": "Scegli il tuo nome utente: ",
        "Username already exists.": "Il nome utente esiste gia.",
        "Choose your password: ": "Scegli la tua password: ",
        "Confirm your password: ": "Conferma la tua password: ",
        "Passwords do not match.": "Le password non corrispondono.",
        "Username: ": "Nome utente: ",
        "Password: ": "Password: ",
        "Login successful.": "Accesso riuscito.",
        "Wrong username or password.": "Nome utente o password errati.",
        "Search username: ": "Cerca nome utente: ",
        "User found:": "Utente trovato:",
        "User not found.": "Utente non trovato.",
        "Goodbye.": "Arrivederci.",
        "Invalid option.": "Opzione non valida.",
        "Change password? (y/n): ": "Cambiare password? (y/n): ",
        "New password: ": "Nuova password: ",
        "Confirm new password: ": "Conferma nuova password: ",
        "Profile updated and saved.": "Profilo aggiornato e salvato.",
        "Delete account permanently? (y/n): ": "Eliminare account definitivamente? (y/n): ",
        "Enter your password: ": "Inserisci la tua password: ",
        "Account deleted.": "Account eliminato.",
        "Wrong password.": "Password errata.",
        "Logged out. You can login again.": "Disconnesso. Puoi accedere di nuovo.",
        "It's you.": "Sei tu.",
    },
    "pt": {
        "This field cannot be empty.": "Este campo nao pode estar vazio.",
        "Password cannot be empty.": "A senha nao pode estar vazia.",
        "Enter your age: ": "Digite sua idade: ",
        "Please enter a valid positive age.": "Digite uma idade valida e positiva.",
        "Enter your first name: ": "Digite seu nome: ",
        "Enter your last name: ": "Digite seu sobrenome: ",
        "Enter your job: ": "Digite sua profissao: ",
        "Enter your favorite food: ": "Digite sua comida favorita: ",
        "Enter your city: ": "Digite sua cidade: ",
        "Enter your hobby: ": "Digite seu hobby: ",
        "Enter your favorite color: ": "Digite sua cor favorita: ",
        "Enter your dream job: ": "Digite a profissao dos seus sonhos: ",
        "Press Enter to keep current value.": "Pressione Enter para manter o valor atual.",
        "1) Create account": "1) Criar conta",
        "2) Login": "2) Entrar",
        "3) Search user": "3) Buscar usuario",
        "4) Change language": "4) Mudar idioma",
        "0) Quit": "0) Sair",
        "1) View profile": "1) Ver perfil",
        "2) Edit profile": "2) Editar perfil",
        "3) Delete account": "3) Excluir conta",
        "5) Export profile to TXT": "5) Exportar perfil para TXT",
        "6) Export profile to JSON": "6) Exportar perfil para JSON",
        "7) Change language": "7) Mudar idioma",
        "8) Logout": "8) Sair da conta",
        "Choose an option: ": "Escolha uma opcao: ",
        "Choose your username: ": "Escolha seu nome de usuario: ",
        "Username already exists.": "O nome de usuario ja existe.",
        "Choose your password: ": "Escolha sua senha: ",
        "Confirm your password: ": "Confirme sua senha: ",
        "Passwords do not match.": "As senhas nao coincidem.",
        "Username: ": "Nome de usuario: ",
        "Password: ": "Senha: ",
        "Login successful.": "Login realizado com sucesso.",
        "Wrong username or password.": "Nome de usuario ou senha incorretos.",
        "Search username: ": "Buscar nome de usuario: ",
        "User found:": "Usuario encontrado:",
        "User not found.": "Usuario nao encontrado.",
        "Goodbye.": "Tchau.",
        "Invalid option.": "Opcao invalida.",
        "Change password? (y/n): ": "Alterar senha? (y/n): ",
        "New password: ": "Nova senha: ",
        "Confirm new password: ": "Confirme a nova senha: ",
        "Profile updated and saved.": "Perfil atualizado e salvo.",
        "Delete account permanently? (y/n): ": "Excluir conta permanentemente? (y/n): ",
        "Enter your password: ": "Digite sua senha: ",
        "Account deleted.": "Conta excluida.",
        "Wrong password.": "Senha incorreta.",
        "Logged out. You can login again.": "Sessao encerrada. Voce pode entrar novamente.",
        "It's you.": "E voce.",
    },
    "nl": {
        "This field cannot be empty.": "Dit veld mag niet leeg zijn.",
        "Password cannot be empty.": "Wachtwoord mag niet leeg zijn.",
        "Enter your age: ": "Voer je leeftijd in: ",
        "Please enter a valid positive age.": "Voer een geldige positieve leeftijd in.",
        "Enter your first name: ": "Voer je voornaam in: ",
        "Enter your last name: ": "Voer je achternaam in: ",
        "Enter your job: ": "Voer je beroep in: ",
        "Enter your favorite food: ": "Voer je favoriete eten in: ",
        "Enter your city: ": "Voer je stad in: ",
        "Enter your hobby: ": "Voer je hobby in: ",
        "Enter your favorite color: ": "Voer je favoriete kleur in: ",
        "Enter your dream job: ": "Voer je droombaan in: ",
        "Press Enter to keep current value.": "Druk op Enter om de huidige waarde te behouden.",
        "1) Create account": "1) Account maken",
        "2) Login": "2) Inloggen",
        "3) Search user": "3) Gebruiker zoeken",
        "4) Change language": "4) Taal wijzigen",
        "0) Quit": "0) Afsluiten",
        "1) View profile": "1) Profiel bekijken",
        "2) Edit profile": "2) Profiel bewerken",
        "3) Delete account": "3) Account verwijderen",
        "5) Export profile to TXT": "5) Profiel exporteren naar TXT",
        "6) Export profile to JSON": "6) Profiel exporteren naar JSON",
        "7) Change language": "7) Taal wijzigen",
        "8) Logout": "8) Uitloggen",
        "Choose an option: ": "Kies een optie: ",
        "Choose your username: ": "Kies je gebruikersnaam: ",
        "Username already exists.": "Gebruikersnaam bestaat al.",
        "Choose your password: ": "Kies je wachtwoord: ",
        "Confirm your password: ": "Bevestig je wachtwoord: ",
        "Passwords do not match.": "Wachtwoorden komen niet overeen.",
        "Username: ": "Gebruikersnaam: ",
        "Password: ": "Wachtwoord: ",
        "Login successful.": "Inloggen gelukt.",
        "Wrong username or password.": "Onjuiste gebruikersnaam of wachtwoord.",
        "Search username: ": "Zoek gebruikersnaam: ",
        "User found:": "Gebruiker gevonden:",
        "User not found.": "Gebruiker niet gevonden.",
        "Goodbye.": "Tot ziens.",
        "Invalid option.": "Ongeldige optie.",
        "Change password? (y/n): ": "Wachtwoord wijzigen? (y/n): ",
        "New password: ": "Nieuw wachtwoord: ",
        "Confirm new password: ": "Bevestig nieuw wachtwoord: ",
        "Profile updated and saved.": "Profiel bijgewerkt en opgeslagen.",
        "Delete account permanently? (y/n): ": "Account definitief verwijderen? (y/n): ",
        "Enter your password: ": "Voer je wachtwoord in: ",
        "Account deleted.": "Account verwijderd.",
        "Wrong password.": "Onjuist wachtwoord.",
        "Logged out. You can login again.": "Uitgelogd. Je kunt opnieuw inloggen.",
        "It's you.": "Jij bent het.",
    },
    "tr": {
        "This field cannot be empty.": "Bu alan bos birakilamaz.",
        "Password cannot be empty.": "Sifre bos birakilamaz.",
        "Enter your age: ": "Yasinizi girin: ",
        "Please enter a valid positive age.": "Lutfen gecerli pozitif bir yas girin.",
        "Enter your first name: ": "Adinizi girin: ",
        "Enter your last name: ": "Soyadinizi girin: ",
        "Enter your job: ": "Mesleginizi girin: ",
        "Enter your favorite food: ": "Sevdiginiz yemegi girin: ",
        "Enter your city: ": "Sehrinizi girin: ",
        "Enter your hobby: ": "Hobinizi girin: ",
        "Enter your favorite color: ": "Sevdiginiz rengi girin: ",
        "Enter your dream job: ": "Hayalinizdeki meslegi girin: ",
        "Press Enter to keep current value.": "Mevcut degeri korumak icin Enter'a basin.",
        "1) Create account": "1) Hesap olustur",
        "2) Login": "2) Giris yap",
        "3) Search user": "3) Kullanici ara",
        "4) Change language": "4) Dili degistir",
        "0) Quit": "0) Cikis",
        "1) View profile": "1) Profili gor",
        "2) Edit profile": "2) Profili duzenle",
        "3) Delete account": "3) Hesabi sil",
        "5) Export profile to TXT": "5) Profili TXT olarak disa aktar",
        "6) Export profile to JSON": "6) Profili JSON olarak disa aktar",
        "7) Change language": "7) Dili degistir",
        "8) Logout": "8) Cikis yap",
        "Choose an option: ": "Bir secenek secin: ",
        "Choose your username: ": "Kullanici adinizi secin: ",
        "Username already exists.": "Kullanici adi zaten mevcut.",
        "Choose your password: ": "Sifrenizi secin: ",
        "Confirm your password: ": "Sifrenizi onaylayin: ",
        "Passwords do not match.": "Sifreler eslesmiyor.",
        "Username: ": "Kullanici adi: ",
        "Password: ": "Sifre: ",
        "Login successful.": "Giris basarili.",
        "Wrong username or password.": "Kullanici adi veya sifre yanlis.",
        "Search username: ": "Kullanici adi ara: ",
        "User found:": "Kullanici bulundu:",
        "User not found.": "Kullanici bulunamadi.",
        "Goodbye.": "Gule gule.",
        "Invalid option.": "Gecersiz secenek.",
        "Change password? (y/n): ": "Sifre degistirilsin mi? (y/n): ",
        "New password: ": "Yeni sifre: ",
        "Confirm new password: ": "Yeni sifreyi onaylayin: ",
        "Profile updated and saved.": "Profil guncellendi ve kaydedildi.",
        "Delete account permanently? (y/n): ": "Hesap kalici olarak silinsin mi? (y/n): ",
        "Enter your password: ": "Sifrenizi girin: ",
        "Account deleted.": "Hesap silindi.",
        "Wrong password.": "Yanlis sifre.",
        "Logged out. You can login again.": "Cikis yapildi. Tekrar giris yapabilirsiniz.",
        "It's you.": "Bu sensin.",
    },
}


def t(language, en_text, fr_text, ar_text):
    if language == "fr":
        return fr_text
    if language in EXTRA_TRANSLATIONS:
        return EXTRA_TRANSLATIONS[language].get(en_text, en_text)
    return en_text


def now_text():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def hash_password(password):
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def load_accounts():
    if ACCOUNTS_FILE.exists():
        try:
            with ACCOUNTS_FILE.open("r", encoding="utf-8") as file:
                data = json.load(file)
            if isinstance(data, dict):
                return data
        except (json.JSONDecodeError, OSError):
            return {}

    # Migrate old single-account file if present.
    if OLD_ACCOUNT_FILE.exists():
        try:
            with OLD_ACCOUNT_FILE.open("r", encoding="utf-8") as file:
                old_data = json.load(file)
            if "profile" in old_data and "password_hash" in old_data:
                profile = old_data["profile"]
                username = profile.get("username", "").strip()
                if username:
                    migrated = {
                        username: {
                            "password_hash": old_data["password_hash"],
                            "profile": profile,
                            "created_at": now_text(),
                            "last_login": None,
                            "last_edit": None,
                        }
                    }
                    save_accounts(migrated)
                    return migrated
        except (json.JSONDecodeError, OSError):
            return {}
    return {}


def save_accounts(accounts):
    with ACCOUNTS_FILE.open("w", encoding="utf-8") as file:
        json.dump(accounts, file, indent=2, ensure_ascii=False)


def prompt_non_empty(language, label):
    while True:
        value = input(label).strip()
        if value:
            return value
        print(
            t(
                language,
                "This field cannot be empty.",
                "Ce champ ne peut pas etre vide.",
                "لا يمكن أن تكون هذه الخانة فارغة.",
            )
        )


def prompt_password(language, label):
    while True:
        print(
            t(
                language,
                "Password typing is hidden. Type it and press Enter.",
                "La saisie du mot de passe est masquee. Tapez-le puis appuyez sur Entree.",
                "",
            )
        )
        try:
            value = getpass.getpass(label).strip()
        except Exception:
            print(
                t(
                    language,
                    "Hidden password input is not supported here. Using visible input.",
                    "La saisie masquee n'est pas prise en charge ici. Saisie visible utilisee.",
                    "",
                )
            )
            value = input(label).strip()
        if value:
            return value
        print(
            t(
                language,
                "Password cannot be empty.",
                "Le mot de passe ne peut pas etre vide.",
                "كلمة المرور لا يمكن أن تكون فارغة.",
            )
        )


def prompt_age(language, current=None):
    while True:
        if current is None:
            age_text = input(
                t(language, "Enter your age: ", "Entrez votre age: ", "ادخل عمرك: ")
            ).strip()
        else:
            age_text = input(
                t(
                    language,
                    f"Age ({current}): ",
                    f"Age ({current}): ",
                    f"العمر ({current}): ",
                )
            ).strip()
            if not age_text:
                return current

        if age_text.isdigit() and int(age_text) > 0:
            return int(age_text)
        print(
            t(
                language,
                "Please enter a valid positive age.",
                "Veuillez entrer un age positif valide.",
                "يرجى إدخال عمر صحيح وموجب.",
            )
        )


def collect_profile(language, username, existing=None):
    if existing is None:
        age = prompt_age(language)
        first_name = input(
            t(language, "Enter your first name: ", "Entrez votre prenom: ", "ادخل اسمك: ")
        ).strip().title()
        last_name = input(
            t(language, "Enter your last name: ", "Entrez votre nom: ", "ادخل اسم العائلة: ")
        ).strip().title()
        job = input(t(language, "Enter your job: ", "Entrez votre metier: ", "ادخل مهنتك: ")).strip().title()
        favorite_food = input(
            t(language, "Enter your favorite food: ", "Entrez votre plat prefere: ", "ادخل اكلك المفضل: ")
        ).strip().title()
        city = input(t(language, "Enter your city: ", "Entrez votre ville: ", "ادخل مدينتك: ")).strip().title()
        hobby = input(t(language, "Enter your hobby: ", "Entrez votre loisir: ", "ادخل هوايتك: ")).strip().title()
        favorite_color = input(
            t(language, "Enter your favorite color: ", "Entrez votre couleur preferee: ", "ادخل لونك المفضل: ")
        ).strip().title()
        dream_job = input(
            t(language, "Enter your dream job: ", "Entrez le metier de vos reves: ", "ادخل وظيفة احلامك: ")
        ).strip().title()
    else:
        print(t(language, "Press Enter to keep current value.", "Appuyez sur Entree pour garder la valeur.", "اضغط Enter للاحتفاظ بالقيمة الحالية."))
        age = prompt_age(language, existing["age"])

        first_name = input(f"First name ({existing['first_name']}): ").strip().title() or existing["first_name"]
        last_name = input(f"Last name ({existing['last_name']}): ").strip().title() or existing["last_name"]
        job = input(f"Job ({existing['job']}): ").strip().title() or existing["job"]
        favorite_food = input(f"Favorite food ({existing['favorite_food']}): ").strip().title() or existing["favorite_food"]
        city = input(f"City ({existing['city']}): ").strip().title() or existing["city"]
        hobby = input(f"Hobby ({existing['hobby']}): ").strip().title() or existing["hobby"]
        favorite_color = input(f"Favorite color ({existing['favorite_color']}): ").strip().title() or existing["favorite_color"]
        dream_job = input(f"Dream job ({existing['dream_job']}): ").strip().title() or existing["dream_job"]

    return {
        "username": username,
        "age": age,
        "first_name": first_name,
        "last_name": last_name,
        "job": job,
        "favorite_food": favorite_food,
        "city": city,
        "hobby": hobby,
        "favorite_color": favorite_color,
        "dream_job": dream_job,
    }


def show_profile(profile, language):
    print(
        t(
            language,
            f"{profile['first_name']} {profile['last_name']}, {profile['age']} years old, works as {profile['job']}",
            f"{profile['first_name']} {profile['last_name']}, {profile['age']} ans, travaille comme {profile['job']}",
            "",
        )
    )
    print(
        t(
            language,
            f"Food: {profile['favorite_food']} | City: {profile['city']} | Hobby: {profile['hobby']} | Color: {profile['favorite_color']}",
            f"Nourriture: {profile['favorite_food']} | Ville: {profile['city']} | Loisir: {profile['hobby']} | Couleur: {profile['favorite_color']}",
            "",
        )
    )
    print(
        t(
            language,
            f"Dream job: {profile['dream_job']} | Username: {profile['username']}",
            f"Metier reve: {profile['dream_job']} | Nom d'utilisateur: {profile['username']}",
            "",
        )
    )


def show_stats(account, language):
    print(t(language, "Stats:", "Statistiques:", ""))
    print(t(language, f"Created at: {account.get('created_at')}", f"Cree le: {account.get('created_at')}", ""))
    print(t(language, f"Last login: {account.get('last_login')}", f"Derniere connexion: {account.get('last_login')}", ""))
    print(t(language, f"Last edit: {account.get('last_edit')}", f"Derniere modification: {account.get('last_edit')}", ""))


def export_profile_txt(username, profile, account):
    output = Path(f"{username}_profile.txt")
    with output.open("w", encoding="utf-8") as file:
        file.write(f"Username: {profile['username']}\n")
        file.write(f"First Name: {profile['first_name']}\n")
        file.write(f"Last Name: {profile['last_name']}\n")
        file.write(f"Age: {profile['age']}\n")
        file.write(f"Job: {profile['job']}\n")
        file.write(f"Favorite Food: {profile['favorite_food']}\n")
        file.write(f"City: {profile['city']}\n")
        file.write(f"Hobby: {profile['hobby']}\n")
        file.write(f"Favorite Color: {profile['favorite_color']}\n")
        file.write(f"Dream Job: {profile['dream_job']}\n")
        file.write(f"Created at: {account.get('created_at')}\n")
        file.write(f"Last login: {account.get('last_login')}\n")
        file.write(f"Last edit: {account.get('last_edit')}\n")
    return output


def export_profile_json(username, profile, account):
    output = Path(f"{username}_profile.json")
    payload = {"profile": profile, "stats": {
        "created_at": account.get("created_at"),
        "last_login": account.get("last_login"),
        "last_edit": account.get("last_edit"),
    }}
    with output.open("w", encoding="utf-8") as file:
        json.dump(payload, file, indent=2, ensure_ascii=False)
    return output


def set_language(language):
    print(
        t(
            language,
            "\nLanguages: en / fr / es / de / it / pt / nl / tr",
            "\nLangues: en / fr / es / de / it / pt / nl / tr",
            "",
        )
    )
    new_lang = input(
        t(
            language,
            "Choose language code: ",
            "Choisissez le code de langue: ",
            "",
        )
    ).strip().lower()
    if new_lang in {"en", "fr", "es", "de", "it", "pt", "nl", "tr"}:
        return new_lang
    print(
        t(
            language,
            "Invalid language. Keeping current language.",
            "Langue invalide. La langue actuelle est conservee.",
            "",
        )
    )
    return language


accounts = load_accounts()
language = "en"
current_username = None

while True:
    print("\n===== Profile Menu =====")
    if current_username is None:
        print(t(language, "1) Create account", "1) Creer un compte", "1) انشاء حساب"))
        print(t(language, "2) Login", "2) Se connecter", "2) تسجيل الدخول"))
        print(t(language, "3) Search user", "3) Rechercher un utilisateur", "3) البحث عن مستخدم"))
        print(t(language, "4) Change language", "4) Changer la langue", "4) تغيير اللغة"))
        print(t(language, "0) Quit", "0) Quitter", "0) خروج"))
    else:
        print(t(language, "1) View profile", "1) Voir le profil", "1) عرض الملف الشخصي"))
        print(t(language, "2) Edit profile", "2) Modifier le profil", "2) تعديل الملف الشخصي"))
        print(t(language, "3) Delete account", "3) Supprimer le compte", "3) حذف الحساب"))
        print(t(language, "4) Search user", "4) Rechercher un utilisateur", "4) البحث عن مستخدم"))
        print(t(language, "5) Export profile to TXT", "5) Exporter en TXT", "5) تصدير الى TXT"))
        print(t(language, "6) Export profile to JSON", "6) Exporter en JSON", "6) تصدير الى JSON"))
        print(t(language, "7) Change language", "7) Changer la langue", "7) تغيير اللغة"))
        print(t(language, "8) Logout", "8) Deconnexion", "8) تسجيل الخروج"))
        print(t(language, "0) Quit", "0) Quitter", "0) خروج"))

    choice = input(t(language, "Choose an option: ", "Choisissez une option: ", "اختر خيارا: ")).strip()

    if current_username is None:
        if choice == "1":
            username = prompt_non_empty(
                language,
                t(language, "Choose your username: ", "Choisissez un nom d'utilisateur: ", "اختر اسم المستخدم: "),
            )
            if username in accounts:
                print(t(language, "Username already exists.", "Ce nom existe deja.", "اسم المستخدم موجود بالفعل."))
                continue

            while True:
                password = prompt_password(
                    language,
                    t(language, "Choose your password: ", "Choisissez votre mot de passe: ", "اختر كلمة المرور: "),
                )
                confirm = prompt_password(
                    language,
                    t(language, "Confirm your password: ", "Confirmez votre mot de passe: ", "تاكيد كلمة المرور: "),
                )
                if password == confirm:
                    break
                print(t(language, "Passwords do not match.", "Les mots de passe ne correspondent pas.", "كلمتا المرور غير متطابقتين."))

            profile = collect_profile(language, username)
            created = now_text()
            accounts[username] = {
                "password_hash": hash_password(password),
                "profile": profile,
                "created_at": created,
                "last_login": created,
                "last_edit": None,
            }
            save_accounts(accounts)
            current_username = username

            print("\n" + "_" * 80)
            print(
                f"Hi, my name is {profile['first_name']} {profile['last_name']}. "
                f"I am {profile['age']} years old and I work as a {profile['job']}."
            )
            print(f"My favorite food is {profile['favorite_food']}.")
            print(random.choice([
                "Fun fact: Honey never spoils.",
                "Fun fact: Bananas are berries, but strawberries are not.",
                "Fun fact: Octopuses have three hearts.",
                "Fun fact: The Eiffel Tower can grow taller in summer heat.",
            ]))

        elif choice == "2":
            username = prompt_non_empty(
                language,
                t(language, "Username: ", "Nom d'utilisateur: ", "اسم المستخدم: "),
            )
            password = prompt_password(
                language,
                t(language, "Password: ", "Mot de passe: ", "كلمة المرور: "),
            )
            account = accounts.get(username)
            if account and account["password_hash"] == hash_password(password):
                current_username = username
                accounts[username]["last_login"] = now_text()
                save_accounts(accounts)
                print(t(language, "Login successful.", "Connexion reussie.", "تم تسجيل الدخول بنجاح."))
            else:
                print(t(language, "Wrong username or password.", "Nom ou mot de passe incorrect.", "اسم المستخدم او كلمة المرور غير صحيحة."))

        elif choice == "3":
            username = prompt_non_empty(
                language,
                t(language, "Search username: ", "Rechercher un utilisateur: ", "ابحث عن اسم مستخدم: "),
            )
            account = accounts.get(username)
            if account:
                print(t(language, "User found:", "Utilisateur trouve:", "تم العثور على المستخدم:"))
                if current_username == username:
                    print(t(language, "It's you.", "C'est vous.", ""))
                else:
                    show_profile(account["profile"], language)
                    show_stats(account, language)
            else:
                print(t(language, "User not found.", "Utilisateur introuvable.", "المستخدم غير موجود."))

        elif choice == "4":
            language = set_language(language)

        elif choice == "0":
            print(t(language, "Goodbye.", "Au revoir.", "وداعا."))
            break

        else:
            print(t(language, "Invalid option.", "Option invalide.", "خيار غير صالح."))

    else:
        account = accounts[current_username]
        profile = account["profile"]

        if choice == "1":
            print("\nCurrent profile:")
            show_profile(profile, language)
            show_stats(account, language)

        elif choice == "2":
            new_username = input(f"Username ({current_username}): ").strip()
            if new_username:
                if new_username in accounts and new_username != current_username:
                    print(t(language, "Username already exists.", "Ce nom existe deja.", "اسم المستخدم موجود بالفعل."))
                    continue
                current_profile = dict(profile)
                current_profile["username"] = new_username
                profile = current_profile
                del accounts[current_username]
                current_username = new_username
                accounts[current_username] = account
                account["profile"] = profile

            updated_profile = collect_profile(language, current_username, profile)
            account["profile"] = updated_profile

            change_password = input(
                t(language, "Change password? (y/n): ", "Changer le mot de passe? (y/n): ", "تغيير كلمة المرور؟ (y/n): ")
            ).strip().lower()
            if change_password == "y":
                while True:
                    new_password = prompt_password(
                        language,
                        t(language, "New password: ", "Nouveau mot de passe: ", "كلمة المرور الجديدة: "),
                    )
                    confirm_new = prompt_password(
                        language,
                        t(language, "Confirm new password: ", "Confirmer le nouveau mot de passe: ", "تاكيد كلمة المرور الجديدة: "),
                    )
                    if new_password == confirm_new:
                        account["password_hash"] = hash_password(new_password)
                        break
                    print(t(language, "Passwords do not match.", "Les mots de passe ne correspondent pas.", "كلمتا المرور غير متطابقتين."))

            account["last_edit"] = now_text()
            save_accounts(accounts)
            print(t(language, "Profile updated and saved.", "Profil mis a jour.", "تم تحديث وحفظ الملف الشخصي."))

        elif choice == "3":
            confirm = input(
                t(language, "Delete account permanently? (y/n): ", "Supprimer le compte definitivement? (y/n): ", "حذف الحساب نهائيا؟ (y/n): ")
            ).strip().lower()
            if confirm == "y":
                check_password = prompt_password(
                    language,
                    t(language, "Enter your password: ", "Entrez votre mot de passe: ", "ادخل كلمة المرور: "),
                )
                if hash_password(check_password) == account["password_hash"]:
                    del accounts[current_username]
                    save_accounts(accounts)
                    current_username = None
                    print(t(language, "Account deleted.", "Compte supprime.", "تم حذف الحساب."))
                else:
                    print(t(language, "Wrong password.", "Mot de passe incorrect.", "كلمة المرور غير صحيحة."))

        elif choice == "4":
            username = prompt_non_empty(
                language,
                t(language, "Search username: ", "Rechercher un utilisateur: ", "ابحث عن اسم مستخدم: "),
            )
            found = accounts.get(username)
            if found:
                print(t(language, "User found:", "Utilisateur trouve:", "تم العثور على المستخدم:"))
                if current_username == username:
                    print(t(language, "It's you.", "C'est vous.", ""))
                else:
                    show_profile(found["profile"], language)
                    show_stats(found, language)
            else:
                print(t(language, "User not found.", "Utilisateur introuvable.", "المستخدم غير موجود."))

        elif choice == "5":
            output_path = export_profile_txt(current_username, profile, account)
            print(f"Exported to {output_path}")

        elif choice == "6":
            output_path = export_profile_json(current_username, profile, account)
            print(f"Exported to {output_path}")

        elif choice == "7":
            language = set_language(language)

        elif choice == "8":
            current_username = None
            print(t(language, "Logged out. You can login again.", "Deconnecte. Vous pouvez vous reconnecter.", "تم تسجيل الخروج. يمكنك تسجيل الدخول مرة اخرى."))

        elif choice == "0":
            print(t(language, "Goodbye.", "Au revoir.", "وداعا."))
            break

        else:
            print(t(language, "Invalid option.", "Option invalide.", "خيار غير صالح."))
