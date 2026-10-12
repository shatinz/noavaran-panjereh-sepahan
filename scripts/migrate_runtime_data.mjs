#!/usr/bin/env node
// Run on the SERVER right before `git reset --hard` (see deploy-server.yml).
//
// Admin edits used to be written straight into the git-tracked data/*.json files,
// so every deploy silently wiped them. They now live in data/runtime/ (git-ignored).
// This one-off, idempotent migration copies whatever is currently modified in the
// working tree into data/runtime/ so nothing is lost when the reset happens, and
// converts the legacy plaintext admin_auth.json into a hashed credentials file.
//
//   node scripts/migrate_runtime_data.mjs        (cwd = project root)

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execFileSync } from 'child_process';

const root = process.cwd();
const dataDir = path.join(root, 'data');
const runtimeDir = path.join(dataDir, 'runtime');
const contentDir = path.join(runtimeDir, 'content');
const COLLECTIONS = ['articles.json', 'projects.json', 'videos.json', 'materials.json', 'settings.json'];

const norm = (text) => {
  try {
    return JSON.stringify(JSON.parse(text));
  } catch {
    return null;
  }
};

if (!fs.existsSync(dataDir)) {
  console.log('[migrate] no data directory, nothing to do');
  process.exit(0);
}
fs.mkdirSync(contentDir, { recursive: true });

for (const file of COLLECTIONS) {
  const work = path.join(dataDir, file);
  const dest = path.join(contentDir, file);
  if (!fs.existsSync(work) || fs.existsSync(dest)) continue;

  let head;
  try {
    head = execFileSync('git', ['show', `HEAD:data/${file}`], { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    continue; // not tracked at HEAD
  }
  const current = fs.readFileSync(work, 'utf8');
  const a = norm(current);
  if (a !== null && a !== norm(head)) {
    fs.copyFileSync(work, dest);
    console.log(`[migrate] preserved admin edits: ${file}`);
  }
}

// legacy plaintext credentials -> hashed runtime file
const legacy = path.join(dataDir, 'admin_auth.json');
const target = path.join(runtimeDir, 'admin_auth.json');

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 32);
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`;
}

if (fs.existsSync(target)) {
  console.log('[migrate] runtime credentials already exist; preserving intact');
} else if (fs.existsSync(legacy)) {
  try {
    const raw = JSON.parse(fs.readFileSync(legacy, 'utf8'));
    if (raw.passwordHash) {
      // Legacy file was already hashed
      fs.writeFileSync(
        target,
        JSON.stringify(
          {
            username: raw.username || 'admin',
            passwordHash: raw.passwordHash,
            mustChangePassword: Boolean(raw.mustChangePassword),
            updatedAt: raw.updatedAt || Date.now(),
          },
          null,
          2
        ),
        { mode: 0o600 }
      );
      console.log('[migrate] existing hashed credentials preserved into runtime data');
    } else if (raw.password) {
      // Legacy plaintext password
      const pass = String(raw.password);
      const isDefault = pass === 'noavaran2026';
      fs.writeFileSync(
        target,
        JSON.stringify(
          {
            username: raw.username || 'admin',
            passwordHash: hashPassword(pass),
            mustChangePassword: isDefault,
            updatedAt: Date.now(),
          },
          null,
          2
        ),
        { mode: 0o600 }
      );
      console.log(
        isDefault
          ? '[migrate] legacy default password migrated as hash with mustChangePassword: true'
          : '[migrate] legacy custom password migrated as hash with mustChangePassword: false'
      );
    }
  } catch (error) {
    console.log('[migrate] could not migrate legacy admin_auth.json:', error.message);
  }
} else {
  // Fresh server: seed default credentials with mustChangePassword: true
  const envPassword = process.env.ADMIN_PASSWORD;
  const seedPassword = envPassword && envPassword.length >= 8 ? envPassword : 'noavaran2026';
  const seedCreds = {
    username: process.env.ADMIN_USERNAME || 'admin',
    passwordHash: hashPassword(seedPassword),
    mustChangePassword: true,
    updatedAt: Date.now(),
  };
  fs.writeFileSync(target, JSON.stringify(seedCreds, null, 2), { mode: 0o600 });
  console.log('[migrate] fresh server: seeded default credentials with mustChangePassword: true');
}
console.log('[migrate] done');
