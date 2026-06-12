'use client';

import React from 'react';
import { Table, Avatar } from '@heroui/react';
import { FiUser, FiBriefcase } from 'react-icons/fi';
import { updateUserRole } from '@/lib/action/users';

const UsersTable = ({ initialUsers = [] }) => {
  const handleMakeSeeker = async (userId) => {
    await updateUserRole(userId, "seeker");
  };

  const handleMakeRecruiter = async (userId) => {
    await updateUserRole(userId, "recruiter");
  };

  const handleMakeAdmin = async (userId) => {
    await updateUserRole(userId, "admin");
  };

  const handleSuspend = async (userId) => {
    await updateUserRole(userId, "suspend");
  };

  const handleActivate = async (userId) => {
    await updateUserRole(userId, "seeker");
  };

  const handleDelete = (userId) => {
    console.log(`Delete triggered for user ID:`, userId);
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getUserId = (user) => {
    if (!user) return '';
    if (typeof user._id === 'object' && user._id['$oid']) {
      return user._id['$oid'];
    }
    return user._id || user.id;
  };

  return (
    <div className="w-full bg-[#121212] text-white  rounded-xl">
      <Table className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg overflow-hidden">
        <Table.ScrollContainer>
          <Table.Content aria-label="User management dashboard table">
            <Table.Header className="bg-[#1a1a1a] border-b border-[#2d2d2d]">
              <Table.Column isRowHeader className="text-[#a0a0a0] font-semibold py-4 px-6 text-left">User Name</Table.Column>
              <Table.Column className="text-[#a0a0a0] font-semibold py-4 px-6 text-left">Email Address</Table.Column>
              <Table.Column className="text-[#a0a0a0] font-semibold py-4 px-6 text-left">Role</Table.Column>
              <Table.Column className="text-[#a0a0a0] font-semibold py-4 px-6 text-left">Join Date</Table.Column>
              <Table.Column className="text-[#a0a0a0] font-semibold py-4 px-6 text-left">Status</Table.Column>
              <Table.Column className="text-[#a0a0a0] font-semibold py-4 px-6 text-right">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {initialUsers.map((user) => {
                const targetId = getUserId(user);
                const currentRole = user.role?.toLowerCase() || 'seeker';
                const isSuspended = currentRole === 'suspend';
                const isActive = !isSuspended;
                const isRecruiter = currentRole === 'recruiter';
                const isAdmin = currentRole === 'admin';
                const isSeeker = currentRole === 'seeker';

                const joinDate = user.createdAt
                  ? new Date(user.createdAt['$date'] || user.createdAt).toLocaleDateString()
                  : (user.joinDate || 'N/A');

                return (
                  <Table.Row key={targetId} className="border-b border-[#2d2d2d] hover:bg-[#252525] transition-colors">
                    <Table.Cell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={user.avatar || user.logo}
                          name={user.name}
                          fallback={getInitials(user.name)}
                          className="w-10 h-10 border border-[#3d3d3d] bg-[#2a2a2a] text-white font-medium"
                        />
                        <span className="font-medium text-[#e0e0e0]">{user.name}</span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-6 text-[#a0a0a0]">
                      {user.email}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-6">
                      {isSuspended ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#222222] text-[#666666] border-[#333333]">
                          <FiUser size={12} />
                          <span className="capitalize">N/A</span>
                        </div>
                      ) : (
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${isRecruiter
                          ? 'bg-[#ffffff] text-black border-white'
                          : isAdmin
                            ? 'bg-purple-900/40 text-purple-300 border-purple-700'
                            : 'bg-[#222222] text-[#a0a0a0] border-[#333333]'
                          }`}>
                          {isRecruiter ? <FiBriefcase size={12} /> : <FiUser size={12} />}
                          <span className="capitalize">{currentRole}</span>
                        </div>
                      )}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-6 text-[#a0a0a0]">
                      {joinDate}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${isActive
                        ? 'bg-green-950/30 text-green-400 border-green-900/50'
                        : 'bg-red-950/30 text-red-400 border-red-900/50'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'}`}></span>
                        <span className="capitalize">{isActive ? 'Active' : 'Suspended'}</span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3 text-sm">
                        {isActive ? (
                          <>
                            {!isRecruiter && (
                              <button
                                onClick={() => handleMakeRecruiter(targetId)}
                                className="text-[#a0a0a0] hover:text-white transition-colors"
                              >
                                Make Recruiter
                              </button>
                            )}
                            {!isSeeker && (
                              <button
                                onClick={() => handleMakeSeeker(targetId)}
                                className="text-[#a0a0a0] hover:text-white transition-colors"
                              >
                                Make Seeker
                              </button>
                            )}
                            {!isAdmin && (
                              <button
                                onClick={() => handleMakeAdmin(targetId)}
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                              >
                                Make Admin
                              </button>
                            )}
                            <button
                              onClick={() => handleSuspend(targetId)}
                              className="text-red-500 hover:text-red-400 font-medium transition-colors border-l border-[#333333] pl-3"
                            >
                              Suspend
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleActivate(targetId)}
                              className="text-green-500 hover:text-green-400 font-medium transition-colors"
                            >
                              Activate
                            </button>
                            <button
                              onClick={() => handleDelete(targetId)}
                              className="text-gray-500 hover:text-red-400 transition-colors"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {/* Footer */}
        <Table.Footer className="border-t border-[#2d2d2d] bg-[#1a1a1a] p-4 flex items-center justify-between">
          <div className="text-sm text-[#a0a0a0]">
            Showing 1 to {initialUsers.length} of {initialUsers.length} users
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default UsersTable;