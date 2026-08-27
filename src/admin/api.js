const BASE_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // Authentication
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_email', data.email);
    return data;
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
  },

  verifySession: async () => {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: { ...getAuthHeaders() }
    });
    if (!res.ok) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_email');
      return false;
    }
    return true;
  },

  changePassword: async (currentPassword, newPassword) => {
    const res = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update password');
    return data;
  },

  // File Upload
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: { ...getAuthHeaders() },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'File upload failed');
    return data.url; // Returns the uploaded file URL
  },

  // Generic CRUD fetcher
  get: async (endpoint, isAdmin = false) => {
    const headers = isAdmin ? getAuthHeaders() : {};
    const url = isAdmin ? `${BASE_URL}/${endpoint}/admin` : `${BASE_URL}/${endpoint}`;
    const res = await fetch(url, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Fetch failed');
    return data;
  },

  post: async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Create failed');
    return data;
  },

  put: async (endpoint, id, body) => {
    const url = id ? `${BASE_URL}/${endpoint}/${id}` : `${BASE_URL}/${endpoint}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Update failed');
    return data;
  },

  delete: async (endpoint, id) => {
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Delete failed');
    return data;
  },

  reorder: async (endpoint, orderedIds) => {
    const res = await fetch(`${BASE_URL}/${endpoint}/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ orderedIds })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Reordering failed');
    return data;
  }
};
