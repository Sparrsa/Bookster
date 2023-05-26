export async function SignOut() {
  localStorage.removeItem("accessToken");
  window.location.reload();
}
