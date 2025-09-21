## eslint (built-ins):
- find categories (remove everything before first and everything after deprecated (included)): <h2[^>]*?>.*?<a[^>]*?></a></h2>(?:\n?<p[^>]*?>.*?</p>)*
- search: <article class="[^"]*">\n?<div class="[^"]*">\n?<div class="[^"]*">\n?<a href="/docs/latest/rules/([\w-]+)" class="[^"]*">\n?([\w-]+)\n?</a>(\n?<p class="[^"]*">[^]*?<span class="[^"]*">[^]*?</span>\n?</p>)?\n?</div>\n?<p class="[^"]*">[^]*?</p>\n?</div>\n?<div class="[^"]*">\n?<span class="[^"]*">[^]*?</span>(\n?<p class="[^"]*"( aria-hidden="[^"]*")?>[^]*?<span class="[^"]*">[^]*?</span>\n?</p>){3}\n?</div>\n?</article>
- replace: "$1": ["error", ],\n

## @stylistic:
- search: <tr[^]*?>\n?<td[^]*?>\n?<a [^]*?href="/rules/([\w-]+)"[^]*?>\n?<code[^]*?>\n?([\w-]+)\n?</code>\n?</a>\n?</td>\n?<td[^]*?>[^]*?</td>(?:\n?<td[^]*?>[^]*?</td>){3}\n?</tr>
- replace: "@stylistic/$1": ["error", ],\n

## @typescript-eslint:
- search: <tr[^>]*?>\n?<td[^>]*?>\n?<div[^>]*?>\n?<a href="/rules/([\w-]+)"[^>]*?>\n?<code[^>]*?>\n?(@[\w-]+/)?([\w-]+)\n?</code>\n?</a>(?:\n?<span[^>]*?>[^<]*?</span>)?\n?</div>\n?<br[^>]*?>.*?</td>(?:\n?<td[^>]*?>.*?</td>)*\n?</tr>
- replace: "$2$1": ["error", ],\n

## react:
- search: <tr[^>]*?>\n?<td[^>]*?>\n?<a href="/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/([\w-]+).md"[^>]*?>([\w-]+)</a></td>\n?<td[^>]*?>[^]*?</td>(?:\n?<td[^>]*?>[^<]*?</td>)*\n?</tr>
- replace: "react/$1": ["error", ],\n
