import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path


DATA_FILE = Path(__file__).with_name("accounts.json")
HOST = "127.0.0.1"
PORT = 5175


def read_accounts():
    if DATA_FILE.exists():
        try:
            return json.loads(DATA_FILE.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            return {}
    return {}


def write_accounts(data):
    DATA_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


class Handler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        if self.path != "/accounts":
            self._set_headers(404, "text/plain")
            self.wfile.write(b"Not found")
            return
        payload = read_accounts()
        self._set_headers(200)
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def do_POST(self):
        if self.path != "/accounts":
            self._set_headers(404, "text/plain")
            self.wfile.write(b"Not found")
            return
        length = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(length).decode("utf-8")
        try:
            data = json.loads(body) if body else {}
            if not isinstance(data, dict):
                raise ValueError("Payload must be an object")
            write_accounts(data)
            self._set_headers(200)
            self.wfile.write(b'{"ok":true}')
        except Exception:
            self._set_headers(400)
            self.wfile.write(b'{"ok":false}')


def main():
    server = HTTPServer((HOST, PORT), Handler)
    print(f"Accounts server running on http://{HOST}:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    main()
