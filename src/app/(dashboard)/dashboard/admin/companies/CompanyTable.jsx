"use client";

import { updateCompanyStatus } from "@/lib/action/company";
import { Table } from "@heroui/react";
import { useRouter } from "next/navigation";

const statusConfig = {
  pending: { dot: "bg-yellow-400", text: "text-yellow-400", label: "Pending" },
  approved: { dot: "bg-green-400", text: "text-green-400", label: "Approved" },
  rejected: { dot: "bg-red-400", text: "text-red-400", label: "Rejected" },
};

function Avatar({ name }) {
  const initials = name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-9 h-9 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-300 flex-shrink-0">
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status?.toLowerCase()] ?? statusConfig.pending;

  return (
    <span className={`flex items-center gap-1.5 text-sm font-medium ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function CompanyTable({ companies: initial }) {

  const router = useRouter()

  // same logic as source code: no local state, no loading handling

  const handleApprove = async (id) => {
    await updateCompanyStatus(id, { status: "Approved" });
    router.refresh()
  };

  const handleReject = async (id) => {
    await updateCompanyStatus(id, { status: "Rejected" });
    router.refresh()
  };

  return (
    <Table className="bg-transparent">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Company management table"
          className="bg-zinc-900 rounded-xl border border-zinc-800"
        >
          <Table.Header>
            <Table.Column isRowHeader className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
              Company Name
            </Table.Column>
            <Table.Column className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
              Recruiter Email
            </Table.Column>
            <Table.Column className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
              Industry
            </Table.Column>
            <Table.Column className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
              Status
            </Table.Column>
            <Table.Column className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
              Date Submitted
            </Table.Column>
            <Table.Column className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {initial.map((company) => {
              const date = company.createdAt
                ? new Date(company.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                : "—";

              const isApproved = company.status?.toLowerCase() === "approved";
              const isRejected = company.status?.toLowerCase() === "rejected";

              return (
                <Table.Row
                  key={company._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40 transition-colors"
                >
                  <Table.Cell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={company.companyName} />
                      <span className="text-sm font-medium text-white">
                        {company.companyName}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="py-4">
                    <span className="text-sm text-zinc-400">
                      {company.recruiterEmail ?? company.recruiterId}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="py-4">
                    <span className="text-xs text-zinc-400 bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-md">
                      {company.industry}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="py-4">
                    <StatusBadge status={company.status} />
                  </Table.Cell>

                  <Table.Cell className="py-4">
                    <span className="text-sm text-zinc-400">{date}</span>
                  </Table.Cell>

                  <Table.Cell className="py-4">
                    <div className="flex items-center gap-2">
                      {!isApproved && (
                        <button
                          onClick={() => handleApprove(company._id)}
                          className="px-3 py-1 text-xs font-medium rounded-md bg-transparent border border-green-700 text-green-400 hover:bg-green-900/30 transition"
                        >
                          Approve
                        </button>
                      )}

                      {!isRejected && (
                        <button
                          onClick={() => handleReject(company._id)}
                          className="px-3 py-1 text-xs font-medium rounded-md bg-transparent border border-red-700 text-red-400 hover:bg-red-900/30 transition"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      <Table.Footer />
    </Table>
  );
}