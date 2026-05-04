// Tiny markdown-style shorthand used by all CMS-editable copy.
//   *word*   → <em>word</em>                       orange italic (blue in manifesto)
//   **word** → <em class="underlined">word</em>    orange italic + pink under-stripe
//   __word__ → <span class="underline-soft">…</span> soft orange highlighter
export function emph(input: string): string {
  return input
    .replace(/\*\*([^*]+?)\*\*/g, '<em class="underlined">$1</em>')
    .replace(/\*([^*]+?)\*/g, '<em>$1</em>')
    .replace(/__([^_]+?)__/g, '<span class="underline-soft">$1</span>');
}

// Hero headline: each whitespace-separated token gets a <span class="word">
// for the per-word reveal animation. Emphasis must wrap a single token
// (one asterisk-pair per word — applies fine across consecutive words).
export function heroHeadline(input: string): string {
  return input
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const dbl = token.match(/^\*\*(.+)\*\*$/);
      if (dbl) return `<span class="word"><em class="underlined">${dbl[1]}</em></span>`;
      const single = token.match(/^\*(.+)\*$/);
      if (single) return `<span class="word"><em>${single[1]}</em></span>`;
      return `<span class="word">${token}</span>`;
    })
    .join('\n          ');
}
