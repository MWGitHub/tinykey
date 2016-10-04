import main from './lib/main';

(function start() {
  document.addEventListener('DOMContentLoaded', () => {
    main(document.getElementById('entry'));
  });
}());
