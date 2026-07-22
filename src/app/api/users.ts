import { projectId, publicAnonKey } from "/utils/supabase/info";
import type { AppUser } from "../components/EditUserModal";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d4405fa6`;
const AUTH = { Authorization: `Bearer ${publicAnonKey}` };

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { ...AUTH, ...options.headers },
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.error ?? `HTTP ${res.status}`);
    (err as any).reason = data.reason;
    throw err;
  }
  return data as T;
}

export async function apiFetchUsers(): Promise<AppUser[]> {
  const data = await request<{ users: AppUser[] }>("/users");
  return data.users ?? [];
}

export async function apiLoginUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: AppUser; reason?: "invalid" | "pending" }> {
  try {
    const data = await request<{ user: AppUser }>("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return { success: true, user: data.user };
  } catch (err: any) {
    return {
      success: false,
      reason: err.reason === "pending" ? "pending" : "invalid",
    };
  }
}

export async function apiRegisterUser(userData: {
  name: string;
  email: string;
  password: string;
  role: "user" | "volunteer";
  faculty: string;
  nim: string;
  disability?: string;
}): Promise<AppUser> {
  const data = await request<{ user: AppUser }>("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return data.user;
}

export async function apiUpdateUser(
  id: string,
  updates: Partial<AppUser>
): Promise<AppUser> {
  const data = await request<{ user: AppUser }>(`/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return data.user;
}

export async function apiDeleteUser(id: string): Promise<void> {
  await request(`/users/${id}`, { method: "DELETE" });
}
