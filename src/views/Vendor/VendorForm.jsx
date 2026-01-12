import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import InputField from '@/utils/components/ui/InputField';
import Button from '@/utils/components/ui/Button';
// import { FiChevronDown, FiCheck } from 'react-icons/fi';
// import * as Select from '@radix-ui/react-select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { RotatingLines } from 'react-loader-spinner';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import { VendorByIdApi, VendorUpsertApi } from '@/api/VendorApi';

// ------------------------- VALIDATION ------------------------
// const ValidationSchema = yup.object({
//     id: yup.mixed().nullable(),
//     first_name: yup.string().trim().required('First name is required'),
//     last_name: yup.string().trim().required('Last name is required'),
//     email: yup.string().trim().required('Email is required').email('Enter a valid email'),
//     password: yup.string().when('id', {
//         is: (id) => !id,
//         then: (s) => s.required('Password is required').min(6, 'Min 6 characters'),
//         otherwise: (s) => s.notRequired().nullable()
//     }),
//     phone_no: yup.string().nullable(),
//     role: yup.string().required('Role is required'),
//     status: yup.string().oneOf(['active', 'inactive']).required(),
//     avatar: yup
//         .mixed()
//         .nullable()
//         .test('fileSize', 'Max file size 2MB', (file) => {
//             if (!file || typeof file === 'string') return true;
//             return file.size <= 2 * 1024 * 1024;
//         })
// });

// ------------------------- FORM -------------------------------
const VendorForm = ({ onClose, VendorId }) => {
    const {
        control,
        handleSubmit,
        // formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            vendor_id: VendorId || null,
            organization_id: null,
            name: '',
            contact_name: '',
            email: '',
            phone: '',
            service_type: ''
        }
        // resolver: yupResolver(ValidationSchema)
    });

    // LOAD USER IN EDIT MODE
    const { data, isFetching } = useQuery({
        queryKey: ['vendor-by-id', VendorId],
        queryFn: () => VendorByIdApi({ vendor_id: VendorId }),
        enabled: !!VendorId,
        select: (res) => res.data
    });

    useEffect(() => {
        if (data) {
            reset({
                vendor_id: data.vendor_id ?? null,
                organization_id: data.organization_id ?? null,
                name: data.name ?? '',
                contact_name: data.contact_name ?? '',
                email: data.email ?? '',
                phone: data.phone ?? '',
                service_type: data.service_type ?? ''
            });
        }
    }, [data, reset]);

    const mutation = useMutation({
        mutationFn: async (payload) => VendorUpsertApi(payload)
    });

    const submitHandler = async (formData) => {
        await mutation.mutateAsync(formData);
        onClose();
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center py-10">
                <RotatingLines height="1.2em" width="1.2em" strokeWidth="5" />
                <span className="ml-3 text-gray-600 text-sm">Loading vender data...</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-6 text-gray-900">
            <div className="space-y-4">
                {/* First / Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    {...field}
                                    placeholder="e.g. Amit"
                                    // error={!!errors.name}
                                />
                            )}
                        />
                        {/* {errors.name && <p className="text-xs text-red-500 mt-1">{errors.first_name.message}</p>} */}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Contact Name <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="contact_name"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    {...field}
                                    placeholder="e.g. Sharma"
                                    // error={!!errors.last_name}
                                />
                            )}
                        />
                        {/* {errors.last_name && <p className="text-xs text-red-500 mt-1">{errors.last_name.message}</p>} */}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Service Type <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="service_type"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    {...field}
                                    placeholder="e.g. Sharma"
                                    // error={!!errors.last_name}
                                />
                            )}
                        />
                        {/* {errors.last_name && <p className="text-xs text-red-500 mt-1">{errors.last_name.message}</p>} */}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Organization <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="organization_name"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    {...field}
                                    // placeholder="98765 43210"
                                    // error={!!errors.phone_no}
                                />
                            )}
                        />
                        {/* {errors.phone_no && <p className="text-xs text-red-500 mt-1">{errors.phone_no.message}</p>} */}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    {...field}
                                    placeholder="user@domain.com"
                                    // error={!!errors.email}
                                />
                            )}
                        />
                        {/* {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>} */}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            phone <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    {...field}
                                    placeholder="98765 43210"
                                    // error={!!errors.phone_no}
                                />
                            )}
                        />
                        {/* {errors.phone_no && <p className="text-xs text-red-500 mt-1">{errors.phone_no.message}</p>} */}
                    </div>
                </div>

                {/* ROLE + STATUS using RAW RADIX SELECT */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Role <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: 'Role is required' }}
                            render={({ field }) => (
                                <Select.Root value={field.value} onValueChange={field.onChange}>
                                    <Select.Trigger
                                        className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg 
                                                                                   bg-slate-50/60 flex justify-between items-center
                                                                                   focus:ring-2 focus:ring-indigo-400 outline-none"
                                    >
                                        <Select.Value placeholder="Select a voice" />
                                        <Select.Icon>
                                            <FiChevronDown />
                                        </Select.Icon>
                                    </Select.Trigger>

                                    <Select.Portal>
                                        <Select.Content
                                            side="bottom"
                                            position="popper"
                                            className="bg-white border border-gray-200 rounded-md shadow-lg mt-1 min-w-[var(--radix-select-trigger-width)] z-50"
                                        >
                                            <Select.Viewport className="p-1 max-h-64 overflow-y-auto">
                                                {['admin', 'manager', 'staff'].map((role) => (
                                                    <Select.Item
                                                        key={role}
                                                        value={role}
                                                        className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 flex justify-between"
                                                    >
                                                        <Select.ItemText className="capitalize">{role}</Select.ItemText>
                                                        <Select.ItemIndicator>
                                                            <FiCheck />
                                                        </Select.ItemIndicator>
                                                    </Select.Item>
                                                ))}
                                            </Select.Viewport>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>
                            )}
                        />
                        {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
                    </div>
                </div> */}
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                    Cancel
                </button>

                <Button type="submit" variant="contained" color="primary" disabled={mutation.isLoading} loading={mutation.isLoading}>
                    {mutation.isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </div>
        </form>
    );
};

VendorForm.propTypes = {
    onClose: PropTypes.func,
    VendorId: PropTypes.int
};

VendorForm.defaultProps = {
    onClose: () => {}
};

export default VendorForm;
