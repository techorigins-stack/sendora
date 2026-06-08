<div align="center">
  <h1>Sendora</h1>
  <h3>Private, peer-to-peer file transfers in your browser</h3>
  <p><em>No uploads. No accounts. No middleman. Files stream directly browser-to-browser over WebRTC.</em></p>
</div>

Using [WebRTC](http://www.webrtc.org), Sendora eliminates the initial upload step required by other web-based file-sharing services. Because data is never stored on an intermediary server, transfers are fast, private, and end-to-end encrypted.

## Features

* **Direct P2P transfer.** Files move straight from the sender's browser to the receiver's over an encrypted WebRTC data channel — they never touch a server.
* **Send text & snippets.** Share a note, message, or pasted snippet of text using the same secure flow, not just files.
* **Short room code + QR.** Every transfer gets a human-friendly code and a scannable QR alongside the share link for quick mobile pairing.
* **Transfer history & stats.** A private, in-browser log of your past transfers with sizes, timestamps, and live speed/ETA. Stored locally — never uploaded.
* **Expiring & burn links.** Optionally auto-expire a transfer link after a set time, or burn it after the first successful download.
* **Resumable downloads.** Transfers interrupted by network drops or crashes resume from where they left off. Progress is persisted to OPFS or IndexedDB.
* **SHA-256 integrity verification.** Every file is hashed by the sender and verified by the receiver; a mismatch flags the file as corrupt before it is saved.
* **Large file support.** Files are written incrementally to OPFS/IndexedDB as chunks arrive, allowing transfers far beyond what fits in memory.
* **Password protection.** Transfers can be protected with a password, verified before any data is sent.
* **Multi-file transfers** with per-file progress, delivered as a zip archive.
* **Automatic reconnect** when a device switches networks (e.g. mobile data → Wi-Fi).

## Development

```
$ git clone https://github.com/techorigins-stack/sendora.git
$ pnpm install
$ pnpm dev
$ pnpm build
$ pnpm start
```

## Deploy

Sendora is a standard Next.js app and deploys to **[Vercel](https://vercel.com)** out of the box — connect the repo and deploy, no extra configuration required. It uses the public PeerJS signaling cloud and Google STUN by default, so peer-to-peer transfers work immediately.

For self-hosting with your own TURN/Redis, see the Docker Compose files and the configuration options below.

## Stack

* Next.js · React · TypeScript · Tailwind CSS
* PeerJS (WebRTC)
* Zod · hash-wasm · fflate (client-side zip)
* Vitest + Playwright (testing)
* Redis (optional, for channel metadata)

## Configuration

Optional environment variables:

- `NEXT_PUBLIC_SITE_URL` – Canonical site URL used for metadata/OG tags.
- `REDIS_URL` – Connection string for a Redis instance used to store channel metadata. Falls back to in-memory storage if unset.
- `COTURN_ENABLED` – Set to `true` to enable TURN for peers behind strict NATs.
- `TURN_HOST` – Hostname or IP of the TURN server. Defaults to `127.0.0.1`.
- `TURN_REALM` – Realm used when generating TURN credentials. Defaults to `sendora.app`.
- `STUN_SERVER` – STUN server URL when `COTURN_ENABLED` is disabled. Defaults to `stun:stun.l.google.com:19302`.
- `PEERJS_HOST` / `PEERJS_PATH` – Self-hosted PeerJS server host/path. Defaults to the public PeerJS cloud.

## License

Sendora is released under the [BSD 3-Clause license](LICENSE). The `LICENSE` file retains the upstream copyright notices required by that license.
