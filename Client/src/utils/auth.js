export function saveAuth(token, user) {
  localStorage.setItem("oralvis_token", token);
  localStorage.setItem("oralvis_user", JSON.stringify(user));
}

export function getAuth() {
  const token = localStorage.getItem("oralvis_token");
  const user = JSON.parse(localStorage.getItem("oralvis_user") || "null");
  return { token, user };
}

export function logout() {
  localStorage.removeItem("oralvis_token");
  localStorage.removeItem("oralvis_user");
  window.location.href = "/login";
}
