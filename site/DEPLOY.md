# Déployer Biclette sur un serveur local (Proxmox)

Guide pas à pas : héberger le site dans un **conteneur LXC** Proxmox, servi
par **nginx**, avec **déploiement automatique à chaque push GitHub** grâce à
un runner self-hosted (aucun port à ouvrir sur ta box : le runner se
connecte *en sortant* vers GitHub).

> **Pourquoi LXC et pas une VM ?** Le site est 100 % statique après build :
> en production il n'y a que nginx qui sert des fichiers. Un LXC Debian non
> privilégié (1 vCPU / 1 Go RAM / 8 Go disque) suffit, démarre en 2 s et se
> snapshotte facilement. Node n'est utilisé qu'au moment du build par le
> runner.

> ⚠️ **Prérequis sécurité : repo privé.** Un runner self-hosted ne doit
> jamais être branché sur un repo public (un fork pourrait faire exécuter du
> code arbitraire sur ta machine). Vérifie dans GitHub → Settings → General
> que la visibilité est « Private ». Si le repo doit devenir public un jour,
> remplace le runner par un déploiement « pull » (cron qui vérifie la
> branche et rebuilde localement).

## 1. Créer le conteneur LXC dans Proxmox

Dans l'interface Proxmox : **Create CT**, puis :

| Réglage | Valeur |
| --- | --- |
| Template | Debian 12 (bookworm) standard |
| Unprivileged container | ✅ oui |
| **Features → Nesting** | ✅ **obligatoire** (le runner tourne en service systemd) |
| CPU / RAM / Disque | 1 vCPU · 1 Go (2 Go confort) · 8 Go |
| Réseau | IP statique sur ton LAN, ex. `192.168.1.50/24` + passerelle |

Démarre le CT et ouvre sa console (ou `pct enter <ID>` depuis l'hôte).

## 2. Installer l'environnement

```bash
apt update && apt upgrade -y
apt install -y git curl rsync nginx sudo

# Node 22 (NodeSource) + pnpm via corepack
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
corepack enable

node -v   # v22.x
pnpm -v   # 9.x ou 10.x
```

## 3. Configurer nginx

```bash
mkdir -p /var/www/biclette
```

Crée `/etc/nginx/sites-available/biclette` :

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/biclette;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript application/json
               image/svg+xml text/plain application/xml;

    # Assets fingerprintés par Nuxt : cache long, immuable.
    location /_nuxt/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        try_files $uri $uri/index.html =404;
    }

    # Page 404 générée par Nuxt.
    error_page 404 /404.html;
}
```

Active-la :

```bash
ln -s /etc/nginx/sites-available/biclette /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

## 4. Installer le runner GitHub self-hosted

Le runner tourne sous un utilisateur dédié, jamais root :

```bash
useradd -m -s /bin/bash runner
# Le runner doit pouvoir écrire dans le docroot :
chown -R runner:runner /var/www/biclette
```

Puis sur GitHub : **repo → Settings → Actions → Runners → New self-hosted
runner** (Linux x64). GitHub affiche des commandes avec un token frais —
exécute-les **en tant que `runner`** (`su - runner`) ; elles ressemblent à :

```bash
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-<version>.tar.gz -L https://github.com/actions/runner/releases/download/v<version>/actions-runner-linux-x64-<version>.tar.gz
tar xzf actions-runner-linux-x64-<version>.tar.gz
./config.sh --url https://github.com/<owner>/<repo> --token <TOKEN>
```

Pendant `config.sh`, quand les **labels** sont demandés, ajoute **`biclette`**
(le workflow ne cible que ce label : `runs-on: [self-hosted, biclette]`).

Installe-le en service (de retour en root) :

```bash
cd /home/runner/actions-runner
./svc.sh install runner
./svc.sh start
./svc.sh status   # doit être « active (running) »
```

Optionnel — changer le dossier de publication sans toucher au workflow :
ajoute `DEPLOY_DIR=/autre/chemin` dans `/home/runner/actions-runner/.env`
puis `./svc.sh stop && ./svc.sh start`.

## 5. Premier déploiement

Le workflow `.github/workflows/deploy.yml` se déclenche à chaque push sur la
branche du site, et manuellement via **Actions → « Déployer sur le serveur
local » → Run workflow**. Lance-le une première fois à la main, puis ouvre :

```
http://192.168.1.50/        (l'IP de ton LXC)
```

Chaque étape (install, generate, rsync) est visible dans l'onglet Actions.

## 6. Notes

- **Accès hors de chez toi** : plutôt que d'ouvrir un port sur ta box,
  installe Tailscale ou WireGuard sur le LXC — le site reste privé et
  accessible depuis ton téléphone/portable.
- **Après merge sur `main`** : change la branche déclencheuse dans
  `deploy.yml` (`branches: [main]`).
- **Quand le backend arrivera** (Nuxt full-stack ou Laravel) : ce montage
  s'adapte sans être jeté. Deux options —
  1. *Backend dans le même LXC* : l'app (Node ou PHP-FPM) tourne en service
     sur un port local, et nginx la sert en reverse proxy
     (`location /api/ { proxy_pass http://127.0.0.1:3000; }`) tout en
     continuant de servir le statique ;
  2. *Backend dans un second LXC* (recommandé à terme : base de données,
     montées de version indépendantes), nginx du premier proxifie vers son
     IP. Le workflow gagnera simplement un job de plus (build backend +
     restart du service). Prévois alors 2 Go de RAM pour le LXC backend.
- **Sauvegarde** : ajoute le CT au job de backup Proxmox (vzdump) — snapshot
  avant chaque grosse mise à jour.
