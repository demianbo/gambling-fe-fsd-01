import type { UserDto } from "@/entities/user";

interface UserCardProps {
  user: UserDto;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Perfil de Usuario
      </h2>

      <dl className="space-y-3">
        <div>
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="text-gray-900">{user.email}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Usuario</dt>
          <dd className="text-gray-900">{user.username}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Creado</dt>
          <dd className="text-gray-900">
            {new Date(user.createdAt).toLocaleDateString()}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Actualizado</dt>
          <dd className="text-gray-900">
            {new Date(user.updatedAt).toLocaleDateString()}
          </dd>
        </div>
      </dl>
    </div>
  );
}
