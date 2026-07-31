import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import type { AppUser } from "../components/EditUserModal";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d4405fa6`;
const AUTH = { Authorization: `Bearer ${publicAnonKey}` };

const HEADERS = {
  apikey: publicAnonKey,
  Authorization: `Bearer ${publicAnonKey}`,
  "Content-Type": "application/json",
  Prefer: "resolution=merge-duplicates",
};

const DEFAULT_USERS: AppUser[] = [];

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { ...AUTH, ...options.headers },
  });
  const text = await res.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: text || `HTTP ${res.status}` };
  }
  if (!res.ok) {
    const err = new Error(data?.error ?? `HTTP ${res.status}`);
    (err as any).reason = data?.reason;
    throw err;
  }
  return data as T;
}

export async function apiFetchUsers(): Promise<AppUser[]> {
  let profileUsers: AppUser[] = [];
  const kvUsersMap = new Map<string, AppUser>();

  // 1. Fetch KV store users first (contains passwords)
  try {
    const res = await fetch(`https://${projectId}.supabase.co/rest/v1/kv_store_d4405fa6?key=like.pustaka:user:*`, { headers: HEADERS });
    if (res.ok) {
      const rows: { key: string; value: AppUser }[] = await res.json();
      if (Array.isArray(rows) && rows.length > 0) {
        for (const r of rows) {
          if (r.value?.email) {
            kvUsersMap.set(r.value.email.toLowerCase(), r.value);
          }
        }
      }
    }
  } catch (e) {
    console.warn("KV store fetch notice:", e);
  }

  // 2. Fetch relational `profiles` table and merge passwords from KV store
  try {
    const res = await fetch(`https://${projectId}.supabase.co/rest/v1/profiles?select=*`, { headers: HEADERS });
    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0) {
        profileUsers = rows.map((u: any) => {
          const emailLower = (u.email || "").toLowerCase();
          const kvMatch = kvUsersMap.get(emailLower);
          return {
            id: u.id || kvMatch?.id || String(Date.now()),
            name: u.name || kvMatch?.name || "User",
            email: u.email,
            password: u.password || kvMatch?.password || "",
            role: u.role || kvMatch?.role || "user",
            faculty: u.faculty || kvMatch?.faculty || "Teknik",
            status: u.status || kvMatch?.status || "pending",
            joined: u.joined || u.created_at?.split("T")[0] || kvMatch?.joined || "2024-01-01",
            nim: u.nim || kvMatch?.nim || "",
            disability: u.disability || kvMatch?.disability || "",
            avatarUrl: u.avatar_url || u.avatarUrl || kvMatch?.avatarUrl || "",
          };
        });
      }
    }
  } catch (e) {
    console.warn("Profiles table fetch notice:", e);
  }

  if (profileUsers.length > 0) {
    // Merge any KV users that might not be in profiles table yet
    const existingEmails = new Set(profileUsers.map((u) => u.email.toLowerCase()));
    for (const [email, kvUser] of kvUsersMap.entries()) {
      if (!existingEmails.has(email)) {
        profileUsers.push(kvUser);
      }
    }
    return profileUsers;
  }

  if (kvUsersMap.size > 0) return Array.from(kvUsersMap.values());

  // 3. Fallback to Edge Function if available
  try {
    const data = await request<{ users: AppUser[] }>("/users");
    if (data?.users?.length) return data.users;
  } catch (e) {
    console.warn("Edge function fetch notice:", e);
  }

  return DEFAULT_USERS;
}

