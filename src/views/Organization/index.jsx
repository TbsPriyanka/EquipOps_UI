import { Fragment, useState } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";

import Button from "@/utils/components/ui/Button";
import Alert from "@/utils/components/ui/Alert";
import Model from "@/utils/components/Model";
import DeleteAlertDialog from "@/utils/components/ui/DeleteAlertDialog";
import InputField from "@/utils/components/ui/InputField";

import {
  OrganizationDeleteApi,
  OrganizationListApi,
} from "@/api/OrganizationApi";

import OrganizationForm from "./OrganizationForm";

const ITEMS_PER_PAGE = 10;

const Organization = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFormModal, setShowFormModal] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);

  /* ===================== API ===================== */
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["organizations", currentPage, searchTerm],
    queryFn: () =>
      OrganizationListApi({
        search: searchTerm,
        page: currentPage,
        length: ITEMS_PER_PAGE,
      }),
    keepPreviousData: true,
  });

  const organizations = data?.data?.organizationResponseViewModel || [];
  const totalCount = data?.data?.totalNumbers || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  /* ===================== DELETE ===================== */
  const deleteMutation = useMutation({
    mutationFn: OrganizationDeleteApi,
    onSuccess: () => {
      refetch();
      setShowDeleteDialog(null);
    },
  });

  const handleDelete = () => {
    if (!showDeleteDialog?.organization_id) return;
    deleteMutation.mutate({
      Organization_id: showDeleteDialog.organization_id,
    });
  };

  /* ===================== PAGINATION ===================== */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalCount);

  return (
    <Fragment>
      <div className="flex flex-col gap-6">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Organizations
            </h1>
            {/* <p className="text-sm text-gray-500">
              Manage organizations and maintain records
            </p> */}
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowFormModal("create")}
          >
            + Create Organization
          </Button>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Search Organizations
              </h3>
              <p className="text-xs text-gray-500">
                Search by organization name or email
              </p>
            </div>

            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <InputField
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-11 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* ================= ERROR ================= */}
        {isError && (
          <Alert.Error>
            {error?.message || "Failed to load organizations"}
          </Alert.Error>
        )}

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">Address</th>
                <th className="p-4 text-left font-semibold">Contact Email</th>
                <th className="p-4 text-left font-semibold">Contact Phone</th>
                <th className="p-4 text-left font-semibold">Created</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center">
                    <RotatingLines width="28" strokeWidth="5" />
                  </td>
                </tr>
              ) : organizations.length > 0 ? (
                organizations.map((org) => (
                  <tr
                    key={org.organization_id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{org.name}</td>
                    <td className="p-4">{org.address || "-"}</td>
                    <td className="p-4">{org.contact_email || "-"}</td>
                    <td className="p-4">{org.contact_phone || "-"}</td>
                    <td className="p-4">
                      {new Date(org.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                          onClick={() => setShowFormModal(org)}
                        >
                          <FiEdit />
                        </button>

                        <button
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                          onClick={() => setShowDeleteDialog(org)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500">
                    No organizations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        {!isLoading && totalCount > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>
              Showing {startIndex}–{endIndex} of {totalCount}
            </p>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {showFormModal && (
        <Model
          title={
            typeof showFormModal === "string"
              ? "Create Organization"
              : "Edit Organization"
          }
          onClose={() => setShowFormModal(null)}
        >
          <OrganizationForm
            OrganizationId={showFormModal?.organization_id}
            onClose={() => setShowFormModal(null)}
          />
        </Model>
      )}

      {/* ================= DELETE ================= */}
      <DeleteAlertDialog
        isOpen={Boolean(showDeleteDialog)}
        itemName={showDeleteDialog?.name}
        onCancel={() => setShowDeleteDialog(null)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </Fragment>
  );
};

export default Organization;