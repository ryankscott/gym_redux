const uuid = () => {
  let dt = new Date().getTime();
  const u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return u;
};

export const identifyUser = () => {
  let userId = localStorage.getItem('userId');
  if (userId == null) {
    userId = uuid();
    localStorage.setItem('userId', userId);
  }
  return;
};

export const identifySession = () => {
  localStorage.setItem('sessionId', uuid());
  return;
};

export const trackEvent = (eventName, data) => {
  return fetch(`${__BACKEND_URL__}analytics`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: localStorage.getItem('userId'),
      session: localStorage.getItem('sessionId'),
      data,
      action: eventName,
    }),
  });
};