export async function apiLoginUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: AppUser; reason?: "invalid" | "pending" }> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Authenticate directly against Supabase Auth service (auth.users)
  try {
    const authRes = await fetch(`https://${projectId}.supabase.co/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: publicAnonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cleanEmail, password }),
    });
    if (authRes.ok) {
      const authData = await authRes.json();
      if (authData?.user) {
        const users = await apiFetchUsers();
        const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
        const appUser: AppUser = found || {
          id: authData.user.id,
          name: authData.user.user_metadata?.name || cleanEmail.split("@")[0] || "User",
          email: cleanEmail,
          password,
          role: authData.user.user_metadata?.role || "user",
          faculty: authData.user.user_metadata?.faculty || "Teknik",
          status: "active",
          joined: new Date().toISOString().split("T")[0],
        };
        if (appUser.status === "pending") return { success: false, reason: "pending" };
        return { success: true, user: appUser };
      }
    }
  } catch (e) {
    console.warn("Supabase Auth password login notice:", e);
  }

  // 2. Fallback check against profiles and local users table
  try {
    const users = await apiFetchUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );
    if (!found) return { success: false, reason: "invalid" };
    if (found.status === "pending") return { success: false, reason: "pending" };
    return { success: true, user: found };
  } catch {
    return { success: false, reason: "invalid" };
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
  const newUser: AppUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name: userData.name.trim(),
    email: userData.email.trim().toLowerCase(),
    password: userData.password,
    role: userData.role,
    faculty: userData.faculty,
    status: "pending",
    joined: new Date().toISOString().split("T")[0],
  };

  // 1. Create user in Supabase Auth service (auth.users tab in Supabase Dashboard)
  try {
    const authRes = await fetch(`https://${projectId}.supabase.co/auth/v1/signup`, {
      method: "POST",
      headers: {
        apikey: publicAnonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newUser.email,
        password: newUser.password,
        data: {
          name: newUser.name,
          role: newUser.role,
          faculty: newUser.faculty,
          nim: userData.nim,
          disability: userData.disability,
        },
      }),
    });
    if (authRes.ok) {
      console.log(`Successfully created ${newUser.email} directly in Supabase Auth (auth.users)`);
    } else {
      console.warn("Supabase Auth signup response:", authRes.status, await authRes.text());
    }
  } catch (e) {
    console.warn("Supabase Auth signup notice:", e);
  }

  // 2. Insert into relational `profiles` table
  try {
    const res = await fetch(`https://${projectId}.supabase.co/rest/v1/profiles`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        faculty: newUser.faculty,
        status: newUser.status,
        nim: userData.nim,
        disability: userData.disability,
      }),
    });
    if (!res.ok) {
      console.warn("Profiles table insert response:", res.status, await res.text());
    }
  } catch (e) {
    console.warn("Profiles table insert notice:", e);
  }

  // 3. Insert into `kv_store_d4405fa6` table for total compatibility
  try {
    await fetch(`https://${projectId}.supabase.co/rest/v1/kv_store_d4405fa6`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        key: `pustaka:user:${newUser.id}`,
        value: newUser,
      }),
    });
  } catch (e) {
    console.warn("KV store register notice:", e);
  }

  // 4. Fallback sync with Edge Function if running
  try {
    await request<{ user: AppUser }>("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  } catch (e) {
    console.warn("Edge function register notice:", e);
  }

  return newUser;
}

