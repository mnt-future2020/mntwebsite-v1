import { readFileSync } from "fs";
import { join } from "path";

/**
 * Intrinsic size of a local image in /public, read from its header at render
 * time (so, at build time for every static page).
 *
 * next/image needs width and height for anything it is not given as a static
 * import, and these paths arrive as strings from the case-study data — you
 * cannot statically import a path you only know at runtime. The alternative was
 * `fill`, which renders fine but ships <img> tags with no width/height at all:
 * nothing tells the browser (or a crawler, or a preview card) what shape the
 * image is before it loads.
 *
 * Only the three formats the repo actually stores are parsed. Anything else,
 * or a file that has moved, falls back to a 16:10 box rather than throwing —
 * a page missing one picture is better than a page that will not render.
 */

const FALLBACK = { width: 1600, height: 1000 };

// Read once per path per process: the build touches the same covers repeatedly.
const cache = new Map<string, { width: number; height: number }>();

function parse(buf: Buffer): { width: number; height: number } | null {
  // PNG: IHDR is always the first chunk, width/height at bytes 16..24.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // WebP: RIFF container, then one of three payload types.
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const kind = buf.toString("ascii", 12, 16);
    if (kind === "VP8X") {
      return {
        width: (buf.readUIntLE(24, 3) & 0xffffff) + 1,
        height: (buf.readUIntLE(27, 3) & 0xffffff) + 1,
      };
    }
    if (kind === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (kind === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }

  // JPEG: walk the segment chain to the start-of-frame marker.
  if (buf.length > 4 && buf.readUInt16BE(0) === 0xffd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      // SOF0/1/2/9/10 carry the dimensions; SOF4 and SOF12 do not.
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }

  return null;
}

export function imageSize(publicPath: string): { width: number; height: number } {
  const cached = cache.get(publicPath);
  if (cached) return cached;

  let size = FALLBACK;
  try {
    // 64KB is past the header of every format here, including a JPEG with a
    // large EXIF block, without reading whole multi-megabyte files.
    const fd = readFileSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
    size = parse(fd.subarray(0, 65_536)) || FALLBACK;
  } catch {
    /* moved or remote: the fallback box keeps the page rendering */
  }

  cache.set(publicPath, size);
  return size;
}
