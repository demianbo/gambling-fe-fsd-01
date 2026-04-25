import { getUserServer } from "@/entities/user";
import { UserCard } from "./components/user-card";

const TEST_USER_ID = "DA867B5F-F160-413B-9CEC-81B85697A515";

export async function DashboardView() {
  let user = null;
  let error: string | null = null;

  try {
    user = await getUserServer(TEST_USER_ID);
  } catch (err) {
    error = err instanceof Error ? err.message : "Error al cargar el usuario";
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        ) : user ? (
          <UserCard user={user} />
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </main>
  );
}
