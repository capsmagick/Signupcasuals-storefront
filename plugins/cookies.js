import Cookies from 'js-cookie';

export default function ({ app }) {
  app.$cookies = Cookies;
}