export async function apiUpdateUser(
  id: string,
  updates: Partial<AppUser>
): Promise<AppUser> {
  const users = await apiFetchUsers();
  const existing = users.find((u) => u.id === id) || ({ id } as AppUser);
  const updated = { ...existing, ...updates };

  // Format payload for public.profiles table (snake_case column mapping)
  const profilePayload: any = {};
  if (updates.name !== undefined) profilePayload.name = updates.name;
  if (updates.email !== undefined) profilePayload.email = updates.email;
  if (updates.role !== undefined) profilePayload.role = updates.role;
  if (updates.faculty !== undefined) profilePayload.faculty = updates.faculty;
  if (updates.status !== undefined) profilePayload.status = updates.status;
  if (updates.nim !== undefined) profilePayload.nim = updates.nim;
  if (updates.disability !== undefined) profilePayload.disability = updates.disability;
  if (updates.avatarUrl !== undefined) profilePayload.avatar_url = updates.avatarUrl;
  if (updates.password !== undefined) profilePayload.password = updates.password;

  try {
    const filterQuery = id ? `id=eq.${id}` : `email=eq.${encodeURIComponent(updated.email)}`;
    await fetch(`https://${projectId}.supabase.co/rest/v1/profiles?${filterQuery}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(profilePayload),
    });
  } catch (e) {
    console.warn("Profiles update notice:", e);
  }

  try {
    await fetch(`https://${projectId}.supabase.co/rest/v1/kv_store_d4405fa6`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        key: `pustaka:user:${id}`,
        value: updated,
      }),
    });
  } catch (e) {
    console.warn("KV update notice:", e);
  }

  try {
    await request<{ user: AppUser }>(`/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
  } catch (e) {
    console.warn("Edge function update notice:", e);
  }

  return updated;
}

export async function apiDeleteUser(id: string): Promise<void> {
  try {
    await fetch(`https://${projectId}.supabase.co/rest/v1/profiles?id=eq.${id}`, { method: "DELETE", headers: HEADERS });
    await fetch(`https://${projectId}.supabase.co/rest/v1/kv_store_d4405fa6?key=eq.pustaka:user:${id}`, { method: "DELETE", headers: HEADERS });
    await request(`/users/${id}`, { method: "DELETE" });
  } catch (e) {
    console.warn("Delete user notice:", e);
  }
}

export async function apiForgotPassword(
  email: string
): Promise<{ success: boolean; code?: string; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const origin = typeof window !== "undefined" ? window.location.origin : (import.meta.env.VITE_APP_URL || "");
  const redirectUrl = origin ? `${origin}/login` : undefined;

  // 1. Trigger Supabase Auth built-in email recovery service (sends real email via Supabase SMTP)
  try {
    const recoverUrl = redirectUrl
      ? `https://${projectId}.supabase.co/auth/v1/recover?redirect_to=${encodeURIComponent(redirectUrl)}`
      : `https://${projectId}.supabase.co/auth/v1/recover`;

    const authRes = await fetch(recoverUrl, {
      method: "POST",
      headers: {
        apikey: publicAnonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cleanEmail }),
    });
    const resText = await authRes.text();
    let resJson: any = {};
    try {
      resJson = JSON.parse(resText);
    } catch {}

    if (!authRes.ok) {
      if (authRes.status === 429 || resJson?.error_code === "over_email_send_rate_limit") {
        return {
          success: false,
          error: "Batas pengiriman email tercapai (Rate Limit 429). Mohon tunggu beberapa menit atau sesuaikan 'Rate Limits' di Supabase Auth Dashboard.",
        };
      }
      console.warn("Supabase Auth recover notice:", authRes.status, resText);
    } else {
      console.log(`Supabase Auth password reset email successfully triggered for ${cleanEmail}`);
    }
  } catch (e) {
    console.warn("Supabase Auth recover notice:", e);
  }

  // 2. Trigger backend Edge Function reset if running
  try {
    const data = await request<{ success: boolean; code?: string }>("/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail }),
    });
    if (data.code) return { success: true, code: data.code };
  } catch (e) {
    console.warn("Edge function forgot-password notice:", e);
  }

  // 3. Check registered accounts
  try {
    const users = await apiFetchUsers();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found && !cleanEmail.includes("@student.ub.ac.id") && !cleanEmail.includes("@ub.ac.id")) {
      return { success: false, error: "Email UB tidak terdaftar dalam sistem Pustakability." };
    }
  } catch (e) {
    console.warn("User validation notice:", e);
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  return { success: true, code };
}

function getAccessTokenFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.substring(1)
    : window.location.hash;
  const params = new URLSearchParams(hash || window.location.search);
  return params.get("access_token");
}

