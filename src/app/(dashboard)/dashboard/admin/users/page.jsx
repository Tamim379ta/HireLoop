import { getUserList } from '@/lib/api/users';
import React from 'react';
import UsersTable from './UserTable';

const UsersPage = async () => {
  const data = await getUserList();

  const users = data?.users || [];

  return (
    <div className="min-h-screen bg-[#121212] p-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-between items-center px-2">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            User Management
          </h1>
          <span className="bg-[#222222] text-[#a0a0a0] px-3 py-1 rounded-md text-sm border border-[#333333]">
            Total Users: {users.length}
          </span>
        </div>

        {/* Client table processing initial payload */}
        <UsersTable initialUsers={users} />
      </div>
    </div>
  );
};

export default UsersPage;