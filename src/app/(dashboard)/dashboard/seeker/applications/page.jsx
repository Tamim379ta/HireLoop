import { getApplicationById } from '@/lib/api/application';
import { getUserSession } from '@/lib/core/session';
import { Table } from '@heroui/react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

const statusConfig = {
  applied: { label: 'Applied', className: 'border border-gray-400 text-gray-300' },
  review: { label: 'Review', className: 'border border-yellow-500 text-yellow-400' },
  shortlisted: { label: 'Shortlisted', className: 'border border-green-500 text-green-400' },
  rejected: { label: 'Rejected', className: 'border border-red-500 text-red-400' },
  offered: { label: 'Offered', className: 'border border-gray-400 text-gray-300' },
};

function StatusBadge({ status = 'applied' }) {
  const key = status.toLowerCase();
  const config = statusConfig[key] ?? statusConfig.applied;
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function JobIcon({ logo, title }) {
  return (
    <div className="relative w-9 h-9 rounded-md overflow-hidden bg-zinc-800 flex-shrink-0">
      {logo ? (
        <Image src={logo} alt={title} fill className="object-contain p-1" />
      ) : (
        <span className="flex items-center justify-center w-full h-full text-zinc-400 text-xs font-bold">
          {title?.[0] ?? '?'}
        </span>
      )}
    </div>
  );
}

const ApplicationPage = async () => {
  const user = await getUserSession();
  const applications = await getApplicationById(user?.id);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">My Applications</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {applications?.length ?? 0} application{applications?.length !== 1 ? 's' : ''} tracked
          </p>
        </div>

        {applications?.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-base">You haven&apos;t applied to any jobs yet.</p>
          </div>
        ) : (
          <Table className="bg-transparent">
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Job applications"
                className="bg-zinc-900 rounded-xl border border-zinc-800"
              >
                <Table.Header>
                  <Table.Column isRowHeader className="text-zinc-400 text-xs font-medium uppercase tracking-wide bg-transparent">
                    Job Title
                  </Table.Column>
                  <Table.Column className="text-zinc-400 text-xs font-medium uppercase tracking-wide bg-transparent">
                    Company
                  </Table.Column>
                  <Table.Column className="text-zinc-400 text-xs font-medium uppercase tracking-wide bg-transparent">
                    Applied
                  </Table.Column>
                  <Table.Column className="text-zinc-400 text-xs font-medium uppercase tracking-wide bg-transparent">
                    Status
                  </Table.Column>
                  <Table.Column className="text-zinc-400 text-xs font-medium uppercase tracking-wide bg-transparent">
                    Action
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {applications.map((app) => (
                    <Table.Row
                      key={app._id}
                      className="border-t border-zinc-800 hover:bg-zinc-800/40 transition-colors"
                    >
                      {/* Job Title */}
                      <Table.Cell className="py-4">
                        <div className="flex items-center gap-3">
                          <JobIcon logo={app.joblogo} title={app.JobTitle} />
                          <div>
                            <p className="text-sm font-medium text-white">{app.JobTitle}</p>
                            <p className="text-xs text-zinc-500">Full-time • Remote</p>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Company */}
                      <Table.Cell className="py-4">
                        <span className="text-sm text-zinc-300">{app.jobCompany}</span>
                      </Table.Cell>

                      {/* Applied */}
                      <Table.Cell className="py-4">
                        <span className="text-sm text-zinc-400">
                          {app.createdAt
                            ? formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })
                            : '—'}
                        </span>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell className="py-4">
                        <StatusBadge status={app.status ?? 'applied'} />
                      </Table.Cell>

                      {/* Action */}
                      <Table.Cell className="py-4">
                        <a
                          href={`/applications/${app._id}`}
                          className="text-sm text-zinc-300 hover:text-white transition-colors"
                        >
                          Details
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer />
          </Table>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;