export async function apiResetPassword(
  email: string,
  code: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  let cleanEmail = email.trim().toLowerCase();
  const accessToken = getAccessTokenFromUrl();

  // 1. If we have access_token from email link, update Supabase Auth user password
  if (accessToken) {
    try {
      const authRes = await fetch(`https://${projectId}.supabase.co/auth/v1/user`, {
        method: "PUT",
        headers: {
          apikey: publicAnonKey,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });
      if (authRes.ok) {
        const userData = await authRes.json();
        if (userData?.email) {
          cleanEmail = userData.email.toLowerCase();
          console.log(`Supabase Auth password successfully updated for ${cleanEmail}`);
        }
      } else {
        console.warn("Supabase Auth password update response:", authRes.status, await authRes.text());
      }
    } catch (e) {
      console.warn("Supabase Auth password update notice:", e);
    }
  }

  // 2. Fallback edge function trigger
  try {
    await request<{ success: boolean }>("/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail, code, newPassword }),
    });
  } catch (e) {
    console.warn("Edge function reset password notice:", e);
  }

  // 3. Update database table & profiles
  try {
    const users = await apiFetchUsers();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (found) {
      await apiUpdateUser(found.id, { password: newPassword });
    } else if (cleanEmail) {
      await fetch(`https://${projectId}.supabase.co/rest/v1/profiles?email=eq.${encodeURIComponent(cleanEmail)}`, {
        method: "PATCH",
        headers: {
          apikey: publicAnonKey,
          Authorization: `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });
    }
    return { success: true };
  } catch {
    return { success: true };
  }
}

export async function apiChangePassword(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  let authOk = false;

  // 1. Verify current password against Supabase Auth password grant
  try {
    const authRes = await fetch(`https://${projectId}.supabase.co/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: publicAnonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cleanEmail, password: currentPassword }),
    });

    if (authRes.ok) {
      const authData = await authRes.json();
      const accessToken = authData?.access_token;

      if (accessToken) {
        // Update to new password using authenticated session access_token
        const updateRes = await fetch(`https://${projectId}.supabase.co/auth/v1/user`, {
          method: "PUT",
          headers: {
            apikey: publicAnonKey,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        });

        if (updateRes.ok) {
          authOk = true;
        }
      }
    }
  } catch (e) {
    console.warn("Supabase Auth change password notice:", e);
  }

  // 2. Update profiles table and KV store so local & fallback login works
  try {
    const users = await apiFetchUsers();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (found) {
      // Check current password if auth didn't verify it
      if (authOk || found.password === currentPassword || !found.password) {
        await apiUpdateUser(found.id, { password: newPassword });
        return { success: true };
      } else {
        return { success: false, error: "currentPassErr" };
      }
    } else if (authOk) {
      return { success: true };
    }
  } catch (e) {
    console.warn("Profiles password update notice:", e);
  }

  if (authOk) return { success: true };
  return { success: false, error: "currentPassErr" };
}

export async function apiChangeEmail(
  currentEmail: string,
  currentPassword: string,
  newEmail: string
): Promise<{ success: boolean; error?: string }> {
  const cleanCurrentEmail = currentEmail.trim().toLowerCase();
  const cleanNewEmail = newEmail.trim().toLowerCase();

  // 1. Verify current password to get an access token
  try {
    const authRes = await fetch(`https://${projectId}.supabase.co/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: publicAnonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cleanCurrentEmail, password: currentPassword }),
    });

    if (!authRes.ok) {
      return { success: false, error: "currentPassErr" };
    }

    const authData = await authRes.json();
    const accessToken = authData?.access_token;

    if (!accessToken) {
      return { success: false, error: "currentPassErr" };
    }

    // 2. Request email change via Supabase Auth — sends verification to new email
    const updateRes = await fetch(`https://${projectId}.supabase.co/auth/v1/user`, {
      method: "PUT",
      headers: {
        apikey: publicAnonKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cleanNewEmail }),
    });

    if (updateRes.ok) {
      return { success: true };
    } else {
      const errText = await updateRes.text();
      return { success: false, error: errText || "emailChangeErr" };
    }
  } catch (e) {
    console.warn("Change email error:", e);
    return { success: false, error: "emailChangeErr" };
  }
}
