import ApiService from '@/utils/services/ApiService';

export const VendorListApi = async (data) => {
    return await ApiService.get('/Vendor/vendorList', data, { authorization: false });
};

export const VendorDeleteApi = async (data) => {
    return await ApiService.post('/Vendor/vendorDelete', data, { authorization: false });
};

export const VendorByIdApi = async (data) => {
    console.log(data);
    return await ApiService.get('/Vendor/vendorById', data, { authorization: false });
};

export const VendorUpsertApi = async (data) => {
    return await ApiService.post('/Vendor/vendorCreate', data, { authorization: false });
};
