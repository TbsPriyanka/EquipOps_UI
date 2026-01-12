import { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";
import InputField from "@/utils/components/ui/InputField";
import Button from "@/utils/components/ui/Button";

import {
  OrganizationByIdApi,
  OrganizationUpsertApi,
} from "@/api/OrganizationApi";

const OrganizationForm = ({ onClose, OrganizationId }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      organization_id: OrganizationId || null,
      name: "",
      address: "",
      contact_email: "",
      contact_phone: "",
    },
  });

  /* ================= FETCH (EDIT MODE) ================= */
  const { data, isFetching } = useQuery({
    queryKey: ["organization-by-id", OrganizationId],
    queryFn: () =>
      OrganizationByIdApi({ organization_id: OrganizationId }),
    enabled: !!OrganizationId,
    select: (res) => res.data,
  });

  useEffect(() => {
    if (data) {
      reset({
        organization_id: data.organization_id ?? null,
        name: data.name ?? "",
        address: data.address ?? "",
        contact_email: data.contact_email ?? "",
        contact_phone: data.contact_phone ?? "",
      });
    }
  }, [data, reset]);

  /* ================= SUBMIT ================= */
  const mutation = useMutation({
    mutationFn: OrganizationUpsertApi,
  });

  const submitHandler = async (formData) => {
    await mutation.mutateAsync(formData);
    onClose();
  };

  /* ================= LOADER ================= */
  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-14">
        <RotatingLines width="32" strokeWidth="5" />
        <span className="ml-3 text-sm text-gray-600">
          Loading organization...
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-8"
    >
      {/* ================= FORM BODY ================= */}
      <div className="bg-white rounded-xl px-6 py-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Organization Details
          </h3>
          {/* <p className="text-xs text-gray-500 mt-1">
            Enter basic information about the organization
          </p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* NAME */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder="e.g. FTP Solutions"
                  className="h-11"
                />
              )}
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder="e.g. Satellite, Ahmedabad"
                  className="h-11"
                />
              )}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <Controller
              name="contact_email"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="email"
                  placeholder="e.g. info@company.com"
                  className="h-11"
                />
              )}
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Contact Phone <span className="text-red-500">*</span>
            </label>
            <Controller
              name="contact_phone"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder="e.g. 98765 43210"
                  className="h-11"
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          loading={mutation.isLoading}
          disabled={mutation.isLoading}
          className="px-6"
        >
          {mutation.isLoading ? "Saving..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

OrganizationForm.propTypes = {
  onClose: PropTypes.func,
  OrganizationId: PropTypes.number,
};

OrganizationForm.defaultProps = {
  onClose: () => {},
};

export default OrganizationForm;