import ApiService from '@/utils/services/ApiService';

export const OrganizationListApi = async (data) => {
    return await ApiService.get('/Organization/OrganizationList', data, { authorization: false });
};

export const OrganizationDeleteApi = async (data) => {
    return await ApiService.post('/Organization/OrganizationDelete', data, { authorization: false });
};

export const OrganizationByIdApi = async (data) => {
    console.log(data);
    return await ApiService.get('/Organization/OrganizationById', data, { authorization: false });
};

export const OrganizationUpsertApi = async (data) => {
    return await ApiService.post('/Organization/OrganizationCreate', data, { authorization: false });
};
