export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function registerUser(formData: any) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  localStorage.setItem('token', data.token);
  return data.user;
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  localStorage.setItem('token', data.token);
  return data.user;
}

export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.user;
}

export function logout() {
  localStorage.removeItem('token');
  // Optionally, call the backend endpoint:
  // fetch(`${API_URL}/logout`, { method: 'POST' });
}

export async function getCategories(type: string) {
  const res = await fetch(`${API_URL}/categories?type=${type}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.categories;
}

export async function getUserTypes() {
  const res = await fetch(`${API_URL}/user-types`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.userTypes;
} 