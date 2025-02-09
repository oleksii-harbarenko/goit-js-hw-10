import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const { delay, state } = e.currentTarget.elements;
  const delayValue = Number(delay.value);
  createPromise(delayValue, state.value)
    .then(data =>
      iziToast.success({
        position: 'topRight',
        message: `✅ Fulfilled promise in ${data}ms`,
      })
    )
    .catch(data =>
      iziToast.error({
        position: 'topRight',
        message: `❌ Rejected promise in ${data}ms`,
      })
    );
  form.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
