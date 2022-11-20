const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem('csrf-token') as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem('csrf-token', JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem('csrf-token');
  },
};

export default storage;
