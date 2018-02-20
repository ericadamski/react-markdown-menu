import { curry, range } from 'ramda';

export function bold(str) {
  return str.replace(/__.*__/, '') === str
    ? `__${str}__`
    : str.replace(/(__)(.*)(__)/, '$2');
}

export const header = curry(function header(depth, str) {
  return str.charAt(0) !== '#'
    ? `${range(0, depth)
        .map(() => '#')
        .join('')} ${str}`
    : str.replace(/[#]+ /, '').trim();
});

export function italic(str) {
  return str.replace(/_.*_/, '') === str
    ? `_${str}_`
    : str.replace(/(_)(.*)(_)/, '$2');
}

export function link(str) {
  return str.replace(/\[.*\]\(.*\)/, '') === str
    ? `[${str}]()`
    : str.replace(/\[(.*)\]\(.*\)/, '$1');
}

export function quote(str) {
  return str.charAt(0) !== '>' ? `> ${str}` : str.substr(1).trim();
}
