/**
 * Raise EventEmitter limits for large Astro SSG builds.
 *
 * Concurrent prerender (hundreds of posts + OG PNGs + remote images) attaches
 * many short-lived 'close' listeners on HTTP sockets. Node's default of 10
 * triggers MaxListenersExceededWarning even when there is no real leak.
 *
 * Loaded via: NODE_OPTIONS="--import ./scripts/node-bootstrap.mjs"
 * @see https://github.com/withastro/astro/issues/15730
 */
import { EventEmitter } from "node:events";

EventEmitter.defaultMaxListeners = 50;
